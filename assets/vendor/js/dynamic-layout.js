/**
 * 레이아웃 관련 동적 기능을 처리하는 JS - layout
 */

// DOM 관련 이벤트 리스너는 제거하고 함수만 정의
// 이 함수들은 dynamic-index.js에서 호출됨

/**
 * header.html을 불러와서 <header> 태그에 삽입하는 함수
 */
function loadHeader() {
  $("header").load("./layout/header.html", function(response, status, xhr) {
    if (status == "error") {
      console.error("header 로드 실패: " + xhr.status + " " + xhr.statusText);
    } else {
      console.log("header 로드 완료");
    }
  });
}

/**
 * menu.html을 불러와서 <aside> 태그에 삽입하는 함수
 */
function loadMenuLoad() {
  $("aside").load("./general/menu.html", function(response, status, xhr) {
    if (status == "error") {
      console.error("메뉴 로드 실패: " + xhr.status + " " + xhr.statusText);
    } else {
      console.log("메뉴 로드 완료");
      // 메뉴가 로드된 후 메뉴 관련 이벤트를 초기화
      initializeMenu();
    }
  });
}

/**
 * footer.html을 불러와서 <footer> 태그에 삽입하는 함수
 */
function loadFooter() {
  $("footer").load("./layout/footer.html", function(response, status, xhr) {
    if (status == "error") {
      console.error("footer 로드 실패: " + xhr.status + " " + xhr.statusText);
    } else {
      console.log("footer 로드 완료");
    }
  });
}