// 조건검색기 UI 렌더링 담당
// 트리 렌더링, 파라미터 패널 렌더링, 조건 목록 테이블 렌더링

// 트리 전체 렌더링
function renderConditionTree() {
  const treeEl = document.getElementById('cs-tree');
  if (!treeEl) return;
  treeEl.innerHTML = CONDITION_TREE.map(cat => buildTreeNode(cat, 0)).join('');
}

// 재귀적으로 트리 노드 생성
function buildTreeNode(node, depth) {
  const hasChildren = node.children && node.children.length > 0;
  const paddingLeft = 10 + depth * 14;

  if (hasChildren) {
    const childrenHtml = node.children.map(child => buildTreeNode(child, depth + 1)).join('');
    return `
      <div>
        <div class="cs-tree-folder d-flex align-items-center gap-1 py-1 border-bottom text-body-secondary"
             onclick="toggleTreeFolder(this)"
             style="padding-left:${paddingLeft}px; padding-right:8px; font-size:0.8rem;">
          <span class="cs-tree-arrow text-muted" style="font-size:0.6rem">▶</span>
          <i class="ti ti-folder" style="font-size:0.85rem"></i>
          <span>${node.label}</span>
        </div>
        <div class="cs-tree-children" style="display:none">
          ${childrenHtml}
        </div>
      </div>`;
  }

  const hasField = !!CONDITION_FIELDS[node.id];
  return `
    <div class="cs-tree-leaf d-flex align-items-center gap-1 py-1 border-bottom ${hasField ? '' : 'cs-tree-disabled text-muted'}"
         style="padding-left:${paddingLeft}px; padding-right:8px; font-size:0.79rem;"
         onclick="${hasField ? `selectConditionItem('${node.id}', '${node.label}')` : ''}">
      <i class="ti ti-file-description" style="font-size:0.8rem"></i>
      <span>${node.label}</span>
    </div>`;
}

// 트리 폴더 토글
function toggleTreeFolder(el) {
  const childrenEl = el.nextElementSibling;
  const arrowEl = el.querySelector('.cs-tree-arrow');
  const isOpen = childrenEl.style.display !== 'none';
  childrenEl.style.display = isOpen ? 'none' : 'block';
  arrowEl.textContent = isOpen ? '▶' : '▼';
  el.classList.toggle('text-primary', !isOpen);
  el.classList.toggle('fw-semibold', !isOpen);
}

// 조건 항목 선택 시 우측 파라미터 패널 렌더링
function selectConditionItem(conditionId, conditionLabel) {
  // 트리에서 active 클래스 처리
  document.querySelectorAll('.cs-tree-leaf').forEach(el => el.classList.remove('active', 'text-white', 'bg-primary'));
  event.currentTarget.classList.add('active', 'text-white', 'bg-primary');

  const fieldDef = CONDITION_FIELDS[conditionId];
  if (!fieldDef) {
    renderParamPanelEmpty(conditionLabel);
    return;
  }
  renderParamPanel(conditionId, fieldDef);
}

// 파라미터 패널 - 준비중 안내
function renderParamPanelEmpty(label) {
  const el = document.getElementById('cs-param-panel');
  if (!el) return;
  el.innerHTML = `
    <div class="text-center text-muted py-4">
      <div style="font-size:2rem">🚧</div>
      <div class="mt-2"><strong>${label}</strong></div>
      <small>해당 조건은 추후 지원 예정입니다</small>
    </div>`;
}

