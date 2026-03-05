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
      {
        id: 'pa_price',
        label: '가격조건',
        children: [
          { id: 'pa_price_range', label: '주가범위' },
          { id: 'pa_price_change_rate', label: '주가등락률' },
          { id: 'pa_price_compare_week', label: '주기별 주가등락률 비교' },
          { id: 'pa_price_change_period', label: '기간내 등락률' },
          { id: 'pa_price_position', label: '기간내 주가위치' },
          { id: 'pa_price_breakout', label: '주가돌파' },
          { id: 'pa_price_compare', label: '주가비교' },
          { id: 'pa_price_compare3', label: '주가비교(3개)' },
          { id: 'pa_price_compare4', label: '주가비교(4개)' },
          { id: 'pa_parvalue_ratio', label: '액면가대비 주가비율' },
          { id: 'pa_consec_updown', label: '연속상승하락' },
          { id: 'pa_change_count', label: '기간내 등락횟수' },
          { id: 'pa_change_range_period', label: '기간내 주가변동폭' },
          { id: 'pa_intraday_max', label: '일중 거래범위 최대종목' },
          { id: 'pa_52high_change', label: '52주 최고가/저가대비 변동률' },
          { id: 'pa_year_highlow', label: '연중 최고가/저가대비 변동률' },
          { id: 'pa_new_high', label: '신 고가' },
          { id: 'pa_new_low', label: '신저가' },
          { id: 'pa_highest_close', label: '최고종가' },
          { id: 'pa_lowest_close', label: '최저종가' },
          { id: 'pa_upper_limit', label: '상한' },
          { id: 'pa_near_upper_intra', label: '장중상한' },
          { id: 'pa_near_upper', label: '상한가근접' },
          { id: 'pa_lower_limit', label: '하한' },
          { id: 'pa_near_lower_intra', label: '장중하한' },
          { id: 'pa_near_lower', label: '하한가근접' },
          { id: 'pa_gap_updown', label: '상승갭/하락갭 종목' },
          { id: 'pa_gap_breakout', label: '상승갭/하락갭 돌파' },
          { id: 'pa_candle_consec', label: '캔들연속발생' },
          { id: 'pa_vi_days', label: '고가저가갱신연속일수' },
          { id: 'pa_highlow_consec', label: '고가/저가변동 연속일수' },
          { id: 'pa_vi_device', label: '변동성완화장치(VI)' },
          { id: 'pa_change_ratio', label: '주가등락폭 비율' },
          { id: 'pa_period_range_ratio', label: '구간별 주가변동폭간 비율' },
          { id: 'pa_period_diff', label: '구간별 주가등락률간 차' },
          { id: 'pa_period_ratio', label: '구간별 주가등락률간 비율' },
          { id: 'pa_daily_high_break', label: '당일 전고점 돌파' },
          { id: 'pa_daily_high_compare', label: '당일 전고점 비교' },
          { id: 'pa_morning_gold_change', label: '문룡 금일 첫봉대비 주가등락' }
        ]
      },
      {
        id: 'pa_candle',
        label: '기간내기준봉',
        children: [
          { id: 'pa_candle_vol_break', label: '기간내 기준봉 주가돌파(거래량)' },
          { id: 'pa_candle_vol_compare', label: '기간내 기준봉 주가비교(거래량)' },
          { id: 'pa_candle_vol_near', label: '기간내 기준봉 근접률(거래량)' },
          { id: 'pa_candle_volr_break', label: '기간내 기준봉 주가돌파(거래량비율)' },
          { id: 'pa_candle_volr_compare', label: '기간내 기준봉 주가비교(거래량비율)' },
          { id: 'pa_candle_volr_near', label: '기간내 기준봉 근접률(거래량비율)' },
          { id: 'pa_candle_amt_break', label: '기간내 기준봉 주가돌파(거래대금)' },
          { id: 'pa_candle_amt_compare', label: '기간내 기준봉 주가비교(거래대금)' },
          { id: 'pa_candle_amt_near', label: '기간내 기준봉 근접률(거래대금)' }
        ]
      },
      {
        id: 'pa_ask_grp',
        label: '호가잔량',
        children: [
          { id: 'pa_ask_total', label: '총잔량' },
          { id: 'pa_ask_net', label: '순매수잔량' },
          { id: 'pa_ask_ratio', label: '매도매수잔량비' },
          { id: 'pa_ask_best_ratio', label: '총량대 우선호가잔량비' },
          { id: 'pa_ask_remain', label: '호가 잔량비' }
        ]
      },
      {
        id: 'pa_vol_grp',
        label: '거래량/거래대금',
        children: [
          { id: 'pa_vol_cur', label: '거래량' },
          { id: 'pa_vol_prev', label: '전일거래량' },
          { id: 'pa_vol_avg', label: '평균거래량' },
          { id: 'pa_vol_rate', label: '거래량비율' },
          { id: 'pa_vol_rate_n', label: '거래량비율(n봉)' },
          { id: 'pa_vol_rate_prev', label: '거래량비율(전일거래량대비)' },
          { id: 'pa_vol_rate_period', label: '기간내 거래량비율' },
          { id: 'pa_vol_avg_period', label: '기간내 평균거래량비율' },
          { id: 'pa_vol_updown', label: '거래량 증가/감소' },
          { id: 'pa_vol_new_high', label: '신고거래량' },
          { id: 'pa_vol_new_low', label: '신저거래량' },
          { id: 'pa_vol_today_high', label: '금일 신고거래량' },
          { id: 'pa_vol_today_low', label: '금일 신저거래량' },
          { id: 'pa_vol_highlow_n', label: '신고/신저거래량(n봉)' },
          { id: 'pa_vol_same_time', label: '전일동시간대비 거래량비율' },
          { id: 'pa_vol_float_ratio', label: '유통주식수 대비 거래량비율' },
          { id: 'pa_vol_turnover', label: '거래량회전율' },
          { id: 'pa_vol_turnover_n', label: '거래량회전율(n봉)' },
          { id: 'pa_vol_consec', label: '거래량 증감연속봉수' },
          { id: 'pa_amt_cur', label: '거래대금' },
          { id: 'pa_amt_avg', label: '평균거래대금' },
          { id: 'pa_amt_prev', label: '전일거래대금' },
          { id: 'pa_amt_new_high', label: '신고거래대금' },
          { id: 'pa_amt_new_low', label: '신저거래대금' },
          { id: 'pa_amt_n_tick', label: 'n분평균 틱수대비증감' },
          { id: 'pa_amt_n_avg', label: 'n분평균대비 거래증감' },
          { id: 'pa_amt_supply_break', label: '매물대 돌파' },
          { id: 'pa_amt_period', label: '기간내 거래대금' },
          { id: 'pa_amt_turnover_p', label: '기간내 거래량회전율' },
          { id: 'pa_amt_candle', label: '기준봉 거래대금' },
          { id: 'pa_amt_avg_period', label: '기간별 평균거래대금' },
          { id: 'pa_amt_accum', label: '기간별 누적거래대금' },
          { id: 'pa_amt_compare', label: '거래대금 비교' },
          { id: 'pa_amt_morning_gold', label: '문룡 금일 첫봉대비 거래량비율' }
        ]
      },
      { id: 'pa_expected', label: '예상체결' },
      {
        id: 'pa_foreign_grp',
        label: '외국인',
        children: [
          { id: 'pa_for_ratio', label: '외국인지분율' },
          { id: 'pa_for_ratio_chg', label: '외국인지분율변동' },
          { id: 'pa_for_daily_rate', label: '외국인/기관/개인 일간매매변동률' },
          { id: 'pa_for_daily_vol', label: '외국인/기관/개인 일간매매변동률(거래량대비)' },
          { id: 'pa_for_net', label: '외국인/기관/개인 순매수/순매도' },
          { id: 'pa_for_consec', label: '외국인지분율 연속상승하락' },
          { id: 'pa_for_net_days', label: '외국인/기관/개인 순매일수' },
          { id: 'pa_for_net_compare', label: '외국인/기관/개인 일간 순매수비교' },
          { id: 'pa_for_accum', label: '외국인 누적 순매수 수량' },
          { id: 'pa_for_net_amt', label: '외국인/기관/개인 순매수/순매도 금액' },
          { id: 'pa_for_period_shares', label: '외국인/기관/개인 기간매매변동률(상장주식수)' },
          { id: 'pa_for_period_vol', label: '외국인/기관/개인 기간매매변동률(거래량대비)' },
          { id: 'pa_for_period_accum', label: '기간별 누적순매수(수량)' },
          { id: 'pa_for_today', label: '외국인/기관순매수(당일 잠정치)' }
        ]
      },
      {
        id: 'pa_broker_grp',
        label: '거래원',
        children: [
          { id: 'pa_broker_instant', label: '거래원 순간변동량' },
          { id: 'pa_broker_vol', label: '거래원별 거래량' },
          { id: 'pa_broker_vol_ratio', label: '거래원별 거래량비율' },
          { id: 'pa_broker_sell_buy', label: '거래원별 매도대비매수비율' },
          { id: 'pa_broker_rank', label: '거래원중 특정증권사 순위' },
          { id: 'pa_broker_same', label: '매도매수거래원이 같은 종목' },
          { id: 'pa_broker_both', label: '특정거래원이 매도매수 양쪽에 있을 때' },
          { id: 'pa_broker_one', label: '특정거래원이 매도매수 한쪽에 있을 때' },
          { id: 'pa_broker_foreign_net', label: '외국계증권사 순매매' },
          { id: 'pa_broker_foreign_r', label: '외국계증권사 순매매 비율' }
        ]
      },
      {
        id: 'pa_misc',
        label: '기타정보',
        children: [
          { id: 'pa_misc_shares', label: '상장주식수' },
          { id: 'pa_misc_beta', label: '베타계수' },
          { id: 'pa_misc_credit', label: '신용잔고율' },
          { id: 'pa_misc_par', label: '액면가' },
          { id: 'pa_misc_listday', label: '상장일' }
        ]
      },
      {
        id: 'pa_exec_grp',
        label: '체결강도',
        children: [
          { id: 'pa_exec_consec', label: '체결강도 증감연속봉수' },
          { id: 'pa_exec_change', label: '체결강도 변동률' },
          { id: 'pa_exec_period_count', label: '체결강도 기간내 범위 횟수' },
          { id: 'pa_exec_strength', label: '체결강도' },
          { id: 'pa_exec_buy_ratio', label: '매수비율' },
          { id: 'pa_exec_n_count', label: 'n분 체결건수' },
          { id: 'pa_exec_qty', label: '매수/매도/순매수 체결수량' },
          { id: 'pa_exec_qty_period', label: '기간내 매수/매도/순매수 체결수량' }
        ]
      },
      {
        id: 'pa_program_grp',
        label: '프로그램매매',
        children: [
          { id: 'pa_prog_days', label: '순매매 일수' },
          { id: 'pa_prog_net_qty', label: '순매수/순매도 수량' },
          { id: 'pa_prog_net_amt', label: '순매수/순매도 금액' },
          { id: 'pa_prog_qty_chg', label: '순매수 증감수량' },
          { id: 'pa_prog_amt_chg', label: '순매수 증감금액' },
          { id: 'pa_prog_ratio', label: '당일거래량대비 프로그램매매 비율' }
        ]
      },
      {
        id: 'pa_shortsell',
        label: '공매도/대차거래',
        children: [
          { id: 'pa_short_vol', label: '공매도 거래량' },
          { id: 'pa_short_amt', label: '공매도 거래대금' },
          { id: 'pa_short_avg_rate', label: '공매도 평균가격대비 주가등락률' },
          { id: 'pa_short_period_amt', label: '기간내 공매도 거래대금' },
          { id: 'pa_short_accum', label: '누적 공매도 비중' },
          { id: 'pa_loan_qty_chg', label: '대차잔고 증감수량' },
          { id: 'pa_loan_amt_chg', label: '대차잔고 증감금액' },
          { id: 'pa_loan_consec', label: '대차거래잔고 증감연속봉수' },
          { id: 'pa_loan_period_amt', label: '기간내 대차잔고 거래대금' },
          { id: 'pa_loan_float_ratio', label: '유통주식수대비 대차잔고 비중' }
        ]
      },
      {
        id: 'pa_intraday_grp',
        label: '당일분봉',
        children: [
          { id: 'pa_intra_first_rate', label: '당일 첫 분봉 주가등락률' },
          { id: 'pa_intra_gold_rate', label: '문룡 금일 첫봉대비 주가등락률' },
          { id: 'pa_intra_candle_consec', label: '당일 첫 분봉 캔들연속발생' },
          { id: 'pa_intra_first_vol', label: '당일 첫 분봉 거래량비율' },
          { id: 'pa_intra_gold_vol', label: '문룡 금일 첫봉대비 거래량비율' },
          { id: 'pa_intra_base_break', label: '당일분봉 기준봉대비 주가돌파' },
          { id: 'pa_intra_base_compare', label: '당일분봉 기준봉대비 주가비교' },
          { id: 'pa_intra_position', label: '당일분봉 주가위치' },
          { id: 'pa_intra_high_break', label: '당일 전고점 돌파' },
          { id: 'pa_intra_high_compare', label: '당일 전고점 비교' },
          { id: 'pa_intra_avg_amt', label: '당일분봉 평균거래대금' }
        ]
      }
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
function generateConditionLabel(index) {
  var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (index < 26) return alphabet[index];
  return alphabet[Math.floor(index / 26) - 1] + alphabet[index % 26];
}
