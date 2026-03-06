// 순위분석 FIELDS
const CONDITION_FIELDS_RANKING = {
  // ==================== 시세 순위 ====================
  rank_price_change: {
    label: '전일대비 주가등락률 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '전일대비등락률순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_intraday_change: {
    label: '시가대비 주가등락률 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '시가대비등락률순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_5day: {
    label: '5일간 주가변동폭 비율 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '5일주가변동폭순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_52high: {
    label: '52주 최고가 대비 등락률 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '52주최고가대비순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_52low: {
    label: '52주 최저가 대비 등락률 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '52주최저가대비순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_net_buy: {
    label: '순매수잔량 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '순매수잔량순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_bid_ask_ratio: {
    label: '매도매수잔량비 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '매도매수잔량비순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_best_ask_ratio: {
    label: '총매도잔량대비 우선매도호가잔량비 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '우선매도호가잔량비순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_best_bid_ratio: {
    label: '총매수잔량대비 우선매수호가잔량비 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '우선매수호가잔량비순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_volume_rank: {
    label: '거래량 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '거래량순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_prev_volume: {
    label: '전일거래량 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '전일거래량순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_avg_volume: {
    label: '평균거래량 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '평균거래량순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_exec_strength: {
    label: '체결강도 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '체결강도순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_vol_chg: {
    label: '전일대비 거래량 증감률 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '전일대비거래량증감순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_vol_intraday: {
    label: '전일 동시간대 대비 거래량 증감률 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '동시간대거래량증감순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_vol_rate: {
    label: '거래량회전율 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '거래량회전율순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_amt: {
    label: '거래대금 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '거래대금순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_avg_amt: {
    label: '평균거래대금 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '평균거래대금순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_prev_amt: {
    label: '전일거래대금 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '전일거래대금순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_expected_vol: {
    label: '예상체결량 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '예상체결량순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_for_ratio: {
    label: '외국인지분율 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '외국인지분율순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_for_ratio_chg: {
    label: '외국인지분율 변동 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '외국인지분율변동순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_for_net_buy: {
    label: '외국인순매수 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '외국인순매수순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_inst_buy: {
    label: '전기기관매수 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '전기기관매수순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_foreign_vol_chg: {
    label: '외국계증권사 거래량증감 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '외국계거래량증감순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_foreign_amt_chg: {
    label: '외국계증권사 거래비중증감 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '외국계거래비중증감순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_listed_shares: {
    label: '상장주식수 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '상장주식수순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },

  // ==================== 기술적지표 순위 ====================
  rank_macd: {
    label: 'MACD(12,26,9) 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return 'MACD순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_gap_idx: {
    label: '이격도(20) 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '이격도순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_cci_rank: {
    label: 'CCI(9) 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return 'CCI순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_momentum_r: {
    label: 'Momentum(9,9) 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return 'Momentum순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_rsi_rank: {
    label: 'RSI(14) 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return 'RSI순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_stoch_fast: {
    label: 'Stochastic Fast(5,3) 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return 'Stoch Fast순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_stoch_slow: {
    label: 'Stochastic Slow(7,3,5) 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return 'Stoch Slow순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_roc: {
    label: 'ROC(12) 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return 'ROC순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_trix: {
    label: 'TRIX(12,9) 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return 'TRIX순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  },
  rank_obv: {
    label: 'OBV(12) 순위',
    fields: [
      { id: 'market', type: 'select', label: '시장구분', options: ['전체', '코스피', '코스닥'] },
      { id: 'rank_top', type: 'number', label: '상위 N위', default: 20, min: 1, max: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return 'OBV순위[' + v.market + '] 상위' + v.rank_top + '위';
    }
  }
};
