/**
 * 레이아웃 관련 동적 기능을 처리하는 JS (간소화 버전)
 */

// DOM이 완전히 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
  // jQuery가 로드되었는지 확인
  if (typeof jQuery !== 'undefined') {
    // 메뉴 로드
    loadBody();
    console.log("동적 레이아웃 초기화 완료");
    
    // 브라우저 뒤로가기/앞으로가기 이벤트 처리
    window.addEventListener('popstate', function(event) {
      console.log("브라우저 히스토리 변경 감지:", window.location.hash);
      
      // 약간의 딜레이 후 해시 기반 페이지 로드
      setTimeout(function() {
        if (typeof checkHashAndLoadPage === 'function') {
          checkHashAndLoadPage();
        }
      }, 100);
    });
  } else {
    console.error('jQuery가 로드되지 않았습니다.');
  }
});

/**
 * layout.html을 불러와서 body 태그에 삽입하는 함수
 */
function loadBody() {
  $("body").load("layout/layout.html", function(response, status, xhr) {
    if (status == "error") {
      console.error("body 로드 실패: " + xhr.status + " " + xhr.statusText);
    } else {
      console.log("body 로드 완료");
      // body가 로드된 후 layout.js의 함수들을 호출
      if (typeof loadHeader === 'function') {
        loadHeader();
      }
      if (typeof loadMenuLoad === 'function') {
        loadMenuLoad();
      }
      if (typeof loadFooter === 'function') {
        loadFooter();
      }
      
      // 🚀 새로 추가: URL 해시 확인해서 해당 페이지 로드
      setTimeout(function() {
        checkHashAndLoadPage();
      }, 1000);
    }
  });
}

// 🚀 새로 추가할 함수
function checkHashAndLoadPage() {
  const hash = window.location.hash.substring(1); // # 제거
  console.log("현재 해시:", hash);
  
  if (hash) {
    // 해시에 따라 해당 페이지 로드
    const pageMap = {
      'modaInfraDashboard': 'modaInfra/infraDashboard.html',
      'schedule': 'modaInfra/shedule.html',
      'function': 'modaInfra/function.html', 
      'info': 'modaInfra/info.html',
      'powerShell': 'coding/powerShell.html',
      'java': 'coding/java.html',
      'gitHub': 'coding/gitHub.html',
      'python': 'coding/python.html',
      'mariaDB_DBeaver': 'coding/mariaDB_DBeaver.html',
      'coreCss': 'coding/coreCss.html',
      'stock': 'chart/stock.html',
      'crypto': 'chart/crypto.html',
      'stockAPI': 'chart/stockAPI.html',
      'stockWord': 'chart/stockWord.html',
      'InformationProcessing': 'certificate/InformationProcessing.html',
      'SQLD': 'certificate/SQLD.html',
      'tool': 'tool/tool.html'
    };
    
    if (pageMap[hash]) {
      console.log("페이지 로드:", pageMap[hash]);
      
      // 해당 페이지 컨텐츠 로드
      $("#infraDashboard").load(pageMap[hash] + ' .container-xxl', function(response, status, xhr) {
        if (status == "error") {
          console.error("페이지 로드 실패: " + xhr.status + " " + xhr.statusText);
          // 실패하면 기본 대시보드 로드
          loadInfraDashboard();
        } else {
          console.log("해시 기반 페이지 로드 완료:", hash);
          
          // 클립보드 초기화
          setTimeout(function() {
            initializeClipboard();
          }, 100);
          
          // 해당 메뉴 활성화
          $('#menuBox .menu-item').removeClass('active');
          $('#' + hash).addClass('active');
          $('#' + hash).closest('.menu-sub').parent('.menu-item').addClass('active open');
        }
      });
    } else {
      // 해시가 없거나 매칭되지 않으면 기본 대시보드 로드
      loadInfraDashboard();
    }
  } else {
    // 해시가 없으면 기본 대시보드 로드
    loadInfraDashboard();
  }
}