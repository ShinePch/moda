// 시세분석 FIELDS
const CONDITION_FIELDS_PRICE = {
  // 가격조건
  pa_price_range: {
    label: '주가범위',
    fields: [
      { id: 'prev_days', type: 'number', label: '일전기준', default: 0, min: 0 },
      { id: 'price_type', type: 'select', label: '기준가격', options: ['종가', '시가', '고가', '저가'] },
      { id: 'min', type: 'number', label: '이상(원)', default: 10000, min: 0 },
      { id: 'max', type: 'number', label: '이하(원)', default: 20000, min: 0 }
    ],
    buildLabel: function (v) {
      return (
        '주가범위 [' +
        v.prev_days +
        '일전 ' +
        v.price_type +
        '] ' +
        Number(v.min).toLocaleString() +
        '~' +
        Number(v.max).toLocaleString() +
        '원'
      );
    }
  },
  pa_price_change_rate: {
    label: '주가등락률',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'base', type: 'select', label: '기준', options: ['전일대비', '시가대비', '전주대비', '전월대비'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '등락률(%)', default: 3, min: -100, max: 100, step: 0.1 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 10, min: -100, max: 100, step: 0.1 }
    ],
    buildLabel: function (v) {
      return (
        '주가등락률 [' +
        v.period_type +
        '] ' +
        v.base +
        ' ' +
        v.value1 +
        '%' +
        (v.operator === '범위' ? '~' + v.value2 + '%' : ' ' + v.operator)
      );
    }
  },
  pa_price_compare_week: {
    label: '주기별 주가등락률 비교',
    fields: [
      { id: 'period_type1', type: 'select', label: '주기1', options: ['일', '주', '월'] },
      { id: 'period1', type: 'number', label: '기간1', default: 5, min: 1 },
      { id: 'period_type2', type: 'select', label: '주기2', options: ['일', '주', '월'] },
      { id: 'period2', type: 'number', label: '기간2', default: 20, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '같음'] }
    ],
    buildLabel: function (v) {
      return '주기별등락률 [' + v.period_type1 + v.period1 + '] vs [' + v.period_type2 + v.period2 + '] ' + v.operator;
    }
  },
  pa_price_change_period: {
    label: '기간내 등락률',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월'] },
      { id: 'period', type: 'number', label: '기간', default: 5, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '등락률(%)', default: 5, min: -100, max: 100, step: 0.1 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 20, min: -100, max: 100, step: 0.1 }
    ],
    buildLabel: function (v) {
      return (
        '기간내등락률 [' +
        v.period_type +
        v.period +
        '] ' +
        v.value1 +
        '%' +
        (v.operator === '범위' ? '~' + v.value2 + '%' : ' ' + v.operator)
      );
    }
  },
  pa_price_position: {
    label: '기간내 주가위치',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월'] },
      { id: 'period', type: 'number', label: '기간', default: 20, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '위치(%)', default: 70, min: 0, max: 100 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 100, min: 0, max: 100 }
    ],
    buildLabel: function (v) {
      return (
        '기간내주가위치 [' +
        v.period_type +
        v.period +
        '] ' +
        v.value1 +
        '%' +
        (v.operator === '범위' ? '~' + v.value2 + '%' : ' ' + v.operator)
      );
    }
  },
  pa_price_breakout: {
    label: '주가돌파',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월'] },
      { id: 'period', type: 'number', label: '기간', default: 20, min: 1 },
      { id: 'base', type: 'select', label: '기준', options: ['고가돌파', '저가돌파', '종가돌파'] },
      { id: 'direction', type: 'select', label: '방향', options: ['상향', '하향'] }
    ],
    buildLabel: function (v) {
      return '주가돌파 [' + v.period_type + v.period + '] ' + v.base + ' ' + v.direction;
    }
  },
  pa_price_compare: {
    label: '주가비교',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월'] },
      { id: 'target1', type: 'select', label: '기준1', options: ['현재가', '시가', '고가', '저가', '종가'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '초과', '미만'] },
      { id: 'target2', type: 'select', label: '기준2', options: ['이동평균', '시가', '고가', '저가', '종가'] },
      { id: 'period', type: 'number', label: '기간', default: 5, min: 1 }
    ],
    buildLabel: function (v) {
      return '주가비교 [' + v.period_type + '] ' + v.target1 + ' ' + v.operator + ' ' + v.target2 + v.period;
    }
  },
  pa_price_compare3: {
    label: '주가비교(3개)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev1', type: 'number', label: '봉전①', default: 2, min: 0 },
      { id: 'price1', type: 'select', label: '가격①', options: ['종가', '시가', '고가', '저가'] },
      { id: 'op1', type: 'select', label: '조건①', options: ['<', '>', '<=', '>='] },
      { id: 'prev2', type: 'number', label: '봉전②', default: 1, min: 0 },
      { id: 'price2', type: 'select', label: '가격②', options: ['종가', '시가', '고가', '저가'] },
      { id: 'op2', type: 'select', label: '조건②', options: ['<', '>', '<=', '>='] },
      { id: 'prev3', type: 'number', label: '봉전③', default: 0, min: 0 },
      { id: 'price3', type: 'select', label: '가격③', options: ['종가', '시가', '고가', '저가'] }
    ],
    buildLabel: function (v) {
      return (
        '주가비교(3개) [' +
        v.period_type +
        '] ' +
        v.prev1 +
        '봉전' +
        v.price1 +
        ' ' +
        v.op1 +
        ' ' +
        v.prev2 +
        '봉전' +
        v.price2 +
        ' ' +
        v.op2 +
        ' ' +
        v.prev3 +
        '봉전' +
        v.price3
      );
    }
  },
  pa_price_compare4: {
    label: '주가비교(4개)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev1', type: 'number', label: '봉전①', default: 3, min: 0 },
      { id: 'price1', type: 'select', label: '가격①', options: ['종가', '시가', '고가', '저가'] },
      { id: 'op1', type: 'select', label: '조건①', options: ['<', '>', '<=', '>='] },
      { id: 'prev2', type: 'number', label: '봉전②', default: 2, min: 0 },
      { id: 'price2', type: 'select', label: '가격②', options: ['종가', '시가', '고가', '저가'] },
      { id: 'op2', type: 'select', label: '조건②', options: ['<', '>', '<=', '>='] },
      { id: 'prev3', type: 'number', label: '봉전③', default: 1, min: 0 },
      { id: 'price3', type: 'select', label: '가격③', options: ['종가', '시가', '고가', '저가'] },
      { id: 'op3', type: 'select', label: '조건③', options: ['<', '>', '<=', '>='] },
      { id: 'prev4', type: 'number', label: '봉전④', default: 0, min: 0 },
      { id: 'price4', type: 'select', label: '가격④', options: ['종가', '시가', '고가', '저가'] }
    ],
    buildLabel: function (v) {
      return (
        '주가비교(4개) [' +
        v.period_type +
        '] ' +
        v.prev1 +
        '봉전' +
        v.price1 +
        ' ' +
        v.op1 +
        ' ' +
        v.prev2 +
        '봉전' +
        v.price2 +
        ' ' +
        v.op2 +
        ' ' +
        v.prev3 +
        '봉전' +
        v.price3 +
        ' ' +
        v.op3 +
        ' ' +
        v.prev4 +
        '봉전' +
        v.price4
      );
    }
  },
  pa_parvalue_ratio: {
    label: '액면가대비 주가비율',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '비율(%)', default: 100, min: 0, step: 1 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 500, min: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return '액면가대비주가비율 ' + v.value1 + '%' + (v.operator === '범위' ? '~' + v.value2 + '%' : ' ' + v.operator);
    }
  },
  pa_consec_updown: {
    label: '연속상승하락',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월'] },
      { id: 'direction', type: 'select', label: '방향', options: ['상승', '하락'] },
      { id: 'count', type: 'number', label: '연속(봉)', default: 3, min: 1 }
    ],
    buildLabel: function (v) {
      return '연속' + v.direction + ' [' + v.period_type + '] ' + v.count + '봉';
    }
  },
  pa_change_count: {
    label: '기간내 등락횟수',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월'] },
      { id: 'period', type: 'number', label: '기간', default: 20, min: 1 },
      { id: 'direction', type: 'select', label: '방향', options: ['상승', '하락'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '횟수', default: 10, min: 0 },
      { id: 'value2', type: 'number', label: '~이하', default: 20, min: 0 }
    ],
    buildLabel: function (v) {
      return (
        '기간내등락횟수 [' +
        v.period_type +
        v.period +
        '] ' +
        v.direction +
        ' ' +
        v.value1 +
        '회' +
        (v.operator === '범위' ? '~' + v.value2 + '회' : ' ' + v.operator)
      );
    }
  },
  pa_change_range_period: {
    label: '기간내 주가변동폭',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월'] },
      { id: 'period', type: 'number', label: '기간', default: 20, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '변동폭(%)', default: 5, min: 0, step: 0.1 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 20, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return (
        '기간내변동폭 [' +
        v.period_type +
        v.period +
        '] ' +
        v.value1 +
        '%' +
        (v.operator === '범위' ? '~' + v.value2 + '%' : ' ' + v.operator)
      );
    }
  },
  pa_intraday_max: {
    label: '일중 거래범위 최대종목',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '범위(%)', default: 3, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '일중거래범위 ' + v.value + '% ' + v.operator;
    }
  },
  pa_52high_change: {
    label: '52주 최고가/저가대비 변동률',
    fields: [
      { id: 'base', type: 'select', label: '기준', options: ['52주 최고가', '52주 최저가'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '변동률(%)', default: -10, min: -100, max: 100, step: 0.1 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 0, min: -100, max: 100, step: 0.1 }
    ],
    buildLabel: function (v) {
      return (
        '52주' +
        (v.base === '52주 최고가' ? '최고가' : '최저가') +
        '대비 ' +
        v.value1 +
        '%' +
        (v.operator === '범위' ? '~' + v.value2 + '%' : ' ' + v.operator)
      );
    }
  },
  pa_year_highlow: {
    label: '연중 최고가/저가대비 변동률',
    fields: [
      { id: 'base', type: 'select', label: '기준', options: ['연중 최고가', '연중 최저가'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '변동률(%)', default: -5, min: -100, max: 100, step: 0.1 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 0, min: -100, max: 100, step: 0.1 }
    ],
    buildLabel: function (v) {
      return (
        '연중' +
        (v.base === '연중 최고가' ? '최고가' : '최저가') +
        '대비 ' +
        v.value1 +
        '%' +
        (v.operator === '범위' ? '~' + v.value2 + '%' : ' ' + v.operator)
      );
    }
  },
  pa_new_high: {
    label: '신 고가',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월'] },
      { id: 'period', type: 'number', label: '기간', default: 52, min: 1 }
    ],
    buildLabel: function (v) {
      return '신고가 [' + v.period_type + v.period + ']';
    }
  },
  pa_new_low: {
    label: '신저가',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월'] },
      { id: 'period', type: 'number', label: '기간', default: 52, min: 1 }
    ],
    buildLabel: function (v) {
      return '신저가 [' + v.period_type + v.period + ']';
    }
  },
  pa_highest_close: {
    label: '최고종가',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월'] },
      { id: 'period', type: 'number', label: '기간', default: 52, min: 1 }
    ],
    buildLabel: function (v) {
      return '최고종가 [' + v.period_type + v.period + ']';
    }
  },
  pa_lowest_close: {
    label: '최저종가',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월'] },
      { id: 'period', type: 'number', label: '기간', default: 52, min: 1 }
    ],
    buildLabel: function (v) {
      return '최저종가 [' + v.period_type + v.period + ']';
    }
  },
  pa_upper_limit: {
    label: '상한',
    fields: [],
    buildLabel: function () {
      return '상한';
    }
  },
  pa_near_upper_intra: {
    label: '장중상한',
    fields: [],
    buildLabel: function () {
      return '장중상한';
    }
  },
  pa_lower_limit: {
    label: '하한',
    fields: [],
    buildLabel: function () {
      return '하한';
    }
  },
  pa_near_lower_intra: {
    label: '장중하한',
    fields: [],
    buildLabel: function () {
      return '장중하한';
    }
  },
  pa_near_upper: {
    label: '상한가근접',
    fields: [{ id: 'value', type: 'number', label: '근접률(%)', default: 2, min: 0, step: 0.1 }],
    buildLabel: function (v) {
      return '상한가근접 ' + v.value + '%';
    }
  },
  pa_near_lower: {
    label: '하한가근접',
    fields: [{ id: 'value', type: 'number', label: '근접률(%)', default: 2, min: 0, step: 0.1 }],
    buildLabel: function (v) {
      return '하한가근접 ' + v.value + '%';
    }
  },
  pa_gap_updown: {
    label: '상승갭/하락갭 종목',
    fields: [{ id: 'type', type: 'select', label: '구분', options: ['상승갭', '하락갭'] }],
    buildLabel: function (v) {
      return v.type + ' 종목';
    }
  },
  pa_gap_breakout: {
    label: '상승갭/하락갭 돌파',
    fields: [{ id: 'type', type: 'select', label: '구분', options: ['상승갭', '하락갭'] }],
    buildLabel: function (v) {
      return v.type + ' 돌파';
    }
  },
  pa_candle_consec: {
    label: '캔들연속발생',
    fields: [{ id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] }],
    buildLabel: function (v) {
      return '캔들연속 [' + v.period_type + ']';
    }
  },
  pa_vi_days: {
    label: '고가저가갱신연속일수',
    fields: [
      { id: 'type', type: 'select', label: '구분', options: ['고가갱신', '저가갱신'] },
      { id: 'days', type: 'number', label: '일수', default: 3, min: 1 }
    ],
    buildLabel: function (v) {
      return v.type + ' 연속 ' + v.days + '일';
    }
  },
  pa_highlow_consec: {
    label: '고가/저가변동 연속일수',
    fields: [
      { id: 'type', type: 'select', label: '구분', options: ['고가변동', '저가변동'] },
      { id: 'days', type: 'number', label: '연속일수', default: 3, min: 1 }
    ],
    buildLabel: function (v) {
      return v.type + ' ' + v.days + '일 연속';
    }
  },
  pa_vi_device: {
    label: '변동성완화장치(VI)',
    fields: [{ id: 'type', type: 'select', label: '구분', options: ['정적VI', '동적VI', '전체VI'] }],
    buildLabel: function (v) {
      return 'VI발동: ' + v.type;
    }
  },
  pa_change_ratio: {
    label: '주가등락폭 비율',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '비율', default: 3, min: 0, step: 0.1 },
      { id: 'value2', type: 'number', label: 'end', default: 10, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '등락폭비율 ' + v.value1;
    }
  },
  pa_period_range_ratio: {
    label: '구간별 주가변동폭간 비율',
    fields: [
      { id: 'period1', type: 'number', label: '기간1', default: 5, min: 1 },
      { id: 'period2', type: 'number', label: '기간2', default: 20, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율', default: 80, min: 0 }
    ],
    buildLabel: function (v) {
      return '구간변동폭비율 ' + v.period1 + '/' + v.period2 + ' ' + v.value;
    }
  },
  pa_period_diff: {
    label: '구간별 주가등락률간 차',
    fields: [
      { id: 'period1', type: 'number', label: '기간1', default: 5, min: 1 },
      { id: 'period2', type: 'number', label: '기간2', default: 20, min: 1 },
      { id: 'value', type: 'number', label: '차이', default: 5, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '구간등락률차 ' + v.period1 + '/' + v.period2 + ' ' + v.value;
    }
  },
  pa_period_ratio: {
    label: '구간별 주가등락률간 비율',
    fields: [
      { id: 'period1', type: 'number', label: '기간1', default: 5, min: 1 },
      { id: 'period2', type: 'number', label: '기간2', default: 20, min: 1 },
      { id: 'value', type: 'number', label: '비율', default: 80 }
    ],
    buildLabel: function (v) {
      return '구간등락률비율 ' + v.period1 + '/' + v.period2;
    }
  },
  pa_daily_high_break: {
    label: '당일 전고점 돌파',
    fields: [],
    buildLabel: function () {
      return '당일 전고점 돌파';
    }
  },
  pa_daily_high_compare: {
    label: '당일 전고점 비교',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율', default: 1, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '당일전고점비교 ' + v.value;
    }
  },
  pa_morning_gold_change: {
    label: '분봉 금일 첫봉대비 주가등락',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '등락률', default: 1, step: 0.1 },
      { id: 'value2', type: 'number', label: '~이하', default: 5, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '첫봉대비등락 ' + v.value1;
    }
  },
  pa_candle_vol_break: {
    label: '기간내 기준봉 주가돌파(거래량)',
    fields: [
      { id: 'period', type: 'number', label: '기간', default: 20, min: 1 },
      { id: 'direction', type: 'select', label: '방향', options: ['상향돌파', '하향돌파'] }
    ],
    buildLabel: function (v) {
      return '기준봉돌파(거래량) ' + v.period + '봉 ' + v.direction;
    }
  },
  pa_candle_vol_compare: {
    label: '기간내 기준봉 주가비교(거래량)',
    fields: [
      { id: 'period', type: 'number', label: '기간', default: 20, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] }
    ],
    buildLabel: function (v) {
      return '기준봉비교(거래량) ' + v.period + '봉 ' + v.operator;
    }
  },
  pa_candle_vol_near: {
    label: '기간내 기준봉 근접률(거래량)',
    fields: [
      { id: 'period', type: 'number', label: '기간', default: 20, min: 1 },
      { id: 'value', type: 'number', label: '근접률(%)', default: 3, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '기준봉근접(거래량) ' + v.period + '봉 ' + v.value + '%';
    }
  },
  pa_candle_volr_break: {
    label: '기간내 기준봉 주가돌파(거래량비율)',
    fields: [
      { id: 'period', type: 'number', label: '기간', default: 20, min: 1 },
      { id: 'direction', type: 'select', label: '방향', options: ['상향돌파', '하향돌파'] }
    ],
    buildLabel: function (v) {
      return '기준봉돌파(거래량비율) ' + v.period + '봉 ' + v.direction;
    }
  },
  pa_candle_volr_compare: {
    label: '기간내 기준봉 주가비교(거래량비율)',
    fields: [
      { id: 'period', type: 'number', label: '기간', default: 20, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] }
    ],
    buildLabel: function (v) {
      return '기준봉비교(거래량비율) ' + v.period + '봉 ' + v.operator;
    }
  },
  pa_candle_volr_near: {
    label: '기간내 기준봉 근접률(거래량비율)',
    fields: [
      { id: 'period', type: 'number', label: '기간', default: 20, min: 1 },
      { id: 'value', type: 'number', label: '근접률(%)', default: 3, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '기준봉근접(거래량비율) ' + v.period + '봉 ' + v.value + '%';
    }
  },
  pa_candle_amt_break: {
    label: '기간내 기준봉 주가돌파(거래대금)',
    fields: [
      { id: 'period', type: 'number', label: '기간', default: 20, min: 1 },
      { id: 'direction', type: 'select', label: '방향', options: ['상향돌파', '하향돌파'] }
    ],
    buildLabel: function (v) {
      return '기준봉돌파(거래대금) ' + v.period + '봉 ' + v.direction;
    }
  },
  pa_candle_amt_compare: {
    label: '기간내 기준봉 주가비교(거래대금)',
    fields: [
      { id: 'period', type: 'number', label: '기간', default: 20, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] }
    ],
    buildLabel: function (v) {
      return '기준봉비교(거래대금) ' + v.period + '봉 ' + v.operator;
    }
  },
  pa_candle_amt_near: {
    label: '기간내 기준봉 근접률(거래대금)',
    fields: [
      { id: 'period', type: 'number', label: '기간', default: 20, min: 1 },
      { id: 'value', type: 'number', label: '근접률(%)', default: 3, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '기준봉근접(거래대금) ' + v.period + '봉 ' + v.value + '%';
    }
  },
  pa_ask_total: {
    label: '총잔량',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '수량', default: 10000, min: 0 }
    ],
    buildLabel: function (v) {
      return '총잔량 ' + Number(v.value).toLocaleString() + ' ' + v.operator;
    }
  },
  pa_ask_net: {
    label: '순매수잔량',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '수량', default: 0 }
    ],
    buildLabel: function (v) {
      return '순매수잔량 ' + v.value + ' ' + v.operator;
    }
  },
  pa_ask_ratio: {
    label: '매도매수잔량비',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 100, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '매도매수잔량비 ' + v.value + '% ' + v.operator;
    }
  },
  pa_ask_best_ratio: {
    label: '총량대 우선호가잔량비',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 30, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '우선호가잔량비 ' + v.value + '% ' + v.operator;
    }
  },
  pa_ask_remain: {
    label: '호가 잔량비',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 50, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '호가잔량비 ' + v.value + '% ' + v.operator;
    }
  },
  pa_vol_cur: {
    label: '거래량',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '거래량', default: 1000000, min: 0 },
      { id: 'value2', type: 'number', label: '~이하', default: 999999999, min: 0 }
    ],
    buildLabel: function (v) {
      return '거래량 ' + Number(v.value1).toLocaleString() + ' ' + v.operator;
    }
  },
  pa_vol_prev: {
    label: '전일거래량',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '거래량', default: 1000000, min: 0 }
    ],
    buildLabel: function (v) {
      return '전일거래량 ' + Number(v.value).toLocaleString() + ' ' + v.operator;
    }
  },
  pa_vol_avg: {
    label: '평균거래량',
    fields: [
      { id: 'period', type: 'number', label: '기간', default: 20, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '거래량', default: 500000, min: 0 }
    ],
    buildLabel: function (v) {
      return '평균거래량(' + v.period + '일) ' + Number(v.value).toLocaleString() + ' ' + v.operator;
    }
  },
  pa_vol_rate: {
    label: '거래량비율',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 200, min: 0 }
    ],
    buildLabel: function (v) {
      return '거래량비율 ' + v.value + '% ' + v.operator;
    }
  },
  pa_vol_updown: {
    label: '거래량 증가/감소',
    fields: [
      { id: 'direction', type: 'select', label: '방향', options: ['증가', '감소'] },
      { id: 'count', type: 'number', label: '연속(봉)', default: 3, min: 1 }
    ],
    buildLabel: function (v) {
      return '거래량 ' + v.direction + ' ' + v.count + '봉 연속';
    }
  },
  pa_vol_new_high: {
    label: '신고거래량',
    fields: [{ id: 'period', type: 'number', label: '기간(일)', default: 52, min: 1 }],
    buildLabel: function (v) {
      return '신고거래량 ' + v.period + '일';
    }
  },
  pa_vol_new_low: {
    label: '신저거래량',
    fields: [{ id: 'period', type: 'number', label: '기간(일)', default: 52, min: 1 }],
    buildLabel: function (v) {
      return '신저거래량 ' + v.period + '일';
    }
  },
  pa_vol_same_time: {
    label: '전일동시간대비 거래량비율',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 150, min: 0 }
    ],
    buildLabel: function (v) {
      return '동시간대비거래량 ' + v.value + '% ' + v.operator;
    }
  },
  pa_vol_turnover: {
    label: '거래량회전율',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 5, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '거래량회전율 ' + v.value + '% ' + v.operator;
    }
  },
  pa_vol_consec: {
    label: '거래량 증감연속봉수',
    fields: [
      { id: 'direction', type: 'select', label: '방향', options: ['증가', '감소'] },
      { id: 'count', type: 'number', label: '봉수', default: 3, min: 1 }
    ],
    buildLabel: function (v) {
      return '거래량 ' + v.direction + ' ' + v.count + '봉';
    }
  },
  pa_amt_cur: {
    label: '거래대금',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '억원', default: 10, min: 0 }
    ],
    buildLabel: function (v) {
      return '거래대금 ' + v.value + '억 ' + v.operator;
    }
  },
  pa_amt_supply_break: {
    label: '매물대 돌파',
    fields: [{ id: 'direction', type: 'select', label: '방향', options: ['상향', '하향'] }],
    buildLabel: function (v) {
      return '매물대 ' + v.direction + ' 돌파';
    }
  },
  pa_vol_rate_n: {
    label: '거래량비율(n봉)',
    fields: [
      { id: 'n', type: 'number', label: 'n봉', default: 5, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 200, min: 0 }
    ],
    buildLabel: function (v) {
      return '거래량비율(' + v.n + '봉) ' + v.value + '% ' + v.operator;
    }
  },
  pa_vol_rate_prev: {
    label: '거래량비율(전일거래량대비)',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 150, min: 0 }
    ],
    buildLabel: function (v) {
      return '전일거래량대비비율 ' + v.value + '% ' + v.operator;
    }
  },
  pa_vol_rate_period: {
    label: '기간내 거래량비율',
    fields: [
      { id: 'period', type: 'number', label: '기간(봉)', default: 20, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 200, min: 0 }
    ],
    buildLabel: function (v) {
      return '기간내거래량비율(' + v.period + '봉) ' + v.value + '% ' + v.operator;
    }
  },
  pa_vol_avg_period: {
    label: '기간내 평균거래량비율',
    fields: [
      { id: 'period', type: 'number', label: '기간(봉)', default: 20, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 200, min: 0 }
    ],
    buildLabel: function (v) {
      return '기간내평균거래량비율(' + v.period + '봉) ' + v.value + '% ' + v.operator;
    }
  },
  pa_vol_today_high: {
    label: '금일 신고거래량',
    fields: [{ id: 'period', type: 'number', label: '기간(일)', default: 20, min: 1 }],
    buildLabel: function (v) {
      return '금일신고거래량 ' + v.period + '일';
    }
  },
  pa_vol_today_low: {
    label: '금일 신저거래량',
    fields: [{ id: 'period', type: 'number', label: '기간(일)', default: 20, min: 1 }],
    buildLabel: function (v) {
      return '금일신저거래량 ' + v.period + '일';
    }
  },
  pa_vol_highlow_n: {
    label: '신고/신저거래량(n봉)',
    fields: [
      { id: 'type', type: 'select', label: '구분', options: ['신고거래량', '신저거래량'] },
      { id: 'n', type: 'number', label: 'n봉', default: 20, min: 1 }
    ],
    buildLabel: function (v) {
      return v.type + '(' + v.n + '봉)';
    }
  },
  pa_vol_float_ratio: {
    label: '유통주식수 대비 거래량비율',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 5, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '유통주식수대비거래량 ' + v.value + '% ' + v.operator;
    }
  },
  pa_vol_turnover_n: {
    label: '거래량회전율(n봉)',
    fields: [
      { id: 'n', type: 'number', label: 'n봉', default: 5, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 5, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '거래량회전율(' + v.n + '봉) ' + v.value + '% ' + v.operator;
    }
  },
  pa_amt_avg: {
    label: '평균거래대금',
    fields: [
      { id: 'period', type: 'number', label: '기간(일)', default: 5, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '억원', default: 50, min: 0 }
    ],
    buildLabel: function (v) {
      return '평균거래대금(' + v.period + '일) ' + v.value + '억 ' + v.operator;
    }
  },
  pa_amt_prev: {
    label: '전일거래대금',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '억원', default: 10, min: 0 }
    ],
    buildLabel: function (v) {
      return '전일거래대금 ' + v.value + '억 ' + v.operator;
    }
  },
  pa_amt_new_high: {
    label: '신고거래대금',
    fields: [{ id: 'period', type: 'number', label: '기간(일)', default: 52, min: 1 }],
    buildLabel: function (v) {
      return '신고거래대금 ' + v.period + '일';
    }
  },
  pa_amt_new_low: {
    label: '신저거래대금',
    fields: [{ id: 'period', type: 'number', label: '기간(일)', default: 52, min: 1 }],
    buildLabel: function (v) {
      return '신저거래대금 ' + v.period + '일';
    }
  },
  pa_amt_n_tick: {
    label: 'n분평균 틱수대비증감',
    fields: [
      { id: 'n', type: 'number', label: 'n분', default: 5, min: 1 },
      { id: 'direction', type: 'select', label: '방향', options: ['증가', '감소'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 150, min: 0 }
    ],
    buildLabel: function (v) {
      return v.n + '분평균틱수 ' + v.value + '% ' + v.direction;
    }
  },
  pa_amt_n_avg: {
    label: 'n분평균대비 거래증감',
    fields: [
      { id: 'n', type: 'number', label: 'n분', default: 5, min: 1 },
      { id: 'direction', type: 'select', label: '방향', options: ['증가', '감소'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 150, min: 0 }
    ],
    buildLabel: function (v) {
      return v.n + '분평균대비거래 ' + v.value + '% ' + v.direction;
    }
  },
  pa_amt_period: {
    label: '기간내 거래대금',
    fields: [
      { id: 'period', type: 'number', label: '기간(봉)', default: 20, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '억원', default: 100, min: 0 }
    ],
    buildLabel: function (v) {
      return '기간내거래대금(' + v.period + '봉) ' + v.value + '억 ' + v.operator;
    }
  },
  pa_amt_turnover_p: {
    label: '기간내 거래량회전율',
    fields: [
      { id: 'period', type: 'number', label: '기간(봉)', default: 20, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 10, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '기간내거래량회전율(' + v.period + '봉) ' + v.value + '% ' + v.operator;
    }
  },
  pa_amt_candle: {
    label: '기준봉 거래대금',
    fields: [
      { id: 'prev', type: 'number', label: '봉전기준', default: 1, min: 0 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '억원', default: 10, min: 0 }
    ],
    buildLabel: function (v) {
      return '기준봉거래대금(' + v.prev + '봉전) ' + v.value + '억 ' + v.operator;
    }
  },
  pa_amt_avg_period: {
    label: '기간별 평균거래대금',
    fields: [
      { id: 'period', type: 'number', label: '기간(봉)', default: 20, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '억원', default: 50, min: 0 }
    ],
    buildLabel: function (v) {
      return '기간별평균거래대금(' + v.period + '봉) ' + v.value + '억 ' + v.operator;
    }
  },
  pa_amt_accum: {
    label: '기간별 누적거래대금',
    fields: [
      { id: 'period', type: 'number', label: '기간(봉)', default: 20, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '억원', default: 500, min: 0 }
    ],
    buildLabel: function (v) {
      return '기간별누적거래대금(' + v.period + '봉) ' + v.value + '억 ' + v.operator;
    }
  },
  pa_amt_compare: {
    label: '거래대금 비교',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월'] },
      { id: 'prev1', type: 'number', label: '봉전①', default: 1, min: 0 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '초과', '미만'] },
      { id: 'prev2', type: 'number', label: '봉전②', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '거래대금비교 [' + v.period_type + '] ' + v.prev1 + '봉전 ' + v.operator + ' ' + v.prev2 + '봉전';
    }
  },
  pa_amt_morning_gold: {
    label: '분봉 금일 첫봉대비 거래량비율',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 200, min: 0 }
    ],
    buildLabel: function (v) {
      return '첫봉대비거래량비율 ' + v.value + '% ' + v.operator;
    }
  },
  pa_expected_price: {
    label: '예상체결가',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '가격(원)', default: 10000, min: 0 },
      { id: 'value2', type: 'number', label: '~이하(원)', default: 20000, min: 0 }
    ],
    buildLabel: function (v) {
      return '예상체결가 ' + Number(v.value1).toLocaleString() + '원 ' + v.operator;
    }
  },
  pa_expected_vol: {
    label: '예상체결량',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '수량(주)', default: 100000, min: 0 }
    ],
    buildLabel: function (v) {
      return '예상체결량 ' + Number(v.value).toLocaleString() + '주 ' + v.operator;
    }
  },
  pa_expected_vol_rate: {
    label: '예상체결량비율',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 200, min: 0 }
    ],
    buildLabel: function (v) {
      return '예상체결량비율 ' + v.value + '% ' + v.operator;
    }
  },
  pa_expected_amt: {
    label: '예상체결금액',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '억원', default: 10, min: 0 }
    ],
    buildLabel: function (v) {
      return '예상체결금액 ' + v.value + '억 ' + v.operator;
    }
  },
  pa_expected_rate: {
    label: '예상체결가등락률',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '등락률(%)', default: 3, min: -100, max: 100, step: 0.1 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 10, min: -100, max: 100, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '예상체결가등락률 ' + v.value1 + '%' + (v.operator === '범위' ? '~' + v.value2 + '%' : ' ' + v.operator);
    }
  },
  pa_expected_ma_diff: {
    label: '예상체결가-이동평균비교',
    fields: [
      { id: 'period', type: 'number', label: '이평기간', default: 20, min: 1 },
      { id: 'ma_type', type: 'select', label: '이평종류', options: ['이평', '지수이평', '가중이평'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '골든크로스', '데드크로스'] },
      { id: 'value', type: 'number', label: '괴리율(%)', default: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '예상체결가 ' + v.period + v.ma_type + ' ' + v.operator + ' ' + v.value + '%';
    }
  },
  pa_for_ratio: {
    label: '외국인지분율',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '지분율(%)', default: 10, min: 0, max: 100, step: 0.1 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 50, min: 0, max: 100, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '외국인지분율 ' + v.value1 + '%' + (v.operator === '범위' ? '~' + v.value2 + '%' : ' ' + v.operator);
    }
  },
  pa_for_net: {
    label: '외국인/기관/개인 순매수/순매도',
    fields: [
      { id: 'subject', type: 'select', label: '주체', options: ['외국인', '기관', '개인'] },
      { id: 'type', type: 'select', label: '구분', options: ['순매수', '순매도'] },
      { id: 'period', type: 'number', label: '기간(일)', default: 1, min: 1 }
    ],
    buildLabel: function (v) {
      return v.subject + ' ' + v.period + '일 ' + v.type;
    }
  },
  pa_for_consec: {
    label: '외국인지분율 연속상승하락',
    fields: [
      { id: 'direction', type: 'select', label: '방향', options: ['상승', '하락'] },
      { id: 'days', type: 'number', label: '연속일', default: 3, min: 1 }
    ],
    buildLabel: function (v) {
      return '외국인지분율 ' + v.direction + ' ' + v.days + '일 연속';
    }
  },
  pa_for_accum: {
    label: '외국인 누적 순매수 수량',
    fields: [
      { id: 'period', type: 'number', label: '기간(일)', default: 20, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '수량', default: 100000, min: 0 }
    ],
    buildLabel: function (v) {
      return '외국인누적순매수 ' + v.period + '일 ' + Number(v.value).toLocaleString() + ' ' + v.operator;
    }
  },
  pa_for_today: {
    label: '외국인/기관순매수(당일 잠정치)',
    fields: [
      { id: 'subject', type: 'select', label: '주체', options: ['외국인', '기관', '개인'] },
      { id: 'type', type: 'select', label: '구분', options: ['순매수', '순매도'] }
    ],
    buildLabel: function (v) {
      return v.subject + ' 당일 ' + v.type + '(잠정)';
    }
  },
  pa_for_ratio_chg: {
    label: '외국인지분율변동',
    fields: [
      { id: 'period', type: 'number', label: '기간(일)', default: 5, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '변동(%)', default: 0.5, step: 0.01 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 5, step: 0.01 }
    ],
    buildLabel: function (v) {
      return (
        '외국인지분율변동(' +
        v.period +
        '일) ' +
        v.value1 +
        '%' +
        (v.operator === '범위' ? '~' + v.value2 + '%' : ' ' + v.operator)
      );
    }
  },
  pa_for_daily_rate: {
    label: '외국인/기관/개인 일간매매변동률',
    fields: [
      { id: 'investor', type: 'select', label: '투자자', options: ['외국인', '기관', '개인'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '변동률(%)', default: 0.5, step: 0.01 }
    ],
    buildLabel: function (v) {
      return v.investor + ' 일간매매변동률 ' + v.value + '% ' + v.operator;
    }
  },
  pa_for_daily_vol: {
    label: '외국인/기관/개인 일간매매변동률(거래량대비)',
    fields: [
      { id: 'investor', type: 'select', label: '투자자', options: ['외국인', '기관', '개인'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 1, step: 0.01 }
    ],
    buildLabel: function (v) {
      return v.investor + ' 일간매매변동률(거래량대비) ' + v.value + '% ' + v.operator;
    }
  },
  pa_for_net_days: {
    label: '외국인/기관/개인 순매일수',
    fields: [
      { id: 'investor', type: 'select', label: '투자자', options: ['외국인', '기관', '개인'] },
      { id: 'direction', type: 'select', label: '방향', options: ['순매수', '순매도'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '일수', default: 3, min: 1 }
    ],
    buildLabel: function (v) {
      return v.investor + ' ' + v.direction + ' ' + v.value + '일 ' + v.operator;
    }
  },
  pa_for_net_compare: {
    label: '외국인/기관/개인 일간 순매수비교',
    fields: [
      { id: 'investor1', type: 'select', label: '투자자①', options: ['외국인', '기관', '개인'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '초과', '미만'] },
      { id: 'investor2', type: 'select', label: '투자자②', options: ['외국인', '기관', '개인'] }
    ],
    buildLabel: function (v) {
      return v.investor1 + ' 순매수 ' + v.operator + ' ' + v.investor2;
    }
  },
  pa_for_net_amt: {
    label: '외국인/기관/개인 순매수/순매도 금액',
    fields: [
      { id: 'investor', type: 'select', label: '투자자', options: ['외국인', '기관', '개인'] },
      { id: 'direction', type: 'select', label: '방향', options: ['순매수', '순매도'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '억원', default: 10, min: 0 }
    ],
    buildLabel: function (v) {
      return v.investor + ' ' + v.direction + '금액 ' + v.value + '억 ' + v.operator;
    }
  },
  pa_for_period_shares: {
    label: '외국인/기관/개인 기간매매변동률(상장주식수)',
    fields: [
      { id: 'investor', type: 'select', label: '투자자', options: ['외국인', '기관', '개인'] },
      { id: 'period', type: 'number', label: '기간(일)', default: 20, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 1, step: 0.01 }
    ],
    buildLabel: function (v) {
      return v.investor + ' 기간매매변동률(상장주식수) ' + v.period + '일 ' + v.value + '% ' + v.operator;
    }
  },
  pa_for_period_vol: {
    label: '외국인/기관/개인 기간매매변동률(거래량대비)',
    fields: [
      { id: 'investor', type: 'select', label: '투자자', options: ['외국인', '기관', '개인'] },
      { id: 'period', type: 'number', label: '기간(일)', default: 20, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 1, step: 0.01 }
    ],
    buildLabel: function (v) {
      return v.investor + ' 기간매매변동률(거래량대비) ' + v.period + '일 ' + v.value + '% ' + v.operator;
    }
  },
  pa_for_period_accum: {
    label: '기간별 누적순매수(수량)',
    fields: [
      { id: 'investor', type: 'select', label: '투자자', options: ['외국인', '기관', '개인'] },
      { id: 'period', type: 'number', label: '기간(일)', default: 20, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '수량(천주)', default: 100, min: 0 }
    ],
    buildLabel: function (v) {
      return v.investor + ' 누적순매수(' + v.period + '일) ' + v.value + '천주 ' + v.operator;
    }
  },
  pa_broker_vol: {
    label: '거래원별 거래량',
    fields: [
      {
        id: 'broker',
        type: 'select',
        label: '증권사',
        options: ['미래에셋', '삼성', 'KB', '신한', '한투', 'NH', '키움', '대신', '기타']
      },
      { id: 'type', type: 'select', label: '구분', options: ['매수', '매도', '순매수'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '수량', default: 10000, min: 0 }
    ],
    buildLabel: function (v) {
      return v.broker + ' ' + v.type + ' ' + Number(v.value).toLocaleString() + ' ' + v.operator;
    }
  },
  pa_broker_foreign_net: {
    label: '외국계증권사 순매매',
    fields: [
      { id: 'type', type: 'select', label: '구분', options: ['순매수', '순매도'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '수량', default: 10000, min: 0 }
    ],
    buildLabel: function (v) {
      return '외국계 ' + v.type + ' ' + Number(v.value).toLocaleString() + ' ' + v.operator;
    }
  },
  pa_broker_instant: {
    label: '거래원 순간변동량',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '수량(주)', default: 10000, min: 0 }
    ],
    buildLabel: function (v) {
      return '거래원순간변동량 ' + Number(v.value).toLocaleString() + '주 ' + v.operator;
    }
  },
  pa_broker_vol_ratio: {
    label: '거래원별 거래량비율',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 30, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '거래원별거래량비율 ' + v.value + '% ' + v.operator;
    }
  },
  pa_broker_sell_buy: {
    label: '거래원별 매도대비매수비율',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 150, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '매도대비매수비율 ' + v.value + '% ' + v.operator;
    }
  },
  pa_broker_rank: {
    label: '거래원중 특정증권사 순위',
    fields: [
      { id: 'direction', type: 'select', label: '매매구분', options: ['매수', '매도'] },
      { id: 'rank_n', type: 'number', label: '순위 이내', default: 3, min: 1 }
    ],
    buildLabel: function (v) {
      return '특정증권사 ' + v.direction + ' 순위 ' + v.rank_n + '위 이내';
    }
  },
  pa_broker_same: {
    label: '매도매수거래원이 같은 종목',
    fields: [{ id: 'rank_n', type: 'number', label: '상위 N위', default: 1, min: 1 }],
    buildLabel: function (v) {
      return '매도매수거래원 동일 상위 ' + v.rank_n + '위';
    }
  },
  pa_broker_both: {
    label: '특정거래원이 매도매수 양쪽에 있을 때',
    fields: [{ id: 'rank_n', type: 'number', label: '순위 이내', default: 3, min: 1 }],
    buildLabel: function (v) {
      return '특정거래원 매도매수 양쪽 ' + v.rank_n + '위 이내';
    }
  },
  pa_broker_one: {
    label: '특정거래원이 매도매수 한쪽에 있을 때',
    fields: [
      { id: 'direction', type: 'select', label: '매매구분', options: ['매수', '매도'] },
      { id: 'rank_n', type: 'number', label: '순위 이내', default: 3, min: 1 }
    ],
    buildLabel: function (v) {
      return '특정거래원 ' + v.direction + ' 한쪽 ' + v.rank_n + '위 이내';
    }
  },
  pa_broker_foreign_r: {
    label: '외국계증권사 순매매 비율',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 10, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '외국계증권사순매매비율 ' + v.value + '% ' + v.operator;
    }
  },
  pa_misc_beta: {
    label: '베타계수',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '이상', default: 0.8, min: 0, step: 0.01 },
      { id: 'value2', type: 'number', label: '~이하', default: 1.2, min: 0, step: 0.01 }
    ],
    buildLabel: function (v) {
      return '베타계수 ' + v.value1 + (v.operator === '범위' ? '~' + v.value2 : ' ' + v.operator);
    }
  },
  pa_misc_credit: {
    label: '신용잔고율',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '이상(%)', default: 1, min: 0, step: 0.1 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 10, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '신용잔고율 ' + v.value1 + '%' + (v.operator === '범위' ? '~' + v.value2 + '%' : ' ' + v.operator);
    }
  },
  pa_misc_shares: {
    label: '상장주식수',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '이상(주)', default: 1000000, min: 0 },
      { id: 'value2', type: 'number', label: '~이하(주)', default: 100000000, min: 0 }
    ],
    buildLabel: function (v) {
      return '상장주식수 ' + Number(v.value1).toLocaleString() + '주 ' + v.operator;
    }
  },
  pa_misc_par: {
    label: '액면가',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '이상(원)', default: 100, min: 0 },
      { id: 'value2', type: 'number', label: '~이하(원)', default: 5000, min: 0 }
    ],
    buildLabel: function (v) {
      return '액면가 ' + Number(v.value1).toLocaleString() + '원 ' + v.operator;
    }
  },
  pa_misc_listday: {
    label: '상장일',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이내', '이상'] },
      { id: 'value', type: 'number', label: '영업일', default: 30, min: 1 }
    ],
    buildLabel: function (v) {
      return '상장일 ' + v.value + '영업일 ' + v.operator;
    }
  },
  pa_exec_strength: {
    label: '체결강도',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '이상', default: 100, min: 0, step: 0.1 },
      { id: 'value2', type: 'number', label: '~이하', default: 150, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '체결강도 ' + v.value1 + (v.operator === '범위' ? '~' + v.value2 : ' ' + v.operator);
    }
  },
  pa_exec_buy_ratio: {
    label: '매수비율',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '이상(%)', default: 55, min: 0, max: 100, step: 0.1 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 70, min: 0, max: 100, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '매수비율 ' + v.value1 + '%' + (v.operator === '범위' ? '~' + v.value2 + '%' : ' ' + v.operator);
    }
  },
  pa_exec_qty: {
    label: '매수/매도/순매수 체결수량',
    fields: [
      { id: 'type', type: 'select', label: '구분', options: ['매수', '매도', '순매수'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '수량', default: 10000, min: 0 }
    ],
    buildLabel: function (v) {
      return v.type + ' 체결수량 ' + Number(v.value).toLocaleString() + ' ' + v.operator;
    }
  },
  pa_exec_consec: {
    label: '체결강도 증감연속봉수',
    fields: [
      { id: 'direction', type: 'select', label: '방향', options: ['증가', '감소'] },
      { id: 'count', type: 'number', label: '연속(봉)', default: 3, min: 1 }
    ],
    buildLabel: function (v) {
      return '체결강도 ' + v.direction + ' ' + v.count + '봉 연속';
    }
  },
  pa_exec_change: {
    label: '체결강도 변동률',
    fields: [
      { id: 'period', type: 'number', label: '기간(봉)', default: 5, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '변동률(%)', default: 10, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '체결강도변동률(' + v.period + '봉) ' + v.value + '% ' + v.operator;
    }
  },
  pa_exec_period_count: {
    label: '체결강도 기간내 범위 횟수',
    fields: [
      { id: 'period', type: 'number', label: '기간(봉)', default: 20, min: 1 },
      { id: 'min_val', type: 'number', label: '범위 하한', default: 80, min: 0 },
      { id: 'max_val', type: 'number', label: '범위 상한', default: 120, min: 0 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'count', type: 'number', label: '횟수', default: 3, min: 1 }
    ],
    buildLabel: function (v) {
      return (
        '체결강도기간내범위(' + v.period + '봉) ' + v.min_val + '~' + v.max_val + ' ' + v.count + '회 ' + v.operator
      );
    }
  },
  pa_exec_n_count: {
    label: 'n분 체결건수',
    fields: [
      { id: 'n', type: 'number', label: 'n분', default: 5, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '건수', default: 100, min: 0 }
    ],
    buildLabel: function (v) {
      return v.n + '분체결건수 ' + v.value + '건 ' + v.operator;
    }
  },
  pa_exec_qty_period: {
    label: '기간내 매수/매도/순매수 체결수량',
    fields: [
      { id: 'period', type: 'number', label: '기간(봉)', default: 20, min: 1 },
      { id: 'type', type: 'select', label: '구분', options: ['매수', '매도', '순매수'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '수량(주)', default: 100000, min: 0 }
    ],
    buildLabel: function (v) {
      return (
        '기간내' + v.type + '체결수량(' + v.period + '봉) ' + Number(v.value).toLocaleString() + '주 ' + v.operator
      );
    }
  },
  pa_prog_net_qty: {
    label: '프로그램 순매수/순매도 수량',
    fields: [
      { id: 'type', type: 'select', label: '구분', options: ['순매수', '순매도'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '수량', default: 10000, min: 0 }
    ],
    buildLabel: function (v) {
      return '프로그램 ' + v.type + ' ' + Number(v.value).toLocaleString() + ' ' + v.operator;
    }
  },
  pa_prog_ratio: {
    label: '당일거래량대비 프로그램매매 비율',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 10, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '프로그램매매비율 ' + v.value + '% ' + v.operator;
    }
  },
  pa_prog_days: {
    label: '순매매 일수',
    fields: [
      { id: 'direction', type: 'select', label: '방향', options: ['순매수', '순매도'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '일수', default: 3, min: 1 }
    ],
    buildLabel: function (v) {
      return '프로그램매매 ' + v.direction + ' ' + v.value + '일 ' + v.operator;
    }
  },
  pa_prog_net_amt: {
    label: '순매수/순매도 금액',
    fields: [
      { id: 'direction', type: 'select', label: '방향', options: ['순매수', '순매도'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '억원', default: 10, min: 0 }
    ],
    buildLabel: function (v) {
      return '프로그램매매 ' + v.direction + '금액 ' + v.value + '억 ' + v.operator;
    }
  },
  pa_prog_qty_chg: {
    label: '순매수 증감수량',
    fields: [
      { id: 'direction', type: 'select', label: '방향', options: ['증가', '감소'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '수량(주)', default: 10000, min: 0 }
    ],
    buildLabel: function (v) {
      return '프로그램매매 순매수증감수량 ' + v.direction + ' ' + Number(v.value).toLocaleString() + '주 ' + v.operator;
    }
  },
  pa_prog_amt_chg: {
    label: '순매수 증감금액',
    fields: [
      { id: 'direction', type: 'select', label: '방향', options: ['증가', '감소'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '억원', default: 5, min: 0 }
    ],
    buildLabel: function (v) {
      return '프로그램매매 순매수증감금액 ' + v.direction + ' ' + v.value + '억 ' + v.operator;
    }
  },
  pa_short_vol: {
    label: '공매도 거래량',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '수량', default: 10000, min: 0 }
    ],
    buildLabel: function (v) {
      return '공매도거래량 ' + Number(v.value).toLocaleString() + ' ' + v.operator;
    }
  },
  pa_short_accum: {
    label: '누적 공매도 비중',
    fields: [
      { id: 'period', type: 'number', label: '기간(일)', default: 20, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비중(%)', default: 5, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '누적공매도비중 ' + v.period + '일 ' + v.value + '% ' + v.operator;
    }
  },
  pa_short_amt: {
    label: '공매도 거래대금',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '억원', default: 10, min: 0 }
    ],
    buildLabel: function (v) {
      return '공매도거래대금 ' + v.value + '억 ' + v.operator;
    }
  },
  pa_short_avg_rate: {
    label: '공매도 평균가격대비 주가등락률',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '등락률(%)', default: 3, step: 0.1 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 10, step: 0.1 }
    ],
    buildLabel: function (v) {
      return (
        '공매도평균가대비등락률 ' + v.value1 + '%' + (v.operator === '범위' ? '~' + v.value2 + '%' : ' ' + v.operator)
      );
    }
  },
  pa_short_period_amt: {
    label: '기간내 공매도 거래대금',
    fields: [
      { id: 'period', type: 'number', label: '기간(일)', default: 20, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '억원', default: 50, min: 0 }
    ],
    buildLabel: function (v) {
      return '기간내공매도거래대금(' + v.period + '일) ' + v.value + '억 ' + v.operator;
    }
  },
  pa_loan_qty_chg: {
    label: '대차잔고 증감수량',
    fields: [
      { id: 'direction', type: 'select', label: '방향', options: ['증가', '감소'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '수량(주)', default: 10000, min: 0 }
    ],
    buildLabel: function (v) {
      return '대차잔고증감수량 ' + v.direction + ' ' + Number(v.value).toLocaleString() + '주 ' + v.operator;
    }
  },
  pa_loan_amt_chg: {
    label: '대차잔고 증감금액',
    fields: [
      { id: 'direction', type: 'select', label: '방향', options: ['증가', '감소'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '억원', default: 5, min: 0 }
    ],
    buildLabel: function (v) {
      return '대차잔고증감금액 ' + v.direction + ' ' + v.value + '억 ' + v.operator;
    }
  },
  pa_loan_consec: {
    label: '대차거래잔고 증감연속봉수',
    fields: [
      { id: 'direction', type: 'select', label: '방향', options: ['증가', '감소'] },
      { id: 'count', type: 'number', label: '연속(봉)', default: 3, min: 1 }
    ],
    buildLabel: function (v) {
      return '대차잔고 ' + v.direction + ' ' + v.count + '봉 연속';
    }
  },
  pa_loan_period_amt: {
    label: '기간내 대차잔고 거래대금',
    fields: [
      { id: 'period', type: 'number', label: '기간(일)', default: 20, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '억원', default: 50, min: 0 }
    ],
    buildLabel: function (v) {
      return '기간내대차잔고거래대금(' + v.period + '일) ' + v.value + '억 ' + v.operator;
    }
  },
  pa_loan_float_ratio: {
    label: '유통주식수대비 대차잔고 비중',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '이상(%)', default: 5, min: 0, step: 0.1 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 20, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '대차잔고비중 ' + v.value1 + '%' + (v.operator === '범위' ? '~' + v.value2 + '%' : ' ' + v.operator);
    }
  },
  pa_intra_first_rate: {
    label: '당일 첫 분봉 주가등락률',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '등락률(%)', default: 2, step: 0.1 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 5, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '첫분봉등락률 ' + v.value1 + '%' + (v.operator === '범위' ? '~' + v.value2 + '%' : ' ' + v.operator);
    }
  },
  pa_intra_base_break: {
    label: '당일분봉 기준봉대비 주가돌파',
    fields: [
      { id: 'base_time', type: 'number', label: '기준시간(분)', default: 30, min: 1 },
      { id: 'direction', type: 'select', label: '방향', options: ['상향', '하향'] }
    ],
    buildLabel: function (v) {
      return '분봉기준봉돌파 ' + v.base_time + '분 ' + v.direction;
    }
  },
  pa_intra_position: {
    label: '당일분봉 주가위치',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '위치(%)', default: 70, min: 0, max: 100 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 100, min: 0, max: 100 }
    ],
    buildLabel: function (v) {
      return '분봉주가위치 ' + v.value1 + '%' + (v.operator === '범위' ? '~' + v.value2 + '%' : ' ' + v.operator);
    }
  },
  pa_intra_high_break: {
    label: '당일 전고점 돌파',
    fields: [],
    buildLabel: function () {
      return '당일분봉 전고점 돌파';
    }
  },
  pa_intra_avg_amt: {
    label: '당일분봉 평균거래대금',
    fields: [
      { id: 'period', type: 'number', label: '분봉수', default: 5, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '억원', default: 1, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '분봉평균거래대금 ' + v.period + '봉 ' + v.value + '억 ' + v.operator;
    }
  },
  pa_intra_gold_rate: {
    label: '분봉 금일 첫봉대비 주가등락률',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value1', type: 'number', label: '등락률(%)', default: 3, step: 0.1 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 10, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '첫봉대비주가등락률 ' + v.value1 + '%' + (v.operator === '범위' ? '~' + v.value2 + '%' : ' ' + v.operator);
    }
  },
  pa_intra_candle_consec: {
    label: '당일 첫 분봉 캔들연속발생',
    fields: [
      { id: 'candle_type', type: 'select', label: '캔들종류', options: ['양봉', '음봉', '도지'] },
      { id: 'count', type: 'number', label: '연속(봉)', default: 3, min: 1 }
    ],
    buildLabel: function (v) {
      return '첫분봉캔들연속 ' + v.candle_type + ' ' + v.count + '봉';
    }
  },
  pa_intra_first_vol: {
    label: '당일 첫 분봉 거래량비율',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 200, min: 0 }
    ],
    buildLabel: function (v) {
      return '첫분봉거래량비율 ' + v.value + '% ' + v.operator;
    }
  },
  pa_intra_gold_vol: {
    label: '분봉 금일 첫봉대비 거래량비율',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '비율(%)', default: 200, min: 0 }
    ],
    buildLabel: function (v) {
      return '첫봉대비거래량비율 ' + v.value + '% ' + v.operator;
    }
  },
  pa_intra_base_compare: {
    label: '당일분봉 기준봉대비 주가비교',
    fields: [
      { id: 'base_prev', type: 'number', label: '기준봉(봉전)', default: 1, min: 0 },
      { id: 'base_price', type: 'select', label: '기준가격', options: ['시가', '고가', '저가', '종가'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '초과', '미만'] },
      { id: 'cur_price', type: 'select', label: '현재가격', options: ['시가', '고가', '저가', '종가', '현재가'] }
    ],
    buildLabel: function (v) {
      return '분봉기준봉주가비교 ' + v.base_prev + '봉전' + v.base_price + ' ' + v.operator + ' ' + v.cur_price;
    }
  },
  pa_intra_high_compare: {
    label: '당일 전고점 비교',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '초과', '미만'] },
      { id: 'value', type: 'number', label: '괴리율(%)', default: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '당일전고점비교 ' + v.operator + ' ' + v.value + '%';
    }
  }
};
