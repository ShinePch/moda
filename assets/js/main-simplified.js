/**
 * Main JS (단순화 버전)
 * PerfectScrollbar 의존성 제거
 */

'use strict';

document.addEventListener('DOMContentLoaded', function() {
  // 메뉴 초기화
  let layoutMenuEl = document.querySelectorAll('#layout-menu');
  layoutMenuEl.forEach(function(element) {
    if (typeof Menu !== 'undefined') {
      try {
        var menu = new Menu(element, {
          orientation: 'vertical',
          closeChildren: false,
          showDropdownOnHover: false
        });
        window.Helpers.mainMenu = menu;
      } catch (error) {
        console.error('메뉴 초기화 중 오류 발생:', error);
      }
    } else {
      console.warn('Menu 클래스가 정의되지 않았습니다.');
    }
  });

  // 메뉴 토글러 초기화
  let menuToggler = document.querySelectorAll('.layout-menu-toggle');
  menuToggler.forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault();
      if (window.Helpers && typeof window.Helpers.toggleCollapsed === 'function') {
        window.Helpers.toggleCollapsed();
      } else {
        // 기본 토글 동작
        document.body.classList.toggle('layout-menu-collapsed');
      }
    });
  });

  // 모바일 메뉴 스와이프 제스처 비활성화 (단순화)

  // Bootstrap 툴팁 초기화
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    try {
      new bootstrap.Tooltip(tooltipTriggerEl);
    } catch (error) {
      console.warn('툴팁 초기화 중 오류 발생:', error);
    }
  });

  // 아코디언 활성 클래스
  const accordionActiveFunction = function (e) {
    if (e.type == 'show.bs.collapse' || e.type == 'show.bs.collapse') {
      e.target.closest('.accordion-item').classList.add('active');
    } else {
      e.target.closest('.accordion-item').classList.remove('active');
    }
  };

  const accordionTriggerList = [].slice.call(document.querySelectorAll('.accordion'));
  accordionTriggerList.forEach(function (accordionTriggerEl) {
    accordionTriggerEl.addEventListener('show.bs.collapse', accordionActiveFunction);
    accordionTriggerEl.addEventListener('hide.bs.collapse', accordionActiveFunction);
  });

  // 테마 스위처 (라이트/다크/시스템 모드)
  let styleSwitcher = document.querySelector('.dropdown-style-switcher');
  if (styleSwitcher) {
    let styleSwitcherItems = [].slice.call(styleSwitcher.children[1].querySelectorAll('.dropdown-item'));
    styleSwitcherItems.forEach(function (item) {
      item.addEventListener('click', function () {
        let currentStyle = this.getAttribute('data-theme');
        try {
          if (window.templateCustomizer) {
            window.templateCustomizer.setStyle(currentStyle);
          }
        } catch (error) {
          console.warn('테마 변경 중 오류 발생:', error);
        }
      });
    });
  }
});