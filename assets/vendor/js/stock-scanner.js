// 스캔 시작 (체크박스 + 입력값 기반)
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
      <h5>🎯 검색 결과가 여기에 표시됩니다</h5>
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
  resultsEl.innerHTML = `
    <div class="text-center p-4">
      <div class="spinner-border text-primary"></div>
      <p class="mt-2">스캔 중...</p>
    </div>`;

  const matched = [];
  const total = stockList.length;

  for (let i = 0; i < total; i++) {
    const stock = stockList[i];

    progressText.textContent = `분석 중: ${stock.name}`;
    progressCount.textContent = `${i + 1} / ${total}`;
    progressBar.style.width = `${Math.round(((i + 1) / total) * 100)}%`;

    try {
      const result = await fetchAndCheckMA10(stock);
      if (result) matched.push(result);
    } catch (e) {
      console.warn(`${stock.name} 실패:`, e);
    }

    await stockSleep(STOCK_CONFIG.REQUEST_DELAY);
  }

  progressEl.style.display = 'none';
  summaryEl.textContent = `총 ${matched.length}개 종목 발견`;
  renderStockResults(matched);
}

// Yahoo Finance에서 월봉 데이터 가져와서 MA10 체크
async function fetchAndCheckMA10(stock) {
  const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${stock.code}?interval=${STOCK_CONFIG.YAHOO_INTERVAL}&range=${STOCK_CONFIG.YAHOO_RANGE}`;

  const proxies = [
    `https://corsproxy.io/?${yahooUrl}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(yahooUrl)}`,
    `https://cors-anywhere.herokuapp.com/${yahooUrl}`
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

  if (diff <= STOCK_CONFIG.TOUCH_RANGE) {
    return {
      market: stock.code.endsWith('.KS') ? 'KOSPI' : stock.code.endsWith('.KQ') ? 'KOSDAQ' : 'COIN',
      code: stock.code.replace('.KS', '').replace('.KQ', ''),
      name: stock.name,
      current: Math.round(current).toLocaleString(),
      ma10: Math.round(ma10).toLocaleString(),
      gap: (((current - ma10) / ma10) * 100).toFixed(2)
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

  function buildTable(list) {
    if (list.length === 0) return `<p class="text-muted p-3">해당 없음</p>`;
    let rows = '';
    list.forEach((r, index) => {
      const gapNum = parseFloat(r.gap);
      const badgeClass = gapNum >= 0 ? 'bg-label-danger' : 'bg-label-primary';
      const gapText = gapNum >= 0 ? `+${r.gap}%` : `${r.gap}%`;
      rows += `
        <tr>
          <td>${index + 1}</td>
          <td><code>${r.code}</code></td>
          <td><strong>${r.name}</strong></td>
          <td>${r.current}원</td>
          <td>${r.ma10}원</td>
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

  const coinList = results.filter(r => r.market === 'COIN');

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
