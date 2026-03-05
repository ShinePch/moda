// 조건검색기 카테고리 트리 구조
const CONDITION_TREE = [
  {
    id: 'range',
    label: '범위지정',
    children: [
      { id: 'range_market', label: '코스피/코스닥 구분' },
      { id: 'range_index_change', label: '지수등락률' },
      { id: 'range_search_time', label: '검색시간' },
      { id: 'range_capital', label: '자본금' },
      { id: 'range_shares', label: '상장주식수' },
      { id: 'range_mktcap', label: '시가총액' },
      { id: 'range_parvalue', label: '액면가' },
      { id: 'range_listdate', label: '상장일' },
      { id: 'range_margin', label: '증거금률' },
      { id: 'range_credit', label: '신용융자' },
      { id: 'range_price', label: '주가범위' },
      { id: 'range_volume', label: '거래량' },
      { id: 'range_prev_volume', label: '전일거래량' },
      { id: 'range_other_type', label: '기타종목구분' },
      { id: 'range_special_type', label: '특이종목구분' },
      { id: 'range_float_shares', label: '유통주식수' },
      { id: 'range_float_ratio', label: '상장주식수 대비 유통주식수 비율' }
    ]
  },
  {
    id: 'price_analysis',
    label: '시세분석',
    children: [
      { id: 'pa_price_cond', label: '가격조건' },
      { id: 'pa_period_candle', label: '기간내기준봉' },
      { id: 'pa_ask', label: '호가잔량' },
      { id: 'pa_volume_amount', label: '거래량/거래대금' },
      { id: 'pa_foreign', label: '외국인' },
      { id: 'pa_broker', label: '거래원' },
      { id: 'pa_execution', label: '체결강도' },
      { id: 'pa_program', label: '프로그램매매' },
      { id: 'pa_intraday', label: '당일분봉' }
    ]
  },
  {
    id: 'technical',
    label: '기술적분석',
    children: [
      { id: 'ta_ma', label: '주가이동평균' },
      { id: 'ta_vol_ma', label: '거래량이동평균' },
      {
        id: 'ta_trend',
        label: '추세지표',
        children: [
          { id: 'ta_macd', label: 'MACD' },
          { id: 'ta_dmi', label: 'DMI' },
          { id: 'ta_cci', label: 'CCI' }
        ]
      },
      {
        id: 'ta_momentum',
        label: '모멘텀지표',
        children: [
          { id: 'ta_rsi', label: 'RSI' },
          { id: 'ta_stoch', label: 'Stochastic' },
          { id: 'ta_momentum_idx', label: 'Momentum' }
        ]
      },
      {
        id: 'ta_channel',
        label: '채널지표',
        children: [
          { id: 'ta_bollinger', label: 'Bollinger Bands' },
          { id: 'ta_envelope', label: 'Envelope' }
        ]
      },
      { id: 'ta_volatility', label: '변동성지표' },
      { id: 'ta_vol_indicator', label: '거래량지표' },
      { id: 'ta_pricebox', label: '가격박스' }
    ]
  },
  {
    id: 'pattern',
    label: '패턴분석',
    children: [
      { id: 'pat_definition', label: '패턴정의' },
      { id: 'pat_basic', label: '기본적인 캔들' },
      { id: 'pat_up_reversal', label: '상승반전형' },
      { id: 'pat_up_continue', label: '상승지속형' },
      { id: 'pat_down_reversal', label: '하락반전형' },
      { id: 'pat_down_continue', label: '하락지속형' }
    ]
  },
  {
    id: 'financial',
    label: '재무분석',
    children: [
      { id: 'fin_price_index', label: '주가지표' },
      { id: 'fin_profit', label: '수익성분석' },
      { id: 'fin_growth', label: '성장성분석' },
      { id: 'fin_stability', label: '안정성분석' },
      { id: 'fin_pl', label: 'P/L재무항목' },
      { id: 'fin_bs', label: 'B/S재무항목' },
      { id: 'fin_cashflow', label: '현금흐름표재무항목' }
    ]
  },
  {
    id: 'ranking',
    label: '순위분석',
    children: [
      {
        id: 'rank_price',
        label: '시세 순위',
        children: [
          { id: 'rank_price_change', label: '전일대비 주가등락' },
          { id: 'rank_intraday_change', label: '시가대비 주가등락' },
          { id: 'rank_5day', label: '5일간 주가변동률' },
          { id: 'rank_52high', label: '52주 최고가 대비' },
          { id: 'rank_52low', label: '52주 최저가 대비' },
          { id: 'rank_volume_rank', label: '거래량 순위' },
          { id: 'rank_vol_rate', label: '거래량회전율 순위' }
        ]
      },
      {
        id: 'rank_technical',
        label: '기술적지표 순위',
        children: [
          { id: 'rank_macd', label: 'MACD(12,26,9) 순위' },
          { id: 'rank_cci_rank', label: 'CCI(9) 순위' },
          { id: 'rank_momentum_r', label: 'Momentum(9,9) 순위' },
          { id: 'rank_rsi_rank', label: '심리도(10) 순위' },
          { id: 'rank_stoch_fast', label: 'Stochastic Fast' }
        ]
      }
    ]
  }
];

