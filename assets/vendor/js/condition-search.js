// 조건검색기 핵심 로직
// 상태 관리, 조건 추가/삭제/이동, 조건식 파싱, 스캔 실행

// 조건검색기 전역 상태 객체
const CS_STATE = {
  conditions: [], // 추가된 조건 목록 [{letter, conditionId, params, description, active}]
  isScanning: false // 스캔 진행 중 여부
};

// 파라미터 패널에서 현재 입력값 수집
function collectParamValues(conditionId) {
  const fieldDef = CONDITION_FIELDS[conditionId];
  if (!fieldDef) return {};

  const values = {};
  fieldDef.fields.forEach(f => {
    const el = document.getElementById(`csp_${f.id}`);
    if (!el) return;
    values[f.id] = el.type === 'number' ? parseFloat(el.value) : el.value;
  });
  return values;
}

// 조건 추가 (파라미터 패널의 추가 버튼 클릭 시 호출)
function addConditionFromPanel(conditionId) {
  const fieldDef = CONDITION_FIELDS[conditionId];
  if (!fieldDef) return;

  const values = collectParamValues(conditionId);
  const letter = generateConditionLabel(CS_STATE.conditions.length);
  const description = fieldDef.buildLabel(values);

  CS_STATE.conditions.push({
    letter,
    conditionId,
    params: values,
    description,
    active: true
  });

  renderConditionList();
  updateConditionFormula();
}

// 조건 활성/비활성 토글
function toggleConditionActive(letter) {
  const cond = CS_STATE.conditions.find(c => c.letter === letter);
  if (!cond) return;
  cond.active = !cond.active;
  updateConditionFormula();
}

// 조건 삭제
function removeCondition(letter) {
  CS_STATE.conditions = CS_STATE.conditions.filter(c => c.letter !== letter);

  // 삭제 후 알파벳 재배정
  CS_STATE.conditions.forEach((c, i) => {
    c.letter = generateConditionLabel(i);
  });

  renderConditionList();
  updateConditionFormula();
}

// 조건 순서 이동
function moveCondition(index, direction) {
  const conditions = CS_STATE.conditions;
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= conditions.length) return;

  [conditions[index], conditions[targetIndex]] = [conditions[targetIndex], conditions[index]];

  // 이동 후 알파벳 재배정
  conditions.forEach((c, i) => {
    c.letter = generateConditionLabel(i);
  });

  renderConditionList();
  updateConditionFormula();
}

// 조건식 파싱 및 검증
// 예: "(A and B) or (C and D)" → 유효한 논리식인지 체크
function validateFormula(formula) {
  if (!formula || formula.trim() === '') return { valid: false, msg: '조건식을 입력하세요.' };

  const letters = CS_STATE.conditions.map(c => c.letter);
  const usedLetters = formula.toUpperCase().match(/[A-Z]+/g) || [];
  const invalidLetters = usedLetters.filter(l => !letters.includes(l) && !['AND', 'OR', 'NOT'].includes(l));

  if (invalidLetters.length > 0) {
    return { valid: false, msg: `정의되지 않은 조건: ${invalidLetters.join(', ')}` };
  }

  return { valid: true, msg: '' };
}

// 조건검색 실행
async function runConditionSearch() {
  if (CS_STATE.isScanning) {
    alert('현재 스캔이 진행 중입니다.');
    return;
  }

  const formula = document.getElementById('cs-formula')?.value?.trim();
  const validation = validateFormula(formula);
  if (!validation.valid) {
    alert(validation.msg);
    return;
  }

  const kospiCount = parseInt(document.getElementById('cs-kospi-count')?.value) || 0;
  const kosdaqCount = parseInt(document.getElementById('cs-kosdaq-count')?.value) || 0;
  const coinCount = parseInt(document.getElementById('cs-coin-count')?.value) || 0;

  if (kospiCount === 0 && kosdaqCount === 0 && coinCount === 0) {
    alert('검색 대상 종목 수를 하나 이상 입력하세요.');
    return;
  }

  const stockList = [
    ...KOSPI200_LIST.slice(0, Math.min(kospiCount, KOSPI200_LIST.length)),
    ...KOSDAQ150_LIST.slice(0, Math.min(kosdaqCount, KOSDAQ150_LIST.length)),
    ...COIN_LIST.slice(0, Math.min(coinCount, COIN_LIST.length))
  ];

  CS_STATE.isScanning = true;
  document.getElementById('cs-search-btn').disabled = true;
  document.getElementById('cs-stop-btn').disabled = false;

  const resultsEl = document.getElementById('cs-results');
  if (resultsEl) {
    resultsEl.innerHTML = `
      <div class="text-center text-muted py-4">
        <div class="spinner-border spinner-border-sm me-2"></div>
        스캔 진행 중...
      </div>`;
  }

  const matched = [];
  const total = stockList.length;

  for (let i = 0; i < total; i++) {
    if (!CS_STATE.isScanning) break;

    const stock = stockList[i];
    updateConditionProgress(i + 1, total, stock.name);

    try {
      const result = await fetchStockDataForCondition(stock);
      if (result && evaluateConditions(result, formula)) {
        matched.push(result);
        document.getElementById('cs-result-summary').textContent = `현재까지 ${matched.length}개 종목 발견`;
      }
    } catch (e) {
      console.warn(`${stock.name} 처리 실패:`, e);
    }

    await conditionSleep(600);
  }

  CS_STATE.isScanning = false;
  document.getElementById('cs-search-btn').disabled = false;
  document.getElementById('cs-stop-btn').disabled = true;
  updateConditionProgress(0, 0, '');
  document.getElementById('cs-result-summary').textContent = `총 ${matched.length}개 종목 발견`;

  renderConditionResults(matched);
}

// 스캔 중지
function stopConditionSearch() {
  CS_STATE.isScanning = false;
  document.getElementById('cs-search-btn').disabled = false;
  document.getElementById('cs-stop-btn').disabled = true;
  document.getElementById('cs-result-summary').textContent = '검색 중지됨';
  updateConditionProgress(0, 0, '');
}

// 결과 초기화
function clearConditionResults() {
  const el = document.getElementById('cs-results');
  if (el) {
    el.innerHTML = `
      <div class="text-center text-muted" style="padding: 40px">
        <h5>검색 결과가 여기에 표시됩니다</h5>
        <p>조건을 추가하고 검색 버튼을 클릭하세요</p>
      </div>`;
  }
  document.getElementById('cs-result-summary').textContent = '';
}

// 조건 전체 초기화
function resetAllConditions() {
  if (!confirm('모든 조건을 초기화하시겠습니까?')) return;
  CS_STATE.conditions = [];
  renderConditionList();
  updateConditionFormula();
  clearConditionResults();
  document.getElementById('cs-param-panel').innerHTML = `
    <div class="text-center text-muted py-4" style="font-size:0.85rem">
      왼쪽 트리에서 조건 항목을 선택하세요
    </div>`;
}

// Yahoo Finance에서 종목 데이터 가져오기 (기존 방식 재사용)
async function fetchStockDataForCondition(stock) {
  const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${stock.code}?interval=1d&range=1y`;

  const proxies = [
    `http://moda.dothome.co.kr/proxy.php?url=${encodeURIComponent(yahooUrl)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(yahooUrl)}`,
    `https://api.codetabs.com/v1/proxy?quest=${yahooUrl}`,
    `https://corsproxy.io/?${yahooUrl}`
  ];

  let data = null;
  for (const url of proxies) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      data = await res.json();
      if (data?.chart?.result?.[0]) break;
    } catch (e) {
      continue;
    }
  }

  if (!data?.chart?.result?.[0]) return null;

  const chart = data.chart.result[0];
  const quotes = chart.indicators.quote[0];
  const closes = quotes.close.filter(v => v !== null);
  const volumes = quotes.volume ? quotes.volume.filter(v => v !== null) : [];

  if (closes.length < 2) return null;

  const current = closes[closes.length - 1];
  const prev = closes[closes.length - 2];
  const change = current - prev;
  const changeRate = ((change / prev) * 100).toFixed(2);
  const volume = volumes[volumes.length - 1] || 0;
  const isCoin = stock.code.includes('-USD');
  const market = stock.code.endsWith('.KS') ? 'KOSPI' : stock.code.endsWith('.KQ') ? 'KOSDAQ' : 'COIN';
  const cleanCode = stock.code.replace('.KS', '').replace('.KQ', '').replace('-USD', '');

  return {
    stock,
    code: cleanCode,
    name: stock.name,
    market,
    isCoin,
    closes,
    volumes,
    current,
    prev,
    change,
    changeRate,
    volume,
    price: isCoin ? current.toFixed(4) : Math.round(current).toLocaleString(),
    changeDisplay: (change >= 0 ? '+' : '') + (isCoin ? change.toFixed(4) : Math.round(change).toLocaleString()),
    changeRateDisplay: (changeRate >= 0 ? '+' : '') + changeRate + '%',
    volumeDisplay: Math.round(volume).toLocaleString(),
    url:
      market === 'COIN'
        ? `https://kr.tradingview.com/chart/?symbol=BINANCE:${cleanCode}USDT`
        : `https://kr.tradingview.com/chart/?symbol=KRX:${cleanCode}`
  };
}

