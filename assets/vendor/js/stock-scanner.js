// 스캔 시작
function startStockScan() {
  let kospiCount = parseInt(document.getElementById('kospiScanCount').value) || 0;
  let kosdaqCount = parseInt(document.getElementById('kosdaqScanCount').value) || 0;
  let coinCount = parseInt(document.getElementById('coinScanCount').value) || 0;

  if (kospiCount === 0 && kosdaqCount === 0 && coinCount === 0) {
    alert('스캔 수량을 하나 이상 입력해주세요.');
    return;
  }

  kospiCount = Math.min(kospiCount, KOSPI200_LIST.length);
  kosdaqCount = Math.min(kosdaqCount, KOSDAQ150_LIST.length);
  coinCount = Math.min(coinCount, COIN_LIST.length);

  const mergedList = [
    ...KOSPI200_LIST.slice(0, kospiCount),
    ...KOSDAQ150_LIST.slice(0, kosdaqCount),
    ...COIN_LIST.slice(0, coinCount)
  ];

  runStockScan(mergedList);
}

// 결과 지우기
function clearStockResults() {
  document.getElementById('stockResults').innerHTML = `
    <div class="text-center text-muted" style="padding: 40px;">
      <h5>검색 결과가 여기에 표시됩니다</h5>
      <p>위의 버튼을 클릭하여 스캔을 시작하세요</p>
    </div>`;
  document.getElementById('stockResultSummary').textContent = '';
  document.getElementById('stockProgress').style.display = 'none';
}

// 메인 스캔 함수
async function runStockScan(stockList) {
  const progressEl = document.getElementById('stockProgress');
  const progressBar = document.getElementById('stockProgressBar');
  const progressText = document.getElementById('stockProgressText');
  const progressCount = document.getElementById('stockProgressCount');
  const resultsEl = document.getElementById('stockResults');
  const summaryEl = document.getElementById('stockResultSummary');

  progressEl.style.display = 'block';

  // 스캔 시작 시 테이블 뼈대를 먼저 그려놓음
  resultsEl.innerHTML = `
    <div class="mb-4">
      <h6 class="px-3 pt-3"><span class="badge bg-success me-2">KOSPI200</span><span id="kospiMatchCount">0</span>개 종목</h6>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr><th>#</th><th>종목코드</th><th>종목명</th><th>현재가</th><th>MA10</th><th>괴리율(%)</th></tr>
          </thead>
          <tbody id="kospiMatchBody"></tbody>
        </table>
      </div>
    </div>
    <hr>
    <div class="mb-4">
      <h6 class="px-3"><span class="badge bg-warning me-2">KOSDAQ150</span><span id="kosdaqMatchCount">0</span>개 종목</h6>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr><th>#</th><th>종목코드</th><th>종목명</th><th>현재가</th><th>MA10</th><th>괴리율(%)</th></tr>
          </thead>
          <tbody id="kosdaqMatchBody"></tbody>
        </table>
      </div>
    </div>
    <hr>
    <div class="mb-2">
      <h6 class="px-3"><span class="badge bg-info me-2">COIN</span><span id="coinMatchCount">0</span>개 종목</h6>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr><th>#</th><th>종목코드</th><th>종목명</th><th>현재가</th><th>MA10</th><th>괴리율(%)</th></tr>
          </thead>
          <tbody id="coinMatchBody"></tbody>
        </table>
      </div>
    </div>`;

  let totalMatched = 0;
  let kospiCount = 0;
  let kosdaqCount = 0;
  let coinCount = 0;
  const total = stockList.length;

  for (let i = 0; i < total; i++) {
    const stock = stockList[i];

    progressText.textContent = `분석 중: ${stock.name}`;
    progressCount.textContent = `${i + 1} / ${total}`;
    progressBar.style.width = `${Math.round(((i + 1) / total) * 100)}%`;

    try {
      const result = await fetchAndCheckMA10(stock);

      if (result) {
        totalMatched++;
        const unit = result.isCoin ? '$' : '원';
        const gapNum = parseFloat(result.gap);
        const badgeClass = gapNum >= 0 ? 'bg-label-danger' : 'bg-label-primary';
        const gapText = gapNum >= 0 ? `+${result.gap}%` : `${result.gap}%`;

        const row = `
          <tr>
            <td>-</td>
            <td><a href="${buildTradingViewUrl(result.code, result.market)}" target="_blank"><code>${result.code}</code></a></td>
            <td><strong>${result.name}</strong></td>
            <td>${result.current}${unit}</td>
            <td>${result.ma10}${unit}</td>
            <td><span class="badge ${badgeClass}">${gapText}</span></td>
          </tr>`;

        if (result.market === 'KOSPI') {
          kospiCount++;
          document.getElementById('kospiMatchBody').insertAdjacentHTML('beforeend', row);
          document.getElementById('kospiMatchCount').textContent = kospiCount;
        } else if (result.market === 'KOSDAQ') {
          kosdaqCount++;
          document.getElementById('kosdaqMatchBody').insertAdjacentHTML('beforeend', row);
          document.getElementById('kosdaqMatchCount').textContent = kosdaqCount;
        } else {
          coinCount++;
          document.getElementById('coinMatchBody').insertAdjacentHTML('beforeend', row);
          document.getElementById('coinMatchCount').textContent = coinCount;
        }

        summaryEl.textContent = `현재까지 ${totalMatched}개 종목 발견`;
      }
    } catch (e) {
      console.warn(`${stock.name} 실패:`, e);
    }

    await stockSleep(STOCK_CONFIG.REQUEST_DELAY);
  }

  progressEl.style.display = 'none';
  summaryEl.textContent = `총 ${totalMatched}개 종목 발견`;
}

// Yahoo Finance에서 월봉 데이터 가져와서 MA10 체크
async function fetchAndCheckMA10(stock) {
  const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${stock.code}?interval=${STOCK_CONFIG.YAHOO_INTERVAL}&range=${STOCK_CONFIG.YAHOO_RANGE}`;

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

  if (!data) return null;

  const chart = data?.chart?.result?.[0];
  if (!chart) return null;

  const closes = chart.indicators.quote[0].close.filter(v => v !== null);
  if (closes.length < STOCK_CONFIG.MA_PERIOD + 1) return null;

  const last10 = closes.slice(-STOCK_CONFIG.MA_PERIOD);
  const ma10 = last10.reduce((a, b) => a + b, 0) / STOCK_CONFIG.MA_PERIOD;
  const current = closes[closes.length - 1];
  const diff = Math.abs(current - ma10) / ma10;
  const isCoin = stock.code.includes('-USD');

  if (diff <= STOCK_CONFIG.TOUCH_RANGE) {
    return {
      market: stock.code.endsWith('.KS') ? 'KOSPI' : stock.code.endsWith('.KQ') ? 'KOSDAQ' : 'COIN',
      code: stock.code.replace('.KS', '').replace('.KQ', '').replace('-USD', ''),
      name: stock.name,
      current: isCoin ? current.toFixed(4) : Math.round(current).toLocaleString(),
      ma10: isCoin ? ma10.toFixed(4) : Math.round(ma10).toLocaleString(),
      gap: (((current - ma10) / ma10) * 100).toFixed(2),
      isCoin: isCoin
    };
  }
  return null;
}

// 결과 테이블 렌더링
function renderStockResults(results) {
  const el = document.getElementById('stockResults');

  if (results.length === 0) {
    el.innerHTML = `
      <div class="text-center text-muted p-4">
        <h5>조건을 만족하는 종목이 없습니다</h5>
      </div>`;
    return;
  }

  const kospiList = results.filter(r => r.market === 'KOSPI');
  const kosdaqList = results.filter(r => r.market === 'KOSDAQ');
  const coinList = results.filter(r => r.market === 'COIN');

  function buildTable(list) {
    if (list.length === 0) return `<p class="text-muted p-3">해당 없음</p>`;
    let rows = '';
    list.forEach((r, index) => {
      const gapNum = parseFloat(r.gap);
      const badgeClass = gapNum >= 0 ? 'bg-label-danger' : 'bg-label-primary';
      const gapText = gapNum >= 0 ? `+${r.gap}%` : `${r.gap}%`;
      const unit = r.isCoin ? '$' : '원';
      rows += `
        <tr>
          <td>${index + 1}</td>
          <td><code>${r.code}</code></td>
          <td><strong>${r.name}</strong></td>
          <td>${r.current}${unit}</td>
          <td>${r.ma10}${unit}</td>
          <td><span class="badge ${badgeClass}">${gapText}</span></td>
        </tr>`;
    });
    return `
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr>
              <th>#</th>
              <th>종목코드</th>
              <th>종목명</th>
              <th>현재가</th>
              <th>MA10</th>
              <th>괴리율(%)</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  }

  el.innerHTML = `
    <div class="mb-4">
      <h6 class="px-3 pt-3"><span class="badge bg-success me-2">KOSPI200</span>${kospiList.length}개 종목</h6>
      ${buildTable(kospiList)}
    </div>
    <hr>
    <div class="mb-4">
      <h6 class="px-3"><span class="badge bg-warning me-2">KOSDAQ150</span>${kosdaqList.length}개 종목</h6>
      ${buildTable(kosdaqList)}
    </div>
    <hr>
    <div class="mb-2">
      <h6 class="px-3"><span class="badge bg-info me-2">COIN</span>${coinList.length}개 종목</h6>
      ${buildTable(coinList)}
    </div>`;
}

