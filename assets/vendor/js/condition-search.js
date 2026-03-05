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

  // MA 계산 헬퍼
  function calcMA(closes, period) {
    if (closes.length < period) return null;
    const slice = closes.slice(-period);
    return slice.reduce((a, b) => a + b, 0) / period;
  }

  // RSI 계산 헬퍼
  function calcRSI(closes, period) {
    if (closes.length < period + 1) return null;
    const slice = closes.slice(-(period + 1));
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
    const rs = avgGain / avgLoss;
    return 100 - 100 / (1 + rs);
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
      case '같음':
        return value === threshold;
      default:
        return false;
    }
  }

  try {
    switch (conditionId) {
      // 범위지정
      case 'range_market':
        if (params.market === '전체') return true;
        if (params.market === '코스피') return market === 'KOSPI';
        if (params.market === '코스닥') return market === 'KOSDAQ';
        if (params.market === 'KOSPI200') return market === 'KOSPI';
        return true;

      case 'range_price':
        return current >= params.min && current <= params.max;

      case 'range_volume':
        return compare(volume, params.operator, params.value);

      // 시세분석
      case 'pa_price_cond':
        return compare(current, params.operator, params.value);

      case 'pa_volume_amount':
        if (params.type === '거래량') return compare(volume, params.operator, params.value);
        return true;

      // 기술적분석 - MA
      case 'ta_ma': {
        const ma1 = calcMA(closes, params.period1);
        const ma2 = calcMA(closes, params.period2);
        if (!ma1 || !ma2) return false;
        const maPrev1 = calcMA(closes.slice(0, -1), params.period1);
        const maPrev2 = calcMA(closes.slice(0, -1), params.period2);
        if (!maPrev1 || !maPrev2) return false;

        if (params.cross_type === '골든') return ma1 > ma2 && maPrev1 <= maPrev2;
        if (params.cross_type === '데드') return ma1 < ma2 && maPrev1 >= maPrev2;
        if (params.cross_type === '위') return ma1 > ma2;
        if (params.cross_type === '아래') return ma1 < ma2;
        if (params.cross_type === '정배열') return ma1 > ma2;
        if (params.cross_type === '역배열') return ma1 < ma2;
        return false;
      }

      // 기술적분석 - RSI
      case 'ta_rsi': {
        const rsi = calcRSI(closes, params.period || 14);
        if (rsi === null) return false;
        return compare(rsi, params.operator, params.value);
      }

      // 기술적분석 - 볼린저밴드
      case 'ta_bollinger': {
        const period = params.period || 20;
        const mult = params.multiplier || 2;
        if (closes.length < period) return false;
        const slice = closes.slice(-period);
        const ma = slice.reduce((a, b) => a + b, 0) / period;
        const std = Math.sqrt(slice.reduce((s, v) => s + Math.pow(v - ma, 2), 0) / period);
        const upper = ma + mult * std;
        const lower = ma - mult * std;
        if (params.position === '상단돌파') return current > upper;
        if (params.position === '하단돌파') return current < lower;
        if (params.position === '상단터치') return Math.abs(current - upper) / upper < 0.01;
        if (params.position === '하단터치') return Math.abs(current - lower) / lower < 0.01;
        return false;
      }

      // 재무분석은 Yahoo Finance에서 지원하는 지표만 근사치 처리
      case 'fin_price_index':
        // PER 등 재무 지표는 실시간 API 연동 필요 → 현재는 통과 처리
        return true;

      default:
        // 구현되지 않은 조건은 통과 처리 (추후 구현)
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
