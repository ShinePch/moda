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

// 트레이딩뷰 URL 생성
function buildTradingViewUrl(code, market) {
  if (market === 'COIN') {
    return `https://kr.tradingview.com/chart/?symbol=BINANCE%3A${code}USDT`;
  }
  return `https://kr.tradingview.com/chart/?symbol=KRX%3A${code}`;
}
