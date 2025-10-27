/**
 * 메뉴 관련 동적 기능을 처리하는 JS
 */

// 메뉴 초기화 함수
/**
 * 메뉴 초기화 함수 - 반응형 포함 완전 버전
 */
function initializeMenu() {
  
  // 🚀 모바일 햄버거 메뉴 토글 기능
  $(document).on('click', '.layout-menu-toggle', function(e) {
    e.preventDefault();
    
    const $body = $('body');
    const $layoutMenu = $('#layout-menu');
    const $overlay = $('.layout-overlay');

    // 메뉴가 열려있는지 확인
    if ($body.hasClass('layout-menu-expanded')) {
      // 메뉴 닫기
      $body.removeClass('layout-menu-expanded');
      $overlay.removeClass('show');

      $layoutMenu.css({
        'display': 'block !important',
        'visibility': 'visible !important',
        'left': '0px !important',
        'z-index': '9999'
      });
      
    } else {
      // 메뉴 열기
      $body.addClass('layout-menu-expanded');
      $layoutMenu.addClass('show');
      $overlay.addClass('show');
    }
  });
  
  // 🚀 오버레이 클릭 시 메뉴 닫기
  $(document).on('click', '.layout-overlay', function() {
    $('body').removeClass('layout-menu-expanded');
    $('#layout-menu').removeClass('show');
    $(this).removeClass('show');
  });
  
  // 메뉴 토글 기능 개선 (Bootstrap 아코디언과 호환)
  $(document).on('click', '.menu-toggle', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const $clickedMenuItem = $(this).closest('.menu-item');
    const $menuSub = $clickedMenuItem.find('.menu-sub').first();
    
    // 현재 메뉴가 열려있는지 확인
    const isCurrentlyOpen = $clickedMenuItem.hasClass('open');
    
    if (isCurrentlyOpen) {
      // 현재 메뉴 닫기
      $clickedMenuItem.removeClass('open');
      $menuSub.slideUp(300);
    } else {
      // 같은 레벨의 다른 메뉴들 모두 닫기 (아코디언 효과)
      $clickedMenuItem.siblings().each(function() {
        $(this).removeClass('open');
        $(this).find('.menu-sub').first().slideUp(300);
      });
      
      // 현재 메뉴 열기
      $clickedMenuItem.addClass('open');
      $menuSub.slideDown(300);
    }
    
  });
  
  // 메뉴 항목 클릭 이벤트 (페이지 로드)
  $(document).on('click', '#menuBox .menu-item a:not(.menu-toggle)', function(e) {
    e.preventDefault();
    console.log('메뉴 클릭됨');
    // 클릭된 메뉴 링크의 href 속성 가져오기
    const href = $(this).attr('href');
    console.log('href:', href); // 여기도 추가
    // javascript:void(0) 링크는 처리하지 않음
    if (href === 'javascript:void(0);' || href.indexOf('javascript:void(0)') !== -1) {
      return;
    }
    
    // 컨텐츠 영역에 해당 페이지 내용 로드 - base 태그 덕분에 경로 변환 불필요
    $("#infraDashboard").load(href + ' .container-xxl', function(response, status, xhr) {
      if (status == "error") {
        $("#infraDashboard").html("<p>컨텐츠를 로드할 수 없습니다.</p>");
      } else {
        console.log('페이지 로드 완료')
        // 클립보드 초기화 코드 추가 - 이 부분이 중요합니다!
        setTimeout(function() {
          initializeClipboard();
        }, 100);

         // 🚀 Swiper 초기화 추가 (여기!)
         setTimeout(function() {
          console.log('Swiper 초기화 시도 중...');
          const swiperElement = document.querySelector('#swiper-subnet-problems');
          console.log('Swiper 요소:', swiperElement); // 실제 요소 확인
          
          if (swiperElement) {
            console.log('Swiper 요소 찾음!');
            const swiper = new Swiper('#swiper-subnet-problems', {
              pagination: {
                el: '.swiper-pagination',
                clickable: true,
              },
              slidesPerView: 1,
              spaceBetween: 10,
              loop: false,
              autoHeight: false,
              height: 500
            });
            console.log('Swiper 인스턴스:', swiper);
          } else {
            console.log('Swiper 요소를 찾을 수 없음');
          }
        }, 1000);
        
        // 🚀 모바일에서 메뉴 항목 클릭 시 메뉴 닫기
        if ($(window).width() < 1200) { // xl breakpoint
          setTimeout(function() {
            $('body').removeClass('layout-menu-expanded');
            $('#layout-menu').removeClass('show');
            $('.layout-overlay').removeClass('show');
          }, 100);
        }
        
        // 도구 페이지인 경우 다운로드 기능 초기화 추가
        if (href.includes('tool.html')) {
          setTimeout(function() {
            if (typeof initializeToolDownload === 'function') {
              initializeToolDownload();
            }
          }, 200);
        }
        
        // 모든 메뉴 항목에서 active 클래스 제거
        $('#menuBox .menu-item').removeClass('active');
        
        // 클릭된 메뉴 항목에 active 클래스 추가
        $(e.target).closest('.menu-item').addClass('active');
        
        // 상위 메뉴 항목에도 active와 open 클래스 추가
        const $parentMenuItem = $(e.target).closest('.menu-sub').parent('.menu-item');
        if ($parentMenuItem.length) {
          $parentMenuItem.addClass('active open');
        }
        
        // URL 히스토리 업데이트 (해시 기반으로 변경)
        const pageName = href.replace(/.*\//, '').replace('.html', '');
        const menuId = $(e.target).closest('.menu-item').attr('id');
        history.pushState({page: pageName, menuId: menuId}, null, window.location.pathname + '#' + menuId);
      }
    });
  });
  
  // 현재 URL에 맞는 메뉴 항목 활성화
  activateCurrentMenuItem();
  
  // 초기 페이지로 infraDashboard 로드
  if (!window.location.hash) {
    loadInfraDashboard();
  }
  
  // PerfectScrollbar 초기화
  setTimeout(initializePerfectScrollbar, 500);
  
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
  } else if (currentPath.includes('tool.html')) {
    $('#tool').addClass('active');
    $('#tool').closest('.menu-sub').parent('.menu-item').addClass('active open');
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
    }
  } catch (error) {
    console.warn('PerfectScrollbar 초기화 실패:', error);
  }
}