// 딜레이 유틸
function stockSleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// MA448/644 스캔 시작
function startMA644Scan() {
  const checkedTf = document.querySelector('input[name="ma644Timeframe"]:checked');
  if (!checkedTf) {
    alert('타임프레임을 선택해주세요.');
    return;
  }
  const timeframeKey = checkedTf.value;

  let kospiCount = parseInt(document.getElementById('ma644KospiCount').value) || 0;
  let kosdaqCount = parseInt(document.getElementById('ma644KosdaqCount').value) || 0;
  let coinCount = parseInt(document.getElementById('ma644CoinCount').value) || 0;

  if (kospiCount === 0 && kosdaqCount === 0 && coinCount === 0) {
    alert('스캔 수량을 하나 이상 입력해주세요.');
    return;
  }

  kospiCount = Math.min(kospiCount, KOSPI200_LIST.length);
  kosdaqCount = Math.min(kosdaqCount, KOSDAQ150_LIST.length);
  coinCount = Math.min(coinCount, COIN_LIST.length);

  const mergedList = [
    ...KOSPI200_LIST.slice(0, kospiCount),
    ...KOSDAQ150_LIST.slice(0, kosdaqCount),
    ...COIN_LIST.slice(0, coinCount)
  ];

  runMA644Scan(mergedList, timeframeKey);
}

// MA448/644 결과 지우기
function clearMA644Results() {
  document.getElementById('ma644Results').innerHTML = `
    <div class="text-center text-muted" style="padding: 40px;">
      <h5>검색 결과가 여기에 표시됩니다</h5>
      <p>위의 버튼을 클릭하여 스캔을 시작하세요</p>
    </div>`;
  document.getElementById('ma644ResultSummary').textContent = '';
  document.getElementById('ma644Progress').style.display = 'none';
}

// MA448/644 메인 스캔 함수
async function runMA644Scan(stockList, timeframeKey) {
  const progressEl = document.getElementById('ma644Progress');
  const progressBar = document.getElementById('ma644ProgressBar');
  const progressText = document.getElementById('ma644ProgressText');
  const progressCount = document.getElementById('ma644ProgressCount');
  const resultsEl = document.getElementById('ma644Results');
  const summaryEl = document.getElementById('ma644ResultSummary');
  const tfLabel = MA644_CONFIG.TIMEFRAMES[timeframeKey].label;

  progressEl.style.display = 'block';

  resultsEl.innerHTML = `
    <div class="mb-4">
      <h6 class="px-3 pt-3"><span class="badge bg-success me-2">KOSPI200</span><span id="ma644KospiMatchCount">0</span>개 종목</h6>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr><th>#</th><th>종목코드</th><th>종목명</th><th>현재가</th><th>${tfLabel} MA448/644 (괴리율)</th></tr>
          </thead>
          <tbody id="ma644KospiMatchBody"></tbody>
        </table>
      </div>
    </div>
    <hr>
    <div class="mb-4">
      <h6 class="px-3"><span class="badge bg-warning me-2">KOSDAQ150</span><span id="ma644KosdaqMatchCount">0</span>개 종목</h6>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr><th>#</th><th>종목코드</th><th>종목명</th><th>현재가</th><th>${tfLabel} MA448/644 (괴리율)</th></tr>
          </thead>
          <tbody id="ma644KosdaqMatchBody"></tbody>
        </table>
      </div>
    </div>
    <hr>
    <div class="mb-2">
      <h6 class="px-3"><span class="badge bg-info me-2">COIN</span><span id="ma644CoinMatchCount">0</span>개 종목</h6>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr><th>#</th><th>종목코드</th><th>종목명</th><th>현재가</th><th>${tfLabel} MA448/644 (괴리율)</th></tr>
          </thead>
          <tbody id="ma644CoinMatchBody"></tbody>
        </table>
      </div>
    </div>`;

  let totalMatched = 0;
  let kospiCount = 0;
  let kosdaqCount = 0;
  let coinCount = 0;
  const total = stockList.length;

  for (let i = 0; i < total; i++) {
    const stock = stockList[i];

    progressText.textContent = `분석 중: ${stock.name}`;
    progressCount.textContent = `${i + 1} / ${total}`;
    progressBar.style.width = `${Math.round(((i + 1) / total) * 100)}%`;

    try {
      const result = await fetchAndCheckMA644(stock, timeframeKey);

      if (result) {
        totalMatched++;
        const unit = result.isCoin ? '$' : '원';
        const maBadges = result.hitMAs
          .map(m => {
            const gapNum = parseFloat(m.gap);
            const badgeClass = gapNum >= 0 ? 'bg-label-danger' : 'bg-label-primary';
            const gapText = gapNum >= 0 ? `+${m.gap}%` : `${m.gap}%`;
            return `<span class="badge bg-label-secondary me-1">MA${m.period}: ${m.ma}${unit}</span>
                  <span class="badge ${badgeClass} me-2">${gapText}</span>`;
          })
          .join('');

        const row = `
          <tr>
            <td>-</td>
            <td><a href="${buildTradingViewUrl(result.code, result.market)}" target="_blank"><code>${result.code}</code></a></td>
            <td><strong>${result.name}</strong></td>
            <td>${result.current}${unit}</td>
            <td>${maBadges}</td>
          </tr>`;

        if (result.market === 'KOSPI') {
          kospiCount++;
          document.getElementById('ma644KospiMatchBody').insertAdjacentHTML('beforeend', row);
          document.getElementById('ma644KospiMatchCount').textContent = kospiCount;
        } else if (result.market === 'KOSDAQ') {
          kosdaqCount++;
          document.getElementById('ma644KosdaqMatchBody').insertAdjacentHTML('beforeend', row);
          document.getElementById('ma644KosdaqMatchCount').textContent = kosdaqCount;
        } else {
          coinCount++;
          document.getElementById('ma644CoinMatchBody').insertAdjacentHTML('beforeend', row);
          document.getElementById('ma644CoinMatchCount').textContent = coinCount;
        }

        summaryEl.textContent = `현재까지 ${totalMatched}개 종목 발견`;
      }
    } catch (e) {
      console.warn(`${stock.name} 실패:`, e);
    }

    await stockSleep(MA644_CONFIG.REQUEST_DELAY);
  }

  progressEl.style.display = 'none';
  summaryEl.textContent = `총 ${totalMatched}개 종목 발견`;
}

// Yahoo Finance 데이터 가져와서 MA448/644 체크
async function fetchAndCheckMA644(stock, timeframeKey) {
  const tf = MA644_CONFIG.TIMEFRAMES[timeframeKey];
  const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${stock.code}?interval=${tf.interval}&range=${tf.range}`;

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

  if (!data) return null;

  const chart = data?.chart?.result?.[0];
  if (!chart) return null;

  let closes = chart.indicators.quote[0].close.filter(v => v !== null);

  // 240분봉: 60분봉 4개 단위로 묶어서 각 그룹의 마지막 종가만 사용
  if (tf.aggregate > 1) {
    const aggregated = [];
    for (let i = tf.aggregate - 1; i < closes.length; i += tf.aggregate) {
      aggregated.push(closes[i]);
    }
    closes = aggregated;
  }

  const maxPeriod = Math.max(...MA644_CONFIG.MA_PERIODS);
  if (closes.length < maxPeriod + 1) return null;

  const current = closes[closes.length - 1];
  const isCoin = stock.code.includes('-USD');
  const hitMAs = [];

  for (const period of MA644_CONFIG.MA_PERIODS) {
    const slice = closes.slice(-period);
    const ma = slice.reduce((a, b) => a + b, 0) / period;
    const diff = Math.abs(current - ma) / ma;

    if (diff <= MA644_CONFIG.TOUCH_RANGE) {
      hitMAs.push({
        period: period,
        ma: isCoin ? ma.toFixed(4) : Math.round(ma).toLocaleString(),
        gap: (((current - ma) / ma) * 100).toFixed(2)
      });
    }
  }

  if (hitMAs.length === 0) return null;

  return {
    market: stock.code.endsWith('.KS') ? 'KOSPI' : stock.code.endsWith('.KQ') ? 'KOSDAQ' : 'COIN',
    code: stock.code.replace('.KS', '').replace('.KQ', '').replace('-USD', ''),
    name: stock.name,
    current: isCoin ? current.toFixed(4) : Math.round(current).toLocaleString(),
    isCoin: isCoin,
    hitMAs: hitMAs
  };
}

// MA448/644 결과 테이블 렌더링
function renderMA644Results(results, timeframeKey) {
  const el = document.getElementById('ma644Results');
  const tfLabel = MA644_CONFIG.TIMEFRAMES[timeframeKey].label;

  if (results.length === 0) {
    el.innerHTML = `
      <div class="text-center text-muted p-4">
        <h5>조건을 만족하는 종목이 없습니다</h5>
      </div>`;
    return;
  }

  const kospiList = results.filter(r => r.market === 'KOSPI');
  const kosdaqList = results.filter(r => r.market === 'KOSDAQ');
  const coinList = results.filter(r => r.market === 'COIN');

  function buildTable(list) {
    if (list.length === 0) return `<p class="text-muted p-3">해당 없음</p>`;
    let rows = '';
    list.forEach((r, index) => {
      const unit = r.isCoin ? '$' : '원';
      const maBadges = r.hitMAs
        .map(m => {
          const gapNum = parseFloat(m.gap);
          const badgeClass = gapNum >= 0 ? 'bg-label-danger' : 'bg-label-primary';
          const gapText = gapNum >= 0 ? `+${m.gap}%` : `${m.gap}%`;
          return `<span class="badge bg-label-secondary me-1">MA${m.period}: ${m.ma}${unit}</span>
                <span class="badge ${badgeClass} me-2">${gapText}</span>`;
        })
        .join('');

      rows += `
        <tr>
          <td>${index + 1}</td>
          <td><code>${r.code}</code></td>
          <td><strong>${r.name}</strong></td>
          <td>${r.current}${unit}</td>
          <td>${maBadges}</td>
        </tr>`;
    });
    return `
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr>
              <th>#</th>
              <th>종목코드</th>
              <th>종목명</th>
              <th>현재가</th>
              <th>${tfLabel} MA448/644 (괴리율)</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  }

  el.innerHTML = `
    <div class="mb-4">
      <h6 class="px-3 pt-3"><span class="badge bg-success me-2">KOSPI200</span>${kospiList.length}개 종목</h6>
      ${buildTable(kospiList)}
    </div>
    <hr>
    <div class="mb-4">
      <h6 class="px-3"><span class="badge bg-warning me-2">KOSDAQ150</span>${kosdaqList.length}개 종목</h6>
      ${buildTable(kosdaqList)}
    </div>
    <hr>
    <div class="mb-2">
      <h6 class="px-3"><span class="badge bg-info me-2">COIN</span>${coinList.length}개 종목</h6>
      ${buildTable(coinList)}
    </div>`;
}

