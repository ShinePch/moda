// api.js - Bybit API 기능

// Bybit API 관련 변수들
let bybitApiKey = '';
let bybitApiSecret = '';
let isBybitScanning = false;

// API 설정 가져오기
function getBybitApiConfig() {
    const keyInput = document.getElementById('bybitApiKey');
    const secretInput = document.getElementById('bybitApiSecret');
    
    if (!keyInput || !secretInput) {
        console.error('API 입력 필드를 찾을 수 없습니다');
        return false;
    }
    
    bybitApiKey = keyInput.value.trim();
    bybitApiSecret = secretInput.value.trim();
    
    if (!bybitApiKey || !bybitApiSecret) {
        showBybitError('API Key와 Secret을 입력해주세요');
        return false;
    }
    return true;
}

// Bybit API 서명 생성
function generateBybitSignature(timestamp, params) {
    const queryString = new URLSearchParams(params).toString();
    const payload = timestamp + bybitApiKey + '5000' + queryString;
    return CryptoJS.HmacSHA256(payload, bybitApiSecret).toString();
}

// API 호출 함수
async function callBybitAPI(endpoint, params = {}) {
    if (!getBybitApiConfig()) return null;

    const timestamp = Date.now().toString();
    const signature = generateBybitSignature(timestamp, params);
    
    const queryString = new URLSearchParams(params).toString();
    const url = `https://api.bybit.com${endpoint}?${queryString}`;

    try {
        const response = await fetch(url, {
            headers: {
                'X-BAPI-API-KEY': bybitApiKey,
                'X-BAPI-SIGN': signature,
                'X-BAPI-SIGN-TYPE': '2',
                'X-BAPI-TIMESTAMP': timestamp,
                'X-BAPI-RECV-WINDOW': '5000'
            }
        });

        const data = await response.json();
        if (data.retCode !== 0) {
            throw new Error(data.retMsg || 'API 오류');
        }
        return data.result;
    } catch (error) {
        console.error('API 호출 오류:', error);
        throw error;
    }
}

// 연결 테스트
async function testBybitConnection() {
    console.log('🔍 연결 테스트 시작');
    if (!getBybitApiConfig()) return;

    showBybitLoading('API 연결을 테스트하는 중...');
    
    try {
        const serverTime = await callBybitAPI('/v5/market/time');
        const tickers = await callBybitAPI('/v5/market/tickers', { category: 'spot', symbol: 'BTCUSDT' });
        
        const btcPrice = parseFloat(tickers.list[0].lastPrice);
        
        showBybitResults(`
            <div class="alert alert-success">
                <h5>✅ 연결 성공!</h5>
                <p class="mb-1">비트코인 현재가: $${btcPrice.toLocaleString()}</p>
                <p class="mb-0">서버 시간: ${new Date(parseInt(serverTime.timeSecond) * 1000).toLocaleString()}</p>
            </div>
        `);
    } catch (error) {
        showBybitError(`연결 실패: ${error.message}`);
    }
}

// 빠른 스캔
async function quickBybitScan() {
    console.log('⚡ 빠른 스캔 시작');
    if (!getBybitApiConfig() || isBybitScanning) return;

    isBybitScanning = true;
    showBybitLoading('빠른 스캔 중... (50개 코인 검사)');

    try {
        const popularCoins = [
            'BTCUSDT', 'ETHUSDT', 'XRPUSDT', 'ADAUSDT', 'SOLUSDT', 'DOTUSDT', 'LINKUSDT', 'AVAXUSDT',
            'MATICUSDT', 'ATOMUSDT', 'NEARUSDT', 'ALGOUSDT', 'VETUSDT', 'ICPUSDT', 'FILUSDT',
            'TRXUSDT', 'ETCUSDT', 'XLMUSDT', 'AAVEUSDT', 'UNIUSDT', 'LTCUSDT', 'BCHUSDT',
            'DOGEUSDT', 'SHIBUSDT', 'PEPEUSDT', 'FLOKIUSDT', 'BONKUSDT', 'WIFUSDT', 'NOTUSDT',
            'THETAUSDT', 'CHZUSDT', 'MANAUSDT', 'SANDUSDT', 'AXSUSDT', 'ENJUSDT', 'GALAUSDT',
            'FLOWUSDT', 'GRTUSDT', 'YGGUSDT', 'SLPUSDT', 'TLMUSDT', 'ALICEUSDT', 'CHROUSDT',
            'COTIUSDT', 'CTSIUSDT', 'CVCUSDT', 'DIAUSDT', 'FIDAUSDT', 'FORMUSDT', 'GHSTUSDT', 'HBARUSDT'
        ];

        const results = [];
        let progressHtml = `
            <div class="progress mb-3">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%" id="bybitProgressBar"></div>
            </div>
            <p class="text-center" id="bybitProgressText">0/50 완료</p>
        `;
        showBybitResults(progressHtml);

        for (let i = 0; i < popularCoins.length; i++) {
            const symbol = popularCoins[i];
            
            try {
                const ticker = await callBybitAPI('/v5/market/tickers', { 
                    category: 'spot', 
                    symbol: symbol 
                });

                if (ticker.list && ticker.list.length > 0) {
                    const coin = ticker.list[0];
                    const price = parseFloat(coin.lastPrice);
                    const change24h = parseFloat(coin.price24hPcnt) * 100;
                    const volume = parseFloat(coin.volume24h);

                    if (change24h <= -2) {
                        results.push({
                            symbol: symbol,
                            price: price,
                            change24h: change24h,
                            volume: volume,
                            condition: '24h 하락'
                        });
                    }
                }
            } catch (error) {
                console.log(`${symbol} 오류:`, error.message);
            }

            // 진행률 업데이트
            const progress = ((i + 1) / popularCoins.length) * 100;
            const progressBar = document.getElementById('bybitProgressBar');
            const progressText = document.getElementById('bybitProgressText');
            if (progressBar) progressBar.style.width = `${progress}%`;
            if (progressText) progressText.textContent = `${i + 1}/50 완료`;
            
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        displayBybitScanResults(results, '빠른 스캔');
    } catch (error) {
        showBybitError(`스캔 실패: ${error.message}`);
    } finally {
        isBybitScanning = false;
    }
}

// 전체 스캔 (시뮬레이션)
async function fullBybitScan() {
    console.log('🎯 전체 스캔 시작');
    if (!getBybitApiConfig() || isBybitScanning) return;

    isBybitScanning = true;
    showBybitLoading('전체 스캔 중... (MA448/644 분석)');

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));

        const simulatedResults = [
            { symbol: 'ETHUSDT', price: 2520.10, change24h: 0.89, volume: 55565, condition: 'MA448 아래' },
            { symbol: 'DOTUSDT', price: 4.02, change24h: 2.98, volume: 694201, condition: 'MA644 아래' },
            { symbol: 'AXSUSDT', price: 2.44, change24h: -1.2, volume: 123456, condition: '둘 다 아래' },
            { symbol: 'LINKUSDT', price: 13.82, change24h: 2.76, volume: 320702, condition: 'MA448 아래' },
            { symbol: 'UNIUSDT', price: 6.29, change24h: -0.5, volume: 234567, condition: '둘 다 아래' }
        ];

        displayBybitScanResults(simulatedResults, '전체 스캔 (데모)');
    } catch (error) {
        showBybitError(`스캔 실패: ${error.message}`);
    } finally {
        isBybitScanning = false;
    }
}

