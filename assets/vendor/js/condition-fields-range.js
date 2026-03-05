// 범위지정 FIELDS
const CONDITION_FIELDS_RANGE = {
  'range_market': {
    label: '코스피/코스닥 구분',
    fields: [
      { id: 'market', type: 'select', label: '시장구분',
        options: ['코스피', 'KOSPI200', 'KOSPI100', 'KOSPI50', '코스닥', '코스닥150', 'KRX300', 'KRX100'] },
    ],
    buildLabel: function(v) { return '시장: ' + v.market; }
  },
  'range_index_change': {
    label: '지수등락률',
    fields: [
      { id: 'index_type', type: 'select', label: '지수',
        options: ['코스피종합', '코스닥종합', 'KOSPI200', '코스피대형주', '코스피중형주', '코스피소형주'] },
      { id: 'mode',   type: 'select', label: '방식', options: ['이상', '범위'] },
      { id: 'value1', type: 'number', label: '등락률(%)', default: 0.2, min: -100, max: 100, step: 0.1 },
      { id: 'value2', type: 'number', label: '~상한(%)',  default: 0.5, min: -100, max: 100, step: 0.1 },
    ],
    buildLabel: function(v) {
      return v.mode === '범위'
        ? v.index_type + ' 등락률 ' + v.value1 + '%~' + v.value2 + '%'
        : v.index_type + ' 등락률 ' + v.value1 + '% ' + v.mode;
    }
  },
  'range_search_time': {
    label: '검색시간',
    fields: [
      { id: 'hour',  type: 'number', label: '시',       default: 9,  min: 9,  max: 15 },
      { id: 'min_s', type: 'number', label: '분(시작)', default: 0,  min: 0,  max: 59 },
      { id: 'min_e', type: 'number', label: '분(종료)', default: 15, min: 0,  max: 59 },
      { id: 'sec',   type: 'number', label: '초',       default: 20, min: 0,  max: 59 },
    ],
    buildLabel: function(v) {
      return '검색시간: ' + v.hour + ':' + String(v.min_s).padStart(2,'0')
           + ' ~ ' + v.hour + ':' + String(v.min_e).padStart(2,'0')
           + ':' + String(v.sec).padStart(2,'0');
    }
  },
  'range_capital': {
    label: '자본금',
    fields: [
      { id: 'mode',   type: 'select', label: '방식',         options: ['이상', '범위'] },
      { id: 'value1', type: 'number', label: '자본금(억원)', default: 10,   min: 0 },
      { id: 'value2', type: 'number', label: '~이하(억원)',  default: 1000, min: 0 },
    ],
    buildLabel: function(v) {
      return v.mode === '범위'
        ? '자본금 ' + Number(v.value1).toLocaleString() + '억~' + Number(v.value2).toLocaleString() + '억원'
        : '자본금 ' + Number(v.value1).toLocaleString() + '억원 ' + v.mode;
    }
  },
  'range_shares': {
    label: '상장주식수',
    fields: [
      { id: 'min', type: 'number', label: '이상(주)', default: 1000000, min: 0 },
      { id: 'max', type: 'number', label: '이하(주)', default: 2000000, min: 0 },
    ],
    buildLabel: function(v) {
      return '상장주식수 ' + Number(v.min).toLocaleString() + '주 이상 ' + Number(v.max).toLocaleString() + '주 이하';
    }
  },
  'range_mktcap': {
    label: '시가총액',
    fields: [
      { id: 'mode',   type: 'select', label: '방식',           options: ['이상', '범위'] },
      { id: 'value1', type: 'number', label: '시총(십억원)',   default: 10,    min: 0 },
      { id: 'value2', type: 'number', label: '~이하(십억원)',  default: 50000, min: 0 },
    ],
    buildLabel: function(v) {
      return v.mode === '범위'
        ? '시가총액 ' + Number(v.value1).toLocaleString() + '십억~' + Number(v.value2).toLocaleString() + '십억원'
        : '시가총액 ' + Number(v.value1).toLocaleString() + '십억원 ' + v.mode;
    }
  },
  'range_parvalue': {
    label: '액면가',
    fields: [
      { id: 'min', type: 'number', label: '이상(원)', default: 1,     min: 0 },
      { id: 'max', type: 'number', label: '이하(원)', default: 10000, min: 0 },
    ],
    buildLabel: function(v) {
      return '액면가 ' + Number(v.min).toLocaleString() + '원 이상 ' + Number(v.max).toLocaleString() + '원 이하';
    }
  },
  'range_listdate': {
    label: '상장일',
    fields: [
      { id: 'days', type: 'number', label: '이내(영업일)', default: 30, min: 1 },
    ],
    buildLabel: function(v) { return '상장일 ' + Number(v.days).toLocaleString() + '일(영업일) 이내'; }
  },
  'range_margin': {
    label: '증거금률',
    fields: [
      { id: 'rate', type: 'select', label: '증거금률',
        options: ['증거금 20%', '증거금 30%', '증거금 40%', '증거금 50%', '증거금 60%', '증거금 100%'] },
    ],
    buildLabel: function(v) { return v.rate; }
  },
  'range_credit': {
    label: '신용융자',
    fields: [
      { id: 'credit_type', type: 'select', label: '신용융자 구분',
        options: ['신용융자 전체', '신용융자 ABCD군', '신용융자 ABC군', '신용융자 A군', '신용융자 B군',
                  '신용융자 C군', '신용융자 D군', '신용융자 E군', '신용한도초과'] },
    ],
    buildLabel: function(v) { return v.credit_type; }
  },
  'range_price': {
    label: '주가범위',
    fields: [
      { id: 'prev_days',  type: 'number', label: '일전기준',  default: 0,     min: 0 },
      { id: 'price_type', type: 'select', label: '기준가격',  options: ['종가', '시가', '고가', '저가'] },
      { id: 'min',        type: 'number', label: '이상(원)',  default: 10000, min: 0 },
      { id: 'max',        type: 'number', label: '이하(원)',  default: 20000, min: 0 },
    ],
    buildLabel: function(v) {
      return '주가범위 [' + v.prev_days + '일전 ' + v.price_type + '] '
           + Number(v.min).toLocaleString() + '~' + Number(v.max).toLocaleString() + '원';
    }
  },
  'range_volume': {
    label: '거래량',
    fields: [
      { id: 'period_type', type: 'select', label: '단위',     options: ['일', '주', '월'] },
      { id: 'min',         type: 'number', label: '이상(주)', default: 1000000,   min: 0 },
      { id: 'max',         type: 'number', label: '이하(주)', default: 999999999, min: 0 },
    ],
    buildLabel: function(v) {
      return '거래량 [' + v.period_type + '] '
           + Number(v.min).toLocaleString() + '주 이상 '
           + Number(v.max).toLocaleString() + '주 이하';
    }
  },
  'range_prev_volume': {
    label: '전일거래량',
    fields: [
      { id: 'period_type', type: 'select', label: '단위',     options: ['일', '주', '월'] },
      { id: 'prev_candle', type: 'number', label: '봉전',     default: 1,         min: 1 },
      { id: 'min',         type: 'number', label: '이상(주)', default: 1000000,   min: 0 },
      { id: 'max',         type: 'number', label: '이하(주)', default: 999999999, min: 0 },
    ],
    buildLabel: function(v) {
      return '전일거래량 [' + v.period_type + '] ' + v.prev_candle + '봉전 '
           + Number(v.min).toLocaleString() + '~' + Number(v.max).toLocaleString() + '주';
    }
  },
  'range_other_type': {
    label: '기타종목구분',
    fields: [
      { id: 'stock_type', type: 'select', label: '종목구분',
        options: ['우선주', 'ETF', 'REITS 종목', '투자회사', '선박투자', '인프라투자', '대주가능', '스팩', 'ETN', 'NXT가능'] },
    ],
    buildLabel: function(v) { return '기타종목구분: ' + v.stock_type; }
  },
  'range_special_type': {
    label: '특이종목구분',
    fields: [
      { id: 'special_type', type: 'select', label: '특이구분',
        options: ['정리매매', '관리', '투자위험', '투자경고', '투자주의', '거래정지', '환기', '불성실공시', '단기과열', '이상급등', '공매도과열'] },
    ],
    buildLabel: function(v) { return '특이종목구분: ' + v.special_type; }
  },
  'range_float_shares': {
    label: '유통주식수',
    fields: [
      { id: 'min', type: 'number', label: '이상(주)', default: 1000000, min: 0 },
      { id: 'max', type: 'number', label: '이하(주)', default: 2000000, min: 0 },
    ],
    buildLabel: function(v) {
      return '유통주식수 ' + Number(v.min).toLocaleString() + '주 이상 ' + Number(v.max).toLocaleString() + '주 이하';
    }
  },
  'range_float_ratio': {
    label: '상장주식수 대비 유통주식수 비율',
    fields: [
      { id: 'mode',   type: 'select', label: '방식',    options: ['이상', '범위'] },
      { id: 'value1', type: 'number', label: '비율(%)',  default: 50,  min: 0, max: 100, step: 0.1 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 100, min: 0, max: 100, step: 0.1 },
    ],
    buildLabel: function(v) {
      return v.mode === '범위'
        ? '유통비율 ' + v.value1 + '%~' + v.value2 + '%'
        : '유통비율 ' + v.value1 + '% ' + v.mode;
    }
  },
};
