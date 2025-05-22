/**
 * 메뉴 관련 동적 기능을 처리하는 JS (간소화 버전)
 */

// 메뉴 초기화 함수
function initializeMenu() {
  console.log(window.location.pathname);
  
  // 메뉴 토글 기능 (상위 메뉴 클릭 시 하위 메뉴 표시/숨김)
  $(document).on('click', '.menu-toggle, a[href="javascript:void(0);"]', function(e) {
    e.preventDefault();
    
    // 메뉴 토글 버튼인 경우 하위 메뉴 표시/숨김 처리
    const $menuItem = $(this).closest('.menu-item');
    $menuItem.toggleClass('open');
    console.log("메뉴 토글됨");
  });
  
  // 메뉴 항목 클릭 이벤트 (페이지 로드)
  $(document).on('click', '#menuBox .menu-item a:not(.menu-toggle)', function(e) {
    e.preventDefault();
    
    // 클릭된 메뉴 링크의 href 속성 가져오기
    const href = $(this).attr('href');
    
    // javascript:void(0) 링크는 처리하지 않음
    if (href === 'javascript:void(0);' || href.indexOf('javascript:void(0)') !== -1) {
      console.log("javascript:void(0) 링크 - 컨텐츠 로드 안함");
      return;
    }
    
    console.log("컨텐츠 로드 경로:", href);
    
    // 컨텐츠 영역에 해당 페이지 내용 로드 - base 태그 덕분에 경로 변환 불필요
    $("#infraDashboard").load(href + ' .container-xxl', function(response, status, xhr) {
      if (status == "error") {
        console.error("컨텐츠 로드 실패: " + xhr.status + " " + xhr.statusText);
        $("#infraDashboard").html("<p>컨텐츠를 로드할 수 없습니다.</p>");
      } else {
        console.log("컨텐츠 로드 완료");

        // 클립보드 초기화 코드 추가 - 이 부분이 중요합니다!
        setTimeout(function() {
          initializeClipboard();
        }, 100);
        
        // 모든 메뉴 항목에서 active 클래스 제거
        $('#menuBox .menu-item').removeClass('active');
        
        // 클릭된 메뉴 항목에 active 클래스 추가
        $(e.target).closest('.menu-item').addClass('active');
        
        // 상위 메뉴 항목에도 active와 open 클래스 추가
        const $parentMenuItem = $(e.target).closest('.menu-sub').parent('.menu-item');
        if ($parentMenuItem.length) {
          $parentMenuItem.addClass('active open');
        }
        
        // URL 히스토리 업데이트
        history.pushState(null, null, href);
      }
    });
  });
  
  // 현재 URL에 맞는 메뉴 항목 활성화
  activateCurrentMenuItem();
  
  // 초기 페이지로 infraDashboard 로드
  loadInfraDashboard();
  
  // PerfectScrollbar 초기화
  setTimeout(initializePerfectScrollbar, 500);
  
  console.log("메뉴 초기화 완료");
}

/**
 * 클립보드 기능 초기화
 */
function initializeClipboard() {
  // ClipboardJS 라이브러리가 없는 경우 오류 방지
  try {
    if (typeof ClipboardJS !== 'undefined') {
      // 기존 클립보드 객체 제거 (중복 초기화 방지)
      $('.clipboard-btn').each(function() {
        if ($(this).data('clipboard')) {
          $(this).data('clipboard').destroy();
        }
      });

      const clipboardList = [].slice.call(document.querySelectorAll('.clipboard-btn'));
      clipboardList.forEach(function (clipboardEl) {
        const clipboard = new ClipboardJS(clipboardEl);
        $(clipboardEl).data('clipboard', clipboard);
        
        clipboard.on('success', function (e) {
          if (e.action == 'copy') {
            console.log('복사 성공!');
            if (typeof toastr !== 'undefined') {
              toastr['success']('', 'Copied to Clipboard!!');
            } else {
              alert('복사되었습니다!');
            }
          }
        });
        
        clipboard.on('error', function (e) {
          console.error('클립보드 복사 실패:', e);
          alert('복사에 실패했습니다. 수동으로 복사해주세요.');
        });
      });
      console.log('클립보드 초기화 완료 - 클립보드 버튼 수:', clipboardList.length);
    } else {
      console.warn('ClipboardJS 라이브러리가 로드되지 않았습니다.');
      // 대체 경고 표시
      $('.clipboard-btn').on('click', function() {
        alert('클립보드 기능을 사용할 수 없습니다. 라이브러리가 로드되지 않았습니다.');
      });
    }
  } catch (error) {
    console.warn('클립보드 초기화 실패:', error);
  }
}

/**
 * 초기 페이지로 infraDashboard 로드
 */
function loadInfraDashboard() {
  const dashboardPath = 'modaInfra/infraDashboard.html';
  
  $("#infraDashboard").load(dashboardPath + ' .container-xxl', function(response, status, xhr) {
    if (status == "error") {
      console.error("기본 대시보드 로드 실패: " + xhr.status + " " + xhr.statusText);
    } else {
      console.log("기본 대시보드 로드 완료");
      
      // 대시보드 메뉴 항목 활성화
      $('#modaInfraDashboard').addClass('active');
      $('#modaInfraDashboard').closest('.menu-sub').parent('.menu-item').addClass('active open');
      
      // 클립보드 초기화 - 대시보드 로드 후에도 초기화
      setTimeout(function() {
        initializeClipboard();
      }, 100);
    }
  });
}

/**
 * 현재 URL에 맞는 메뉴 항목 활성화
 */
function activateCurrentMenuItem() {
  const currentPath = window.location.pathname;
  
  // 기본적으로 모든 active 클래스 제거
  $('#menuBox .menu-item').removeClass('active');
  
  // 상위 메뉴 기본값으로 open 유지
  $('#menuBox > .menu-item.open').addClass('open');
  
  // URL에 따라 해당 메뉴 항목 활성화
  if (currentPath.includes('info.html')) {
    $('#info').addClass('active');
    $('#info').closest('.menu-sub').parent('.menu-item').addClass('active open');
  } else if (currentPath.includes('detail.html')) {
    $('#detail').addClass('active');
    $('#detail').closest('.menu-sub').parent('.menu-item').addClass('active open');
  } else if (currentPath.includes('java.html')) {
    $('#java').addClass('active');
    $('#java').closest('.menu-sub').parent('.menu-item').addClass('active open');
  } else if (currentPath.includes('powerShell.html')) {
    $('#powerShell').addClass('active');
    $('#powerShell').closest('.menu-sub').parent('.menu-item').addClass('active open');
  } else if (currentPath.includes('infraDashboard.html') || currentPath.endsWith('/') || currentPath.includes('layout.html')) {
    $('#modaInfraDashboard').addClass('active');
    $('#modaInfraDashboard').closest('.menu-sub').parent('.menu-item').addClass('active open');
  }
}

/**
 * PerfectScrollbar 초기화 함수
 */
function initializePerfectScrollbar() {
  try {
    // 메뉴 내부에 PerfectScrollbar 적용
    const menuInner = document.querySelector('.menu-inner');
    if (menuInner && typeof PerfectScrollbar !== 'undefined') {
      new PerfectScrollbar(menuInner, {
        wheelPropagation: false,
        suppressScrollX: true
      });
      console.log('PerfectScrollbar 초기화 완료');
    }
  } catch (error) {
    console.warn('PerfectScrollbar 초기화 실패:', error);
  }
}