// 괴리율 input 토글
function toggleGapInput(type) {
  if (type === 'min') {
    const toggle = document.getElementById('dynamicMinGapToggle');
    const input = document.getElementById('dynamicMinGap');
    input.disabled = !toggle.checked;
    if (!toggle.checked) input.value = '-3';
  } else {
    const toggle = document.getElementById('dynamicMaxGapToggle');
    const input = document.getElementById('dynamicMaxGap');
    input.disabled = !toggle.checked;
    if (!toggle.checked) input.value = '3';
  }
}

/**세 번째 드랍다운 */
// 분봉 input 포커스 시 봉 선택 해제 및 활성화
function onDynamicMinuteFocus() {
  document.getElementById('dynamicMinuteInput').disabled = false;
  document.querySelectorAll('input[name="dynamicCandleType"]').forEach(r => {
    r.checked = false;
  });
}

// 분봉 input 값 변경 시 봉 선택 해제
function onDynamicMinuteInput() {
  const val = document.getElementById('dynamicMinuteInput').value;
  if (val && parseInt(val) > 0) {
    document.querySelectorAll('input[name="dynamicCandleType"]').forEach(r => {
      r.checked = false;
    });
  }
}

// 봉 선택 시 분봉 input 비활성화
function onDynamicMinuteFocus() {
  document.querySelectorAll('input[name="dynamicCandleType"]').forEach(r => {
    r.checked = false;
  });
}

// 분봉 → Yahoo Finance interval/range/aggregate 결정
function resolveDynamicTimeframe(minutes) {
  const supportedMap = {
    1: { interval: '1m', range: '7d', aggregate: 1, label: '1분봉' },
    2: { interval: '2m', range: '60d', aggregate: 1, label: '2분봉' },
    5: { interval: '5m', range: '60d', aggregate: 1, label: '5분봉' },
    15: { interval: '15m', range: '60d', aggregate: 1, label: '15분봉' },
    30: { interval: '30m', range: '60d', aggregate: 1, label: '30분봉' },
    60: { interval: '60m', range: '730d', aggregate: 1, label: '60분봉' },
    90: { interval: '90m', range: '60d', aggregate: 1, label: '90분봉' },
    240: { interval: '60m', range: '730d', aggregate: 4, label: '240분봉' }
  };

  if (supportedMap[minutes]) return supportedMap[minutes];

  // 비표준 분봉: 60분봉 기준 집계
  const aggregate = Math.max(1, Math.round(minutes / 60));
  return { interval: '60m', range: '730d', aggregate: aggregate, label: `${minutes}분봉` };
}

// 동적 스캐너 시작
function startDynamicScan() {
  const minuteInput = document.getElementById('dynamicMinuteInput');
  const candleSelected = document.querySelector('input[name="dynamicCandleType"]:checked');

  if (!minuteInput.value && !candleSelected) {
    alert('타임프레임을 선택하거나 분봉을 입력해주세요.');
    return;
  }

  const maPeriod = parseInt(document.getElementById('dynamicMAPeriod').value);
  if (!maPeriod || maPeriod < 1) {
    alert('MA 기간을 입력해주세요.');
    return;
  }

  const minGap = parseFloat(document.getElementById('dynamicMinGap').value);
  const maxGap = parseFloat(document.getElementById('dynamicMaxGap').value);
  if (isNaN(minGap) || isNaN(maxGap)) {
    alert('괴리율 범위를 입력해주세요.');
    return;
  }
  if (minGap >= maxGap) {
    alert('최솟값은 최댓값보다 작아야 합니다.');
    return;
  }

  let kospiCount = parseInt(document.getElementById('dynamicKospiCount').value) || 0;
  let kosdaqCount = parseInt(document.getElementById('dynamicKosdaqCount').value) || 0;
  let coinCount = parseInt(document.getElementById('dynamicCoinCount').value) || 0;

  if (kospiCount === 0 && kosdaqCount === 0 && coinCount === 0) {
    alert('스캔 수량을 하나 이상 입력해주세요.');
    return;
  }

  kospiCount = Math.min(kospiCount, KOSPI200_LIST.length);
  kosdaqCount = Math.min(kosdaqCount, KOSDAQ150_LIST.length);
  coinCount = Math.min(coinCount, COIN_LIST.length);

  const mergedList = [
    ...KOSPI200_LIST.slice(0, kospiCount),
    ...KOSDAQ150_LIST.slice(0, kosdaqCount),
    ...COIN_LIST.slice(0, coinCount)
  ];

  let tfConfig = {};
  if (candleSelected) {
    const val = candleSelected.value;
    if (val === '1d') tfConfig = { interval: '1d', range: '4y', aggregate: 1, label: '일봉' };
    if (val === '1wk') tfConfig = { interval: '1wk', range: '10y', aggregate: 1, label: '주봉' };
    if (val === '1mo') tfConfig = { interval: '1mo', range: '10y', aggregate: 1, label: '월봉' };
  } else {
    tfConfig = resolveDynamicTimeframe(parseInt(minuteInput.value));
  }

  const config = { tfConfig, maPeriod, minGap, maxGap };
  runDynamicScan(mergedList, config);
}

// 동적 스캐너 결과 지우기
function clearDynamicResults() {
  document.getElementById('dynamicResults').innerHTML = `
    <div class="text-center text-muted" style="padding: 40px;">
      <h5>검색 결과가 여기에 표시됩니다</h5>
      <p>위의 버튼을 클릭하여 스캔을 시작하세요</p>
    </div>`;
  document.getElementById('dynamicResultSummary').textContent = '';
  document.getElementById('dynamicProgress').style.display = 'none';
}

