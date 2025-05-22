/**
 * 단순화된 메뉴 스크립트
 * PerfectScrollbar 의존성 제거
 */

'use strict';

/**
 * 메뉴 클래스 - Perfect Scrollbar 의존성 제거
 */
var Menu = function(menuElement, options) {
  var _this = this;
  
  this._element = menuElement;
  this._menuBgClass = 'bg-menu-theme';
  
  // 기본 옵션
  this._options = {
    orientation: 'vertical',
    closeChildren: false,
    showDropdownOnHover: false
  };
  
  // 사용자 옵션으로 기본 옵션 덮어쓰기
  if (options) {
    for (var option in options) {
      this._options[option] = options[option];
    }
  }
  
  // 메뉴 초기화
  this._init();
  
  // 이벤트 리스너 추가
  document.addEventListener('click', function(e) {
    _this._closeMenus(e);
  });
};

/**
 * 메뉴 초기화
 */
Menu.prototype._init = function() {
  // PerfectScrollbar 초기화 로직 제거
  
  // 메뉴 항목 이벤트 리스너 추가
  this._bindMenuItemEvents();
  
  // 활성 메뉴 항목 설정
  this._setActiveItems();
  
  return this;
};

/**
 * 메뉴 항목 이벤트 리스너 추가
 */
Menu.prototype._bindMenuItemEvents = function() {
  var _this = this;
  var menuItems = this._element.querySelectorAll('.menu-toggle, .menu-link');
  
  menuItems.forEach(function(menuItem) {
    // 메뉴 토글 클릭 이벤트
    menuItem.addEventListener('click', function(e) {
      if (menuItem.classList.contains('menu-toggle')) {
        e.preventDefault();
        _this._toggleDropdown(menuItem);
      }
    });
    
    // 메뉴 호버 이벤트 (옵션이 활성화된 경우)
    if (_this._options.showDropdownOnHover && menuItem.classList.contains('menu-toggle')) {
      menuItem.addEventListener('mouseenter', function() {
        if (_this._options.orientation === 'horizontal') {
          _this._toggleDropdown(menuItem, true);
        }
      });
      
      // 부모 요소에 마우스 나가기 이벤트 추가
      menuItem.closest('.menu-item').addEventListener('mouseleave', function() {
        if (_this._options.orientation === 'horizontal') {
          _this._toggleDropdown(menuItem, false);
        }
      });
    }
  });
};

/**
 * 드롭다운 토글
 */
Menu.prototype._toggleDropdown = function(menuToggle, show) {
  var _this = this;
  var menuItem = menuToggle.closest('.menu-item');
  var parentMenus = [];
  
  if (show === undefined) {
    show = !menuItem.classList.contains('open');
  }
  
  // 다른 열린 하위 메뉴 닫기
  if (show && this._options.closeChildren) {
    var openMenuItems = menuItem.parentElement.querySelectorAll('.menu-item.open');
    openMenuItems.forEach(function(openMenuItem) {
      // 현재 메뉴 항목이나 부모 메뉴가 아닌 경우에만 닫기
      if (openMenuItem !== menuItem && !parentMenus.includes(openMenuItem)) {
        openMenuItem.classList.remove('open');
      }
    });
  }
  
  // 메뉴 토글
  if (show) {
    menuItem.classList.add('open');
  } else {
    menuItem.classList.remove('open');
  }
};

/**
 * 메뉴 닫기 (외부 클릭 시)
 */
Menu.prototype._closeMenus = function(e) {
  // 클릭된 요소가 메뉴 내부에 있지 않은 경우 모든 메뉴 닫기
  if (!this._element.contains(e.target)) {
    var openMenuItems = this._element.querySelectorAll('.menu-item.open');
    openMenuItems.forEach(function(openMenuItem) {
      openMenuItem.classList.remove('open');
    });
  }
};

/**
 * 활성 메뉴 항목 설정
 */
Menu.prototype._setActiveItems = function() {
  var currentUrl = window.location.href;
  var menuLinks = this._element.querySelectorAll('.menu-link');
  
  menuLinks.forEach(function(menuLink) {
    var href = menuLink.getAttribute('href');
    if (href && currentUrl.indexOf(href) > -1) {
      menuLink.classList.add('active');
      
      // 부모 메뉴 항목 활성화
      var menuItem = menuLink.closest('.menu-item');
      if (menuItem) {
        menuItem.classList.add('active');
        
        // 부모 드롭다운 열기
        var parentMenuItems = menuItem.closest('.menu-sub') 
          ? menuItem.closest('.menu-sub').closest('.menu-item')
          : null;
        
        if (parentMenuItems) {
          parentMenuItems.classList.add('open', 'active');
        }
      }
    }
  });
};

/**
 * 메뉴 유형 전환 (수직/수평)
 */
Menu.prototype.switchMenu = function(orientation) {
  if (orientation === 'vertical' || orientation === 'horizontal') {
    this._options.orientation = orientation;
  }
};

// 전역 변수로 메뉴 설정
window.Menu = Menu;