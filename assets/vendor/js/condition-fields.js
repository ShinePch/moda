// 모든 FIELDS 합치기
// 로드 순서: condition-fields-range.js -> condition-fields-price.js
//             -> condition-fields-technical.js -> condition-fields-pattern.js
//             -> condition-fields-financial.js -> condition-fields-ranking.js
//             -> 이 파일 (condition-fields.js)
const CONDITION_FIELDS = Object.assign(
  {},
  typeof CONDITION_FIELDS_RANGE     !== 'undefined' ? CONDITION_FIELDS_RANGE     : {},
  typeof CONDITION_FIELDS_PRICE     !== 'undefined' ? CONDITION_FIELDS_PRICE     : {},
  typeof CONDITION_FIELDS_TECHNICAL !== 'undefined' ? CONDITION_FIELDS_TECHNICAL : {},
  typeof CONDITION_FIELDS_PATTERN   !== 'undefined' ? CONDITION_FIELDS_PATTERN   : {},
  typeof CONDITION_FIELDS_FINANCIAL !== 'undefined' ? CONDITION_FIELDS_FINANCIAL : {},
  typeof CONDITION_FIELDS_RANKING   !== 'undefined' ? CONDITION_FIELDS_RANKING   : {}
);
