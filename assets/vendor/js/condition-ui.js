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
        <div class="cs-tree-folder d-flex align-items-center gap-1 px-2 py-1 border-bottom text-body-secondary"
             onclick="toggleTreeFolder(this)"
             style="padding-left:${paddingLeft}px; font-size:0.8rem;">
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
    <div class="cs-tree-leaf d-flex align-items-center gap-1 px-2 py-1 border-bottom ${hasField ? '' : 'cs-tree-disabled text-muted'}"
         style="padding-left:${paddingLeft}px; font-size:0.79rem;"
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