// 파라미터 패널 - 입력 필드 렌더링
function renderParamPanel(conditionId, fieldDef) {
  const el = document.getElementById('cs-param-panel');
  if (!el) return;

  const fieldsHtml = fieldDef.fields
    .map(f => {
      if (f.type === 'static_label') {
        return `
        <div class="col-12 mb-1">
          <div class="form-check form-check-inline mb-0">
            <input class="form-check-input" type="radio" checked disabled style="pointer-events:none; opacity:1">
            <label class="form-check-label small fw-semibold">${f.text}</label>
          </div>
        </div>`;
      }

      if (f.type === 'radio_grid') {
        const cols = f.cols || 4;
        const rows = [];
        for (let i = 0; i < f.options.length; i += cols) {
          rows.push(f.options.slice(i, i + cols));
        }
        const radioName = 'csp_' + f.id + '_radio';
        const defaultVal = f.default || f.options[0];
        return `
        <div class="col-12 mb-2">
          ${rows
            .map(
              row => `
            <div class="d-flex flex-wrap gap-3 mb-1">
              ${row
                .map(
                  opt => `
                <div class="form-check form-check-inline mb-0">
                  <input class="form-check-input cs-param-input" type="radio"
                    name="${radioName}"
                    id="csp_${f.id}_${opt.replace(/[\s\/()]/g, '_')}"
                    data-field="${f.id}" value="${opt}"
                    ${defaultVal === opt ? 'checked' : ''}>
                  <label class="form-check-label small"
                    for="csp_${f.id}_${opt.replace(/[\s\/()]/g, '_')}">${opt}</label>
                </div>`
                )
                .join('')}
            </div>`
            )
            .join('')}
        </div>`;
      }

      if (f.type === 'row_group') {
        const itemsHtml = f.items
          .map(item => {
            if (item.type === 'label') {
              return `<span class="small text-nowrap">${item.text}</span>`;
            }
            if (item.type === 'select') {
              const opts = (item.options || []).map(o => `<option value="${o}">${o}</option>`).join('');
              return `<select class="form-select form-select-sm cs-param-input" id="csp_${item.id}" data-field="${item.id}" style="width:${item.width || '70px'}">${opts}</select>`;
            }
            if (item.type === 'number') {
              return `<input type="number" class="form-control form-control-sm cs-param-input"
              id="csp_${item.id}" data-field="${item.id}"
              value="${item.default !== undefined ? item.default : 0}"
              min="${item.min !== undefined ? item.min : 0}"
              step="${item.step || 1}"
              style="width:${item.width || '55px'}">`;
            }
            if (item.type === 'radio') {
              return `<input class="form-check-input cs-param-input" type="radio"
              name="${item.name}" id="csp_${item.id}"
              data-field="${item.field || item.id}" value="${item.value}"
              ${item.checked ? 'checked' : ''}>`;
            }
            return '';
          })
          .join('');
        return `<div class="col-12 mb-2"><div class="d-flex align-items-center flex-wrap gap-2">${itemsHtml}</div></div>`;
      }

      if (f.type === 'mode_radio_pair') {
        const radioName = 'csp_mode_' + conditionId;
        const dirOpts = (f.directions || ['이상', '이하', '미상'])
          .map(d => `<option value="${d}">${d}</option>`)
          .join('');
        const v1 = f.value1Default !== undefined ? f.value1Default : 0;
        const v2 = f.value2Default !== undefined ? f.value2Default : 0;
        const step = f.step !== undefined ? f.step : 1;
        const minVal = f.min !== undefined ? f.min : 0;
        const maxAttr = f.max !== undefined ? `max="${f.max}"` : '';
        return `
        <div class="col-12 mb-2">
          <div class="d-flex align-items-center gap-2 mb-2">
            <input class="form-check-input cs-param-input" type="radio"
              name="${radioName}" id="csp_mode_above_${conditionId}"
              data-field="mode" value="이상" checked
              onchange="syncModeRadio('${conditionId}', '이상')">
            <input type="number" class="form-control form-control-sm cs-param-input"
              id="csp_value1_above_${conditionId}" data-field="value1"
              value="${v1}" min="${minVal}" ${maxAttr} step="${step}" style="width:90px">
            <span class="small">${f.unit}</span>
            <select class="form-select form-select-sm cs-param-input"
              id="csp_direction_${conditionId}" data-field="direction" style="width:70px">
              ${dirOpts}
            </select>
          </div>
          <div class="d-flex align-items-center gap-2">
            <input class="form-check-input cs-param-input" type="radio"
              name="${radioName}" id="csp_mode_range_${conditionId}"
              data-field="mode" value="범위"
              onchange="syncModeRadio('${conditionId}', '범위')">
            <input type="number" class="form-control form-control-sm cs-param-input"
              id="csp_value1_range_${conditionId}" data-field="value1r"
              value="${v1}" min="${minVal}" ${maxAttr} step="${step}" style="width:90px" disabled>
            <span class="small">${f.unit} 이상</span>
            <input type="number" class="form-control form-control-sm cs-param-input"
              id="csp_value2_${conditionId}" data-field="value2"
              value="${v2}" min="${minVal}" ${maxAttr} step="${step}" style="width:90px" disabled>
            <span class="small">${f.unit} 이하</span>
          </div>
        </div>`;
      }

      if (f.type === 'select') {
        const optionsHtml = f.options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
        return `
        <div class="col-auto mb-2">
          <label class="form-label mb-1" style="font-size:0.75rem">${f.label}</label>
          <select class="form-select form-select-sm cs-param-input" id="csp_${f.id}" data-field="${f.id}">
            ${optionsHtml}
          </select>
        </div>`;
      }

      if (f.type === 'number') {
        return `
        <div class="col-auto mb-2">
          <label class="form-label mb-1" style="font-size:0.75rem">${f.label}</label>
          <input type="number"
            class="form-control form-control-sm cs-param-input"
            id="csp_${f.id}"
            data-field="${f.id}"
            value="${f.default !== undefined ? f.default : ''}"
            min="${f.min !== undefined ? f.min : ''}"
            max="${f.max !== undefined ? f.max : ''}"
            step="${f.step !== undefined ? f.step : 1}"
            style="width:90px" />
        </div>`;
      }

      return '';
    })
    .join('');

  el.innerHTML = `
    <div class="d-flex align-items-center mb-2" style="border-bottom:1px solid #dee2e6; padding-bottom:8px">
      <strong style="font-size:0.85rem">${fieldDef.label}</strong>
    </div>
    <div class="row g-2 align-items-end">
      ${fieldsHtml}
      <div class="col-auto mb-2" style="margin-top:auto">
        <button class="btn btn-sm btn-primary" onclick="addConditionFromPanel('${conditionId}')">추가</button>
      </div>
    </div>`;
}

