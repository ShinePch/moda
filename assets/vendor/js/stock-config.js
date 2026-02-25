const STOCK_CONFIG = {
  TOUCH_RANGE: 0.03, // MA10 ±3% 터치 허용 범위
  REQUEST_DELAY: 500, // Yahoo Finance 요청 간격 (ms) - 차단 방지
  MA_PERIOD: 10, // 이동평균 기간 (월봉 기준)
  YAHOO_RANGE: '3y', // Yahoo Finance 데이터 조회 기간
  YAHOO_INTERVAL: '1mo' // Yahoo Finance 캔들 단위 (월봉)
};

const MA644_CONFIG = {
  TOUCH_RANGE: 0.03,
  REQUEST_DELAY: 600,
  MA_PERIODS: [448, 644],
  TIMEFRAMES: {
    '1m': { interval: '1m', range: '7d', label: '1분봉', aggregate: 1 },
    '5m': { interval: '5m', range: '60d', label: '5분봉', aggregate: 1 },
    '15m': { interval: '15m', range: '60d', label: '15분봉', aggregate: 1 },
    '60m': { interval: '60m', range: '730d', label: '60분봉', aggregate: 1 },
    '240m': { interval: '60m', range: '730d', label: '240분봉', aggregate: 4 },
    '1d': { interval: '1d', range: '4y', label: '일봉', aggregate: 1 }
  }
};
