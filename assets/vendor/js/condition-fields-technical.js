// 기술적분석 FIELDS
const CONDITION_FIELDS_TECHNICAL = {
  // ==================== 주가이동평균 ====================
  ta_ma_break: {
    label: '주가이동평균돌파',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'price_type', type: 'select', label: '기준가격', options: ['종가', '시가', '고가', '저가'] },
      { id: 'period', type: 'number', label: '이평기간', default: 20, min: 1 },
      { id: 'ma_type', type: 'select', label: '이평종류', options: ['이평', '지수이평', '가중이평'] },
      { id: 'cross_type', type: 'select', label: '조건', options: ['골든크로스', '데드크로스', '위', '아래'] }
    ],
    buildLabel: function (v) {
      return (
        '주가이평돌파:[' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.price_type +
        ' ' +
        v.period +
        v.ma_type +
        ' ' +
        v.cross_type
      );
    }
  },
  ta_ma_break_det: {
    label: '상세이동평균돌파',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'price_type', type: 'select', label: '기준가격', options: ['종가', '시가', '고가', '저가'] },
      { id: 'period', type: 'number', label: '이평기간', default: 20, min: 1 },
      { id: 'ma_type', type: 'select', label: '이평종류', options: ['이평', '지수이평', '가중이평'] },
      { id: 'cross_type', type: 'select', label: '조건', options: ['골든크로스', '데드크로스', '위', '아래'] },
      { id: 'rate', type: 'number', label: '괴리율(%)', default: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return (
        '상세이평돌파:[' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.price_type +
        ' ' +
        v.period +
        v.ma_type +
        ' ' +
        v.cross_type +
        ' ' +
        v.rate +
        '%'
      );
    }
  },
  ta_ma_array3: {
    label: '주가이동평균배열(3개)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period1', type: 'number', label: '이평①', default: 5, min: 1 },
      { id: 'period2', type: 'number', label: '이평②', default: 20, min: 1 },
      { id: 'period3', type: 'number', label: '이평③', default: 60, min: 1 },
      { id: 'array_type', type: 'select', label: '배열', options: ['정배열', '역배열'] }
    ],
    buildLabel: function (v) {
      return (
        '이평배열(3개):[' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.period1 +
        '/' +
        v.period2 +
        '/' +
        v.period3 +
        ' ' +
        v.array_type
      );
    }
  },
  ta_ma_array4: {
    label: '주가이동평균배열(4개)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period1', type: 'number', label: '이평①', default: 5, min: 1 },
      { id: 'period2', type: 'number', label: '이평②', default: 20, min: 1 },
      { id: 'period3', type: 'number', label: '이평③', default: 60, min: 1 },
      { id: 'period4', type: 'number', label: '이평④', default: 120, min: 1 },
      { id: 'array_type', type: 'select', label: '배열', options: ['정배열', '역배열'] }
    ],
    buildLabel: function (v) {
      return (
        '이평배열(4개):[' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.period1 +
        '/' +
        v.period2 +
        '/' +
        v.period3 +
        '/' +
        v.period4 +
        ' ' +
        v.array_type
      );
    }
  },
  ta_ma_compare: {
    label: '주가이동평균비교',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period1', type: 'number', label: '이평①', default: 5, min: 1 },
      { id: 'ma_type1', type: 'select', label: '종류①', options: ['이평', '지수이평', '가중이평'] },
      { id: 'cross_type', type: 'select', label: '조건', options: ['골든크로스', '데드크로스', '위', '아래'] },
      { id: 'period2', type: 'number', label: '이평②', default: 20, min: 1 },
      { id: 'ma_type2', type: 'select', label: '종류②', options: ['이평', '지수이평', '가중이평'] }
    ],
    buildLabel: function (v) {
      return (
        '이평비교:[' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.period1 +
        v.ma_type1 +
        ' ' +
        v.cross_type +
        ' ' +
        v.period2 +
        v.ma_type2
      );
    }
  },
  ta_ma_compare_det: {
    label: '상세이동평균비교',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period1', type: 'number', label: '이평①', default: 5, min: 1 },
      { id: 'ma_type1', type: 'select', label: '종류①', options: ['이평', '지수이평', '가중이평'] },
      { id: 'cross_type', type: 'select', label: '조건', options: ['골든크로스', '데드크로스', '위', '아래'] },
      { id: 'period2', type: 'number', label: '이평②', default: 20, min: 1 },
      { id: 'ma_type2', type: 'select', label: '종류②', options: ['이평', '지수이평', '가중이평'] },
      { id: 'rate', type: 'number', label: '괴리율(%)', default: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return (
        '상세이평비교:[' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.period1 +
        v.ma_type1 +
        ' ' +
        v.cross_type +
        ' ' +
        v.period2 +
        v.ma_type2 +
        ' ' +
        v.rate +
        '%'
      );
    }
  },
  ta_ma_compare2: {
    label: '주가이동평균비교(2개)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period1', type: 'number', label: '이평①', default: 5, min: 1 },
      { id: 'period2', type: 'number', label: '이평②', default: 20, min: 1 },
      { id: 'cross_type', type: 'select', label: '조건①', options: ['골든크로스', '데드크로스', '위', '아래'] },
      { id: 'period3', type: 'number', label: '이평③', default: 60, min: 1 },
      { id: 'cross_type2', type: 'select', label: '조건②', options: ['골든크로스', '데드크로스', '위', '아래'] },
      { id: 'period4', type: 'number', label: '이평④', default: 120, min: 1 }
    ],
    buildLabel: function (v) {
      return (
        '이평비교(2개):[' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.period1 +
        '/' +
        v.period2 +
        ' ' +
        v.cross_type +
        ' AND ' +
        v.period3 +
        '/' +
        v.period4 +
        ' ' +
        v.cross_type2
      );
    }
  },
  ta_ma_compare3: {
    label: '주가이동평균비교(3개)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period1', type: 'number', label: '이평①', default: 5, min: 1 },
      { id: 'period2', type: 'number', label: '이평②', default: 20, min: 1 },
      { id: 'period3', type: 'number', label: '이평③', default: 60, min: 1 },
      { id: 'array_type', type: 'select', label: '배열조건', options: ['정배열', '역배열', '수렴', '발산'] }
    ],
    buildLabel: function (v) {
      return (
        '이평비교(3개):[' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.period1 +
        '/' +
        v.period2 +
        '/' +
        v.period3 +
        ' ' +
        v.array_type
      );
    }
  },
  ta_ma_rate: {
    label: '주가이동평균등락률',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '이평기간', default: 20, min: 1 },
      { id: 'ma_type', type: 'select', label: '이평종류', options: ['이평', '지수이평', '가중이평'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '등락률(%)', default: 1, step: 0.1 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 5, step: 0.1 }
    ],
    buildLabel: function (v) {
      return (
        '이평등락률:[' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.period +
        v.ma_type +
        ' ' +
        v.value1 +
        '%' +
        (v.operator === '범위' ? '~' + v.value2 + '%' : ' ' + v.operator)
      );
    }
  },
  ta_ma_gap: {
    label: '이동평균이격도',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '이평기간', default: 20, min: 1 },
      { id: 'ma_type', type: 'select', label: '이평종류', options: ['이평', '지수이평', '가중이평'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '이격도(%)', default: 105, step: 0.1 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 110, step: 0.1 }
    ],
    buildLabel: function (v) {
      return (
        '이평이격도:[' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.period +
        v.ma_type +
        ' ' +
        v.value1 +
        '%' +
        (v.operator === '범위' ? '~' + v.value2 + '%' : ' ' + v.operator)
      );
    }
  },
  ta_ma_price_diff: {
    label: '가격-이동평균비교',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'price_type', type: 'select', label: '기준가격', options: ['종가', '시가', '고가', '저가'] },
      { id: 'period', type: 'number', label: '이평기간', default: 20, min: 1 },
      { id: 'ma_type', type: 'select', label: '이평종류', options: ['이평', '지수이평', '가중이평'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '차이(원)', default: 0, step: 1 },
      { id: 'value2', type: 'number', label: '~이하(원)', default: 1000, step: 1 }
    ],
    buildLabel: function (v) {
      return (
        '가격-이평비교:[' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.price_type +
        '-' +
        v.period +
        v.ma_type +
        ' ' +
        v.value1 +
        (v.operator === '범위' ? '~' + v.value2 : ' ' + v.operator)
      );
    }
  },
  ta_ma_trend: {
    label: '주가이동평균추세',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '이평기간', default: 20, min: 1 },
      { id: 'ma_type', type: 'select', label: '이평종류', options: ['이평', '지수이평', '가중이평'] },
      { id: 'trend', type: 'select', label: '추세', options: ['상승', '하락', '횡보'] },
      { id: 'count', type: 'number', label: '연속(봉)', default: 3, min: 1 }
    ],
    buildLabel: function (v) {
      return (
        '이평추세:[' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.period +
        v.ma_type +
        ' ' +
        v.trend +
        ' ' +
        v.count +
        '봉'
      );
    }
  },

  // ==================== 거래량이동평균 ====================
  ta_vol_ma_break: {
    label: '거래량이동평균돌파',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '이평기간', default: 20, min: 1 },
      { id: 'ma_type', type: 'select', label: '이평종류', options: ['이평', '지수이평', '가중이평'] },
      { id: 'cross_type', type: 'select', label: '조건', options: ['골든크로스', '데드크로스', '위', '아래'] }
    ],
    buildLabel: function (v) {
      return (
        '거래량이평돌파:[' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.period + v.ma_type + ' ' + v.cross_type
      );
    }
  },
  ta_vol_ma_array: {
    label: '거래량이동평균배열',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period1', type: 'number', label: '이평①', default: 5, min: 1 },
      { id: 'period2', type: 'number', label: '이평②', default: 20, min: 1 },
      { id: 'period3', type: 'number', label: '이평③', default: 60, min: 1 },
      { id: 'array_type', type: 'select', label: '배열', options: ['정배열', '역배열'] }
    ],
    buildLabel: function (v) {
      return (
        '거래량이평배열:[' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.period1 +
        '/' +
        v.period2 +
        '/' +
        v.period3 +
        ' ' +
        v.array_type
      );
    }
  },
  ta_vol_ma_trend: {
    label: '거래량이동평균추세',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '이평기간', default: 20, min: 1 },
      { id: 'ma_type', type: 'select', label: '이평종류', options: ['이평', '지수이평', '가중이평'] },
      { id: 'trend', type: 'select', label: '추세', options: ['상승', '하락', '횡보'] },
      { id: 'count', type: 'number', label: '연속(봉)', default: 3, min: 1 }
    ],
    buildLabel: function (v) {
      return (
        '거래량이평추세:[' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.period +
        v.ma_type +
        ' ' +
        v.trend +
        ' ' +
        v.count +
        '봉'
      );
    }
  },
  ta_vol_ma_rate: {
    label: '거래량이동평균등락률',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '이평기간', default: 20, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '등락률(%)', default: 10, step: 0.1 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 50, step: 0.1 }
    ],
    buildLabel: function (v) {
      return (
        '거래량이평등락률:[' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.period +
        '이평 ' +
        v.value1 +
        '%' +
        (v.operator === '범위' ? '~' + v.value2 + '%' : ' ' + v.operator)
      );
    }
  },

  // ==================== 추세지표 ====================
  ta_macd: {
    label: 'MACD',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'fast_period', type: 'number', label: '단기(fast)', default: 12, min: 1 },
      { id: 'slow_period', type: 'number', label: '장기(slow)', default: 26, min: 1 },
      { id: 'signal', type: 'number', label: '시그널', default: 9, min: 1 },
      {
        id: 'condition',
        type: 'select',
        label: '조건',
        options: ['골든크로스', '데드크로스', '이상', '이하', '0선위', '0선아래']
      },
      { id: 'value', type: 'number', label: '값', default: 0, step: 0.01 }
    ],
    buildLabel: function (v) {
      return (
        'MACD(' +
        v.fast_period +
        ',' +
        v.slow_period +
        ',' +
        v.signal +
        ') [' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.condition
      );
    }
  },
  ta_macd_signal: {
    label: 'MACD Signal',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'fast_period', type: 'number', label: '단기(fast)', default: 12, min: 1 },
      { id: 'slow_period', type: 'number', label: '장기(slow)', default: 26, min: 1 },
      { id: 'signal', type: 'number', label: '시그널', default: 9, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '0선위', '0선아래'] },
      { id: 'value', type: 'number', label: '값', default: 0, step: 0.01 }
    ],
    buildLabel: function (v) {
      return (
        'MACD Signal(' +
        v.fast_period +
        ',' +
        v.slow_period +
        ',' +
        v.signal +
        ') [' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.condition +
        ' ' +
        v.value
      );
    }
  },
  ta_macd_osc: {
    label: 'MACD OSC',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'fast_period', type: 'number', label: '단기(fast)', default: 12, min: 1 },
      { id: 'slow_period', type: 'number', label: '장기(slow)', default: 26, min: 1 },
      { id: 'signal', type: 'number', label: '시그널', default: 9, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '0선위', '0선아래'] },
      { id: 'value', type: 'number', label: '값', default: 0, step: 0.01 }
    ],
    buildLabel: function (v) {
      return (
        'MACD OSC(' +
        v.fast_period +
        ',' +
        v.slow_period +
        ',' +
        v.signal +
        ') [' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.condition +
        ' ' +
        v.value
      );
    }
  },
  ta_price_osc: {
    label: 'Price Oscillator',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'fast_period', type: 'number', label: '단기', default: 12, min: 1 },
      { id: 'slow_period', type: 'number', label: '장기', default: 26, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '0선위', '0선아래'] },
      { id: 'value', type: 'number', label: '값', default: 0, step: 0.01 }
    ],
    buildLabel: function (v) {
      return (
        'Price Oscillator(' +
        v.fast_period +
        ',' +
        v.slow_period +
        ') [' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.condition +
        ' ' +
        v.value
      );
    }
  },
  ta_gmnet: {
    label: '그물망차트',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'condition', type: 'select', label: '조건', options: ['수렴', '발산', '상향수렴', '하향발산'] }
    ],
    buildLabel: function (v) {
      return '그물망차트 [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition;
    }
  },
  ta_lrs: {
    label: 'LRS/LRL',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '기간', default: 14, min: 1 },
      { id: 'target', type: 'select', label: '대상', options: ['LRS', 'LRL'] },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '0선위', '0선아래'] },
      { id: 'value', type: 'number', label: '값', default: 0, step: 0.01 }
    ],
    buildLabel: function (v) {
      return (
        v.target + '(' + v.period + ') [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition + ' ' + v.value
      );
    }
  },
  ta_tsf: {
    label: 'TSF',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '기간', default: 14, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '위', '아래'] },
      { id: 'value', type: 'number', label: '값', default: 0, step: 0.01 }
    ],
    buildLabel: function (v) {
      return 'TSF(' + v.period + ') [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition + ' ' + v.value;
    }
  },
  ta_eom: {
    label: 'EOM(Ease of Movement)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '기간', default: 14, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '0선위', '0선아래'] },
      { id: 'value', type: 'number', label: '값', default: 0, step: 0.0001 }
    ],
    buildLabel: function (v) {
      return 'EOM(' + v.period + ') [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition + ' ' + v.value;
    }
  },
  ta_parabolic: {
    label: 'Parabolic',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'af', type: 'number', label: 'AF(가속인수)', default: 0.02, step: 0.01 },
      { id: 'condition', type: 'select', label: '조건', options: ['매수신호', '매도신호'] }
    ],
    buildLabel: function (v) {
      return 'Parabolic(AF=' + v.af + ') [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition;
    }
  },
  ta_vhf: {
    label: 'VHF',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '기간', default: 28, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '값', default: 0.5, step: 0.01 }
    ],
    buildLabel: function (v) {
      return 'VHF(' + v.period + ') [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition + ' ' + v.value;
    }
  },

  // ==================== 모멘텀지표 ====================
  ta_gap_idx: {
    label: '이격도',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '이평기간', default: 20, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '이격도(%)', default: 105, step: 0.1 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 110, step: 0.1 }
    ],
    buildLabel: function (v) {
      return (
        '이격도(' +
        v.period +
        ') [' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.value1 +
        '%' +
        (v.operator === '범위' ? '~' + v.value2 + '%' : ' ' + v.operator)
      );
    }
  },
  ta_ab_ratio: {
    label: 'AB Ratio',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '기간', default: 14, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '값', default: 0.5, step: 0.01 }
    ],
    buildLabel: function (v) {
      return (
        'AB Ratio(' + v.period + ') [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition + ' ' + v.value
      );
    }
  },
  ta_band_b: {
    label: 'Band %b',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '기간', default: 20, min: 1 },
      { id: 'multiplier', type: 'number', label: '승수(σ)', default: 2, step: 0.1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '값', default: 0, step: 0.01 },
      { id: 'value2', type: 'number', label: '~이하', default: 1, step: 0.01 }
    ],
    buildLabel: function (v) {
      return (
        'Band %b(' +
        v.period +
        ',' +
        v.multiplier +
        ') [' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.value1 +
        (v.condition === '범위' ? '~' + v.value2 : ' ' + v.condition)
      );
    }
  },
  ta_cci: {
    label: 'CCI',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: 'CCI 기간', default: 9, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '골든크로스', '데드크로스'] },
      { id: 'value', type: 'number', label: '값', default: 100, step: 1 }
    ],
    buildLabel: function (v) {
      return 'CCI(' + v.period + ') [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition + ' ' + v.value;
    }
  },
  ta_co: {
    label: "CO(Chaikin's Osc)",
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'fast_period', type: 'number', label: '단기', default: 3, min: 1 },
      { id: 'slow_period', type: 'number', label: '장기', default: 10, min: 1 },
      {
        id: 'condition',
        type: 'select',
        label: '조건',
        options: ['이상', '이하', '골든크로스', '데드크로스', '0선위', '0선아래']
      },
      { id: 'value', type: 'number', label: '값', default: 0, step: 0.01 }
    ],
    buildLabel: function (v) {
      return (
        'CO(' +
        v.fast_period +
        ',' +
        v.slow_period +
        ') [' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.condition +
        ' ' +
        v.value
      );
    }
  },
  ta_momentum_idx: {
    label: 'Momentum',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: 'Momentum 기간', default: 9, min: 1 },
      { id: 'signal', type: 'number', label: '시그널 기간', default: 9, min: 1 },
      {
        id: 'condition',
        type: 'select',
        label: '조건',
        options: ['이상', '이하', '골든크로스', '데드크로스', '0선위', '0선아래']
      },
      { id: 'value', type: 'number', label: '값', default: 0, step: 0.01 }
    ],
    buildLabel: function (v) {
      return (
        'Momentum(' +
        v.period +
        ',' +
        v.signal +
        ') [' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.condition +
        ' ' +
        v.value
      );
    }
  },
  ta_psychology: {
    label: '심리도',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '기간', default: 10, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '값(%)', default: 20, min: 0, max: 100 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 80, min: 0, max: 100 }
    ],
    buildLabel: function (v) {
      return (
        '심리도(' +
        v.period +
        ') [' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.value1 +
        '%' +
        (v.condition === '범위' ? '~' + v.value2 + '%' : ' ' + v.condition)
      );
    }
  },
  ta_new_psych: {
    label: '신심리도',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '기간', default: 10, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '값(%)', default: 20, min: 0, max: 100 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 80, min: 0, max: 100 }
    ],
    buildLabel: function (v) {
      return (
        '신심리도(' +
        v.period +
        ') [' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.value1 +
        '%' +
        (v.condition === '범위' ? '~' + v.value2 + '%' : ' ' + v.condition)
      );
    }
  },
  ta_stoch: {
    label: 'Stochastic(fast)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'k_period', type: 'number', label: '%K 기간', default: 5, min: 1 },
      { id: 'd_period', type: 'number', label: '%D 기간', default: 3, min: 1 },
      { id: 'stoch_target', type: 'select', label: '대상', options: ['%K', '%D'] },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '골든크로스', '데드크로스'] },
      { id: 'value', type: 'number', label: '값(%)', default: 20, min: 0, max: 100, step: 0.1 }
    ],
    buildLabel: function (v) {
      return (
        'Stochastic Fast(%K=' +
        v.k_period +
        ',%D=' +
        v.d_period +
        ') [' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.stoch_target +
        ' ' +
        v.condition +
        ' ' +
        v.value
      );
    }
  },
  ta_stoch_slow: {
    label: 'Stochastic(slow)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'k_period', type: 'number', label: '%K 기간', default: 5, min: 1 },
      { id: 'd_period', type: 'number', label: '%D 기간', default: 3, min: 1 },
      { id: 'slow_period', type: 'number', label: 'Slow 기간', default: 3, min: 1 },
      { id: 'stoch_target', type: 'select', label: '대상', options: ['%K', '%D'] },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '골든크로스', '데드크로스'] },
      { id: 'value', type: 'number', label: '값(%)', default: 20, min: 0, max: 100, step: 0.1 }
    ],
    buildLabel: function (v) {
      return (
        'Stochastic Slow(%K=' +
        v.k_period +
        ',%D=' +
        v.d_period +
        ') [' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.stoch_target +
        ' ' +
        v.condition +
        ' ' +
        v.value
      );
    }
  },
  ta_roc: {
    label: 'ROC',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '기간', default: 12, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '0선위', '0선아래'] },
      { id: 'value', type: 'number', label: '값', default: 0, step: 0.01 }
    ],
    buildLabel: function (v) {
      return 'ROC(' + v.period + ') [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition + ' ' + v.value;
    }
  },
  ta_williams: {
    label: "William's %R",
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '기간', default: 14, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '값(%)', default: -80, min: -100, max: 0 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: -20, min: -100, max: 0 }
    ],
    buildLabel: function (v) {
      return (
        "William's %R(" +
        v.period +
        ') [' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.value1 +
        (v.condition === '범위' ? '~' + v.value2 : ' ' + v.condition)
      );
    }
  },
  ta_sonar: {
    label: 'Sonar',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '기간', default: 14, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '0선위', '0선아래'] },
      { id: 'value', type: 'number', label: '값', default: 0, step: 0.01 }
    ],
    buildLabel: function (v) {
      return 'Sonar(' + v.period + ') [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition + ' ' + v.value;
    }
  },
  ta_trix: {
    label: 'TRIX',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '기간', default: 12, min: 1 },
      { id: 'signal', type: 'number', label: '시그널', default: 9, min: 1 },
      {
        id: 'condition',
        type: 'select',
        label: '조건',
        options: ['골든크로스', '데드크로스', '이상', '이하', '0선위', '0선아래']
      },
      { id: 'value', type: 'number', label: '값', default: 0, step: 0.0001 }
    ],
    buildLabel: function (v) {
      return (
        'TRIX(' +
        v.period +
        ',' +
        v.signal +
        ') [' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.condition +
        ' ' +
        v.value
      );
    }
  },
  ta_vroc: {
    label: 'VROC',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '기간', default: 12, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '0선위', '0선아래'] },
      { id: 'value', type: 'number', label: '값', default: 0, step: 0.01 }
    ],
    buildLabel: function (v) {
      return 'VROC(' + v.period + ') [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition + ' ' + v.value;
    }
  },
  ta_mass_idx: {
    label: 'Mass Index',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '기간', default: 25, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '값', default: 27, step: 0.1 }
    ],
    buildLabel: function (v) {
      return (
        'Mass Index(' + v.period + ') [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition + ' ' + v.value
      );
    }
  },

  // ==================== 채널지표 ====================
  ta_envelope: {
    label: 'Envelope',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '이평기간', default: 20, min: 1 },
      { id: 'rate', type: 'number', label: '범위율(%)', default: 5, min: 0.1, step: 0.1 },
      { id: 'band_target', type: 'select', label: '밴드 기준', options: ['상단밴드', '중심선', '하단밴드'] },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '돌파', '이탈', '근접'] }
    ],
    buildLabel: function (v) {
      return (
        'Envelope(' +
        v.period +
        ',' +
        v.rate +
        '%) [' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.band_target +
        ' ' +
        v.condition
      );
    }
  },
  ta_bollinger: {
    label: 'Bollinger Band',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '기간', default: 20, min: 1 },
      { id: 'multiplier', type: 'number', label: '승수(σ)', default: 2, min: 0.1, step: 0.1 },
      {
        id: 'band_target',
        type: 'select',
        label: '밴드 기준',
        options: ['상단밴드', '중심선', '하단밴드', '%B', 'Band Width']
      },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '돌파', '이탈', '근접'] },
      { id: 'value', type: 'number', label: '값', default: 0, step: 0.01 }
    ],
    buildLabel: function (v) {
      return (
        'Bollinger(' +
        v.period +
        ',' +
        v.multiplier +
        'σ) [' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.band_target +
        ' ' +
        v.condition
      );
    }
  },
  ta_band_width: {
    label: 'Band Width',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '기간', default: 20, min: 1 },
      { id: 'multiplier', type: 'number', label: '승수(σ)', default: 2, step: 0.1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '값', default: 0.05, step: 0.001 },
      { id: 'value2', type: 'number', label: '~이하', default: 0.2, step: 0.001 }
    ],
    buildLabel: function (v) {
      return (
        'Band Width(' +
        v.period +
        ',' +
        v.multiplier +
        ') [' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.value1 +
        (v.condition === '범위' ? '~' + v.value2 : ' ' + v.condition)
      );
    }
  },
  ta_pivot: {
    label: 'Pivot',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'pivot_line', type: 'select', label: '피벗선', options: ['R3', 'R2', 'R1', 'P', 'S1', 'S2', 'S3'] },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '돌파', '이탈'] }
    ],
    buildLabel: function (v) {
      return 'Pivot(' + v.pivot_line + ') [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition;
    }
  },
  ta_pivot_min: {
    label: 'Pivot 분봉',
    fields: [
      {
        id: 'min_unit',
        type: 'select',
        label: '분봉단위',
        options: ['1분', '3분', '5분', '10분', '15분', '30분', '60분']
      },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'pivot_line', type: 'select', label: '피벗선', options: ['R3', 'R2', 'R1', 'P', 'S1', 'S2', 'S3'] },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '돌파', '이탈'] }
    ],
    buildLabel: function (v) {
      return 'Pivot 분봉(' + v.min_unit + '/' + v.pivot_line + ') ' + v.prev_candle + '봉전 ' + v.condition;
    }
  },
  ta_ichimoku: {
    label: '일목균형표',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      {
        id: 'target',
        type: 'select',
        label: '대상',
        options: ['전환선', '기준선', '후행스팬', '선행스팬A', '선행스팬B', '구름대']
      },
      {
        id: 'condition',
        type: 'select',
        label: '조건',
        options: ['이상', '이하', '골든크로스', '데드크로스', '구름위', '구름아래']
      }
    ],
    buildLabel: function (v) {
      return '일목균형표 [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.target + ' ' + v.condition;
    }
  },
  ta_price_ch: {
    label: 'Price Channel',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '기간', default: 20, min: 1 },
      { id: 'band_target', type: 'select', label: '밴드 기준', options: ['상단채널', '중심선', '하단채널'] },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '돌파', '이탈'] }
    ],
    buildLabel: function (v) {
      return (
        'Price Channel(' +
        v.period +
        ') [' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.band_target +
        ' ' +
        v.condition
      );
    }
  },

  // ==================== 변동성지표 ====================
  ta_dmi: {
    label: 'DMI',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: 'DMI 기간', default: 14, min: 1 },
      { id: 'dmi_target', type: 'select', label: '대상', options: ['+DI', '-DI'] },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '골든크로스', '데드크로스'] },
      { id: 'value', type: 'number', label: '값', default: 25, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return (
        'DMI(' +
        v.period +
        ') [' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.dmi_target +
        ' ' +
        v.condition +
        ' ' +
        v.value
      );
    }
  },
  ta_dmi_dx: {
    label: 'DMI DX',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: 'DMI 기간', default: 14, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '값', default: 25, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return 'DMI DX(' + v.period + ') [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition + ' ' + v.value;
    }
  },
  ta_adx: {
    label: 'ADX',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: 'ADX 기간', default: 14, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '값', default: 25, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return 'ADX(' + v.period + ') [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition + ' ' + v.value;
    }
  },
  ta_adx_dmi: {
    label: 'ADX DMI',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '기간', default: 14, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['ADX>+DI', 'ADX>-DI', '+DI>ADX', '-DI>ADX'] }
    ],
    buildLabel: function (v) {
      return 'ADX DMI(' + v.period + ') [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition;
    }
  },
  ta_rsi: {
    label: 'RSI',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: 'RSI 기간', default: 14, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '골든크로스', '데드크로스'] },
      { id: 'value', type: 'number', label: '값(%)', default: 30, min: 0, max: 100, step: 0.1 }
    ],
    buildLabel: function (v) {
      return 'RSI(' + v.period + ') [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition + ' ' + v.value;
    }
  },
  ta_stddev: {
    label: 'Standard Deviation',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '기간', default: 20, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '값', default: 0, step: 0.01 }
    ],
    buildLabel: function (v) {
      return 'StdDev(' + v.period + ') [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition + ' ' + v.value;
    }
  },
  ta_sigma: {
    label: 'Sigma',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '기간', default: 20, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '값(σ)', default: 2, step: 0.1 }
    ],
    buildLabel: function (v) {
      return (
        'Sigma(' + v.period + ') [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition + ' ' + v.value + 'σ'
      );
    }
  },
  ta_true_range: {
    label: 'True Range',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '기간', default: 14, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '값', default: 0, step: 0.01 }
    ],
    buildLabel: function (v) {
      return (
        'True Range(' + v.period + ') [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition + ' ' + v.value
      );
    }
  },

  // ==================== 거래량지표 ====================
  ta_ad: {
    label: 'A/D선',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '상승', '하락'] },
      { id: 'value', type: 'number', label: '값', default: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return 'A/D선 [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition + ' ' + v.value;
    }
  },
  ta_mfi: {
    label: 'MFI',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '기간', default: 14, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '값', default: 20, min: 0, max: 100 },
      { id: 'value2', type: 'number', label: '~이하', default: 80, min: 0, max: 100 }
    ],
    buildLabel: function (v) {
      return (
        'MFI(' +
        v.period +
        ') [' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.value1 +
        (v.condition === '범위' ? '~' + v.value2 : ' ' + v.condition)
      );
    }
  },
  ta_dvi: {
    label: 'Daily Volume Index',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '상승', '하락'] },
      { id: 'value', type: 'number', label: '값', default: 0, step: 0.01 }
    ],
    buildLabel: function (v) {
      return 'DVI [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition + ' ' + v.value;
    }
  },
  ta_vr: {
    label: 'VR',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '기간', default: 20, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '값', default: 100, min: 0 },
      { id: 'value2', type: 'number', label: '~이하', default: 300, min: 0 }
    ],
    buildLabel: function (v) {
      return (
        'VR(' +
        v.period +
        ') [' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.value1 +
        (v.condition === '범위' ? '~' + v.value2 : ' ' + v.condition)
      );
    }
  },
  ta_vol_osc: {
    label: 'Volume Oscillator',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'fast_period', type: 'number', label: '단기', default: 5, min: 1 },
      { id: 'slow_period', type: 'number', label: '장기', default: 20, min: 1 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '0선위', '0선아래'] },
      { id: 'value', type: 'number', label: '값', default: 0, step: 0.01 }
    ],
    buildLabel: function (v) {
      return (
        'Vol Oscillator(' +
        v.fast_period +
        ',' +
        v.slow_period +
        ') [' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.condition +
        ' ' +
        v.value
      );
    }
  },
  ta_obv: {
    label: 'OBV',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      {
        id: 'condition',
        type: 'select',
        label: '조건',
        options: ['이상', '이하', '상승', '하락', '골든크로스', '데드크로스']
      },
      { id: 'value', type: 'number', label: '값', default: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return 'OBV [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition + ' ' + v.value;
    }
  },
  ta_pvi: {
    label: 'Positive Volume Index',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'condition', type: 'select', label: '조건', options: ['이상', '이하', '상승', '하락'] },
      { id: 'value', type: 'number', label: '값', default: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return 'PVI [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition + ' ' + v.value;
    }
  },

  // ==================== 기타지표 ====================
  ta_demark: {
    label: 'Demark',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'condition', type: 'select', label: '조건', options: ['매수신호', '매도신호', '9카운트', '13카운트'] }
    ],
    buildLabel: function (v) {
      return 'Demark [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition;
    }
  },
  ta_sansei: {
    label: '삼선전환도',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'condition', type: 'select', label: '조건', options: ['양전환', '음전환', '양봉지속', '음봉지속'] }
    ],
    buildLabel: function (v) {
      return '삼선전환도 [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition;
    }
  },
  ta_binary: {
    label: 'Binary Wave',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'condition', type: 'select', label: '조건', options: ['상승전환', '하락전환', '1', '0', '-1'] }
    ],
    buildLabel: function (v) {
      return 'Binary Wave [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.condition;
    }
  },

  // ==================== 가격박스 ====================
  ta_pricebox_break: {
    label: '가격기준선 돌파',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '박스기간(봉)', default: 20, min: 1 },
      { id: 'cross_type', type: 'select', label: '조건', options: ['상향돌파', '하향돌파'] }
    ],
    buildLabel: function (v) {
      return '가격기준선돌파 [' + v.period_type + ']' + v.prev_candle + '봉전 ' + v.period + '봉 ' + v.cross_type;
    }
  },
  ta_pricebox_rate: {
    label: '가격기준선 등락률',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'period', type: 'number', label: '박스기간(봉)', default: 20, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '등락률(%)', default: 1, step: 0.1 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 5, step: 0.1 }
    ],
    buildLabel: function (v) {
      return (
        '가격기준선등락률 [' +
        v.period_type +
        ']' +
        v.prev_candle +
        '봉전 ' +
        v.period +
        '봉 ' +
        v.value1 +
        '%' +
        (v.operator === '범위' ? '~' + v.value2 + '%' : ' ' + v.operator)
      );
    }
  }
};