// 조건 목록 테이블 렌더링
function renderConditionList() {
  const tbody = document.getElementById('cs-condition-tbody');
  const state = CS_STATE.conditions;

  if (!tbody) return;

  if (state.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-muted py-3" style="font-size:0.8rem">
          왼쪽 트리에서 조건을 선택 후 추가 버튼을 클릭하세요
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = state
    .map(
      (cond, index) => `
    <tr>
      <td class="text-center" style="width:30px">
        <input type="checkbox" class="form-check-input cs-cond-check"
          data-letter="${cond.letter}" ${cond.active ? 'checked' : ''}
          onchange="toggleConditionActive('${cond.letter}')">
      </td>
      <td class="text-center fw-bold" style="width:30px;font-size:0.85rem">${cond.letter}</td>
      <td style="font-size:0.8rem">${cond.description}</td>
      <td class="text-center" style="width:50px">
        <button class="btn btn-sm btn-outline-danger py-0 px-1" style="font-size:0.7rem"
          onclick="removeCondition('${cond.letter}')">X</button>
      </td>
      <td class="text-center" style="width:60px">
        <button class="btn btn-sm btn-outline-secondary py-0 px-1 me-1" style="font-size:0.7rem"
          onclick="moveCondition(${index}, -1)" ${index === 0 ? 'disabled' : ''}>▲</button>
        <button class="btn btn-sm btn-outline-secondary py-0 px-1" style="font-size:0.7rem"
          onclick="moveCondition(${index}, 1)" ${index === state.length - 1 ? 'disabled' : ''}>▼</button>
      </td>
    </tr>`
    )
    .join('');
}

// 조건식 자동 업데이트
function updateConditionFormula() {
  const formulaEl = document.getElementById('cs-formula');
  if (!formulaEl) return;

  const activeLetters = CS_STATE.conditions.filter(c => c.active).map(c => c.letter);

  if (activeLetters.length === 0) {
    formulaEl.value = '';
    return;
  }

  formulaEl.value = activeLetters.join(' and ');
}

// 검색 결과 테이블 렌더링
function renderConditionResults(results) {
  const el = document.getElementById('cs-results');
  if (!el) return;

  if (!results || results.length === 0) {
    el.innerHTML = `
      <div class="text-center text-muted py-4">
        <h6>조건을 만족하는 종목이 없습니다</h6>
      </div>`;
    return;
  }

  const rows = results
    .map(
      (r, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><a href="${r.url || '#'}" target="_blank"><code>${r.code}</code></a></td>
      <td><strong>${r.name}</strong></td>
      <td>${r.price || '-'}</td>
      <td>${r.change || '-'}</td>
      <td>${r.changeRate || '-'}</td>
      <td>${r.volume || '-'}</td>
    </tr>`
    )
    .join('');

  el.innerHTML = `
    <div class="table-responsive">
      <table class="table table-hover table-sm">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>종목코드</th>
            <th>종목명</th>
            <th>현재가</th>
            <th>대비</th>
            <th>등락률</th>
            <th>거래량</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

// 진행 상황 업데이트
function updateConditionProgress(current, total, stockName) {
  const progressEl = document.getElementById('cs-progress');
  const barEl = document.getElementById('cs-progress-bar');
  const textEl = document.getElementById('cs-progress-text');
  const countEl = document.getElementById('cs-progress-count');
  if (!progressEl) return;

  if (current === 0 && total === 0) {
    progressEl.style.display = 'none';
    return;
  }

  progressEl.style.display = 'block';
  const pct = Math.round((current / total) * 100);
  barEl.style.width = `${pct}%`;
  textEl.textContent = `분석 중: ${stockName}`;
  countEl.textContent = `${current} / ${total}`;
}

// 이상/범위 라디오 전환 시 입력 필드 활성화/비활성화
function syncModeRadio(conditionId, mode) {
  const aboveInput = document.getElementById('csp_value1_above_' + conditionId);
  const dirSelect = document.getElementById('csp_direction_' + conditionId);
  const rangeInput1 = document.getElementById('csp_value1_range_' + conditionId);
  const rangeInput2 = document.getElementById('csp_value2_' + conditionId);

  if (mode === '이상') {
    if (aboveInput) aboveInput.disabled = false;
    if (dirSelect) dirSelect.disabled = false;
    if (rangeInput1) rangeInput1.disabled = true;
    if (rangeInput2) rangeInput2.disabled = true;
  } else {
    if (aboveInput) aboveInput.disabled = true;
    if (dirSelect) dirSelect.disabled = true;
    if (rangeInput1) rangeInput1.disabled = false;
    if (rangeInput2) rangeInput2.disabled = false;
  }
}

function syncModeRadio(conditionId, mode) {
  const aboveInput = document.getElementById('csp_value1_above_' + conditionId);
  const dirSelect = document.getElementById('csp_direction_' + conditionId);
  const rangeInput1 = document.getElementById('csp_value1_range_' + conditionId);
  const rangeInput2 = document.getElementById('csp_value2_' + conditionId);

  if (mode === '이상') {
    if (aboveInput) aboveInput.disabled = false;
    if (dirSelect) dirSelect.disabled = false;
    if (rangeInput1) rangeInput1.disabled = true;
    if (rangeInput2) rangeInput2.disabled = true;
  } else {
    if (aboveInput) aboveInput.disabled = true;
    if (dirSelect) dirSelect.disabled = true;
    if (rangeInput1) rangeInput1.disabled = false;
    if (rangeInput2) rangeInput2.disabled = false;
  }
}