// 동적 스캐너 메인 스캔
async function runDynamicScan(stockList, config) {
  const progressEl = document.getElementById('dynamicProgress');
  const progressBar = document.getElementById('dynamicProgressBar');
  const progressText = document.getElementById('dynamicProgressText');
  const progressCount = document.getElementById('dynamicProgressCount');
  const resultsEl = document.getElementById('dynamicResults');
  const summaryEl = document.getElementById('dynamicResultSummary');
  const tfLabel = config.tfConfig.label;
  const maPeriod = config.maPeriod;

  progressEl.style.display = 'block';

  resultsEl.innerHTML = `
    <div class="mb-4">
      <h6 class="px-3 pt-3"><span class="badge bg-success me-2">KOSPI200</span><span id="dynamicKospiMatchCount">0</span>개 종목</h6>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr><th>#</th><th>종목코드</th><th>종목명</th><th>현재가</th><th>${tfLabel} MA${maPeriod} (괴리율)</th></tr>
          </thead>
          <tbody id="dynamicKospiMatchBody"></tbody>
        </table>
      </div>
    </div>
    <hr>
    <div class="mb-4">
      <h6 class="px-3"><span class="badge bg-warning me-2">KOSDAQ150</span><span id="dynamicKosdaqMatchCount">0</span>개 종목</h6>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr><th>#</th><th>종목코드</th><th>종목명</th><th>현재가</th><th>${tfLabel} MA${maPeriod} (괴리율)</th></tr>
          </thead>
          <tbody id="dynamicKosdaqMatchBody"></tbody>
        </table>
      </div>
    </div>
    <hr>
    <div class="mb-2">
      <h6 class="px-3"><span class="badge bg-info me-2">COIN</span><span id="dynamicCoinMatchCount">0</span>개 종목</h6>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr><th>#</th><th>종목코드</th><th>종목명</th><th>현재가</th><th>${tfLabel} MA${maPeriod} (괴리율)</th></tr>
          </thead>
          <tbody id="dynamicCoinMatchBody"></tbody>
        </table>
      </div>
    </div>`;

  let totalMatched = 0;
  let kospiCount = 0;
  let kosdaqCount = 0;
  let coinCount = 0;
  const total = stockList.length;

  for (let i = 0; i < total; i++) {
    const stock = stockList[i];

    progressText.textContent = `분석 중: ${stock.name}`;
    progressCount.textContent = `${i + 1} / ${total}`;
    progressBar.style.width = `${Math.round(((i + 1) / total) * 100)}%`;

    try {
      const result = await fetchAndCheckDynamic(stock, config);

      if (result) {
        totalMatched++;
        const unit = result.isCoin ? '$' : '원';
        const gapNum = parseFloat(result.gap);
        const badgeClass = gapNum >= 0 ? 'bg-label-danger' : 'bg-label-primary';
        const gapText = gapNum >= 0 ? `+${result.gap}%` : `${result.gap}%`;

        const row = `
          <tr>
            <td>-</td>
            <td><a href="${buildTradingViewUrl(result.code, result.market)}" target="_blank"><code>${result.code}</code></a></td>
            <td><strong>${result.name}</strong></td>
            <td>${result.current}${unit}</td>
            <td>
              <span class="badge bg-label-secondary me-1">MA${maPeriod}: ${result.ma}${unit}</span>
              <span class="badge ${badgeClass}">${gapText}</span>
            </td>
          </tr>`;

        if (result.market === 'KOSPI') {
          kospiCount++;
          document.getElementById('dynamicKospiMatchBody').insertAdjacentHTML('beforeend', row);
          document.getElementById('dynamicKospiMatchCount').textContent = kospiCount;
        } else if (result.market === 'KOSDAQ') {
          kosdaqCount++;
          document.getElementById('dynamicKosdaqMatchBody').insertAdjacentHTML('beforeend', row);
          document.getElementById('dynamicKosdaqMatchCount').textContent = kosdaqCount;
        } else {
          coinCount++;
          document.getElementById('dynamicCoinMatchBody').insertAdjacentHTML('beforeend', row);
          document.getElementById('dynamicCoinMatchCount').textContent = coinCount;
        }

        summaryEl.textContent = `현재까지 ${totalMatched}개 종목 발견`;
      }
    } catch (e) {
      console.warn(`${stock.name} 실패:`, e);
    }

    await stockSleep(STOCK_CONFIG.REQUEST_DELAY);
  }

  progressEl.style.display = 'none';
  summaryEl.textContent = `총 ${totalMatched}개 종목 발견`;
}

