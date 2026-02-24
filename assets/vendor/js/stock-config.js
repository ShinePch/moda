const STOCK_CONFIG = {
  TOUCH_RANGE: 0.03, // MA10 ±3% 터치 허용 범위
  REQUEST_DELAY: 500, // Yahoo Finance 요청 간격 (ms) - 차단 방지
  MA_PERIOD: 10, // 이동평균 기간 (월봉 기준)
  YAHOO_RANGE: '3y', // Yahoo Finance 데이터 조회 기간
  YAHOO_INTERVAL: '1mo' // Yahoo Finance 캔들 단위 (월봉)
};
