/**
 * 도구 다운로드 관련 동적 기능을 처리하는 JS
 */

/**
 * 도구 다운로드 기능 초기화
 */
function initializeToolDownload() {
    console.log("도구 다운로드 기능 초기화 중...");
    
    // 다운로드 버튼들 찾기
    const downloadButtons = document.querySelectorAll('.tool-download-btn');
    console.log('찾은 tool-download-btn 버튼들:', downloadButtons);
    
    downloadButtons.forEach(function(button) {
      console.log('버튼 처리 중:', button.id, button.className);
      
      // onclick 속성 제거 (충돌 방지)
      button.removeAttribute('onclick');
      
      // 기존 이벤트 리스너 제거 (중복 방지)
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
      
      // 새로운 이벤트 리스너 추가
      newButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('다운로드 버튼 클릭됨:', this.id);
        handleToolDownload(this);
      });
      
      console.log('버튼 이벤트 리스너 추가 완료:', newButton.id);
    });
    
    console.log('도구 다운로드 기능 초기화 완료 - 버튼 수:', downloadButtons.length);
  }
  
  /**
   * 도구 다운로드 처리 함수
   */
  function handleToolDownload(button) {
    const filePath = button.getAttribute('data-download-path');
    const fileName = button.getAttribute('data-filename');
    const toolName = button.getAttribute('data-tool-name');
    const statusElementId = button.id.replace('download', '') + 'Status';
    const statusElement = document.getElementById(statusElementId.toLowerCase());
    
    if (!filePath || !fileName) {
      console.error('다운로드 정보가 없습니다:', button);
      showToastMessage('다운로드 정보가 없습니다.', 'error');
      return;
    }
    
    try {
      console.log('다운로드 시작:', fileName);
      
      // 상태 업데이트
      if (statusElement) {
        statusElement.textContent = '다운로드 중...';
        statusElement.className = 'badge bg-label-warning';
      }
      
      // 버튼 상태 변경
      button.disabled = true;
      button.innerHTML = '<i class="ti ti-loader ti-spin me-1"></i>다운로드 중...';
      
      // 파일 다운로드 실행
      const link = document.createElement('a');
      link.href = filePath;
      link.download = fileName;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // 성공 처리 (1초 후)
      setTimeout(() => {
        downloadSuccess(button, statusElement, toolName);
      }, 1000);
      
    } catch (error) {
      console.error('다운로드 오류:', error);
      downloadError(button, statusElement, toolName);
    }
  }
  
  /**
   * 다운로드 성공 처리
   */
  function downloadSuccess(button, statusElement, toolName) {
    // 상태 업데이트
    if (statusElement) {
      statusElement.textContent = '다운로드 완료';
      statusElement.className = 'badge bg-label-success';
    }
    
    // 버튼 상태 변경
    button.disabled = false;
    button.innerHTML = '<i class="ti ti-check me-1"></i>완료';
    
    // 성공 알림
    showToastMessage(`${toolName} 파일이 다운로드되었습니다!`, 'success');
    
    // 3초 후 원래 상태로 복원
    setTimeout(() => {
      resetDownloadState(button, statusElement);
    }, 3000);
  }
  
  /**
   * 다운로드 실패 처리
   */
  function downloadError(button, statusElement, toolName) {
    // 상태 업데이트
    if (statusElement) {
      statusElement.textContent = '다운로드 실패';
      statusElement.className = 'badge bg-label-danger';
    }
    
    // 버튼 상태 변경
    button.disabled = false;
    button.innerHTML = '<i class="ti ti-x me-1"></i>재시도';
    
    // 에러 알림
    showToastMessage(`${toolName} 파일 다운로드에 실패했습니다. 파일 경로를 확인해주세요.`, 'error');
    
    // 3초 후 원래 상태로 복원
    setTimeout(() => {
      resetDownloadState(button, statusElement);
    }, 3000);
  }
  
  /**
   * 다운로드 상태 초기화
   */
  function resetDownloadState(button, statusElement) {
    // 상태 초기화
    if (statusElement) {
      statusElement.textContent = '다운로드 준비완료';
      statusElement.className = 'badge bg-label-success';
    }
    
    // 버튼 초기화
    button.innerHTML = '<i class="ti ti-download me-1"></i>다운로드';
  }
  
  /**
   * 토스트 메시지 표시 (기존 toastr 활용)
   */
  function showToastMessage(message, type = 'success') {
    try {
      // toastr가 있는 경우 사용
      if (typeof toastr !== 'undefined') {
        toastr[type](message);
      } else {
        // toastr가 없는 경우 콘솔 로그
        console.log(`${type.toUpperCase()}: ${message}`);
        
        // 간단한 alert도 표시 (개발 중에만)
        if (type === 'error') {
          alert(`오류: ${message}`);
        }
      }
    } catch (error) {
      console.error('토스트 메시지 표시 오류:', error);
      console.log(`${type.toUpperCase()}: ${message}`);
    }
  }