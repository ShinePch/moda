// 재무분석 FIELDS
const CONDITION_FIELDS_FINANCIAL = {
  // ==================== 주가지표 ====================
  fin_pi_per: {
    label: 'PER',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값', default: 10, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return 'PER[' + v.settle_type + '] ' + v.operator + ' ' + v.value;
    }
  },
  fin_pi_pbr: {
    label: 'PBR',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값', default: 1, min: 0, step: 0.01 }
    ],
    buildLabel: function (v) {
      return 'PBR[' + v.settle_type + '] ' + v.operator + ' ' + v.value;
    }
  },
  fin_pi_psr: {
    label: 'PSR',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값', default: 1, min: 0, step: 0.01 }
    ],
    buildLabel: function (v) {
      return 'PSR[' + v.settle_type + '] ' + v.operator + ' ' + v.value;
    }
  },
  fin_pi_ev_ebitda: {
    label: 'EV/EBITDA',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값', default: 10, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return 'EV/EBITDA[' + v.settle_type + '] ' + v.operator + ' ' + v.value;
    }
  },
  fin_pi_pcr: {
    label: 'PCR',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값', default: 10, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return 'PCR[' + v.settle_type + '] ' + v.operator + ' ' + v.value;
    }
  },
  fin_pi_peg: {
    label: 'PEG',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값', default: 1, min: 0, step: 0.01 }
    ],
    buildLabel: function (v) {
      return 'PEG[' + v.settle_type + '] ' + v.operator + ' ' + v.value;
    }
  },
  fin_pi_div_yield: {
    label: '전년배당시배당수익률',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 3, min: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '전년배당수익률 ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_pi_eps: {
    label: 'EPS',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(원)', default: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return 'EPS[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '원';
    }
  },
  fin_pi_bps: {
    label: 'BPS',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(원)', default: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return 'BPS[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '원';
    }
  },
  fin_pi_sps: {
    label: 'SPS',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(원)', default: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return 'SPS[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '원';
    }
  },
  fin_pi_cfps: {
    label: 'CFPS',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(원)', default: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return 'CFPS[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '원';
    }
  },
  fin_pi_mktcap: {
    label: '시가총액',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(억원)', default: 1000, min: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return '시가총액 ' + v.operator + ' ' + v.value + '억원';
    }
  },
  fin_pi_capital: {
    label: '자본금',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(억원)', default: 100, min: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return '자본금 ' + v.operator + ' ' + v.value + '억원';
    }
  },
  fin_pi_gap_ratio: {
    label: '주가괴리율(우선주/보통주)',
    fields: [
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 0, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '주가괴리율 ' + v.operator + ' ' + v.value + '%';
    }
  },

  // ==================== 수익성분석 ====================
  fin_pf_op_margin: {
    label: '영업이익률',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 10, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '영업이익률[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_pf_pretax_margin: {
    label: '세전계속사업이익률',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 10, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '세전계속사업이익률[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_pf_net_margin: {
    label: '순이익률',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 10, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '순이익률[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_pf_roe: {
    label: 'ROE',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 10, step: 0.1 }
    ],
    buildLabel: function (v) {
      return 'ROE[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_pf_roa: {
    label: 'ROA',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 5, step: 0.1 }
    ],
    buildLabel: function (v) {
      return 'ROA[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_pf_ebitda_margin: {
    label: 'EBITDA마진율',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 10, step: 0.1 }
    ],
    buildLabel: function (v) {
      return 'EBITDA마진율[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_pf_asset_turnover: {
    label: '총자산회전율',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 50, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '총자산회전율[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_pf_retention: {
    label: '유보율',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 100, step: 1 }
    ],
    buildLabel: function (v) {
      return '유보율[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_pf_mktcap_op: {
    label: '시총대비 영업이익',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 10, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '시총대비영업이익[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },

  // ==================== 성장성분석 ====================
  fin_gr_sales: {
    label: '매출액증감률',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 10, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '매출액증감률[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_gr_op_income: {
    label: '영업이익증감률',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 10, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '영업이익증감률[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_gr_pretax: {
    label: '세전계속사업이익증가율',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 10, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '세전계속사업이익증가율[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_gr_net: {
    label: '순이익증감률',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 10, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '순이익증감률[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_gr_eps: {
    label: 'EPS증감률',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 10, step: 0.1 }
    ],
    buildLabel: function (v) {
      return 'EPS증감률[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_gr_ebitda: {
    label: 'EBITDA증감률',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 10, step: 0.1 }
    ],
    buildLabel: function (v) {
      return 'EBITDA증감률[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_gr_capital: {
    label: '자본금증감률',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 10, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '자본금증감률[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_gr_assets: {
    label: '총자산증감률',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 10, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '총자산증감률[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_gr_equity: {
    label: '총자본증감률',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 10, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '총자본증감률[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_gr_debt: {
    label: '총부채증감률',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 10, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '총부채증감률[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },

  // ==================== 안정성분석 ====================
  fin_st_debt_ratio: {
    label: '부채비율',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 100, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '부채비율[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_st_fin_cost: {
    label: '금융비용부담율',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 5, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '금융비용부담율[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_st_current: {
    label: '유동비율',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 200, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '유동비율[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_st_short_debt: {
    label: '단기차입비율',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 30, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '단기차입비율[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_st_debt_dep: {
    label: '차입금의존도',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 30, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '차입금의존도[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_st_recv_ratio: {
    label: '매출채권/매출액비율',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 20, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '매출채권/매출액비율[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_st_inv_ratio: {
    label: '재고자산/매출액비율',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 20, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '재고자산/매출액비율[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_st_interest_cov: {
    label: '이자보상배율',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값', default: 3, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '이자보상배율[' + v.settle_type + '] ' + v.operator + ' ' + v.value;
    }
  },
  fin_st_avg_int: {
    label: '차입금평균이자율',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 5, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '차입금평균이자율[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },
  fin_st_net_debt: {
    label: '순차입금',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(억원)', default: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return '순차입금[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '억원';
    }
  },
  fin_st_short_borrow: {
    label: '단기성차입금',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(억원)', default: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return '단기성차입금[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '억원';
    }
  },

  // ==================== P/L재무항목 ====================
  fin_pl_sales: {
    label: '매출액',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(억원)', default: 1000, min: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return '매출액[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '억원';
    }
  },
  fin_pl_op_income: {
    label: '영업이익',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(억원)', default: 100, step: 1 }
    ],
    buildLabel: function (v) {
      return '영업이익[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '억원';
    }
  },
  fin_pl_pretax: {
    label: '세전계속사업이익',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(억원)', default: 100, step: 1 }
    ],
    buildLabel: function (v) {
      return '세전계속사업이익[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '억원';
    }
  },
  fin_pl_net: {
    label: '순이익',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(억원)', default: 100, step: 1 }
    ],
    buildLabel: function (v) {
      return '순이익[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '억원';
    }
  },
  fin_pl_dep: {
    label: '감가상각비',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(억원)', default: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return '감가상각비[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '억원';
    }
  },
  fin_pl_ebitda: {
    label: 'EBITDA',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(억원)', default: 100, step: 1 }
    ],
    buildLabel: function (v) {
      return 'EBITDA[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '억원';
    }
  },
  fin_pl_int_exp: {
    label: '이자비용',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(억원)', default: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return '이자비용[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '억원';
    }
  },
  fin_pl_int_inc: {
    label: '이자수익',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(억원)', default: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return '이자수익[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '억원';
    }
  },
  fin_pl_equity_gain: {
    label: '지분법평가이익',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(억원)', default: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return '지분법평가이익[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '억원';
    }
  },
  fin_pl_equity_pl: {
    label: '지분법평가손익',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(억원)', default: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return '지분법평가손익[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '억원';
    }
  },
  fin_pl_export: {
    label: '수출비율',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(%)', default: 50, step: 0.1 }
    ],
    buildLabel: function (v) {
      return '수출비율[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '%';
    }
  },

  // ==================== B/S재무항목 ====================
  fin_bs_assets: {
    label: '자산총계',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(억원)', default: 1000, min: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return '자산총계[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '억원';
    }
  },
  fin_bs_equity: {
    label: '자본총계',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(억원)', default: 500, min: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return '자본총계[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '억원';
    }
  },
  fin_bs_debt: {
    label: '부채총계',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(억원)', default: 500, step: 1 }
    ],
    buildLabel: function (v) {
      return '부채총계[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '억원';
    }
  },
  fin_bs_foreign_debt: {
    label: '외환부채',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(억원)', default: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return '외환부채[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '억원';
    }
  },
  fin_bs_foreign_asset: {
    label: '외화자산',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(억원)', default: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return '외화자산[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '억원';
    }
  },

  // ==================== 현금흐름표재무항목 ====================
  fin_cf_operating: {
    label: '영업현금흐름',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(억원)', default: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return '영업현금흐름[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '억원';
    }
  },
  fin_cf_investing: {
    label: '투자현금흐름',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(억원)', default: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return '투자현금흐름[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '억원';
    }
  },
  fin_cf_financing: {
    label: '재무현금흐름',
    fields: [
      { id: 'settle_type', type: 'select', label: '결산구분', options: ['연간', '분기'] },
      { id: 'operator', type: 'select', label: '조건', options: ['이상', '이하', '='] },
      { id: 'value', type: 'number', label: '값(억원)', default: 0, step: 1 }
    ],
    buildLabel: function (v) {
      return '재무현금흐름[' + v.settle_type + '] ' + v.operator + ' ' + v.value + '억원';
    }
  }
};