// 각 조건 ID별 입력 필드 정의
const CONDITION_FIELDS = {
  // ===========================================================
  // 범위지정
  // ===========================================================

  // 사진1: 코스피/코스닥 구분 - 라디오 버튼 8가지
  range_market: {
    label: '코스피/코스닥 구분',
    fields: [
      {
        id: 'market',
        type: 'select',
        label: '시장구분',
        options: ['코스피', 'KOSPI200', 'KOSPI100', 'KOSPI50', '코스닥', '코스닥150', 'KRX300', 'KRX100']
      }
    ],
    buildLabel: v => `시장: ${v.market}`
  },

  // 사진2: 지수등락률 - 지수선택 + 이상 단일 or 범위
  range_index_change: {
    label: '지수등락률',
    fields: [
      {
        id: 'index_type',
        type: 'select',
        label: '지수',
        options: ['코스피종합', '코스닥종합', 'KOSPI200', '코스피대형주', '코스피중형주', '코스피소형주']
      },
      { id: 'mode', type: 'select', label: '방식', options: ['이상', '범위'] },
      { id: 'value1', type: 'number', label: '등락률(%)', default: 0.2, min: -100, max: 100, step: 0.1 },
      { id: 'value2', type: 'number', label: '~상한(%)', default: 0.5, min: -100, max: 100, step: 0.1 }
    ],
    buildLabel: v =>
      v.mode === '범위'
        ? `${v.index_type} 등락률 ${v.value1}%~${v.value2}%`
        : `${v.index_type} 등락률 ${v.value1}% ${v.mode}`
  },

  // 사진3: 검색시간 - 시 / 분(시작) ~ 분(종료) : 초
  range_search_time: {
    label: '검색시간',
    fields: [
      { id: 'hour', type: 'number', label: '시', default: 9, min: 9, max: 15 },
      { id: 'min_s', type: 'number', label: '분(시작)', default: 0, min: 0, max: 59 },
      { id: 'min_e', type: 'number', label: '분(종료)', default: 15, min: 0, max: 59 },
      { id: 'sec', type: 'number', label: '초', default: 20, min: 0, max: 59 }
    ],
    buildLabel: v =>
      `검색시간: ${v.hour}:${String(v.min_s).padStart(2, '0')} ~ ${v.hour}:${String(v.min_e).padStart(2, '0')}:${String(v.sec).padStart(2, '0')}`
  },

  // 사진4: 자본금 - 최근결산 기준, 이상 단일 or 범위
  range_capital: {
    label: '자본금',
    fields: [
      { id: 'mode', type: 'select', label: '방식', options: ['이상', '범위'] },
      { id: 'value1', type: 'number', label: '자본금(억원)', default: 10, min: 0 },
      { id: 'value2', type: 'number', label: '~이하(억원)', default: 1000, min: 0 }
    ],
    buildLabel: v =>
      v.mode === '범위'
        ? `자본금 ${Number(v.value1).toLocaleString()}억~${Number(v.value2).toLocaleString()}억원`
        : `자본금 ${Number(v.value1).toLocaleString()}억원 ${v.mode}`
  },

  // 사진5: 상장주식수 - 주 이상 / 주 이하
  range_shares: {
    label: '상장주식수',
    fields: [
      { id: 'min', type: 'number', label: '이상(주)', default: 1000000, min: 0 },
      { id: 'max', type: 'number', label: '이하(주)', default: 2000000, min: 0 }
    ],
    buildLabel: v => `상장주식수 ${Number(v.min).toLocaleString()}주 이상 ${Number(v.max).toLocaleString()}주 이하`
  },

  // 사진6: 시가총액 - 현재가 기준, 십억원 단위, 이상 단일 or 범위
  range_mktcap: {
    label: '시가총액',
    fields: [
      { id: 'mode', type: 'select', label: '방식', options: ['이상', '범위'] },
      { id: 'value1', type: 'number', label: '시총(십억원)', default: 10, min: 0 },
      { id: 'value2', type: 'number', label: '~이하(십억원)', default: 50000, min: 0 }
    ],
    buildLabel: v =>
      v.mode === '범위'
        ? `시가총액 ${Number(v.value1).toLocaleString()}십억~${Number(v.value2).toLocaleString()}십억원`
        : `시가총액 ${Number(v.value1).toLocaleString()}십억원 ${v.mode}`
  },

  // 사진7: 액면가 - 이상 / 이하
  range_parvalue: {
    label: '액면가',
    fields: [
      { id: 'min', type: 'number', label: '이상(원)', default: 1, min: 0 },
      { id: 'max', type: 'number', label: '이하(원)', default: 10000, min: 0 }
    ],
    buildLabel: v => `액면가 ${Number(v.min).toLocaleString()}원 이상 ${Number(v.max).toLocaleString()}원 이하`
  },

  // 사진8: 상장일 - N일(영업일) 이내
  range_listdate: {
    label: '상장일',
    fields: [{ id: 'days', type: 'number', label: '이내(영업일)', default: 30, min: 1 }],
    buildLabel: v => `상장일 ${Number(v.days).toLocaleString()}일(영업일) 이내`
  },

  // 사진9: 증거금률 - 라디오 6가지
  range_margin: {
    label: '증거금률',
    fields: [
      {
        id: 'rate',
        type: 'select',
        label: '증거금률',
        options: ['증거금 20%', '증거금 30%', '증거금 40%', '증거금 50%', '증거금 60%', '증거금 100%']
      }
    ],
    buildLabel: v => `${v.rate}`
  },

  // 사진10: 신용융자 - 라디오 9가지
  range_credit: {
    label: '신용융자',
    fields: [
      {
        id: 'credit_type',
        type: 'select',
        label: '신용융자 구분',
        options: [
          '신용융자 전체',
          '신용융자 ABCD군',
          '신용융자 ABC군',
          '신용융자 A군',
          '신용융자 B군',
          '신용융자 C군',
          '신용융자 D군',
          '신용융자 E군',
          '신용한도초과'
        ]
      }
    ],
    buildLabel: v => `${v.credit_type}`
  },

  // 사진11: 주가범위 - N일전기준 / 기준가격 / min ~ max
  range_price: {
    label: '주가범위',
    fields: [
      { id: 'prev_days', type: 'number', label: '일전기준', default: 0, min: 0 },
      { id: 'price_type', type: 'select', label: '기준가격', options: ['종가', '시가', '고가', '저가'] },
      { id: 'min', type: 'number', label: '이상(원)', default: 10000, min: 0 },
      { id: 'max', type: 'number', label: '이하(원)', default: 20000, min: 0 }
    ],
    buildLabel: v =>
      `주가범위 [${v.prev_days}일전 ${v.price_type}] ${Number(v.min).toLocaleString()}~${Number(v.max).toLocaleString()}원`
  },

  // 사진12: 거래량 - 일/주/월 단위, min ~ max
  range_volume: {
    label: '거래량',
    fields: [
      { id: 'period_type', type: 'select', label: '단위', options: ['일', '주', '월'] },
      { id: 'min', type: 'number', label: '이상(주)', default: 1000000, min: 0 },
      { id: 'max', type: 'number', label: '이하(주)', default: 999999999, min: 0 }
    ],
    buildLabel: v =>
      `거래량 [${v.period_type}] ${Number(v.min).toLocaleString()}주 이상 ${Number(v.max).toLocaleString()}주 이하`
  },

  // 사진13: 전일거래량 - 일/주/월 단위, N봉전, min ~ max
  range_prev_volume: {
    label: '전일거래량',
    fields: [
      { id: 'period_type', type: 'select', label: '단위', options: ['일', '주', '월'] },
      { id: 'prev_candle', type: 'number', label: '봉전', default: 1, min: 1 },
      { id: 'min', type: 'number', label: '이상(주)', default: 1000000, min: 0 },
      { id: 'max', type: 'number', label: '이하(주)', default: 999999999, min: 0 }
    ],
    buildLabel: v =>
      `전일거래량 [${v.period_type}] ${v.prev_candle}봉전 ${Number(v.min).toLocaleString()}~${Number(v.max).toLocaleString()}주`
  },

  // 사진14: 기타종목구분 - 라디오 10가지
  range_other_type: {
    label: '기타종목구분',
    fields: [
      {
        id: 'stock_type',
        type: 'select',
        label: '종목구분',
        options: [
          '우선주',
          'ETF',
          'REITS 종목',
          '투자회사',
          '선박투자',
          '인프라투자',
          '대주가능',
          '스팩',
          'ETN',
          'NXT가능'
        ]
      }
    ],
    buildLabel: v => `기타종목구분: ${v.stock_type}`
  },

  // 사진15: 특이종목구분 - 라디오 11가지
  range_special_type: {
    label: '특이종목구분',
    fields: [
      {
        id: 'special_type',
        type: 'select',
        label: '특이구분',
        options: [
          '정리매매',
          '관리',
          '투자위험',
          '투자경고',
          '투자주의',
          '거래정지',
          '환기',
          '불성실공시',
          '단기과열',
          '이상급등',
          '공매도과열'
        ]
      }
    ],
    buildLabel: v => `특이종목구분: ${v.special_type}`
  },

  // 사진16: 유통주식수 - 주 이상 / 주 이하
  range_float_shares: {
    label: '유통주식수',
    fields: [
      { id: 'min', type: 'number', label: '이상(주)', default: 1000000, min: 0 },
      { id: 'max', type: 'number', label: '이하(주)', default: 2000000, min: 0 }
    ],
    buildLabel: v => `유통주식수 ${Number(v.min).toLocaleString()}주 이상 ${Number(v.max).toLocaleString()}주 이하`
  },

  // 사진17: 상장주식수 대비 유통주식수 비율 - % 이상 단일 or 범위
  range_float_ratio: {
    label: '상장주식수 대비 유통주식수 비율',
    fields: [
      { id: 'mode', type: 'select', label: '방식', options: ['이상', '범위'] },
      { id: 'value1', type: 'number', label: '비율(%)', default: 50, min: 0, max: 100, step: 0.1 },
      { id: 'value2', type: 'number', label: '~이하(%)', default: 100, min: 0, max: 100, step: 0.1 }
    ],
    buildLabel: v => (v.mode === '범위' ? `유통비율 ${v.value1}%~${v.value2}%` : `유통비율 ${v.value1}% ${v.mode}`)
  },

  // ===========================================================
  // 시세분석
  // ===========================================================

  pa_price_cond: {
    label: '가격조건',
    fields: [
      { id: 'target', type: 'select', label: '기준', options: ['현재가', '시가', '고가', '저가'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '초과', '미만'] },
      { id: 'value', type: 'number', label: '가격(원)', default: 5000, min: 0 }
    ],
    buildLabel: v => `${v.target} ${Number(v.value).toLocaleString()}원 ${v.operator}`
  },
  pa_volume_amount: {
    label: '거래량/거래대금',
    fields: [
      { id: 'type', type: 'select', label: '구분', options: ['거래량', '거래대금'] },
      { id: 'compare', type: 'select', label: '비교', options: ['절대값', '전일대비'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '값', default: 100000, min: 0 }
    ],
    buildLabel: v => `${v.type} ${v.compare} ${Number(v.value).toLocaleString()} ${v.operator}`
  },

  // ===========================================================
  // 기술적분석
  // ===========================================================

  ta_ma: {
    label: '주가이동평균',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'calc_type1', type: 'select', label: '이평1 종류', options: ['이평', '지수이평', '가중이평'] },
      { id: 'period1', type: 'number', label: '기간1', default: 5, min: 1 },
      { id: 'calc_type2', type: 'select', label: '이평2 종류', options: ['이평', '지수이평', '가중이평'] },
      { id: 'period2', type: 'number', label: '기간2', default: 20, min: 1 },
      { id: 'cross_type', type: 'select', label: '크로스', options: ['골든', '데드', '위', '아래', '정배열', '역배열'] }
    ],
    buildLabel: v =>
      `주가이평:[${v.period_type}] (${v.calc_type1} ${v.period1}) ${v.cross_type}크로스 (${v.calc_type2} ${v.period2})`
  },
  ta_vol_ma: {
    label: '거래량이동평균',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월'] },
      { id: 'period1', type: 'number', label: '기간1', default: 5, min: 1 },
      { id: 'period2', type: 'number', label: '기간2', default: 20, min: 1 },
      { id: 'cross_type', type: 'select', label: '크로스', options: ['골든', '데드', '위', '아래'] }
    ],
    buildLabel: v => `거래량이평:[${v.period_type}] ${v.period1}이평 ${v.cross_type}크로스 ${v.period2}이평`
  },
  ta_macd: {
    label: 'MACD',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'fast', type: 'number', label: '단기', default: 12, min: 1 },
      { id: 'slow', type: 'number', label: '장기', default: 26, min: 1 },
      { id: 'signal', type: 'number', label: '시그널', default: 9, min: 1 },
      { id: 'cross_type', type: 'select', label: '크로스', options: ['골든', '데드', '위', '아래'] }
    ],
    buildLabel: v => `MACD(${v.fast},${v.slow},${v.signal}) [${v.period_type}] ${v.cross_type}크로스`
  },
  ta_dmi: {
    label: 'DMI',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'period', type: 'number', label: '기간', default: 14, min: 1 },
      {
        id: 'cross_type',
        type: 'select',
        label: '크로스',
        options: ['골든(+DI/-DI)', '데드(+DI/-DI)', '+DI 위', '-DI 위']
      }
    ],
    buildLabel: v => `DMI(${v.period}) [${v.period_type}] ${v.cross_type}`
  },
  ta_cci: {
    label: 'CCI',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'period', type: 'number', label: '기간', default: 14, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '크로스상향', '크로스하향'] },
      { id: 'value', type: 'number', label: '값', default: 100, min: -300, max: 300 }
    ],
    buildLabel: v => `CCI(${v.period}) [${v.period_type}] ${v.operator} ${v.value}`
  },
  ta_rsi: {
    label: 'RSI',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'period', type: 'number', label: '기간', default: 14, min: 1 },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '크로스상향', '크로스하향'] },
      { id: 'value', type: 'number', label: '값', default: 70, min: 0, max: 100 }
    ],
    buildLabel: v => `RSI(${v.period}) [${v.period_type}] ${v.operator} ${v.value}`
  },
  ta_stoch: {
    label: 'Stochastic',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'k_period', type: 'number', label: '%K 기간', default: 5, min: 1 },
      { id: 'd_period', type: 'number', label: '%D 기간', default: 3, min: 1 },
      {
        id: 'cross_type',
        type: 'select',
        label: '크로스',
        options: ['골든', '데드', '과매수(80이상)', '과매도(20이하)']
      }
    ],
    buildLabel: v => `Stochastic(%K:${v.k_period},%D:${v.d_period}) [${v.period_type}] ${v.cross_type}`
  },
  ta_momentum_idx: {
    label: 'Momentum',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'period', type: 'number', label: '기간', default: 9, min: 1 },
      { id: 'signal', type: 'number', label: '시그널', default: 9, min: 1 },
      { id: 'cross_type', type: 'select', label: '크로스', options: ['골든', '데드', '0선 상향돌파', '0선 하향돌파'] }
    ],
    buildLabel: v => `Momentum(${v.period},${v.signal}) [${v.period_type}] ${v.cross_type}`
  },
  ta_bollinger: {
    label: 'Bollinger Bands',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'period', type: 'number', label: '기간', default: 20, min: 1 },
      { id: 'multiplier', type: 'number', label: '승수', default: 2, min: 0.1, step: 0.1 },
      {
        id: 'position',
        type: 'select',
        label: '위치',
        options: ['상단돌파', '하단돌파', '상단터치', '하단터치', '밴드수축', '밴드확장']
      }
    ],
    buildLabel: v => `볼린저밴드(${v.period},${v.multiplier}) [${v.period_type}] ${v.position}`
  },
  ta_pricebox: {
    label: '가격박스',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월'] },
      { id: 'period', type: 'number', label: '박스 기간', default: 20, min: 2 },
      { id: 'position', type: 'select', label: '위치', options: ['상단돌파', '하단돌파', '박스권 내'] }
    ],
    buildLabel: v => `가격박스(${v.period}) [${v.period_type}] ${v.position}`
  },

  // ===========================================================
  // 패턴분석
  // ===========================================================

  pat_basic: {
    label: '기본적인 캔들',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월'] },
      {
        id: 'pattern',
        type: 'select',
        label: '패턴',
        options: ['장대양봉', '장대음봉', '도지', '망치형', '역망치형', '잠자리도지']
      }
    ],
    buildLabel: v => `캔들패턴: ${v.pattern} [${v.period_type}]`
  },
  pat_up_reversal: {
    label: '상승반전형',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월'] },
      {
        id: 'pattern',
        type: 'select',
        label: '패턴',
        options: ['역망치형', '상승장악형', '관통형', '샛별형', '상승반전도지', '적삼병']
      }
    ],
    buildLabel: v => `상승반전: ${v.pattern} [${v.period_type}]`
  },
  pat_down_reversal: {
    label: '하락반전형',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월'] },
      {
        id: 'pattern',
        type: 'select',
        label: '패턴',
        options: ['유성형', '하락장악형', '먹구름형', '저녁별형', '흑삼병']
      }
    ],
    buildLabel: v => `하락반전: ${v.pattern} [${v.period_type}]`
  },

  // ===========================================================
  // 재무분석
  // ===========================================================

  fin_price_index: {
    label: '주가지표',
    fields: [
      {
        id: 'index_type',
        type: 'select',
        label: '지표',
        options: ['PER', 'PBR', 'ROE', 'EPS', 'BPS', 'DPS', 'PCR', 'PSR']
      },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '범위'] },
      { id: 'value', type: 'number', label: '값', default: 10, min: 0, step: 0.1 }
    ],
    buildLabel: v => `${v.index_type} ${v.value} ${v.operator}`
  },
  fin_profit: {
    label: '수익성분석',
    fields: [
      { id: 'index_type', type: 'select', label: '지표', options: ['영업이익률', '순이익률', 'ROA', 'ROE', 'EBITDA'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '값(%)', default: 10, min: -999, step: 0.1 }
    ],
    buildLabel: v => `${v.index_type} ${v.value}% ${v.operator}`
  },
  fin_growth: {
    label: '성장성분석',
    fields: [
      {
        id: 'index_type',
        type: 'select',
        label: '지표',
        options: ['매출액증가율', '영업이익증가율', '순이익증가율', 'EPS증가율']
      },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '값(%)', default: 10, min: -999, step: 0.1 }
    ],
    buildLabel: v => `${v.index_type} ${v.value}% ${v.operator}`
  },
  fin_stability: {
    label: '안정성분석',
    fields: [
      {
        id: 'index_type',
        type: 'select',
        label: '지표',
        options: ['부채비율', '유동비율', '당좌비율', '자기자본비율']
      },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하'] },
      { id: 'value', type: 'number', label: '값(%)', default: 100, min: 0, step: 0.1 }
    ],
    buildLabel: v => `${v.index_type} ${v.value}% ${v.operator}`
  },

  // ===========================================================
  // 순위분석
  // ===========================================================

  rank_volume_rank: {
    label: '거래량 순위',
    fields: [{ id: 'rank', type: 'number', label: '순위 이내', default: 50, min: 1, max: 999 }],
    buildLabel: v => `거래량 순위 ${v.rank}위 이내`
  },
  rank_price_change: {
    label: '전일대비 주가등락',
    fields: [
      { id: 'direction', type: 'select', label: '방향', options: ['상위', '하위'] },
      { id: 'rank', type: 'number', label: '순위 이내', default: 30, min: 1, max: 999 }
    ],
    buildLabel: v => `전일대비 주가등락 ${v.direction} ${v.rank}위 이내`
  },
  rank_macd: {
    label: 'MACD(12,26,9) 순위',
    fields: [
      { id: 'direction', type: 'select', label: '방향', options: ['상위', '하위'] },
      { id: 'rank', type: 'number', label: '순위 이내', default: 30, min: 1, max: 999 }
    ],
    buildLabel: v => `MACD(12,26,9) ${v.direction} ${v.rank}위 이내`
  },
  rank_cci_rank: {
    label: 'CCI(9) 순위',
    fields: [
      { id: 'direction', type: 'select', label: '방향', options: ['상위', '하위'] },
      { id: 'rank', type: 'number', label: '순위 이내', default: 30, min: 1, max: 999 }
    ],
    buildLabel: v => `CCI(9) ${v.direction} ${v.rank}위 이내`
  },
  rank_rsi_rank: {
    label: '심리도(10) 순위',
    fields: [
      { id: 'direction', type: 'select', label: '방향', options: ['상위', '하위'] },
      { id: 'rank', type: 'number', label: '순위 이내', default: 30, min: 1, max: 999 }
    ],
    buildLabel: v => `심리도(10) ${v.direction} ${v.rank}위 이내`
  }
};

// 알파벳 순서 생성 (A, B, C ... Z, AA, AB ...)
function generateConditionLabel(index) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (index < 26) return alphabet[index];
  return alphabet[Math.floor(index / 26) - 1] + alphabet[index % 26];
}