// 결과 표시
function displayBybitScanResults(results, scanType) {
    if (results.length === 0) {
        showBybitResults(`
            <div class="alert alert-info">
                <h5>📊 ${scanType} 완료</h5>
                <p class="mb-0">조건에 맞는 코인이 없습니다.</p>
            </div>
        `);
        return;
    }

    const avgPrice = results.reduce((sum, coin) => sum + coin.price, 0) / results.length;
    const avgChange = results.reduce((sum, coin) => sum + coin.change24h, 0) / results.length;

    let html = `
        <div class="alert alert-primary">
            <h5>📊 ${scanType} 결과</h5>
            <div class="row text-center">
                <div class="col-md-4">발견: ${results.length}개</div>
                <div class="col-md-4">평균가격: $${avgPrice.toFixed(4)}</div>
                <div class="col-md-4">평균변동: ${avgChange.toFixed(2)}%</div>
            </div>
        </div>
        <div class="row">
    `;

    results.forEach(coin => {
        const badgeClass = coin.change24h >= 0 ? 'bg-success' : 'bg-danger';
        const changeIcon = coin.change24h >= 0 ? '📈' : '📉';
        
        html += `
            <div class="col-md-6 col-lg-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h6 class="card-title mb-0">${coin.symbol}</h6>
                            <span class="badge ${badgeClass}">${changeIcon} ${coin.change24h.toFixed(2)}%</span>
                        </div>
                        <p class="card-text mb-1">가격: $${coin.price.toLocaleString()}</p>
                        <p class="card-text mb-1">거래량: ${coin.volume.toLocaleString()}</p>
                        <p class="card-text mb-0"><small class="text-muted">조건: ${coin.condition}</small></p>
                    </div>
                </div>
            </div>
        `;
    });

    html += '</div>';
    showBybitResults(html);
}

// UI 헬퍼 함수들
function showBybitLoading(message) {
    const resultsDiv = document.getElementById('bybitResults');
    if (resultsDiv) {
        resultsDiv.innerHTML = `
            <div class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2">${message}</p>
            </div>
        `;
    }
}

function showBybitResults(html) {
    const resultsDiv = document.getElementById('bybitResults');
    if (resultsDiv) {
        resultsDiv.innerHTML = html;
    }
}

function showBybitError(message) {
    const resultsDiv = document.getElementById('bybitResults');
    if (resultsDiv) {
        resultsDiv.innerHTML = `
            <div class="alert alert-danger">
                ❌ ${message}
            </div>
        `;
    }
}

function clearBybitResults() {
    const resultsDiv = document.getElementById('bybitResults');
    if (resultsDiv) {
        resultsDiv.innerHTML = `
            <div class="text-center text-muted" style="padding: 40px;">
                <h5>🎯 검색 결과가 여기에 표시됩니다</h5>
                <p>위의 버튼을 클릭하여 스캔을 시작하세요</p>
            </div>
        `;
    }
}

console.log('✅ api.js 로드 완료 - Bybit API 함수들 준비됨');