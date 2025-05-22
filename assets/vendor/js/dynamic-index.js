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
    }
  });
}