// 조건 평가: 가져온 데이터에 모든 활성 조건 적용
function evaluateConditions(stockData, formula) {
  const activeConditions = CS_STATE.conditions.filter(c => c.active);
  if (activeConditions.length === 0) return false;

  // 각 조건별 참/거짓 계산
  const results = {};
  for (const cond of activeConditions) {
    results[cond.letter] = evaluateSingleCondition(stockData, cond);
  }

  // 조건식 평가 (formula의 알파벳을 true/false로 치환 후 실행)
  try {
    let expr = formula.toUpperCase();
    // 알파벳 치환 (긴 것부터 순서대로 치환해야 AA가 A로 잘못 치환되는 것 방지)
    Object.keys(results)
      .sort((a, b) => b.length - a.length)
      .forEach(letter => {
        expr = expr.replace(new RegExp(`\\b${letter}\\b`, 'g'), results[letter] ? 'true' : 'false');
      });
    expr = expr
      .replace(/\bAND\b/gi, '&&')
      .replace(/\bOR\b/gi, '||')
      .replace(/\bNOT\b/gi, '!');
    return Function(`"use strict"; return (${expr});`)();
  } catch (e) {
    console.warn('조건식 평가 오류:', e);
    return false;
  }
}

// 단일 조건 평가
function evaluateSingleCondition(stockData, cond) {
  const { conditionId, params } = cond;
  const { current, closes, volumes, changeRate, volume, market } = stockData;

  // MA 계산 헬퍼 (단순이평)
  function calcMA(arr, period) {
    if (!arr || arr.length < period) return null;
    const slice = arr.slice(-period);
    return slice.reduce((a, b) => a + b, 0) / period;
  }

  // EMA 계산 헬퍼
  function calcEMA(arr, period) {
    if (!arr || arr.length < period) return null;
    const k = 2 / (period + 1);
    let ema = arr.slice(0, period).reduce((a, b) => a + b, 0) / period;
    for (let i = period; i < arr.length; i++) {
      ema = arr[i] * k + ema * (1 - k);
    }
    return ema;
  }

  // MACD 계산 헬퍼
  function calcMACD(arr, fast, slow, signal) {
    if (!arr || arr.length < slow + signal) return null;
    const emaFast = calcEMA(arr, fast);
    const emaSlow = calcEMA(arr, slow);
    if (emaFast === null || emaSlow === null) return null;
    const macdLine = emaFast - emaSlow;

    // Signal 계산을 위해 MACD 히스토리 필요
    const macdHistory = [];
    for (let i = slow - 1; i < arr.length; i++) {
      const ef = calcEMA(arr.slice(0, i + 1), fast);
      const es = calcEMA(arr.slice(0, i + 1), slow);
      if (ef !== null && es !== null) macdHistory.push(ef - es);
    }
    if (macdHistory.length < signal) return null;
    const signalLine = calcEMA(macdHistory, signal);
    return { macd: macdLine, signal: signalLine, osc: macdLine - signalLine };
  }

  // RSI 계산 헬퍼
  function calcRSI(arr, period) {
    if (!arr || arr.length < period + 1) return null;
    const slice = arr.slice(-(period + 1));
    let gains = 0,
      losses = 0;
    for (let i = 1; i < slice.length; i++) {
      const diff = slice[i] - slice[i - 1];
      if (diff > 0) gains += diff;
      else losses += Math.abs(diff);
    }
    const avgGain = gains / period;
    const avgLoss = losses / period;
    if (avgLoss === 0) return 100;
    return 100 - 100 / (1 + avgGain / avgLoss);
  }

  // OBV 계산 헬퍼
  function calcOBV(closes, volumes) {
    if (!closes || !volumes || closes.length < 2) return null;
    let obv = 0;
    for (let i = 1; i < closes.length; i++) {
      if (closes[i] > closes[i - 1]) obv += volumes[i];
      else if (closes[i] < closes[i - 1]) obv -= volumes[i];
    }
    return obv;
  }

  // 심리도(Psychology) 계산 헬퍼
  function calcPsychology(closes, period) {
    if (!closes || closes.length < period + 1) return null;
    const slice = closes.slice(-(period + 1));
    let upCount = 0;
    for (let i = 1; i < slice.length; i++) {
      if (slice[i] > slice[i - 1]) upCount++;
    }
    return (upCount / period) * 100;
  }

  // Momentum 계산 헬퍼
  function calcMomentum(closes, period) {
    if (!closes || closes.length < period + 1) return null;
    return closes[closes.length - 1] - closes[closes.length - 1 - period];
  }

  // ROC 계산 헬퍼
  function calcROC(closes, period) {
    if (!closes || closes.length < period + 1) return null;
    const past = closes[closes.length - 1 - period];
    if (past === 0) return null;
    return ((closes[closes.length - 1] - past) / past) * 100;
  }

  // VR 계산 헬퍼 (거래량비율)
  function calcVR(closes, volumes, period) {
    if (!closes || !volumes || closes.length < period + 1) return null;
    let upVol = 0,
      downVol = 0,
      flatVol = 0;
    const startIdx = closes.length - period;
    for (let i = startIdx; i < closes.length; i++) {
      if (closes[i] > closes[i - 1]) upVol += volumes[i];
      else if (closes[i] < closes[i - 1]) downVol += volumes[i];
      else flatVol += volumes[i];
    }
    if (downVol + flatVol * 0.5 === 0) return null;
    return ((upVol + flatVol * 0.5) / (downVol + flatVol * 0.5)) * 100;
  }

  // 비교 헬퍼
  function compare(value, operator, threshold) {
    switch (operator) {
      case '이상':
        return value >= threshold;
      case '이하':
        return value <= threshold;
      case '초과':
        return value > threshold;
      case '미만':
        return value < threshold;
      case '=':
      case '같음':
        return value === threshold;
      default:
        return false;
    }
  }

  try {
    switch (conditionId) {
      // ==================== 범위지정 ====================

      case 'range_market':
        if (params.market === '전체') return true;
        if (params.market === '코스피') return market === 'KOSPI';
        if (params.market === '코스닥') return market === 'KOSDAQ';
        if (params.market === 'KOSPI200') return market === 'KOSPI';
        return true;

      case 'range_price':
        return current >= params.min && current <= params.max;

      case 'range_volume':
        return volume >= params.min && volume <= params.max;

      case 'range_prev_volume': {
        const offset = params.prev_candle || 1;
        if (volumes.length < offset + 1) return false;
        const prevVol = volumes[volumes.length - 1 - offset];
        if (prevVol === null) return false;
        return prevVol >= params.min && prevVol <= params.max;
      }

      // range_index_change: 지수 등락률 → 별도 지수 API 필요, 미구현
      // range_search_time: 검색 시간 조건 → 실시간 시간 기반, 백테스트 불가
      // range_capital: 자본금 → 재무 API 필요
      // range_shares: 상장주식수 → 종목 기본정보 API 필요
      // range_mktcap: 시가총액 → 주식수 * 현재가 계산 필요, 주식수 데이터 없음
      // range_parvalue: 액면가 → 종목 기본정보 API 필요
      // range_listdate: 상장일 → 종목 기본정보 API 필요
      // range_margin: 증거금률 → 증권사 API 필요
      // range_credit: 신용융자 → 증권사 API 필요
      // range_other_type: 기타종목구분 → 종목 분류 데이터 필요
      // range_special_type: 특이종목구분 → 실시간 공시 데이터 필요
      // range_float_shares: 유통주식수 → 종목 기본정보 API 필요
      // range_float_ratio: 유통주식수 비율 → 종목 기본정보 API 필요

      // ==================== 시세분석 - 가격조건 ====================

      case 'pa_price_range':
        return current >= params.min && current <= params.max;

      case 'pa_price_change_rate': {
        const rate = parseFloat(changeRate);
        if (params.operator === '범위') {
          return rate >= params.value1 && rate <= params.value2;
        }
        return compare(rate, params.operator, params.value1);
      }

      case 'pa_consec_updown': {
        // 연속 상승/하락 N일 체크
        const count = params.count || 3;
        const direction = params.direction; // '상승' or '하락'
        if (closes.length < count + 1) return false;
        const recent = closes.slice(-(count + 1));
        for (let i = 1; i <= count; i++) {
          if (direction === '상승' && recent[i] <= recent[i - 1]) return false;
          if (direction === '하락' && recent[i] >= recent[i - 1]) return false;
        }
        return true;
      }

      case 'pa_52high_change': {
        // 52주(약 252거래일) 최고가/저가 대비 변동률
        const year = closes.slice(-252);
        const high52 = Math.max(...year);
        const low52 = Math.min(...year);
        const base52 = params.base === '52주 최고가' ? high52 : low52;
        if (!base52 || base52 === 0) return false;
        const rate = ((current - base52) / base52) * 100;
        if (params.operator === '범위') return rate >= params.value1 && rate <= params.value2;
        return compare(rate, params.operator, params.value1);
      }

      case 'pa_year_highlow': {
        const yearY = closes.slice(-252);
        const highY = Math.max(...yearY);
        const lowY = Math.min(...yearY);
        const baseY = params.base === '연중 최고가' ? highY : lowY;
        if (!baseY || baseY === 0) return false;
        const rate = ((current - baseY) / baseY) * 100;
        if (params.operator === '범위') return rate >= params.value1 && rate <= params.value2;
        return compare(rate, params.operator, params.value1);
      }

      case 'pa_new_high': {
        // 신고가: 최근 N일 기준
        const period = params.period || 52;
        const tradingDays = Math.round((period * 5) / 7);
        const slice = closes.slice(-(tradingDays + 1), -1);
        if (slice.length === 0) return false;
        return current > Math.max(...slice);
      }

      case 'pa_new_low': {
        const period = params.period || 52;
        const tradingDays = Math.round((period * 5) / 7);
        const slice = closes.slice(-(tradingDays + 1), -1);
        if (slice.length === 0) return false;
        return current < Math.min(...slice);
      }

      case 'pa_upper_limit': {
        // 상한가: 한국 주식 기준 약 +29.9% 이상
        return parseFloat(changeRate) >= 29.0;
      }

      case 'pa_lower_limit': {
        // 하한가: 한국 주식 기준 약 -29.9% 이하
        return parseFloat(changeRate) <= -29.0;
      }

      case 'pa_near_upper': {
        const rate = parseFloat(changeRate);
        return rate >= 30.0 - (params.value || 2.0);
      }

      case 'pa_near_lower': {
        const rate = parseFloat(changeRate);
        return rate <= -(30.0 - (params.value || 2.0));
      }

      // pa_price_compare_week: 주기별 주가등락률 비교 → 주봉/월봉 데이터 재구성 필요, 미구현
      // pa_price_change_period: 기간내 등락률 → 시작일 지정 필요, 부분 구현 가능하나 복잡
      // pa_price_position: 기간내 주가위치 → 고가저가 데이터 필요
      // pa_price_breakout: 주가돌파 → 고가 데이터 필요
      // pa_price_compare: 주가비교 → 두 종목 동시 조회 필요
      // pa_gap_updown: 갭 → 시가 데이터 필요 (현재 미수집)
      // pa_intraday_max: 일중 거래범위 → 시가/고가/저가 필요
      // pa_vi_device: VI → 실시간 데이터 필요
      // pa_candle_consec: 캔들연속 → 시가/고가/저가 필요
      // pa_daily_high_break: 당일 전고점 → 실시간 분봉 데이터 필요

      // ==================== 시세분석 - 거래량 ====================

      case 'pa_vol_avg_period': {
        const period = params.period || 20;
        const avgVol = calcMA(volumes, period);
        if (avgVol === null || avgVol === 0) return false;
        const ratio = (volume / avgVol) * 100;
        return compare(ratio, params.operator, params.value);
      }

      case 'pa_vol_rate_prev': {
        // 전일 거래량 대비 비율(%)
        const prevVol = volumes.length >= 2 ? volumes[volumes.length - 2] : null;
        if (!prevVol || prevVol === 0) return false;
        const ratio = (volume / prevVol) * 100;
        return compare(ratio, params.operator, params.value);
      }

      // pa_vol_today_high: 장중 최고 거래량 → 분봉 데이터 필요
      // pa_amt_*: 거래대금 관련 → 거래대금(price * volume) 계산 가능하나 종목별 주가 단위 차이로 부정확
      // pa_expected_*: 예상체결 → 실시간 데이터 필요
      // pa_for_*: 외국인 관련 → 외국인 거래 API 필요
      // pa_broker_*: 거래원 관련 → 증권사별 매매 API 필요
      // pa_exec_*: 체결강도 → 실시간 호가/체결 데이터 필요
      // pa_prog_*: 프로그램매매 → 한국거래소 프로그램매매 API 필요
      // pa_short_*: 공매도 → 공매도 전용 API 필요
      // pa_intra_*: 당일분봉 → 분봉 데이터 필요

      // ==================== 기술적분석 - 주가이동평균 ====================

      case 'ta_ma_break': {
        const ma = calcMA(closes, params.period || 20);
        const maPrev = calcMA(closes.slice(0, -1), params.period || 20);
        if (ma === null || maPrev === null) return false;
        const prevClose = closes[closes.length - 2];
        if (params.cross_type === '골든크로스') return current > ma && prevClose <= maPrev;
        if (params.cross_type === '데드크로스') return current < ma && prevClose >= maPrev;
        if (params.cross_type === '위') return current > ma;
        if (params.cross_type === '아래') return current < ma;
        return false;
      }

      case 'ta_ma_array3': {
        // 3개 이평 정배열/역배열
        const ma1 = calcMA(closes, params.period1 || 5);
        const ma2 = calcMA(closes, params.period2 || 20);
        const ma3 = calcMA(closes, params.period3 || 60);
        if (!ma1 || !ma2 || !ma3) return false;
        if (params.array_type === '정배열') return ma1 > ma2 && ma2 > ma3;
        if (params.array_type === '역배열') return ma1 < ma2 && ma2 < ma3;
        return false;
      }

      case 'ta_ma_array4': {
        const ma1 = calcMA(closes, params.period1 || 5);
        const ma2 = calcMA(closes, params.period2 || 20);
        const ma3 = calcMA(closes, params.period3 || 60);
        const ma4 = calcMA(closes, params.period4 || 120);
        if (!ma1 || !ma2 || !ma3 || !ma4) return false;
        if (params.array_type === '정배열') return ma1 > ma2 && ma2 > ma3 && ma3 > ma4;
        if (params.array_type === '역배열') return ma1 < ma2 && ma2 < ma3 && ma3 < ma4;
        return false;
      }

      case 'ta_ma_compare': {
        const ma1 = calcMA(closes, params.period1 || 5);
        const ma2 = calcMA(closes, params.period2 || 20);
        if (!ma1 || !ma2) return false;
        if (params.cross_type === '위') return ma1 > ma2;
        if (params.cross_type === '아래') return ma1 < ma2;
        if (params.cross_type === '골든크로스') {
          const ma1p = calcMA(closes.slice(0, -1), params.period1 || 5);
          const ma2p = calcMA(closes.slice(0, -1), params.period2 || 20);
          return ma1 > ma2 && ma1p <= ma2p;
        }
        if (params.cross_type === '데드크로스') {
          const ma1p = calcMA(closes.slice(0, -1), params.period1 || 5);
          const ma2p = calcMA(closes.slice(0, -1), params.period2 || 20);
          return ma1 < ma2 && ma1p >= ma2p;
        }
        return false;
      }

      case 'ta_ma_rate': {
        // 이동평균 등락률
        const ma = calcMA(closes, params.period || 20);
        const maPrev = calcMA(closes.slice(0, -1), params.period || 20);
        if (!ma || !maPrev || maPrev === 0) return false;
        const rate = ((ma - maPrev) / maPrev) * 100;
        if (params.operator === '범위') return rate >= params.value1 && rate <= params.value2;
        return compare(rate, params.operator, params.value1);
      }

      case 'ta_gap_idx': {
        // 이격도: 현재가 / 이동평균 * 100
        const ma = calcMA(closes, params.period || 20);
        if (!ma || ma === 0) return false;
        const gap = (current / ma) * 100;
        if (params.operator === '범위') return gap >= params.value1 && gap <= params.value2;
        return compare(gap, params.operator, params.value1);
      }

      case 'ta_ma_gap': {
        // 이동평균이격도: 현재가 / 이평 * 100, 범위 처리 포함
        const maGap = calcMA(closes, params.period || 20);
        if (!maGap || maGap === 0) return false;
        const gapVal = (current / maGap) * 100;
        if (params.operator === '범위') return gapVal >= params.value1 && gapVal <= params.value2;
        return compare(gapVal, params.operator, params.value1);
      }

      case 'ta_ma_trend': {
        // 이평 추세: 최근 N봉 이평이 우상향/우하향/횡보
        const period = params.period || 20;
        const trendBars = params.count || 3;
        if (closes.length < period + trendBars) return false;
        const maValues = [];
        for (let i = 0; i < trendBars; i++) {
          maValues.push(calcMA(closes.slice(0, closes.length - i), period));
        }
        if (maValues.some(v => v === null)) return false;
        if (params.trend === '상승') return maValues[0] > maValues[1] && maValues[1] > maValues[2];
        if (params.trend === '하락') return maValues[0] < maValues[1] && maValues[1] < maValues[2];
        if (params.trend === '횡보') {
          return (
            !(maValues[0] > maValues[1] && maValues[1] > maValues[2]) &&
            !(maValues[0] < maValues[1] && maValues[1] < maValues[2])
          );
        }
        return false;
      }

      // ta_ma_break_det: 상세이동평균돌파 → 골든크로스/데드크로스/위/아래 + 괴리율
      case 'ta_ma_break_det': {
        const ma = calcMA(closes, params.period || 20);
        if (ma === null) return false;
        const rate = params.rate || 0;
        if (params.cross_type === '위') return current > ma * (1 + rate / 100);
        if (params.cross_type === '아래') return current < ma * (1 - rate / 100);
        if (params.cross_type === '골든크로스') {
          const maPrev = calcMA(closes.slice(0, -1), params.period || 20);
          if (maPrev === null) return false;
          const prevClose = closes[closes.length - 2];
          return current > ma * (1 + rate / 100) && prevClose <= maPrev * (1 + rate / 100);
        }
        if (params.cross_type === '데드크로스') {
          const maPrev = calcMA(closes.slice(0, -1), params.period || 20);
          if (maPrev === null) return false;
          const prevClose = closes[closes.length - 2];
          return current < ma * (1 - rate / 100) && prevClose >= maPrev * (1 - rate / 100);
        }
        return false;
      }

      // ta_ma_compare_det: 상세이동평균비교 → ma_type별 이평 종류 구분 + 괴리율 포함
      case 'ta_ma_compare_det': {
        const calcByType = (arr, period, type) => {
          if (type === '지수이평') return calcEMA(arr, period);
          return calcMA(arr, period);
        };
        const detMa1 = calcByType(closes, params.period1 || 5, params.ma_type1);
        const detMa2 = calcByType(closes, params.period2 || 20, params.ma_type2);
        if (!detMa1 || !detMa2) return false;
        const detRate = params.rate || 0;
        if (params.cross_type === '위') return detMa1 > detMa2 * (1 + detRate / 100);
        if (params.cross_type === '아래') return detMa1 < detMa2 * (1 - detRate / 100);
        if (params.cross_type === '골든크로스') {
          const prev1 = calcByType(closes.slice(0, -1), params.period1 || 5, params.ma_type1);
          const prev2 = calcByType(closes.slice(0, -1), params.period2 || 20, params.ma_type2);
          if (!prev1 || !prev2) return false;
          return detMa1 > detMa2 && prev1 <= prev2;
        }
        if (params.cross_type === '데드크로스') {
          const prev1 = calcByType(closes.slice(0, -1), params.period1 || 5, params.ma_type1);
          const prev2 = calcByType(closes.slice(0, -1), params.period2 || 20, params.ma_type2);
          if (!prev1 || !prev2) return false;
          return detMa1 < detMa2 && prev1 >= prev2;
        }
        return false;
      }

      // ta_ma_compare2: 주가이동평균비교(2개) → 이평쌍 2개를 AND 조건으로 동시 평가
      case 'ta_ma_compare2': {
        const ma1 = calcMA(closes, params.period1 || 5);
        const ma2 = calcMA(closes, params.period2 || 20);
        const ma3 = calcMA(closes, params.period3 || 60);
        const ma4 = calcMA(closes, params.period4 || 120);
        if (!ma1 || !ma2 || !ma3 || !ma4) return false;

        // 조건① 평가 (period1 vs period2)
        let cond1 = false;
        if (params.cross_type === '위') {
          cond1 = ma1 > ma2;
        } else if (params.cross_type === '아래') {
          cond1 = ma1 < ma2;
        } else if (params.cross_type === '골든크로스') {
          const p1 = calcMA(closes.slice(0, -1), params.period1 || 5);
          const p2 = calcMA(closes.slice(0, -1), params.period2 || 20);
          if (!p1 || !p2) return false;
          cond1 = ma1 > ma2 && p1 <= p2;
        } else if (params.cross_type === '데드크로스') {
          const p1 = calcMA(closes.slice(0, -1), params.period1 || 5);
          const p2 = calcMA(closes.slice(0, -1), params.period2 || 20);
          if (!p1 || !p2) return false;
          cond1 = ma1 < ma2 && p1 >= p2;
        }

        // 조건② 평가 (period3 vs period4)
        let cond2 = false;
        if (params.cross_type2 === '위') {
          cond2 = ma3 > ma4;
        } else if (params.cross_type2 === '아래') {
          cond2 = ma3 < ma4;
        } else if (params.cross_type2 === '골든크로스') {
          const p3 = calcMA(closes.slice(0, -1), params.period3 || 60);
          const p4 = calcMA(closes.slice(0, -1), params.period4 || 120);
          if (!p3 || !p4) return false;
          cond2 = ma3 > ma4 && p3 <= p4;
        } else if (params.cross_type2 === '데드크로스') {
          const p3 = calcMA(closes.slice(0, -1), params.period3 || 60);
          const p4 = calcMA(closes.slice(0, -1), params.period4 || 120);
          if (!p3 || !p4) return false;
          cond2 = ma3 < ma4 && p3 >= p4;
        }

        return cond1 && cond2;
      }

      // ta_ma_compare3: 주가이동평균비교(3개) → 정배열/역배열/수렴/발산
      case 'ta_ma_compare3': {
        const ma1 = calcMA(closes, params.period1 || 5);
        const ma2 = calcMA(closes, params.period2 || 20);
        const ma3 = calcMA(closes, params.period3 || 60);
        if (!ma1 || !ma2 || !ma3) return false;
        if (params.array_type === '정배열') return ma1 > ma2 && ma2 > ma3;
        if (params.array_type === '역배열') return ma1 < ma2 && ma2 < ma3;
        if (params.array_type === '수렴' || params.array_type === '발산') {
          const ma1p = calcMA(closes.slice(0, -1), params.period1 || 5);
          const ma2p = calcMA(closes.slice(0, -1), params.period2 || 20);
          const ma3p = calcMA(closes.slice(0, -1), params.period3 || 60);
          if (!ma1p || !ma2p || !ma3p) return false;
          const spreadNow = Math.max(ma1, ma2, ma3) - Math.min(ma1, ma2, ma3);
          const spreadPrev = Math.max(ma1p, ma2p, ma3p) - Math.min(ma1p, ma2p, ma3p);
          if (params.array_type === '수렴') return spreadNow < spreadPrev;
          if (params.array_type === '발산') return spreadNow > spreadPrev;
        }
        return false;
      }

      // ta_ma_price_diff: 가격-이동평균비교 → 현재가와 이평의 차이값 비교
      case 'ta_ma_price_diff': {
        const ma = calcMA(closes, params.period || 20);
        if (!ma) return false;
        const diff = current - ma;
        if (params.operator === '범위') return diff >= params.value1 && diff <= params.value2;
        return compare(diff, params.operator, params.value1);
      }

      // ==================== 기술적분석 - 거래량이동평균 ====================

      case 'ta_vol_ma_break': {
        const volMa = calcMA(volumes, params.period || 20);
        const volMaPrev = calcMA(volumes.slice(0, -1), params.period || 20);
        if (!volMa || !volMaPrev) return false;
        if (params.cross_type === '골든크로스') return volume > volMa && volumes[volumes.length - 2] <= volMaPrev;
        if (params.cross_type === '데드크로스') return volume < volMa && volumes[volumes.length - 2] >= volMaPrev;
        if (params.cross_type === '위') return volume > volMa;
        if (params.cross_type === '아래') return volume < volMa;
        return false;
      }

      // ta_vol_ma_array: 거래량이동평균배열 → 3개 이평 정배열/역배열
      case 'ta_vol_ma_array': {
        const vma1 = calcMA(volumes, params.period1 || 5);
        const vma2 = calcMA(volumes, params.period2 || 20);
        const vma3 = calcMA(volumes, params.period3 || 60);
        if (!vma1 || !vma2 || !vma3) return false;
        if (params.array_type === '정배열') return vma1 > vma2 && vma2 > vma3;
        if (params.array_type === '역배열') return vma1 < vma2 && vma2 < vma3;
        return false;
      }

      // ta_vol_ma_trend: 거래량이동평균추세 → 상승/하락/횡보
      case 'ta_vol_ma_trend': {
        const period = params.period || 20;
        const trendBars = params.count || 3;
        if (volumes.length < period + trendBars) return false;
        const vmaValues = [];
        for (let i = 0; i < trendBars; i++) {
          vmaValues.push(calcMA(volumes.slice(0, volumes.length - i), period));
        }
        if (vmaValues.some(v => v === null)) return false;
        if (params.trend === '상승') return vmaValues[0] > vmaValues[1] && vmaValues[1] > vmaValues[2];
        if (params.trend === '하락') return vmaValues[0] < vmaValues[1] && vmaValues[1] < vmaValues[2];
        if (params.trend === '횡보') {
          return (
            !(vmaValues[0] > vmaValues[1] && vmaValues[1] > vmaValues[2]) &&
            !(vmaValues[0] < vmaValues[1] && vmaValues[1] < vmaValues[2])
          );
        }
        return false;
      }

      case 'ta_vol_ma_rate': {
        const volMa = calcMA(volumes, params.period || 20);
        const volMaPrev = calcMA(volumes.slice(0, -1), params.period || 20);
        if (!volMa || !volMaPrev || volMaPrev === 0) return false;
        const rate = ((volMa - volMaPrev) / volMaPrev) * 100;
        if (params.operator === '범위') return rate >= params.value1 && rate <= params.value2;
        return compare(rate, params.operator, params.value1);
      }

      // ==================== 기술적분석 - 추세지표 ====================

      case 'ta_macd': {
        const result = calcMACD(closes, params.fast_period || 12, params.slow_period || 26, params.signal || 9);
        if (!result) return false;
        if (params.condition === '0선위') return result.macd > 0;
        if (params.condition === '0선아래') return result.macd < 0;
        if (params.condition === '골든크로스') {
          const prevResult = calcMACD(
            closes.slice(0, -1),
            params.fast_period || 12,
            params.slow_period || 26,
            params.signal || 9
          );
          if (!prevResult) return false;
          return result.macd > result.signal && prevResult.macd <= prevResult.signal;
        }
        if (params.condition === '데드크로스') {
          const prevResult = calcMACD(
            closes.slice(0, -1),
            params.fast_period || 12,
            params.slow_period || 26,
            params.signal || 9
          );
          if (!prevResult) return false;
          return result.macd < result.signal && prevResult.macd >= prevResult.signal;
        }
        return compare(result.macd, params.condition, params.value);
      }

      case 'ta_macd_signal': {
        const result = calcMACD(closes, params.fast_period || 12, params.slow_period || 26, params.signal || 9);
        if (!result) return false;
        if (params.condition === '0선위') return result.signal > 0;
        if (params.condition === '0선아래') return result.signal < 0;
        return compare(result.signal, params.condition, params.value);
      }

      case 'ta_macd_osc': {
        const result = calcMACD(closes, params.fast_period || 12, params.slow_period || 26, params.signal || 9);
        if (!result) return false;
        if (params.condition === '0선위') return result.osc > 0;
        if (params.condition === '0선아래') return result.osc < 0;
        return compare(result.osc, params.condition, params.value);
      }

      // ta_momentum_idx: Momentum → 이상/이하/골든크로스/데드크로스/0선위/0선아래
      case 'ta_momentum_idx': {
        const period = params.period || 9;
        const signalPeriod = params.signal || 9;
        const mom = calcMomentum(closes, period);
        if (mom === null) return false;
        if (params.condition === '0선위') return mom > 0;
        if (params.condition === '0선아래') return mom < 0;
        if (params.condition === '골든크로스' || params.condition === '데드크로스') {
          if (closes.length < period + signalPeriod + 1) return false;
          const momHistory = [];
          for (let i = period; i < closes.length; i++) {
            momHistory.push(closes[i] - closes[i - period]);
          }
          if (momHistory.length < signalPeriod + 1) return false;
          const signalCurr = calcEMA(momHistory, signalPeriod);
          const signalPrev = calcEMA(momHistory.slice(0, -1), signalPeriod);
          const prevMom = momHistory[momHistory.length - 2];
          if (signalCurr === null || signalPrev === null) return false;
          if (params.condition === '골든크로스') return mom > signalCurr && prevMom <= signalPrev;
          if (params.condition === '데드크로스') return mom < signalCurr && prevMom >= signalPrev;
        }
        return compare(mom, params.condition, params.value);
      }

      // ta_roc: ROC → 이상/이하/0선위/0선아래
      case 'ta_roc': {
        const roc = calcROC(closes, params.period || 12);
        if (roc === null) return false;
        if (params.condition === '0선위') return roc > 0;
        if (params.condition === '0선아래') return roc < 0;
        return compare(roc, params.condition, params.value);
      }

      // ta_trix: TRIX → 골든크로스/데드크로스/이상/이하/0선위/0선아래
      case 'ta_trix': {
        const period = params.period || 12;
        const signalPeriod = params.signal || 9;
        if (closes.length < period * 3 + 2) return false;

        // EMA1 히스토리
        const ema1Arr = [];
        for (let i = period - 1; i < closes.length; i++) {
          const e = calcEMA(closes.slice(0, i + 1), period);
          if (e !== null) ema1Arr.push(e);
        }
        // EMA2 히스토리
        const ema2Arr = [];
        for (let i = period - 1; i < ema1Arr.length; i++) {
          const e = calcEMA(ema1Arr.slice(0, i + 1), period);
          if (e !== null) ema2Arr.push(e);
        }
        if (ema2Arr.length < period + 1) return false;
        // EMA3 히스토리
        const ema3Arr = [];
        for (let i = period - 1; i < ema2Arr.length; i++) {
          const e = calcEMA(ema2Arr.slice(0, i + 1), period);
          if (e !== null) ema3Arr.push(e);
        }
        if (ema3Arr.length < 2) return false;

        // TRIX 히스토리 계산
        const trixHistory = [];
        for (let i = 1; i < ema3Arr.length; i++) {
          if (ema3Arr[i - 1] === 0) trixHistory.push(0);
          else trixHistory.push(((ema3Arr[i] - ema3Arr[i - 1]) / ema3Arr[i - 1]) * 100);
        }
        if (trixHistory.length < 1) return false;

        const trix = trixHistory[trixHistory.length - 1];

        if (params.condition === '0선위') return trix > 0;
        if (params.condition === '0선아래') return trix < 0;
        if (params.condition === '골든크로스' || params.condition === '데드크로스') {
          if (trixHistory.length < signalPeriod + 1) return false;
          const signalCurr = calcEMA(trixHistory, signalPeriod);
          const signalPrev = calcEMA(trixHistory.slice(0, -1), signalPeriod);
          const prevTrix = trixHistory[trixHistory.length - 2];
          if (signalCurr === null || signalPrev === null) return false;
          if (params.condition === '골든크로스') return trix > signalCurr && prevTrix <= signalPrev;
          if (params.condition === '데드크로스') return trix < signalCurr && prevTrix >= signalPrev;
        }
        return compare(trix, params.condition, params.value);
      }

      // ta_price_osc: Price Oscillator → 이상/이하/0선위/0선아래
      case 'ta_price_osc': {
        const fast = calcEMA(closes, params.fast_period || 12);
        const slow = calcEMA(closes, params.slow_period || 26);
        if (!fast || !slow || slow === 0) return false;
        const osc = ((fast - slow) / slow) * 100;
        if (params.condition === '0선위') return osc > 0;
        if (params.condition === '0선아래') return osc < 0;
        return compare(osc, params.condition, params.value);
      }

      // ta_gmnet: 그물망차트 → 다수 이평 배열 확인
      case 'ta_gmnet': {
        const periods = [5, 10, 20, 60, 120];
        const mas = periods.map(p => calcMA(closes, p)).filter(v => v !== null);
        if (mas.length < 3) return false;
        // 정배열: 단기 이평 > 장기 이평 순서 (수렴 or 상향수렴)
        const isAscending = mas.every((v, i) => i === 0 || mas[i - 1] >= v);
        // 역배열: 단기 이평 < 장기 이평 순서 (발산 or 하향발산)
        const isDescending = mas.every((v, i) => i === 0 || mas[i - 1] <= v);
        // 이전봉 이평 계산 (수렴/발산 방향 판단)
        const masPrev = periods.map(p => calcMA(closes.slice(0, -1), p)).filter(v => v !== null);
        const spreadNow = Math.max(...mas) - Math.min(...mas);
        const spreadPrev = masPrev.length >= 3 ? Math.max(...masPrev) - Math.min(...masPrev) : spreadNow;
        const isConverging = spreadNow < spreadPrev;
        const isDiverging = spreadNow > spreadPrev;
        if (params.condition === '수렴') return isConverging;
        if (params.condition === '발산') return isDiverging;
        if (params.condition === '상향수렴') return isAscending && isConverging;
        if (params.condition === '하향발산') return isDescending && isDiverging;
        return false;
      }

      // ta_lrs: LRS(기울기)/LRL(회귀선 현재값) → target별 분기 + 이상/이하/0선위/0선아래
      case 'ta_lrs': {
        const period = params.period || 14;
        if (closes.length < period) return false;
        const slice = closes.slice(-period);
        const n = slice.length;
        const sumX = (n * (n - 1)) / 2;
        const sumX2 = (n * (n - 1) * (2 * n - 1)) / 6;
        const sumY = slice.reduce((a, b) => a + b, 0);
        const sumXY = slice.reduce((sum, val, i) => sum + i * val, 0);
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        const lrl = intercept + slope * (n - 1); // 회귀선의 마지막 지점 값
        const targetValue = params.target === 'LRL' ? lrl : slope;
        if (params.condition === '0선위') return targetValue > 0;
        if (params.condition === '0선아래') return targetValue < 0;
        return compare(targetValue, params.condition, params.value);
      }

      // ta_tsf: TSF(Time Series Forecast) → 선형회귀 예측값, 복잡
      // ta_eom: EOM → 시가/고가/저가 데이터 필요, 미구현
      // ta_parabolic: Parabolic SAR → 고가/저가 필요, 미구현
      // ta_vhf: VHF → 고가/저가 필요, 미구현

      // ==================== 기술적분석 - 모멘텀지표 ====================

      case 'ta_psychology': {
        const psy = calcPsychology(closes, params.period || 10);
        if (psy === null) return false;
        if (params.condition === '범위') return psy >= params.value1 && psy <= params.value2;
        return compare(psy, params.condition, params.value1);
      }

      case 'ta_new_psych': {
        // 신심리도: 가중 심리도
        const period = params.period || 10;
        if (closes.length < period + 1) return false;
        const slice = closes.slice(-(period + 1));
        let weightedUp = 0,
          totalWeight = 0;
        for (let i = 1; i <= period; i++) {
          const weight = i;
          totalWeight += weight;
          if (slice[i] > slice[i - 1]) weightedUp += weight;
        }
        const newPsy = (weightedUp / totalWeight) * 100;
        if (params.condition === '범위') return newPsy >= params.value1 && newPsy <= params.value2;
        return compare(newPsy, params.condition, params.value1);
      }

      // ta_rsi: RSI → 이상/이하/골든크로스/데드크로스
      case 'ta_rsi': {
        const rsi = calcRSI(closes, params.period || 14);
        if (rsi === null) return false;
        if (params.condition === '골든크로스') {
          const prevRsi = calcRSI(closes.slice(0, -1), params.period || 14);
          if (prevRsi === null) return false;
          return rsi > params.value && prevRsi <= params.value;
        }
        if (params.condition === '데드크로스') {
          const prevRsi = calcRSI(closes.slice(0, -1), params.period || 14);
          if (prevRsi === null) return false;
          return rsi < params.value && prevRsi >= params.value;
        }
        return compare(rsi, params.condition, params.value);
      }

      // ta_stoch: Stochastic Fast → stoch_target(%K/%D) + 이상/이하/골든크로스/데드크로스
      case 'ta_stoch': {
        const kPeriod = params.k_period || 5;
        const dPeriod = params.d_period || 3;
        if (closes.length < kPeriod + dPeriod) return false;

        // %K 히스토리 계산
        const kHistory = [];
        for (let i = kPeriod - 1; i < closes.length; i++) {
          const sl = closes.slice(i - kPeriod + 1, i + 1);
          const highest = Math.max(...sl);
          const lowest = Math.min(...sl);
          if (highest === lowest) kHistory.push(50);
          else kHistory.push(((closes[i] - lowest) / (highest - lowest)) * 100);
        }

        // %D 히스토리 계산 (Fast %D = MA of %K)
        if (kHistory.length < dPeriod) return false;
        const dHistory = [];
        for (let i = dPeriod - 1; i < kHistory.length; i++) {
          const d = kHistory.slice(i - dPeriod + 1, i + 1).reduce((a, b) => a + b, 0) / dPeriod;
          dHistory.push(d);
        }
        if (dHistory.length < 1) return false;

        const kCurr = kHistory[kHistory.length - 1];
        const dCurr = dHistory[dHistory.length - 1];
        const targetValue = params.stoch_target === '%D' ? dCurr : kCurr;

        if (params.condition === '골든크로스') {
          if (kHistory.length < 2 || dHistory.length < 2) return false;
          const kPrev = kHistory[kHistory.length - 2];
          const dPrev = dHistory[dHistory.length - 2];
          return kCurr > dCurr && kPrev <= dPrev;
        }
        if (params.condition === '데드크로스') {
          if (kHistory.length < 2 || dHistory.length < 2) return false;
          const kPrev = kHistory[kHistory.length - 2];
          const dPrev = dHistory[dHistory.length - 2];
          return kCurr < dCurr && kPrev >= dPrev;
        }
        return compare(targetValue, params.condition, params.value);
      }

      // ta_stoch_slow: Stochastic Slow → stoch_target(%K/%D) + 이상/이하/골든크로스/데드크로스
      case 'ta_stoch_slow': {
        const kPeriod = params.k_period || 5;
        const dPeriod = params.d_period || 3;
        const slowPeriod = params.slow_period || 3;
        if (closes.length < kPeriod + dPeriod + slowPeriod) return false;

        // Fast %K 히스토리
        const fastKHistory = [];
        for (let i = kPeriod - 1; i < closes.length; i++) {
          const sl = closes.slice(i - kPeriod + 1, i + 1);
          const high = Math.max(...sl);
          const low = Math.min(...sl);
          if (high === low) fastKHistory.push(50);
          else fastKHistory.push(((closes[i] - low) / (high - low)) * 100);
        }

        // Slow %K = MA of Fast %K
        if (fastKHistory.length < slowPeriod) return false;
        const slowKHistory = [];
        for (let i = slowPeriod - 1; i < fastKHistory.length; i++) {
          const k = fastKHistory.slice(i - slowPeriod + 1, i + 1).reduce((a, b) => a + b, 0) / slowPeriod;
          slowKHistory.push(k);
        }

        // Slow %D = MA of Slow %K
        if (slowKHistory.length < dPeriod) return false;
        const slowDHistory = [];
        for (let i = dPeriod - 1; i < slowKHistory.length; i++) {
          const d = slowKHistory.slice(i - dPeriod + 1, i + 1).reduce((a, b) => a + b, 0) / dPeriod;
          slowDHistory.push(d);
        }
        if (slowDHistory.length < 1) return false;

        const kCurr = slowKHistory[slowKHistory.length - 1];
        const dCurr = slowDHistory[slowDHistory.length - 1];
        const targetValue = params.stoch_target === '%D' ? dCurr : kCurr;

        if (params.condition === '골든크로스') {
          if (slowKHistory.length < 2 || slowDHistory.length < 2) return false;
          const kPrev = slowKHistory[slowKHistory.length - 2];
          const dPrev = slowDHistory[slowDHistory.length - 2];
          return kCurr > dCurr && kPrev <= dPrev;
        }
        if (params.condition === '데드크로스') {
          if (slowKHistory.length < 2 || slowDHistory.length < 2) return false;
          const kPrev = slowKHistory[slowKHistory.length - 2];
          const dPrev = slowDHistory[slowDHistory.length - 2];
          return kCurr < dCurr && kPrev >= dPrev;
        }
        return compare(targetValue, params.condition, params.value);
      }

      // ta_vroc: VROC → 이상/이하/0선위/0선아래
      case 'ta_vroc': {
        const period = params.period || 14;
        if (volumes.length < period + 1) return false;
        const pastVol = volumes[volumes.length - 1 - period];
        if (!pastVol || pastVol === 0) return false;
        const vroc = ((volumes[volumes.length - 1] - pastVol) / pastVol) * 100;
        if (params.condition === '0선위') return vroc > 0;
        if (params.condition === '0선아래') return vroc < 0;
        return compare(vroc, params.condition, params.value);
      }

      // ta_ab_ratio: AB Ratio → 고가/저가 필요, 미구현
      // ta_band_b: Band %b → 볼린저밴드 기반
      case 'ta_band_b': {
        const period = params.period || 20;
        const mult = params.multiplier || 2;
        if (closes.length < period) return false;
        const slice = closes.slice(-period);
        const ma = slice.reduce((a, b) => a + b, 0) / period;
        const std = Math.sqrt(slice.reduce((s, v) => s + Math.pow(v - ma, 2), 0) / period);
        const upper = ma + mult * std;
        const lower = ma - mult * std;
        if (upper === lower) return false;
        const b = ((current - lower) / (upper - lower)) * 100;
        if (params.condition === '범위') return b >= params.value1 && b <= params.value2;
        return compare(b, params.condition, params.value1);
      }

      // ta_cci: CCI → 이상/이하/골든크로스/데드크로스
      case 'ta_cci': {
        const period = params.period || 9;
        if (closes.length < period) return false;
        const slice = closes.slice(-period);
        const ma = slice.reduce((a, b) => a + b, 0) / period;
        const meanDev = slice.reduce((s, v) => s + Math.abs(v - ma), 0) / period;
        if (meanDev === 0) return false;
        const cci = (current - ma) / (0.015 * meanDev);
        if (params.condition === '골든크로스') {
          if (closes.length < period + 1) return false;
          const prevSlice = closes.slice(-(period + 1), -1);
          const prevMa = prevSlice.reduce((a, b) => a + b, 0) / period;
          const prevMeanDev = prevSlice.reduce((s, v) => s + Math.abs(v - prevMa), 0) / period;
          if (prevMeanDev === 0) return false;
          const prevCci = (closes[closes.length - 2] - prevMa) / (0.015 * prevMeanDev);
          return cci > params.value && prevCci <= params.value;
        }
        if (params.condition === '데드크로스') {
          if (closes.length < period + 1) return false;
          const prevSlice = closes.slice(-(period + 1), -1);
          const prevMa = prevSlice.reduce((a, b) => a + b, 0) / period;
          const prevMeanDev = prevSlice.reduce((s, v) => s + Math.abs(v - prevMa), 0) / period;
          if (prevMeanDev === 0) return false;
          const prevCci = (closes[closes.length - 2] - prevMa) / (0.015 * prevMeanDev);
          return cci < params.value && prevCci >= params.value;
        }
        return compare(cci, params.condition, params.value);
      }

      // ta_co: Chaikin's Oscillator → 고가/저가/거래량 필요, 미구현
      // ta_sonar: Sonar → 복잡한 계산, 고가/저가 필요, 미구현
      // ta_mass_idx: Mass Index → 고가/저가 필요, 미구현
      // ta_williams: Williams %R → 고가/저가 필요, 미구현

      // ==================== 기술적분석 - 채널지표 ====================

      case 'ta_bollinger': {
        const period = params.period || 20;
        const mult = params.multiplier || 2;
        if (closes.length < period) return false;
        const slice = closes.slice(-period);
        const ma = slice.reduce((a, b) => a + b, 0) / period;
        const std = Math.sqrt(slice.reduce((s, v) => s + Math.pow(v - ma, 2), 0) / period);
        const upper = ma + mult * std;
        const lower = ma - mult * std;
        const bandTarget = params.band_target;
        const cond = params.condition;
        if (bandTarget === '상단밴드') {
          if (cond === '돌파') return current > upper;
          if (cond === '이탈') return current < upper;
          if (cond === '근접') return current >= upper * 0.99 && current <= upper * 1.01;
          if (cond === '이상') return current >= upper;
          if (cond === '이하') return current <= upper;
        }
        if (bandTarget === '하단밴드') {
          if (cond === '돌파') return current < lower;
          if (cond === '이탈') return current > lower;
          if (cond === '근접') return current >= lower * 0.99 && current <= lower * 1.01;
          if (cond === '이상') return current >= lower;
          if (cond === '이하') return current <= lower;
        }
        if (bandTarget === '중심선') {
          if (cond === '이상' || cond === '돌파') return current > ma;
          if (cond === '이하' || cond === '이탈') return current < ma;
        }
        if (bandTarget === '%B') {
          if (upper === lower) return false;
          const b = ((current - lower) / (upper - lower)) * 100;
          return compare(b, cond, params.value);
        }
        if (bandTarget === 'Band Width') {
          const bw = ((mult * 2 * std) / ma) * 100;
          return compare(bw, cond, params.value);
        }
        return false;
      }

      case 'ta_band_width': {
        const period = params.period || 20;
        const mult = params.multiplier || 2;
        if (closes.length < period) return false;
        const slice = closes.slice(-period);
        const ma = slice.reduce((a, b) => a + b, 0) / period;
        const std = Math.sqrt(slice.reduce((s, v) => s + Math.pow(v - ma, 2), 0) / period);
        const bw = ((mult * 2 * std) / ma) * 100;
        if (params.condition === '범위') return bw >= params.value1 && bw <= params.value2;
        return compare(bw, params.condition, params.value1);
      }

      // ta_envelope: Envelope → band_target(상단밴드/중심선/하단밴드) + condition(이상/이하/돌파/이탈/근접)
      case 'ta_envelope': {
        const period = params.period || 20;
        const rate = (params.rate || 5) / 100;
        const ma = calcMA(closes, period);
        if (!ma) return false;
        const upper = ma * (1 + rate);
        const lower = ma * (1 - rate);
        const prevClose = closes[closes.length - 2];
        const bandTarget = params.band_target;
        const cond = params.condition;
        if (bandTarget === '상단밴드') {
          if (cond === '돌파') return current > upper && prevClose <= upper;
          if (cond === '이탈') return current < upper && prevClose >= upper;
          if (cond === '근접') return current >= upper * 0.99 && current <= upper * 1.01;
          if (cond === '이상') return current >= upper;
          if (cond === '이하') return current <= upper;
        }
        if (bandTarget === '하단밴드') {
          if (cond === '돌파') return current < lower && prevClose >= lower;
          if (cond === '이탈') return current > lower && prevClose <= lower;
          if (cond === '근접') return current >= lower * 0.99 && current <= lower * 1.01;
          if (cond === '이상') return current >= lower;
          if (cond === '이하') return current <= lower;
        }
        if (bandTarget === '중심선') {
          if (cond === '이상' || cond === '돌파') return current > ma;
          if (cond === '이하' || cond === '이탈') return current < ma;
          if (cond === '근접') return current >= ma * 0.99 && current <= ma * 1.01;
        }
        return false;
      }

      // ta_pivot: Pivot → 시가/고가/저가 필요, 미구현
      // ta_pivot_min: Pivot 분봉 → 분봉 데이터 필요, 미구현
      // ta_ichimoku: 일목균형표 → 고가/저가 필요, 미구현
      // ta_price_ch: Price Channel → 고가/저가 필요, 미구현

      // ==================== 기술적분석 - 변동성지표 ====================

      // ta_dmi / ta_dmi_dx / ta_adx / ta_adx_dmi: DMI 계열 → 고가/저가 필요, 미구현

      case 'ta_stddev': {
        const period = params.period || 20;
        if (closes.length < period) return false;
        const slice = closes.slice(-period);
        const ma = slice.reduce((a, b) => a + b, 0) / period;
        const std = Math.sqrt(slice.reduce((s, v) => s + Math.pow(v - ma, 2), 0) / period);
        return compare(std, params.condition, params.value);
      }

      case 'ta_sigma': {
        // 현재가가 이평에서 N 시그마 이상/이하
        const period = params.period || 20;
        if (closes.length < period) return false;
        const slice = closes.slice(-period);
        const ma = slice.reduce((a, b) => a + b, 0) / period;
        const std = Math.sqrt(slice.reduce((s, v) => s + Math.pow(v - ma, 2), 0) / period);
        if (std === 0) return false;
        const sigma = (current - ma) / std;
        return compare(sigma, params.condition, params.value);
      }

      // ta_true_range: True Range → 고가/저가 필요, 미구현

      // ==================== 기술적분석 - 거래량지표 ====================

      // ta_obv: OBV → condition(이상/이하/상승/하락/골든크로스/데드크로스)
      case 'ta_obv': {
        if (!closes || closes.length < 2 || !volumes) return false;
        // OBV 히스토리 누적 계산
        const obvHistory = [];
        let o = 0;
        for (let i = 1; i < closes.length; i++) {
          if (closes[i] > closes[i - 1]) o += volumes[i];
          else if (closes[i] < closes[i - 1]) o -= volumes[i];
          obvHistory.push(o);
        }
        if (obvHistory.length < 2) return false;
        const obv = obvHistory[obvHistory.length - 1];
        const prevObv = obvHistory[obvHistory.length - 2];
        if (params.condition === '상승') return obv > prevObv;
        if (params.condition === '하락') return obv < prevObv;
        if (params.condition === '골든크로스' || params.condition === '데드크로스') {
          if (obvHistory.length < 21) return false;
          const obvMaCurr = calcMA(obvHistory, 20);
          const obvMaPrev = calcMA(obvHistory.slice(0, -1), 20);
          if (obvMaCurr === null || obvMaPrev === null) return false;
          if (params.condition === '골든크로스') return obv > obvMaCurr && prevObv <= obvMaPrev;
          if (params.condition === '데드크로스') return obv < obvMaCurr && prevObv >= obvMaPrev;
        }
        return compare(obv, params.condition, params.value);
      }

      case 'ta_vr': {
        const vr = calcVR(closes, volumes, params.period || 20);
        if (vr === null) return false;
        if (params.condition === '범위') return vr >= params.value1 && vr <= params.value2;
        return compare(vr, params.condition, params.value1);
      }

      // ta_vol_osc: Volume Oscillator → 이상/이하/0선위/0선아래
      case 'ta_vol_osc': {
        const fast = calcMA(volumes, params.fast_period || 5);
        const slow = calcMA(volumes, params.slow_period || 20);
        if (!fast || !slow || slow === 0) return false;
        const osc = ((fast - slow) / slow) * 100;
        if (params.condition === '0선위') return osc > 0;
        if (params.condition === '0선아래') return osc < 0;
        return compare(osc, params.condition, params.value);
      }

      // ta_ad: A/D선 → 고가/저가 필요, 미구현
      // ta_mfi: MFI → 고가/저가/거래량 필요, 미구현
      // ta_dvi: Daily Volume Index → 고가/저가 필요, 미구현
      // ta_pvi: Positive Volume Index → 전일 대비 거래량 증가 시만 누적, 구현 가능하나 초기값 불명확

      // ==================== 기술적분석 - 기타지표 ====================

      // ta_demark: Demark → 고가/저가 필요, 미구현
      // ta_sansei: 삼선전환도 → 전환 로직 복잡, 고가/저가 필요, 미구현
      // ta_binary: Binary Wave → 여러 지표 조합 신호, 미구현

      // ==================== 기술적분석 - 가격박스 ====================

      case 'ta_pricebox_break': {
        // 가격기준선 돌파: 최근 N봉 박스(최고가/최저가) 기준
        const boxPeriod = params.period || 20;
        if (closes.length < boxPeriod + 1) return false;
        // 직전봉까지의 N봉 박스 계산 (현재봉 제외)
        const boxSlice = closes.slice(-(boxPeriod + 1), -1);
        const boxHigh = Math.max(...boxSlice);
        const boxLow = Math.min(...boxSlice);
        const prevClose = closes[closes.length - 2];
        if (params.cross_type === '상향돌파') return current > boxHigh && prevClose <= boxHigh;
        if (params.cross_type === '하향돌파') return current < boxLow && prevClose >= boxLow;
        return false;
      }

      case 'ta_pricebox_rate': {
        // 가격기준선 등락률: 최근 N봉 박스 중심가 대비 현재가 등락률
        const boxPeriod2 = params.period || 20;
        if (closes.length < boxPeriod2 + 1) return false;
        const boxSlice2 = closes.slice(-(boxPeriod2 + 1), -1);
        const boxHigh2 = Math.max(...boxSlice2);
        const boxLow2 = Math.min(...boxSlice2);
        const boxMid = (boxHigh2 + boxLow2) / 2;
        if (boxMid === 0) return false;
        const rate = ((current - boxMid) / boxMid) * 100;
        if (params.operator === '범위') return rate >= params.value1 && rate <= params.value2;
        return compare(rate, params.operator, params.value1);
      }

      // ==================== 패턴분석 ====================
      // 패턴분석 전체: 시가(open)/고가(high)/저가(low) 데이터 필요
      // 현재 fetchStockDataForCondition에서 종가(close)와 거래량만 수집하고 있음
      // Yahoo Finance API는 시가/고가/저가도 제공하므로,
      // fetchStockDataForCondition에서 opens/highs/lows 배열도 수집하도록 수정하면 구현 가능

      // ==================== 재무분석 ====================
      // 재무분석 전체: PER/PBR/ROE 등 재무 데이터 필요
      // Yahoo Finance의 v10/finance/quoteSummary API를 활용하면 일부 지표 조회 가능하나
      // CORS 정책 및 프록시 제한으로 안정적인 수집이 어려움
      // 키움증권 또는 한국거래소 전용 재무 API 연동 시 구현 가능

      // ==================== 순위분석 ====================
      // 순위분석 전체: 전 종목을 동시에 조회한 뒤 순위를 매겨야 함
      // 현재 구조는 종목을 하나씩 순차 조회하는 방식이라 순위 비교 불가
      // 전 종목 데이터를 먼저 수집 후 정렬하는 별도 로직 구현 필요

      default:
        // 위에서 처리되지 않은 조건은 통과 처리
        return true;
    }
  } catch (e) {
    console.warn(`조건 평가 오류 (${conditionId}):`, e);
    return false;
  }
}

// 조건식 입력창에 토큰 삽입 (AND / OR / NOT / 괄호 버튼)
function insertFormulaToken(token) {
  const el = document.getElementById('cs-formula');
  if (!el) return;
  const pos = el.selectionStart;
  const before = el.value.substring(0, pos);
  const after = el.value.substring(pos);
  const insert = before.length > 0 && !before.endsWith(' ') ? ' ' + token : token;
  el.value = before + insert + ' ' + after;
  el.focus();
  el.selectionStart = el.selectionEnd = pos + insert.length + 1;
}

// sleep 헬퍼
function conditionSleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function () {
  renderConditionList();
  renderConditionTree();

  const accordionEl = document.getElementById('accordionConditionSearch');
  if (accordionEl) {
    accordionEl.addEventListener('shown.bs.collapse', function () {
      if (document.getElementById('cs-tree').innerHTML === '') {
        renderConditionTree();
      }
    });
  }
});
