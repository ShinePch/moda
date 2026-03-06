// 패턴분석 FIELDS
const CONDITION_FIELDS_PATTERN = {
  // ==================== 패턴정의 ====================
  pat_definition: {
    label: '패턴정의',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 },
      { id: 'body_ratio', type: 'number', label: '몸통비율(%)', default: 30, min: 0, max: 100, step: 1 },
      {
        id: 'condition',
        type: 'select',
        label: '조건',
        options: ['양봉', '음봉', '도지', '망치형', '역망치형', '긴윗꼬리', '긴아랫꼬리']
      }
    ],
    buildLabel: function (v) {
      return (
        '패턴정의:[' + v.period_type + ']' + v.prev_candle + '봉전' + ' 몸통비율' + v.body_ratio + '% ' + v.condition
      );
    }
  },

  // ==================== 기본적인 캔들 ====================
  pat_basic_longbody_yang: {
    label: '롱바디(양봉)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '롱바디(양봉):[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_basic_longbody_eum: {
    label: '롱바디(음봉)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '롱바디(음봉):[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_basic_shortbody_yang: {
    label: '숏바디(양봉)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '숏바디(양봉):[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_basic_shortbody_eum: {
    label: '숏바디(음봉)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '숏바디(음봉):[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_basic_doji_cross: {
    label: '도지(십자)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '도지(십자):[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_basic_gravestone: {
    label: '그레이브스톤 도지(비석형 십자)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '그레이브스톤 도지:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_basic_dragonfly: {
    label: '드래곤플라이 도지(잠자리형 십자)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '드래곤플라이 도지:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_basic_rickshaw: {
    label: '릭슈맨 도지',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '릭슈맨 도지:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_basic_fourprice: {
    label: '포 프라이스 도지',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '포 프라이스 도지:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_basic_white_marubozu: {
    label: '화이트 마루보즈(장대양봉)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '화이트 마루보즈:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_basic_black_marubozu: {
    label: '블랙 마루보즈(장대음봉)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '블랙 마루보즈:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_basic_opening_white_marubozu: {
    label: '오프닝 화이트 마루보즈(윗꼬리 장대양봉)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '오프닝 화이트 마루보즈:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_basic_opening_black_marubozu: {
    label: '오프닝 블랙 마루보즈(아랫꼬리 장대음봉)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '오프닝 블랙 마루보즈:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_basic_closing_white_marubozu: {
    label: '클로징 화이트 마루보즈(아랫꼬리 장대양봉)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '클로징 화이트 마루보즈:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_basic_closing_black_marubozu: {
    label: '클로징 블랙 마루보즈(윗꼬리 장대음봉)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '클로징 블랙 마루보즈:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_basic_highwave: {
    label: '하이웨이브 캔들(스피닝 탑스)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '하이웨이브 캔들:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_basic_star: {
    label: '스타(별형)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '스타(별형):[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_basic_shooting: {
    label: '슈팅스타(음봉 역망치형)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '슈팅스타:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_basic_inside_day: {
    label: '인사이드데이',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '인사이드데이:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_basic_outside_day: {
    label: '아웃사이드데이',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '아웃사이드데이:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },

  // ==================== 상승반전형 ====================
  pat_up_rev_inv_hammer: {
    label: '인버티드 해머(역망치형)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '인버티드 해머:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_up_rev_hammer: {
    label: '해머(망치형)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '해머:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_up_rev_belt_hold: {
    label: '불리쉬 벨트 홀드(하락추세)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '불리쉬 벨트 홀드:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_up_rev_engulfing: {
    label: '불리쉬 인걸핑(상승장악형)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '불리쉬 인걸핑:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_up_rev_harami: {
    label: '하라미(상승잉태형)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '하라미:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_up_rev_harami_cross: {
    label: '하라미 크로스(하락십자잉태형)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '하라미 크로스:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_up_rev_counter: {
    label: '불리쉬 카운터어택 라인(상승접선형)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '불리쉬 카운터어택:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_up_rev_piercing: {
    label: '피어싱라인(관통형)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '피어싱라인:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_up_rev_morning_star: {
    label: '모닝스타(샛별형)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '모닝스타:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_up_rev_morning_doji: {
    label: '모닝 도지 스타(샛별도지형)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '모닝 도지 스타:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_up_rev_abandoned: {
    label: '어밴던드 베이비(하락추세)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '어밴던드 베이비:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_up_rev_3inside_up: {
    label: '쓰리 인사이드 업(상승추세)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '쓰리 인사이드 업:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_up_rev_3outside_up: {
    label: '쓰리 아웃사이드 업(하락추세)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '쓰리 아웃사이드 업:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_up_rev_upside_gap: {
    label: '업사이드 갭 투 크로우즈 다운(하락추세 까마귀형)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '업사이드 갭 투 크로우즈:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_up_rev_bullish_doji: {
    label: '불리쉬 도지 스타',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '불리쉬 도지 스타:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_up_rev_tweezer_bot: {
    label: '트위저즈 보텀(바닥형 집게)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '트위저즈 보텀:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },

  // ==================== 상승지속형 ====================
  pat_up_con_3soldiers: {
    label: '쓰리 화이트 솔저(적삼병)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '쓰리 화이트 솔저:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_up_con_advance_block: {
    label: '어드밴스 블럭(Advance Block)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '어드밴스 블럭:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_up_con_stalled: {
    label: '스톨드 패턴(Stalled Pattern, 정체적삼병)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '스톨드 패턴:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_up_con_upside_tasuki: {
    label: '업사이드 갭 태스키(상승돌파 갭형)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '업사이드 갭 태스키:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_up_con_3methods: {
    label: '업사이드 갭 쓰리 메쎄즈(상승추세)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '업사이드 갭 쓰리 메쎄즈:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },

  // ==================== 하락반전형 ====================
  pat_dn_rev_hanging_man: {
    label: '행잉맨(음봉망치형)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '행잉맨:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_dn_rev_belt_hold: {
    label: '베어리쉬 벨트 홀드(상승추세)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '베어리쉬 벨트 홀드:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_dn_rev_engulfing: {
    label: '베어리쉬 인걸핑(하락장악형)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '베어리쉬 인걸핑:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_dn_rev_harami: {
    label: '하라미(하락잉태형)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '하라미:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_dn_rev_harami_cross: {
    label: '하라미크로스(상승십자잉태형)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '하라미크로스:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_dn_rev_counter: {
    label: '베어리쉬 카운터어택 라인(하락접선형)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '베어리쉬 카운터어택:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_dn_rev_dark_cloud: {
    label: '다크 크라우드커버(흑운형)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '다크 크라우드커버:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_dn_rev_evening_star: {
    label: '이브닝스타(석별형)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '이브닝스타:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_dn_rev_evening_doji: {
    label: '이브닝 도지 스타(석별도지형)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '이브닝 도지 스타:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_dn_rev_abandoned: {
    label: '어밴던드 베이비(상승추세)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '어밴던드 베이비:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_dn_rev_3inside_down: {
    label: '쓰리 인사이드 다운(하락추세)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '쓰리 인사이드 다운:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_dn_rev_3outside_down: {
    label: '쓰리 아웃사이드 다운(상승추세)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '쓰리 아웃사이드 다운:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_dn_rev_upside_gap: {
    label: '업사이드 갭 투 크로우즈(상승추세 까마귀형)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '업사이드 갭 투 크로우즈:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_dn_rev_bearish_doji: {
    label: '베어리쉬 도지 스타',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '베어리쉬 도지 스타:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_dn_rev_tweezer_top: {
    label: '트위저즈 탑(천장형 집게)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '트위저즈 탑:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },

  // ==================== 하락지속형 ====================
  pat_dn_con_3crows: {
    label: '쓰리 블랙 솔저(흑삼병)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '쓰리 블랙 솔저:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_dn_con_identical: {
    label: '아이덴티컬 쓰리 크로우즈',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '아이덴티컬 쓰리 크로우즈:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_dn_con_downside_tasuki: {
    label: '다운사이드 갭 태스키(하락돌파 갭형)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '다운사이드 갭 태스키:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  },
  pat_dn_con_3methods: {
    label: '다운사이드 갭 쓰리 메쎄즈(하락추세)',
    fields: [
      { id: 'period_type', type: 'select', label: '주기', options: ['일', '주', '월', '분'] },
      { id: 'prev_candle', type: 'number', label: '봉전기준', default: 0, min: 0 }
    ],
    buildLabel: function (v) {
      return '다운사이드 갭 쓰리 메쎄즈:[' + v.period_type + ']' + v.prev_candle + '봉전';
    }
  }
};