// 동적 스캐너 Yahoo Finance 체크
async function fetchAndCheckDynamic(stock, config) {
  const tf = config.tfConfig;
  const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${stock.code}?interval=${tf.interval}&range=${tf.range}`;

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

  if (!data) return null;

  const chart = data?.chart?.result?.[0];
  if (!chart) return null;

  let closes = chart.indicators.quote[0].close.filter(v => v !== null);

  // 집계 처리 (240분봉 등)
  if (tf.aggregate > 1) {
    const aggregated = [];
    for (let i = tf.aggregate - 1; i < closes.length; i += tf.aggregate) {
      aggregated.push(closes[i]);
    }
    closes = aggregated;
  }

  if (closes.length < config.maPeriod + 1) return null;

  const current = closes[closes.length - 1];
  const slice = closes.slice(-config.maPeriod);
  const ma = slice.reduce((a, b) => a + b, 0) / config.maPeriod;
  const gap = ((current - ma) / ma) * 100;
  const isCoin = stock.code.includes('-USD');

  if (gap < config.minGap || gap > config.maxGap) return null;

  return {
    market: stock.code.endsWith('.KS') ? 'KOSPI' : stock.code.endsWith('.KQ') ? 'KOSDAQ' : 'COIN',
    code: stock.code.replace('.KS', '').replace('.KQ', '').replace('-USD', ''),
    name: stock.name,
    current: isCoin ? current.toFixed(4) : Math.round(current).toLocaleString(),
    ma: isCoin ? ma.toFixed(4) : Math.round(ma).toLocaleString(),
    gap: gap.toFixed(2),
    isCoin: isCoin
  };
}

// 전월 거래량 최고 스캐너 - MA 옵션 토글
function toggleVolPrevMonthMA() {
  const checked = document.getElementById('volPrevMonthUseMA').checked;
  document.getElementById('volPrevMonthMAOptions').style.display = checked ? 'block' : 'none';
}

function toggleVolPrevMonthGap(type) {
  if (type === 'min') {
    const toggle = document.getElementById('volPrevMonthMinGapToggle');
    const input = document.getElementById('volPrevMonthMinGap');
    input.disabled = !toggle.checked;
    if (!toggle.checked) input.value = '-3';
  } else {
    const toggle = document.getElementById('volPrevMonthMaxGapToggle');
    const input = document.getElementById('volPrevMonthMaxGap');
    input.disabled = !toggle.checked;
    if (!toggle.checked) input.value = '3';
  }
}

function startVolPrevMonthScan() {
  const days = parseInt(document.getElementById('volPrevMonthDays').value) || 180;
  let kospiCount = parseInt(document.getElementById('volPrevMonthKospiCount').value) || 0;
  let kosdaqCount = parseInt(document.getElementById('volPrevMonthKosdaqCount').value) || 0;
  let coinCount = parseInt(document.getElementById('volPrevMonthCoinCount').value) || 0;

  if (kospiCount === 0 && kosdaqCount === 0 && coinCount === 0) {
    alert('스캔 수량을 하나 이상 입력해주세요.');
    return;
  }

  const useMA = document.getElementById('volPrevMonthUseMA').checked;
  let maConfig = null;

  if (useMA) {
    const maPeriod = parseInt(document.getElementById('volPrevMonthMAPeriod').value);
    const minGap = parseFloat(document.getElementById('volPrevMonthMinGap').value);
    const maxGap = parseFloat(document.getElementById('volPrevMonthMaxGap').value);

    if (!maPeriod || maPeriod < 1) {
      alert('MA 기간을 입력해주세요.');
      return;
    }
    if (isNaN(minGap) || isNaN(maxGap)) {
      alert('괴리율 범위를 입력해주세요.');
      return;
    }
    if (minGap >= maxGap) {
      alert('괴리율 최솟값은 최댓값보다 작아야 합니다.');
      return;
    }
    maConfig = { maPeriod, minGap, maxGap };
  }

  kospiCount = Math.min(kospiCount, KOSPI200_LIST.length);
  kosdaqCount = Math.min(kosdaqCount, KOSDAQ150_LIST.length);
  coinCount = Math.min(coinCount, COIN_LIST.length);

  const stockList = [
    ...KOSPI200_LIST.slice(0, kospiCount),
    ...KOSDAQ150_LIST.slice(0, kosdaqCount),
    ...COIN_LIST.slice(0, coinCount)
  ];

  const useBullish = document.getElementById('volPrevMonthBullish').checked;
  runVolPrevMonthScan(stockList, days, maConfig, useBullish);
}

// 전월 거래량 최고 스캐너 - 결과 지우기
function clearVolPrevMonthResults() {
  document.getElementById('volPrevMonthResults').innerHTML = `
    <div class="text-center text-muted" style="padding: 40px;">
      <h5>검색 결과가 여기에 표시됩니다</h5>
      <p>위의 버튼을 클릭하여 스캔을 시작하세요</p>
    </div>`;
  document.getElementById('volPrevMonthResultSummary').textContent = '';
  document.getElementById('volPrevMonthProgress').style.display = 'none';
}

// 전월 거래량 최고 스캐너 - 메인 스캔
async function runVolPrevMonthScan(stockList, days, maConfig, useBullish) {
  const progressEl = document.getElementById('volPrevMonthProgress');
  const progressBar = document.getElementById('volPrevMonthProgressBar');
  const progressText = document.getElementById('volPrevMonthProgressText');
  const progressCount = document.getElementById('volPrevMonthProgressCount');
  const resultsEl = document.getElementById('volPrevMonthResults');
  const summaryEl = document.getElementById('volPrevMonthResultSummary');

  progressEl.style.display = 'block';

  resultsEl.innerHTML = `
    <div class="mb-4">
      <h6 class="px-3 pt-3"><span class="badge bg-success me-2">KOSPI200</span><span id="volPrevMonthKospiMatchCount">0</span>개 종목</h6>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr><th>#</th><th>종목코드</th><th>종목명</th><th>현재가</th><th>전월 거래량</th><th>조회기간 최고월</th><th>월봉 MA</th><th>괴리율</th></tr>
          </thead>
          <tbody id="volPrevMonthKospiBody"></tbody>
        </table>
      </div>
    </div>
    <hr>
    <div class="mb-4">
      <h6 class="px-3"><span class="badge bg-warning me-2">KOSDAQ150</span><span id="volPrevMonthKosdaqMatchCount">0</span>개 종목</h6>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr><th>#</th><th>종목코드</th><th>종목명</th><th>현재가</th><th>전월 거래량</th><th>조회기간 최고월</th><th>월봉 MA</th><th>괴리율</th></tr>
          </thead>
          <tbody id="volPrevMonthKosdaqBody"></tbody>
        </table>
      </div>
    </div>
    <hr>
    <div class="mb-2">
      <h6 class="px-3"><span class="badge bg-info me-2">COIN</span><span id="volPrevMonthCoinMatchCount">0</span>개 종목</h6>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr><th>#</th><th>종목코드</th><th>종목명</th><th>현재가</th><th>전월 거래량</th><th>조회기간 최고월</th><th>월봉 MA</th><th>괴리율</th></tr>
          </thead>
          <tbody id="volPrevMonthCoinBody"></tbody>
        </table>
      </div>
    </div>`;

  let totalMatched = 0;
  let kospiCount = 0;
  let kosdaqCount = 0;
  let coinCount = 0;
  const total = stockList.length;

  for (let i = 0; i < total; i++) {
    const stock = stockList[i];
    progressText.textContent = `분석 중: ${stock.name}`;
    progressCount.textContent = `${i + 1} / ${total}`;
    progressBar.style.width = `${Math.round(((i + 1) / total) * 100)}%`;

    try {
      const result = await fetchAndCheckVolPrevMonth(stock, days, maConfig, useBullish);
      if (result) {
        totalMatched++;
        // 기존 row 코드 전체를 아래로 교체
        const unit = result.isCoin ? '$' : '원';
        const maCell =
          result.maGap !== null
            ? `<span class="badge bg-label-secondary me-1">MA${maConfig?.maPeriod}: ${result.maValue}${unit}</span>
     <span class="badge ${parseFloat(result.maGap) >= 0 ? 'bg-label-danger' : 'bg-label-primary'}">${parseFloat(result.maGap) >= 0 ? '+' : ''}${result.maGap}%</span>`
            : `<span class="text-muted small">-</span>`;

        const row = `
  <tr>
    <td>-</td>
    <td><a href="${buildTradingViewUrl(result.code, result.market)}" target="_blank"><code>${result.code}</code></a></td>
    <td><strong>${result.name}</strong></td>
    <td>${result.price}${unit}</td>
    <td><span class="badge bg-label-danger">${result.prevMonthVol}</span></td>
    <td><span class="badge bg-label-secondary">${result.topMonthLabel}</span></td>
    <td colspan="2">${maCell}</td>
  </tr>`;

        if (result.market === 'KOSPI') {
          kospiCount++;
          document.getElementById('volPrevMonthKospiBody').insertAdjacentHTML('beforeend', row);
          document.getElementById('volPrevMonthKospiMatchCount').textContent = kospiCount;
        } else if (result.market === 'KOSDAQ') {
          kosdaqCount++;
          document.getElementById('volPrevMonthKosdaqBody').insertAdjacentHTML('beforeend', row);
          document.getElementById('volPrevMonthKosdaqMatchCount').textContent = kosdaqCount;
        } else {
          coinCount++;
          document.getElementById('volPrevMonthCoinBody').insertAdjacentHTML('beforeend', row);
          document.getElementById('volPrevMonthCoinMatchCount').textContent = coinCount;
        }

        summaryEl.textContent = `현재까지 ${totalMatched}개 종목 발견`;
      }
    } catch (e) {
      console.warn(`${stock.name} 실패:`, e);
    }

    await stockSleep(STOCK_CONFIG.REQUEST_DELAY);
  }

  progressEl.style.display = 'none';
  summaryEl.textContent = `총 ${totalMatched}개 종목 발견`;
}

// 전월 거래량 최고 스캐너 - Yahoo Finance 데이터 체크
async function fetchAndCheckVolPrevMonth(stock, days, maConfig, useBullish) {
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
  const timestamps = chart.timestamp || [];
  const quotes = chart.indicators.quote[0];
  if (!quotes || !quotes.volume || !quotes.close) return null;

  const isCoin = stock.code.includes('-USD');
  const now = new Date();
  const cutoffTs = now.getTime() / 1000 - days * 86400;
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth();
  const prevMonth = thisMonth === 0 ? 11 : thisMonth - 1;
  const prevYear = thisMonth === 0 ? thisYear - 1 : thisYear;
  const prevKey = `${prevYear}-${prevMonth}`;

  // 월별 거래량 합산 (이번 달 제외, cutoff 이후만)
  const monthlyVol = {};
  for (let i = 0; i < timestamps.length; i++) {
    if (timestamps[i] < cutoffTs) continue;
    const d = new Date(timestamps[i] * 1000);
    const yr = d.getFullYear();
    const mo = d.getMonth();
    if (yr === thisYear && mo === thisMonth) continue;
    const key = `${yr}-${mo}`;
    monthlyVol[key] = (monthlyVol[key] || 0) + (quotes.volume[i] || 0);
  }

  const keys = Object.keys(monthlyVol);
  if (keys.length < 2 || !monthlyVol[prevKey]) return null;

  const maxVol = Math.max(...Object.values(monthlyVol));
  if (monthlyVol[prevKey] < maxVol) return null;

  // 저번달 양봉 조건 체크 (코인 제외)
  if (useBullish && !isCoin) {
    const opens = quotes.open || [];
    const prevMonthOpens = [];
    const prevMonthCloses = [];

    for (let i = 0; i < timestamps.length; i++) {
      const d = new Date(timestamps[i] * 1000);
      const yr = d.getFullYear();
      const mo = d.getMonth();
      if (yr === prevYear && mo === prevMonth) {
        if (opens[i] !== null && opens[i] !== undefined) prevMonthOpens.push(opens[i]);
        if (quotes.close[i] !== null && quotes.close[i] !== undefined) prevMonthCloses.push(quotes.close[i]);
      }
    }

    if (prevMonthOpens.length === 0 || prevMonthCloses.length === 0) return null;

    const prevMonthFirstOpen = prevMonthOpens[0];
    const prevMonthLastClose = prevMonthCloses[prevMonthCloses.length - 1];

    if (prevMonthLastClose <= prevMonthFirstOpen) return null;
  }

  // MA 조건 체크 (선택 시)
  let maGap = null;
  let maValue = null;

  if (maConfig) {
    const monthlyLastClose = {};
    for (let i = 0; i < timestamps.length; i++) {
      if (!quotes.close[i]) continue;
      const d = new Date(timestamps[i] * 1000);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      monthlyLastClose[key] = quotes.close[i];
    }

    const monthCloses = Object.values(monthlyLastClose);
    if (monthCloses.length < maConfig.maPeriod) return null;

    const slice = monthCloses.slice(-maConfig.maPeriod);
    const ma = slice.reduce((a, b) => a + b, 0) / maConfig.maPeriod;
    const current = monthCloses[monthCloses.length - 1];
    const gap = ((current - ma) / ma) * 100;

    if (gap < maConfig.minGap || gap > maConfig.maxGap) return null;

    maGap = gap.toFixed(2);
    maValue = isCoin ? ma.toFixed(4) : Math.round(ma).toLocaleString();
  }

  const closes = quotes.close.filter(v => v !== null);
  const current = closes[closes.length - 1];
  const market = stock.code.endsWith('.KS') ? 'KOSPI' : stock.code.endsWith('.KQ') ? 'KOSDAQ' : 'COIN';
  const cleanCode = stock.code.replace('.KS', '').replace('.KQ', '').replace('-USD', '');

  const topKey = keys.find(k => monthlyVol[k] === maxVol);
  const [topYr, topMo] = topKey.split('-');

  return {
    market,
    code: cleanCode,
    name: stock.name,
    isCoin,
    price: isCoin ? current.toFixed(4) : Math.round(current).toLocaleString(),
    prevMonthVol: Math.round(monthlyVol[prevKey]).toLocaleString(),
    topMonthLabel: `${topYr}년 ${parseInt(topMo) + 1}월`,
    maGap,
    maValue
  };
}

// 트레이딩뷰 URL 생성
function buildTradingViewUrl(code, market) {
  if (market === 'COIN') {
    return `https://kr.tradingview.com/chart/?symbol=BINANCE%3A${code}USDT`;
  }
  return `https://kr.tradingview.com/chart/?symbol=KRX%3A${code}`;
}

// =============================================
// 전월 거래량 최고 스캐너 v2
// =============================================

function toggleV2MA() {
  const checked = document.getElementById('v2UseMA').checked;
  document.getElementById('v2MAOptions').style.display = checked ? 'block' : 'none';
}

function toggleV2Gap(type) {
  if (type === 'min') {
    const toggle = document.getElementById('v2MinGapToggle');
    const input = document.getElementById('v2MinGap');
    input.disabled = !toggle.checked;
    if (!toggle.checked) input.value = '-3';
  } else {
    const toggle = document.getElementById('v2MaxGapToggle');
    const input = document.getElementById('v2MaxGap');
    input.disabled = !toggle.checked;
    if (!toggle.checked) input.value = '3';
  }
}

