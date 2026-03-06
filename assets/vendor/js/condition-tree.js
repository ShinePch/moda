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
          { id: 'pa_morning_gold_change', label: '분봉 금일 첫봉대비 주가등락' }
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
          { id: 'pa_amt_morning_gold', label: '분봉 금일 첫봉대비 거래량비율' }
        ]
      },
      {
        id: 'pa_expected_grp',
        label: '예상체결',
        children: [
          { id: 'pa_expected_price', label: '예상체결가' },
          { id: 'pa_expected_vol', label: '예상체결량' },
          { id: 'pa_expected_vol_rate', label: '예상체결량비율' },
          { id: 'pa_expected_amt', label: '예상체결금액' },
          { id: 'pa_expected_rate', label: '예상체결가등락률' },
          { id: 'pa_expected_ma_diff', label: '예상체결가-이동평균비교' }
        ]
      },
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
          { id: 'pa_intra_gold_rate', label: '분봉 금일 첫봉대비 주가등락률' },
          { id: 'pa_intra_candle_consec', label: '당일 첫 분봉 캔들연속발생' },
          { id: 'pa_intra_first_vol', label: '당일 첫 분봉 거래량비율' },
          { id: 'pa_intra_gold_vol', label: '분봉 금일 첫봉대비 거래량비율' },
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
      {
        id: 'ta_ma_grp',
        label: '주가이동평균',
        children: [
          { id: 'ta_ma_break', label: '주가이동평균돌파' },
          { id: 'ta_ma_break_det', label: '상세이동평균돌파' },
          { id: 'ta_ma_array3', label: '주가이동평균배열(3개)' },
          { id: 'ta_ma_array4', label: '주가이동평균배열(4개)' },
          { id: 'ta_ma_compare', label: '주가이동평균비교' },
          { id: 'ta_ma_compare_det', label: '상세이동평균비교' },
          { id: 'ta_ma_compare2', label: '주가이동평균비교(2개)' },
          { id: 'ta_ma_compare3', label: '주가이동평균비교(3개)' },
          { id: 'ta_ma_rate', label: '주가이동평균등락률' },
          { id: 'ta_ma_gap', label: '이동평균이격도' },
          { id: 'ta_ma_price_diff', label: '가격-이동평균비교' },
          { id: 'ta_ma_trend', label: '주가이동평균추세' }
        ]
      },
      {
        id: 'ta_vol_ma_grp',
        label: '거래량이동평균',
        children: [
          { id: 'ta_vol_ma_break', label: '거래량이동평균돌파' },
          { id: 'ta_vol_ma_array', label: '거래량이동평균배열' },
          { id: 'ta_vol_ma_trend', label: '거래량이동평균추세' },
          { id: 'ta_vol_ma_rate', label: '거래량이동평균등락률' }
        ]
      },
      {
        id: 'ta_trend',
        label: '추세지표',
        children: [
          { id: 'ta_macd', label: 'MACD' },
          { id: 'ta_macd_signal', label: 'MACD Signal' },
          { id: 'ta_macd_osc', label: 'MACD OSC' },
          { id: 'ta_price_osc', label: 'Price Oscillator' },
          { id: 'ta_gmnet', label: '그물망차트' },
          { id: 'ta_lrs', label: 'LRS/LRL' },
          { id: 'ta_tsf', label: 'TSF' },
          { id: 'ta_eom', label: 'EOM(Ease of Movement)' },
          { id: 'ta_parabolic', label: 'Parabolic' },
          { id: 'ta_vhf', label: 'VHF' }
        ]
      },
      {
        id: 'ta_momentum',
        label: '모멘텀지표',
        children: [
          { id: 'ta_gap_idx', label: '이격도' },
          { id: 'ta_ab_ratio', label: 'AB Ratio' },
          { id: 'ta_band_b', label: 'Band %b' },
          { id: 'ta_cci', label: 'CCI' },
          { id: 'ta_co', label: "CO(Chaikin's Osc)" },
          { id: 'ta_momentum_idx', label: 'Momentum' },
          { id: 'ta_psychology', label: '심리도' },
          { id: 'ta_new_psych', label: '신심리도' },
          { id: 'ta_stoch', label: 'Stochastic(fast)' },
          { id: 'ta_stoch_slow', label: 'Stochastic(slow)' },
          { id: 'ta_roc', label: 'ROC' },
          { id: 'ta_williams', label: "William's %R" },
          { id: 'ta_sonar', label: 'Sonar' },
          { id: 'ta_trix', label: 'TRIX' },
          { id: 'ta_vroc', label: 'VROC' },
          { id: 'ta_mass_idx', label: 'Mass Index' }
        ]
      },
      {
        id: 'ta_channel',
        label: '채널지표',
        children: [
          { id: 'ta_envelope', label: 'Envelope' },
          { id: 'ta_bollinger', label: 'Bollinger Band' },
          { id: 'ta_band_width', label: 'Band Width' },
          { id: 'ta_pivot', label: 'Pivot' },
          { id: 'ta_pivot_min', label: 'Pivot 분봉' },
          { id: 'ta_ichimoku', label: '일목균형표' },
          { id: 'ta_price_ch', label: 'Price Channel' }
        ]
      },
      {
        id: 'ta_volatility_grp',
        label: '변동성지표',
        children: [
          { id: 'ta_dmi', label: 'DMI' },
          { id: 'ta_dmi_dx', label: 'DMI DX' },
          { id: 'ta_adx', label: 'ADX' },
          { id: 'ta_adx_dmi', label: 'ADX DMI' },
          { id: 'ta_rsi', label: 'RSI' },
          { id: 'ta_stddev', label: 'Standard Deviation' },
          { id: 'ta_sigma', label: 'Sigma' },
          { id: 'ta_true_range', label: 'True Range' }
        ]
      },
      {
        id: 'ta_vol_grp',
        label: '거래량지표',
        children: [
          { id: 'ta_ad', label: 'A/D선' },
          { id: 'ta_mfi', label: 'MFI' },
          { id: 'ta_dvi', label: 'Daily Volume Index' },
          { id: 'ta_vr', label: 'VR' },
          { id: 'ta_vol_osc', label: 'Volume Oscillator' },
          { id: 'ta_obv', label: 'OBV' },
          { id: 'ta_pvi', label: 'Positive Volume Index' }
        ]
      },
      {
        id: 'ta_other_grp',
        label: '기타지표',
        children: [
          { id: 'ta_demark', label: 'Demark' },
          { id: 'ta_sansei', label: '삼선전환도' },
          { id: 'ta_binary', label: 'Binary Wave' }
        ]
      },
      {
        id: 'ta_pricebox_grp',
        label: '가격박스',
        children: [
          { id: 'ta_pricebox_break', label: '가격기준선 돌파' },
          { id: 'ta_pricebox_rate', label: '가격기준선 등락률' }
        ]
      }
    ]
  },
  {
    id: 'pattern',
    label: '패턴분석',
    children: [
      { id: 'pat_definition', label: '패턴정의' },
      {
        id: 'pat_basic_grp',
        label: '기본적인 캔들',
        children: [
          { id: 'pat_basic_longbody_yang', label: '롱바디(양봉)' },
          { id: 'pat_basic_longbody_eum', label: '롱바디(음봉)' },
          { id: 'pat_basic_shortbody_yang', label: '숏바디(양봉)' },
          { id: 'pat_basic_shortbody_eum', label: '숏바디(음봉)' },
          { id: 'pat_basic_doji_cross', label: '도지(십자)' },
          { id: 'pat_basic_gravestone', label: '그레이브스톤 도지(비석형 십자)' },
          { id: 'pat_basic_dragonfly', label: '드래곤플라이 도지(잠자리형 십자)' },
          { id: 'pat_basic_rickshaw', label: '릭슈맨 도지' },
          { id: 'pat_basic_fourprice', label: '포 프라이스 도지' },
          { id: 'pat_basic_white_marubozu', label: '화이트 마루보즈(장대양봉)' },
          { id: 'pat_basic_black_marubozu', label: '블랙 마루보즈(장대음봉)' },
          { id: 'pat_basic_opening_white_marubozu', label: '오프닝 화이트 마루보즈(윗꼬리 장대양봉)' },
          { id: 'pat_basic_opening_black_marubozu', label: '오프닝 블랙 마루보즈(아랫꼬리 장대음봉)' },
          { id: 'pat_basic_closing_white_marubozu', label: '클로징 화이트 마루보즈(아랫꼬리 장대양봉)' },
          { id: 'pat_basic_closing_black_marubozu', label: '클로징 블랙 마루보즈(윗꼬리 장대음봉)' },
          { id: 'pat_basic_highwave', label: '하이웨이브 캔들(스피닝 탑스)' },
          { id: 'pat_basic_star', label: '스타(별형)' },
          { id: 'pat_basic_shooting', label: '슈팅스타(음봉 역망치형)' },
          { id: 'pat_basic_inside_day', label: '인사이드데이' },
          { id: 'pat_basic_outside_day', label: '아웃사이드데이' }
        ]
      },
      {
        id: 'pat_up_reversal_grp',
        label: '상승반전형',
        children: [
          { id: 'pat_up_rev_inv_hammer', label: '인버티드 해머(역망치형)' },
          { id: 'pat_up_rev_hammer', label: '해머(망치형)' },
          { id: 'pat_up_rev_belt_hold', label: '불리쉬 벨트 홀드(하락추세)' },
          { id: 'pat_up_rev_engulfing', label: '불리쉬 인걸핑(상승장악형)' },
          { id: 'pat_up_rev_harami', label: '하라미(상승잉태형)' },
          { id: 'pat_up_rev_harami_cross', label: '하라미 크로스(하락십자잉태형)' },
          { id: 'pat_up_rev_counter', label: '불리쉬 카운터어택 라인(상승접선형)' },
          { id: 'pat_up_rev_piercing', label: '피어싱라인(관통형)' },
          { id: 'pat_up_rev_morning_star', label: '모닝스타(샛별형)' },
          { id: 'pat_up_rev_morning_doji', label: '모닝 도지 스타(샛별도지형)' },
          { id: 'pat_up_rev_abandoned', label: '어밴던드 베이비(하락추세)' },
          { id: 'pat_up_rev_3inside_up', label: '쓰리 인사이드 업(상승추세)' },
          { id: 'pat_up_rev_3outside_up', label: '쓰리 아웃사이드 업(하락추세)' },
          { id: 'pat_up_rev_upside_gap', label: '업사이드 갭 투 크로우즈 다운(하락추세 까마귀형)' },
          { id: 'pat_up_rev_bullish_doji', label: '불리쉬 도지 스타' },
          { id: 'pat_up_rev_tweezer_bot', label: '트위저즈 보텀(바닥형 집게)' }
        ]
      },
      {
        id: 'pat_up_continue_grp',
        label: '상승지속형',
        children: [
          { id: 'pat_up_con_3soldiers', label: '쓰리 화이트 솔저(적삼병)' },
          { id: 'pat_up_con_advance_block', label: '어드밴스 블럭(Advance Block)' },
          { id: 'pat_up_con_stalled', label: '스톨드 패턴(Stalled Pattern, 정체적삼병)' },
          { id: 'pat_up_con_upside_tasuki', label: '업사이드 갭 태스키(상승돌파 갭형)' },
          { id: 'pat_up_con_3methods', label: '업사이드 갭 쓰리 메쎄즈(상승추세)' }
        ]
      },
      {
        id: 'pat_down_reversal_grp',
        label: '하락반전형',
        children: [
          { id: 'pat_dn_rev_hanging_man', label: '행잉맨(음봉망치형)' },
          { id: 'pat_dn_rev_belt_hold', label: '베어리쉬 벨트 홀드(상승추세)' },
          { id: 'pat_dn_rev_engulfing', label: '베어리쉬 인걸핑(하락장악형)' },
          { id: 'pat_dn_rev_harami', label: '하라미(하락잉태형)' },
          { id: 'pat_dn_rev_harami_cross', label: '하라미크로스(상승십자잉태형)' },
          { id: 'pat_dn_rev_counter', label: '베어리쉬 카운터어택 라인(하락접선형)' },
          { id: 'pat_dn_rev_dark_cloud', label: '다크 크라우드커버(흑운형)' },
          { id: 'pat_dn_rev_evening_star', label: '이브닝스타(석별형)' },
          { id: 'pat_dn_rev_evening_doji', label: '이브닝 도지 스타(석별도지형)' },
          { id: 'pat_dn_rev_abandoned', label: '어밴던드 베이비(상승추세)' },
          { id: 'pat_dn_rev_3inside_down', label: '쓰리 인사이드 다운(하락추세)' },
          { id: 'pat_dn_rev_3outside_down', label: '쓰리 아웃사이드 다운(상승추세)' },
          { id: 'pat_dn_rev_upside_gap', label: '업사이드 갭 투 크로우즈(상승추세 까마귀형)' },
          { id: 'pat_dn_rev_bearish_doji', label: '베어리쉬 도지 스타' },
          { id: 'pat_dn_rev_tweezer_top', label: '트위저즈 탑(천장형 집게)' }
        ]
      },
      {
        id: 'pat_down_continue_grp',
        label: '하락지속형',
        children: [
          { id: 'pat_dn_con_3crows', label: '쓰리 블랙 솔저(흑삼병)' },
          { id: 'pat_dn_con_identical', label: '아이덴티컬 쓰리 크로우즈' },
          { id: 'pat_dn_con_downside_tasuki', label: '다운사이드 갭 태스키(하락돌파 갭형)' },
          { id: 'pat_dn_con_3methods', label: '다운사이드 갭 쓰리 메쎄즈(하락추세)' }
        ]
      }
    ]
  },
  {
    id: 'financial',
    label: '재무분석',
    children: [
      {
        id: 'fin_price_index_grp',
        label: '주가지표',
        children: [
          { id: 'fin_pi_per', label: 'PER' },
          { id: 'fin_pi_pbr', label: 'PBR' },
          { id: 'fin_pi_psr', label: 'PSR' },
          { id: 'fin_pi_ev_ebitda', label: 'EV/EBITDA' },
          { id: 'fin_pi_pcr', label: 'PCR' },
          { id: 'fin_pi_peg', label: 'PEG' },
          { id: 'fin_pi_div_yield', label: '전년배당시배당수익률' },
          { id: 'fin_pi_eps', label: 'EPS' },
          { id: 'fin_pi_bps', label: 'BPS' },
          { id: 'fin_pi_sps', label: 'SPS' },
          { id: 'fin_pi_cfps', label: 'CFPS' },
          { id: 'fin_pi_mktcap', label: '시가총액' },
          { id: 'fin_pi_capital', label: '자본금' },
          { id: 'fin_pi_gap_ratio', label: '주가괴리율(우선주/보통주)' }
        ]
      },
      {
        id: 'fin_profit_grp',
        label: '수익성분석',
        children: [
          { id: 'fin_pf_op_margin', label: '영업이익률' },
          { id: 'fin_pf_pretax_margin', label: '세전계속사업이익률' },
          { id: 'fin_pf_net_margin', label: '순이익률' },
          { id: 'fin_pf_roe', label: 'ROE' },
          { id: 'fin_pf_roa', label: 'ROA' },
          { id: 'fin_pf_ebitda_margin', label: 'EBITDA마진율' },
          { id: 'fin_pf_asset_turnover', label: '총자산회전율' },
          { id: 'fin_pf_retention', label: '유보율' },
          { id: 'fin_pf_mktcap_op', label: '시총대비 영업이익' }
        ]
      },
      {
        id: 'fin_growth_grp',
        label: '성장성분석',
        children: [
          { id: 'fin_gr_sales', label: '매출액증감률' },
          { id: 'fin_gr_op_income', label: '영업이익증감률' },
          { id: 'fin_gr_pretax', label: '세전계속사업이익증가율' },
          { id: 'fin_gr_net', label: '순이익증감률' },
          { id: 'fin_gr_eps', label: 'EPS증감률' },
          { id: 'fin_gr_ebitda', label: 'EBITDA증감률' },
          { id: 'fin_gr_capital', label: '자본금증감률' },
          { id: 'fin_gr_assets', label: '총자산증감률' },
          { id: 'fin_gr_equity', label: '총자본증감률' },
          { id: 'fin_gr_debt', label: '총부채증감률' }
        ]
      },
      {
        id: 'fin_stability_grp',
        label: '안정성분석',
        children: [
          { id: 'fin_st_debt_ratio', label: '부채비율' },
          { id: 'fin_st_fin_cost', label: '금융비용부담율' },
          { id: 'fin_st_current', label: '유동비율' },
          { id: 'fin_st_short_debt', label: '단기차입비율' },
          { id: 'fin_st_debt_dep', label: '차입금의존도' },
          { id: 'fin_st_recv_ratio', label: '매출채권/매출액비율' },
          { id: 'fin_st_inv_ratio', label: '재고자산/매출액비율' },
          { id: 'fin_st_interest_cov', label: '이자보상배율' },
          { id: 'fin_st_avg_int', label: '차입금평균이자율' },
          { id: 'fin_st_net_debt', label: '순차입금' },
          { id: 'fin_st_short_borrow', label: '단기성차입금' }
        ]
      },
      {
        id: 'fin_pl_grp',
        label: 'P/L재무항목',
        children: [
          { id: 'fin_pl_sales', label: '매출액' },
          { id: 'fin_pl_op_income', label: '영업이익' },
          { id: 'fin_pl_pretax', label: '세전계속사업이익' },
          { id: 'fin_pl_net', label: '순이익' },
          { id: 'fin_pl_dep', label: '감가상각비' },
          { id: 'fin_pl_ebitda', label: 'EBITDA' },
          { id: 'fin_pl_int_exp', label: '이자비용' },
          { id: 'fin_pl_int_inc', label: '이자수익' },
          { id: 'fin_pl_equity_gain', label: '지분법평가이익' },
          { id: 'fin_pl_equity_pl', label: '지분법평가손익' },
          { id: 'fin_pl_export', label: '수출비율' }
        ]
      },
      {
        id: 'fin_bs_grp',
        label: 'B/S재무항목',
        children: [
          { id: 'fin_bs_assets', label: '자산총계' },
          { id: 'fin_bs_equity', label: '자본총계' },
          { id: 'fin_bs_debt', label: '부채총계' },
          { id: 'fin_bs_foreign_debt', label: '외환부채' },
          { id: 'fin_bs_foreign_asset', label: '외화자산' }
        ]
      },
      {
        id: 'fin_cashflow_grp',
        label: '현금흐름표재무항목',
        children: [
          { id: 'fin_cf_operating', label: '영업현금흐름' },
          { id: 'fin_cf_investing', label: '투자현금흐름' },
          { id: 'fin_cf_financing', label: '재무현금흐름' }
        ]
      }
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
          { id: 'rank_price_change', label: '전일대비 주가등락률 순위' },
          { id: 'rank_intraday_change', label: '시가대비 주가등락률 순위' },
          { id: 'rank_5day', label: '5일간 주가변동폭 비율 순위' },
          { id: 'rank_52high', label: '52주 최고가 대비 등락률 순위' },
          { id: 'rank_52low', label: '52주 최저가 대비 등락률 순위' },
          { id: 'rank_net_buy', label: '순매수잔량 순위' },
          { id: 'rank_bid_ask_ratio', label: '매도매수잔량비 순위' },
          { id: 'rank_best_ask_ratio', label: '총매도잔량대비 우선매도호가잔량비 순위' },
          { id: 'rank_best_bid_ratio', label: '총매수잔량대비 우선매수호가잔량비 순위' },
          { id: 'rank_volume_rank', label: '거래량 순위' },
          { id: 'rank_prev_volume', label: '전일거래량 순위' },
          { id: 'rank_avg_volume', label: '평균거래량 순위' },
          { id: 'rank_exec_strength', label: '체결강도 순위' },
          { id: 'rank_vol_chg', label: '전일대비 거래량 증감률 순위' },
          { id: 'rank_vol_intraday', label: '전일 동시간대 대비 거래량 증감률 순위' },
          { id: 'rank_vol_rate', label: '거래량회전율 순위' },
          { id: 'rank_amt', label: '거래대금 순위' },
          { id: 'rank_avg_amt', label: '평균거래대금 순위' },
          { id: 'rank_prev_amt', label: '전일거래대금 순위' },
          { id: 'rank_expected_vol', label: '예상체결량 순위' },
          { id: 'rank_for_ratio', label: '외국인지분율 순위' },
          { id: 'rank_for_ratio_chg', label: '외국인지분율 변동 순위' },
          { id: 'rank_for_net_buy', label: '외국인순매수 순위' },
          { id: 'rank_inst_buy', label: '전기기관매수 순위' },
          { id: 'rank_foreign_vol_chg', label: '외국계증권사 거래량증감 순위' },
          { id: 'rank_foreign_amt_chg', label: '외국계증권사 거래비중증감 순위' },
          { id: 'rank_listed_shares', label: '상장주식수 순위' }
        ]
      },
      {
        id: 'rank_technical',
        label: '기술적지표 순위',
        children: [
          { id: 'rank_macd', label: 'MACD(12,26,9) 순위' },
          { id: 'rank_gap_idx', label: '이격도(20) 순위' },
          { id: 'rank_cci_rank', label: 'CCI(9) 순위' },
          { id: 'rank_momentum_r', label: 'Momentum(9,9) 순위' },
          { id: 'rank_rsi_rank', label: 'RSI(14) 순위' },
          { id: 'rank_stoch_fast', label: 'Stochastic Fast(5,3) 순위' },
          { id: 'rank_stoch_slow', label: 'Stochastic Slow(7,3,5) 순위' },
          { id: 'rank_roc', label: 'ROC(12) 순위' },
          { id: 'rank_trix', label: 'TRIX(12,9) 순위' },
          { id: 'rank_obv', label: 'OBV(12) 순위' }
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