function toggleV2MA120() {
  const checked = document.getElementById('v2UseMA120').checked;
  document.getElementById('v2MA120Options').style.display = checked ? 'block' : 'none';
}

function toggleV2MA120Gap(type) {
  if (type === 'min') {
    const toggle = document.getElementById('v2MA120MinToggle');
    const input = document.getElementById('v2MA120MinGap');
    input.disabled = !toggle.checked;
    if (!toggle.checked) input.value = '-5';
  } else {
    const toggle = document.getElementById('v2MA120MaxToggle');
    const input = document.getElementById('v2MA120MaxGap');
    input.disabled = !toggle.checked;
    if (!toggle.checked) input.value = '5';
  }
}

function startV2Scan() {
  const months = parseInt(document.getElementById('v2Months').value) || 6;
  const minAgo = parseInt(document.getElementById('v2MinAgo').value) || 1;
  const maxAgo = parseInt(document.getElementById('v2MaxAgo').value) || 3;

  if (minAgo > maxAgo) {
    alert('거래량 최고 달 범위: 최솟값이 최댓값보다 클 수 없습니다.');
    return;
  }

  let kospiCount = parseInt(document.getElementById('v2KospiCount').value) || 0;
  let kosdaqCount = parseInt(document.getElementById('v2KosdaqCount').value) || 0;
  let coinCount = parseInt(document.getElementById('v2CoinCount').value) || 0;

  if (kospiCount === 0 && kosdaqCount === 0 && coinCount === 0) {
    alert('스캔 수량을 하나 이상 입력해주세요.');
    return;
  }

  const useMA = document.getElementById('v2UseMA').checked;
  let maConfig = null;
  if (useMA) {
    const maPeriod = parseInt(document.getElementById('v2MAPeriod').value);
    const minGap = parseFloat(document.getElementById('v2MinGap').value);
    const maxGap = parseFloat(document.getElementById('v2MaxGap').value);
    if (!maPeriod || maPeriod < 1) {
      alert('MA 기간을 입력해주세요.');
      return;
    }
    if (isNaN(minGap) || isNaN(maxGap)) {
      alert('괴리율 범위를 입력해주세요.');
      return;
    }
    if (minGap >= maxGap) {
      alert('괴리율 최솟값은 최댓값보다 작아야 합니다.');
      return;
    }
    maConfig = { maPeriod, minGap, maxGap };
  }

  const useBullish = document.getElementById('v2Bullish').checked;

  const useMA120 = document.getElementById('v2UseMA120').checked;
  let ma120Config = null;
  if (useMA120) {
    const direction = document.getElementById('v2MA120Direction').value;
    const minGap = parseFloat(document.getElementById('v2MA120MinGap').value);
    const maxGap = parseFloat(document.getElementById('v2MA120MaxGap').value);
    if (isNaN(minGap) || isNaN(maxGap)) {
      alert('MA120 괴리율 범위를 입력해주세요.');
      return;
    }
    if (minGap >= maxGap) {
      alert('MA120 괴리율 최솟값은 최댓값보다 작아야 합니다.');
      return;
    }
    ma120Config = { direction, minGap, maxGap };
  }

  const useMA60 = document.getElementById('v2UseMA60').checked;

  kospiCount = Math.min(kospiCount, KOSPI200_LIST.length);
  kosdaqCount = Math.min(kosdaqCount, KOSDAQ150_LIST.length);
  coinCount = Math.min(coinCount, COIN_LIST.length);

  const stockList = [
    ...KOSPI200_LIST.slice(0, kospiCount),
    ...KOSDAQ150_LIST.slice(0, kosdaqCount),
    ...COIN_LIST.slice(0, coinCount)
  ];

  runV2Scan(stockList, months, minAgo, maxAgo, maConfig, useBullish, ma120Config, useMA60);
}

function clearV2Results() {
  document.getElementById('v2Results').innerHTML = `
    <div class="text-center text-muted" style="padding: 40px;">
      <h5>검색 결과가 여기에 표시됩니다</h5>
      <p>위의 버튼을 클릭하여 스캔을 시작하세요</p>
    </div>`;
  document.getElementById('v2ResultSummary').textContent = '';
  document.getElementById('v2Progress').style.display = 'none';
}

async function runV2Scan(stockList, months, minAgo, maxAgo, maConfig, useBullish, ma120Config, useMA60) {
  const progressEl = document.getElementById('v2Progress');
  const progressBar = document.getElementById('v2ProgressBar');
  const progressText = document.getElementById('v2ProgressText');
  const progressCount = document.getElementById('v2ProgressCount');
  const resultsEl = document.getElementById('v2Results');
  const summaryEl = document.getElementById('v2ResultSummary');

  progressEl.style.display = 'block';
  resultsEl.innerHTML = `
    <div class="mb-4">
      <h6 class="px-3 pt-3"><span class="badge bg-success me-2">KOSPI200</span><span id="v2KospiMatchCount">0</span>개 종목</h6>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr><th>#</th><th>종목코드</th><th>종목명</th><th>현재가</th><th>최고 거래량 달</th><th>거래량</th><th>월봉 MA</th><th>괴리율</th></tr>
          </thead>
          <tbody id="v2KospiBody"></tbody>
        </table>
      </div>
    </div>
    <hr>
    <div class="mb-4">
      <h6 class="px-3"><span class="badge bg-warning me-2">KOSDAQ150</span><span id="v2KosdaqMatchCount">0</span>개 종목</h6>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr><th>#</th><th>종목코드</th><th>종목명</th><th>현재가</th><th>최고 거래량 달</th><th>거래량</th><th>월봉 MA</th><th>괴리율</th></tr>
          </thead>
          <tbody id="v2KosdaqBody"></tbody>
        </table>
      </div>
    </div>
    <hr>
    <div class="mb-2">
      <h6 class="px-3"><span class="badge bg-info me-2">COIN</span><span id="v2CoinMatchCount">0</span>개 종목</h6>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr><th>#</th><th>종목코드</th><th>종목명</th><th>현재가</th><th>최고 거래량 달</th><th>거래량</th><th>월봉 MA</th><th>괴리율</th></tr>
          </thead>
          <tbody id="v2CoinBody"></tbody>
        </table>
      </div>
    </div>`;

  let totalMatched = 0,
    kospiCount = 0,
    kosdaqCount = 0,
    coinCount = 0;
  const total = stockList.length;

  for (let i = 0; i < total; i++) {
    const stock = stockList[i];
    progressText.textContent = `분석 중: ${stock.name}`;
    progressCount.textContent = `${i + 1} / ${total}`;
    progressBar.style.width = `${Math.round(((i + 1) / total) * 100)}%`;

    try {
      const result = await fetchAndCheckV2(stock, months, minAgo, maxAgo, maConfig, useBullish, ma120Config, useMA60);
      if (result) {
        totalMatched++;
        const unit = result.isCoin ? '$' : '원';
        const maCell =
          result.maGap !== null
            ? `<span class="badge bg-label-secondary me-1">MA${maConfig?.maPeriod}: ${result.maValue}${unit}</span>
             <span class="badge ${parseFloat(result.maGap) >= 0 ? 'bg-label-danger' : 'bg-label-primary'}">${parseFloat(result.maGap) >= 0 ? '+' : ''}${result.maGap}%</span>`
            : `<span class="text-muted small">-</span>`;

        const row = `
          <tr>
            <td>-</td>
            <td><a href="${buildTradingViewUrl(result.code, result.market)}" target="_blank"><code>${result.code}</code></a></td>
            <td><strong>${result.name}</strong></td>
            <td>${result.price}${unit}</td>
            <td><span class="badge bg-label-danger">${result.topMonthLabel}</span></td>
            <td>${result.topMonthVol}</td>
            <td colspan="2">${maCell}</td>
          </tr>`;

        if (result.market === 'KOSPI') {
          kospiCount++;
          document.getElementById('v2KospiBody').insertAdjacentHTML('beforeend', row);
          document.getElementById('v2KospiMatchCount').textContent = kospiCount;
        } else if (result.market === 'KOSDAQ') {
          kosdaqCount++;
          document.getElementById('v2KosdaqBody').insertAdjacentHTML('beforeend', row);
          document.getElementById('v2KosdaqMatchCount').textContent = kosdaqCount;
        } else {
          coinCount++;
          document.getElementById('v2CoinBody').insertAdjacentHTML('beforeend', row);
          document.getElementById('v2CoinMatchCount').textContent = coinCount;
        }
        summaryEl.textContent = `현재까지 ${totalMatched}개 종목 발견`;
      }
    } catch (e) {
      console.warn(`${stock.name} 실패:`, e);
    }
    await stockSleep(STOCK_CONFIG.REQUEST_DELAY);
  }

  progressEl.style.display = 'none';
  summaryEl.textContent = `총 ${totalMatched}개 종목 발견`;
}

async function fetchAndCheckV2(stock, months, minAgo, maxAgo, maConfig, useBullish, ma120Config, useMA60) {
  const dailyUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${stock.code}?interval=1d&range=2y`;
  const makeProxies = url => [
    `http://moda.dothome.co.kr/proxy.php?url=${encodeURIComponent(url)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    `https://api.codetabs.com/v1/proxy?quest=${url}`,
    `https://corsproxy.io/?${url}`
  ];

  let data = null;
  for (const url of makeProxies(dailyUrl)) {
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

  // MA 조건이 있으면 월봉 15년치 별도 요청
  let monthData = null;
  if (maConfig || ma120Config || useMA60) {
    const monthUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${stock.code}?interval=1mo&range=15y`;
    for (const url of makeProxies(monthUrl)) {
      try {
        const res = await fetch(url);
        if (!res.ok) continue;
        monthData = await res.json();
        if (monthData?.chart?.result?.[0]) break;
      } catch (e) {
        continue;
      }
    }
  }

  const chart = data.chart.result[0];
  const timestamps = chart.timestamp || [];
  const quotes = chart.indicators.quote[0];
  if (!quotes || !quotes.volume || !quotes.close) return null;

  const isCoin = stock.code.includes('-USD');
  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth();

  // 조회 범위 cutoff
  const cutoffDate = new Date(thisYear, thisMonth - months, 1);
  const cutoffTs = cutoffDate.getTime() / 1000;

  // 거래량 최고 달 범위 (월 단위)
  const validKeys = new Set();
  for (let ago = minAgo; ago <= maxAgo; ago++) {
    const d = new Date(thisYear, thisMonth - ago, 1);
    validKeys.add(`${d.getFullYear()}-${d.getMonth()}`);
  }

  // 월별 거래량 합산
  const monthlyVol = {};
  for (let i = 0; i < timestamps.length; i++) {
    if (timestamps[i] < cutoffTs) continue;
    const d = new Date(timestamps[i] * 1000);
    const yr = d.getFullYear();
    const mo = d.getMonth();
    if (yr === thisYear && mo === thisMonth) continue;
    const key = `${yr}-${mo}`;
    monthlyVol[key] = (monthlyVol[key] || 0) + (quotes.volume[i] || 0);
  }

  const keys = Object.keys(monthlyVol);
  if (keys.length < 2) return null;

  const maxVol = Math.max(...Object.values(monthlyVol));
  const topKey = keys.find(k => monthlyVol[k] === maxVol);
  if (!validKeys.has(topKey)) return null;

  // 거래량 최고 달 양봉 조건
  if (useBullish && !isCoin) {
    const [topYrStr, topMoStr] = topKey.split('-');
    const topYr = parseInt(topYrStr),
      topMo = parseInt(topMoStr);
    const opens = quotes.open || [];
    const topOpens = [],
      topCloses = [];
    for (let i = 0; i < timestamps.length; i++) {
      const d = new Date(timestamps[i] * 1000);
      if (d.getFullYear() === topYr && d.getMonth() === topMo) {
        if (opens[i] != null) topOpens.push(opens[i]);
        if (quotes.close[i] != null) topCloses.push(quotes.close[i]);
      }
    }
    if (topOpens.length === 0 || topCloses.length === 0) return null;
    if (topCloses[topCloses.length - 1] <= topOpens[0]) return null;
  }

  // 월봉 종가 배열 (MA 계산용)
  let monthClosesCommon = [];
  if (monthData?.chart?.result?.[0]) {
    const mQuotes = monthData.chart.result[0].indicators.quote[0];
    if (mQuotes?.close) monthClosesCommon = mQuotes.close.filter(v => v != null);
  }

  // MA 조건 체크
  let maGap = null,
    maValue = null;
  if (maConfig) {
    if (monthClosesCommon.length < maConfig.maPeriod) return null;
    const slice = monthClosesCommon.slice(-maConfig.maPeriod);
    const ma = slice.reduce((a, b) => a + b, 0) / maConfig.maPeriod;
    const current = monthClosesCommon[monthClosesCommon.length - 1];
    const gap = ((current - ma) / ma) * 100;
    if (gap < maConfig.minGap || gap > maConfig.maxGap) return null;
    maGap = gap.toFixed(2);
    maValue = isCoin ? ma.toFixed(4) : Math.round(ma).toLocaleString();
  }

  // MA120 조건 체크
  if (ma120Config) {
    if (monthClosesCommon.length < 120) return null;
    const ma10val = monthClosesCommon.slice(-10).reduce((a, b) => a + b, 0) / 10;
    const ma120val = monthClosesCommon.slice(-120).reduce((a, b) => a + b, 0) / 120;
    const gap = ((ma120val - ma10val) / ma10val) * 100;
    if (gap < ma120Config.minGap || gap > ma120Config.maxGap) return null;
    if (ma120Config.direction === 'above' && ma120val <= ma10val) return null;
    if (ma120Config.direction === 'below' && ma120val >= ma10val) return null;
  }

  // MA60 조건 체크
  if (useMA60) {
    if (monthClosesCommon.length < 60) return null;
    const ma10val = monthClosesCommon.slice(-10).reduce((a, b) => a + b, 0) / 10;
    const ma60val = monthClosesCommon.slice(-60).reduce((a, b) => a + b, 0) / 60;
    if (ma60val <= ma10val) return null;
  }

  const closes = quotes.close.filter(v => v != null);
  const current = closes[closes.length - 1];
  const market = stock.code.endsWith('.KS') ? 'KOSPI' : stock.code.endsWith('.KQ') ? 'KOSDAQ' : 'COIN';
  const cleanCode = stock.code.replace('.KS', '').replace('.KQ', '').replace('-USD', '');
  const [topYr, topMo] = topKey.split('-');

  return {
    market,
    code: cleanCode,
    name: stock.name,
    isCoin,
    price: isCoin ? current.toFixed(4) : Math.round(current).toLocaleString(),
    topMonthLabel: `${topYr}년 ${parseInt(topMo) + 1}월`,
    topMonthVol: Math.round(monthlyVol[topKey]).toLocaleString(),
    maGap,
    maValue
  };
}

// =============================================
// 전월 거래량 최고 스캐너 v3
// =============================================

function toggleV3MA() {
  const checked = document.getElementById('v3UseMA').checked;
  document.getElementById('v3MAOptions').style.display = checked ? 'block' : 'none';
}

function toggleV3Gap(type) {
  if (type === 'min') {
    const toggle = document.getElementById('v3MinGapToggle');
    const input = document.getElementById('v3MinGap');
    input.disabled = !toggle.checked;
    if (!toggle.checked) input.value = '5';
  } else {
    const toggle = document.getElementById('v3MaxGapToggle');
    const input = document.getElementById('v3MaxGap');
    input.disabled = !toggle.checked;
    if (!toggle.checked) input.value = '100';
  }
}

function startV3Scan() {
  const months = parseInt(document.getElementById('v3Months').value) || 6;
  const minAgo = parseInt(document.getElementById('v3MinAgo').value) || 1;
  const maxAgo = parseInt(document.getElementById('v3MaxAgo').value) || 3;

  if (minAgo > maxAgo) {
    alert('거래량 최고 달 범위: 최솟값이 최댓값보다 클 수 없습니다.');
    return;
  }

  let kospiCount = parseInt(document.getElementById('v3KospiCount').value) || 0;
  let kosdaqCount = parseInt(document.getElementById('v3KosdaqCount').value) || 0;
  let coinCount = parseInt(document.getElementById('v3CoinCount').value) || 0;

  if (kospiCount === 0 && kosdaqCount === 0 && coinCount === 0) {
    alert('스캔 수량을 하나 이상 입력해주세요.');
    return;
  }

  const useMA = document.getElementById('v3UseMA').checked;
  let maConfig = null;
  if (useMA) {
    const maPeriod = parseInt(document.getElementById('v3MAPeriod').value);
    const minGap = parseFloat(document.getElementById('v3MinGap').value);
    const maxGap = parseFloat(document.getElementById('v3MaxGap').value);
    if (!maPeriod || maPeriod < 1) {
      alert('MA 기간을 입력해주세요.');
      return;
    }
    if (isNaN(minGap) || isNaN(maxGap)) {
      alert('괴리율 범위를 입력해주세요.');
      return;
    }
    if (minGap >= maxGap) {
      alert('괴리율 최솟값은 최댓값보다 작아야 합니다.');
      return;
    }
    maConfig = { maPeriod, minGap, maxGap };
  }

  const useBullish = document.getElementById('v3Bullish').checked;

  kospiCount = Math.min(kospiCount, KOSPI200_LIST.length);
  kosdaqCount = Math.min(kosdaqCount, KOSDAQ150_LIST.length);
  coinCount = Math.min(coinCount, COIN_LIST.length);

  const stockList = [
    ...KOSPI200_LIST.slice(0, kospiCount),
    ...KOSDAQ150_LIST.slice(0, kosdaqCount),
    ...COIN_LIST.slice(0, coinCount)
  ];

  runV3Scan(stockList, months, minAgo, maxAgo, maConfig, useBullish);
}

function clearV3Results() {
  document.getElementById('v3Results').innerHTML = `
    <div class="text-center text-muted" style="padding: 40px;">
      <h5>검색 결과가 여기에 표시됩니다</h5>
      <p>위의 버튼을 클릭하여 스캔을 시작하세요</p>
    </div>`;
  document.getElementById('v3ResultSummary').textContent = '';
  document.getElementById('v3Progress').style.display = 'none';
}

async function runV3Scan(stockList, months, minAgo, maxAgo, maConfig, useBullish) {
  const progressEl = document.getElementById('v3Progress');
  const progressBar = document.getElementById('v3ProgressBar');
  const progressText = document.getElementById('v3ProgressText');
  const progressCount = document.getElementById('v3ProgressCount');
  const resultsEl = document.getElementById('v3Results');
  const summaryEl = document.getElementById('v3ResultSummary');

  progressEl.style.display = 'block';

  resultsEl.innerHTML = `
    <div class="mb-4">
      <h6 class="px-3 pt-3"><span class="badge bg-success me-2">KOSPI200</span><span id="v3KospiMatchCount">0</span>개 종목</h6>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr><th>#</th><th>종목코드</th><th>종목명</th><th>현재가</th><th>거래량 최고 달</th><th>MA</th><th>괴리율</th></tr>
          </thead>
          <tbody id="v3KospiBody"></tbody>
        </table>
      </div>
    </div>
    <hr>
    <div class="mb-4">
      <h6 class="px-3"><span class="badge bg-warning me-2">KOSDAQ150</span><span id="v3KosdaqMatchCount">0</span>개 종목</h6>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-dark">
            <tr><th>#</th><th>종목코드</th><th>종목명</th><th>현재가</th><th>거래량 최고 달</th><th>MA</th><th>괴리율</th></tr>
          </thead>
          <tbody id="v3KosdaqBody"></tbody>
        </table>
      </div>
    </div>`;

  let totalMatched = 0,
    kospiCount = 0,
    kosdaqCount = 0;
  const total = stockList.length;

  for (let i = 0; i < total; i++) {
    const stock = stockList[i];
    progressText.textContent = `분석 중: ${stock.name}`;
    progressCount.textContent = `${i + 1} / ${total}`;
    progressBar.style.width = `${Math.round(((i + 1) / total) * 100)}%`;

    try {
      const result = await fetchAndCheckV3(stock, months, minAgo, maxAgo, maConfig, useBullish);
      if (result) {
        totalMatched++;
        const unit = '원';
        const maCell =
          result.maGap !== null
            ? `<span class="badge bg-label-secondary me-1">MA${maConfig?.maPeriod}: ${result.maValue}${unit}</span>
             <span class="badge ${parseFloat(result.maGap) >= 0 ? 'bg-label-danger' : 'bg-label-primary'}">${parseFloat(result.maGap) >= 0 ? '+' : ''}${result.maGap}%</span>`
            : `<span class="text-muted small">-</span>`;

        const row = `
          <tr>
            <td>-</td>
            <td><a href="${buildTradingViewUrl(result.code, result.market)}" target="_blank"><code>${result.code}</code></a></td>
            <td><strong>${result.name}</strong></td>
            <td>${result.price}${unit}</td>
            <td><span class="badge bg-label-danger">${result.topMonthLabel}</span></td>
            <td colspan="2">${maCell}</td>
          </tr>`;

        if (result.market === 'KOSPI') {
          kospiCount++;
          document.getElementById('v3KospiBody').insertAdjacentHTML('beforeend', row);
          document.getElementById('v3KospiMatchCount').textContent = kospiCount;
        } else {
          kosdaqCount++;
          document.getElementById('v3KosdaqBody').insertAdjacentHTML('beforeend', row);
          document.getElementById('v3KosdaqMatchCount').textContent = kosdaqCount;
        }
        summaryEl.textContent = `현재까지 ${totalMatched}개 종목 발견`;
      }
    } catch (e) {
      console.warn(`${stock.name} 실패:`, e);
    }
    await stockSleep(STOCK_CONFIG.REQUEST_DELAY);
  }

  progressEl.style.display = 'none';
  summaryEl.textContent = `총 ${totalMatched}개 종목 발견`;
}

async function fetchAndCheckV3(stock, months, minAgo, maxAgo, maConfig, useBullish) {
  const dailyUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${stock.code}?interval=1d&range=2y`;
  const makeProxies = url => [
    `http://moda.dothome.co.kr/proxy.php?url=${encodeURIComponent(url)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    `https://api.codetabs.com/v1/proxy?quest=${url}`,
    `https://corsproxy.io/?${url}`
  ];

  let data = null;
  for (const url of makeProxies(dailyUrl)) {
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

  // MA60, MA120 필수 → 월봉 15년치 항상 요청
  let monthData = null;
  const monthUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${stock.code}?interval=1mo&range=15y`;
  for (const url of makeProxies(monthUrl)) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      monthData = await res.json();
      if (monthData?.chart?.result?.[0]) break;
    } catch (e) {
      continue;
    }
  }
  if (!monthData?.chart?.result?.[0]) return null;

  const chart = data.chart.result[0];
  const timestamps = chart.timestamp || [];
  const quotes = chart.indicators.quote[0];
  if (!quotes || !quotes.volume || !quotes.close) return null;

  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth();

  const cutoffDate = new Date(thisYear, thisMonth - months, 1);
  const cutoffTs = cutoffDate.getTime() / 1000;

  const validKeys = new Set();
  for (let ago = minAgo; ago <= maxAgo; ago++) {
    const d = new Date(thisYear, thisMonth - ago, 1);
    validKeys.add(`${d.getFullYear()}-${d.getMonth()}`);
  }

  const monthlyVol = {};
  for (let i = 0; i < timestamps.length; i++) {
    if (timestamps[i] < cutoffTs) continue;
    const d = new Date(timestamps[i] * 1000);
    const yr = d.getFullYear();
    const mo = d.getMonth();
    if (yr === thisYear && mo === thisMonth) continue;
    const key = `${yr}-${mo}`;
    monthlyVol[key] = (monthlyVol[key] || 0) + (quotes.volume[i] || 0);
  }

  const keys = Object.keys(monthlyVol);
  if (keys.length < 2) return null;

  const maxVol = Math.max(...Object.values(monthlyVol));
  const topKey = keys.find(k => monthlyVol[k] === maxVol);
  if (!validKeys.has(topKey)) return null;

  const [topYrStr, topMoStr] = topKey.split('-');
  const topYr = parseInt(topYrStr);
  const topMo = parseInt(topMoStr);

  // 양봉 조건
  const opens = quotes.open || [];
  const highs = quotes.high || [];
  const topOpens = [],
    topCloses = [],
    topHighs = [];
  for (let i = 0; i < timestamps.length; i++) {
    const d = new Date(timestamps[i] * 1000);
    if (d.getFullYear() === topYr && d.getMonth() === topMo) {
      if (opens[i] != null) topOpens.push(opens[i]);
      if (quotes.close[i] != null) topCloses.push(quotes.close[i]);
      if (highs[i] != null) topHighs.push(highs[i]);
    }
  }
  if (topOpens.length === 0 || topCloses.length === 0 || topHighs.length === 0) return null;

  if (useBullish) {
    if (topCloses[topCloses.length - 1] <= topOpens[0]) return null;
  }

  // 월봉 MA 계산
  const mQuotes = monthData.chart.result[0].indicators.quote[0];
  if (!mQuotes?.close) return null;
  const monthCloses = mQuotes.close.filter(v => v != null);

  // MA120 > MA60 조건 체크
  if (monthCloses.length < 120) return null;
  const ma60val = monthCloses.slice(-60).reduce((a, b) => a + b, 0) / 60;
  const ma120val = monthCloses.slice(-120).reduce((a, b) => a + b, 0) / 120;
  if (ma120val <= ma60val) return null;

  // 거래량 터진 달 고가(위꼬리)가 MA60 아래인지 체크
  const mTimestamps = monthData.chart.result[0].timestamp || [];
  const mHighsRaw = monthData.chart.result[0].indicators.quote[0].high || [];
  let topMonthHigh = null;
  for (let i = 0; i < mTimestamps.length; i++) {
    const d = new Date(mTimestamps[i] * 1000);
    if (d.getFullYear() === topYr && d.getMonth() === topMo) {
      if (mHighsRaw[i] != null) topMonthHigh = mHighsRaw[i];
      break;
    }
  }
  if (topMonthHigh === null) return null;
  if (topMonthHigh >= ma60val) return null;

  // MA 괴리율 조건
  let maGap = null,
    maValue = null;
  if (maConfig) {
    if (monthCloses.length < maConfig.maPeriod) return null;
    const slice = monthCloses.slice(-maConfig.maPeriod);
    const ma = slice.reduce((a, b) => a + b, 0) / maConfig.maPeriod;
    const current = monthCloses[monthCloses.length - 1];
    const gap = ((current - ma) / ma) * 100;
    if (gap < maConfig.minGap || gap > maConfig.maxGap) return null;
    maGap = gap.toFixed(2);
    maValue = Math.round(ma).toLocaleString();
  }

  const closes = quotes.close.filter(v => v != null);
  const current = closes[closes.length - 1];
  const market = stock.code.endsWith('.KS') ? 'KOSPI' : 'KOSDAQ';
  const cleanCode = stock.code.replace('.KS', '').replace('.KQ', '');

  return {
    market,
    code: cleanCode,
    name: stock.name,
    isCoin: false,
    price: Math.round(current).toLocaleString(),
    topMonthLabel: `${topYr}년 ${topMo + 1}월`,
    maGap,
    maValue
  };
}
