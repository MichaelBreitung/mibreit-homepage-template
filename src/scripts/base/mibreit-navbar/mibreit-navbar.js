var mibreitNavbar = function (getStickyThresholdCallback) {
  var isOpen = false;
  var isSticky = false;

  var menuBtn = undefined;
  var navigationContainer = undefined;
  var navigationContainerNextSibling = undefined;

  var navigationTopPosition = 0;
  var oldNextSiblingMarginTop = 0;

  var init = function () {
    isOpen = false;
    isSticky = false;

    menuBtn = document.querySelector('.navigation__container .menu-btn');
    navigationContainer = document.querySelector('.navigation__container');
    navigationContainerNextSibling = navigationContainer.nextElementSibling;    
    oldNextSiblingMarginTop = parseInt(window.getComputedStyle(navigationContainerNextSibling).marginTop);
    updateNavigationContainerTopPosition();
  };

  var updateNextSiblingMarginTop = function (additionalMargin) {   
    navigationContainerNextSibling.style.setProperty('margin-top', ''+(oldNextSiblingMarginTop + additionalMargin)+'px');
  };

  var updateNavigationContainerTopPosition = function () {
    if (typeof getStickyThresholdCallback !== 'undefined') {
      navigationTopPosition = getStickyThresholdCallback();
    } else if (!navigationIsSticky) {
      navigationTopPosition = navigationContainer.getBoundingClientRect().top;
    }  
  };

  var makeSticky = function () {
    updateNextSiblingMarginTop(navigationContainer.clientHeight);
    navigationContainer.classList.add('sticky');
    isSticky = true;
  };

  var makeUnSticky = function () {
    navigationContainer.classList.remove('sticky');
    navigationContainerNextSibling.style.removeProperty('transition');
    navigationContainerNextSibling.style.removeProperty('margin-top');
    isSticky = false;
  };

  var updateStickyState = function () {
    if (!isSticky) {      
      if (window.pageYOffset > navigationTopPosition) {
        makeSticky();
      }
    } else if (window.pageYOffset <= navigationTopPosition) {
      makeUnSticky();
    }
  };

  var makeClose = function () {
    menuBtn.classList.remove('open');
    navigationContainer.classList.remove('open');
    isOpen = false;

    if (isSticky) {
      navigationContainerNextSibling.style.setProperty('transition', 'all 0.5s ease-in-out');
      setTimeout(function () {
        updateNextSiblingMarginTop(navigationContainer.clientHeight);
      }, 500);
    }
  };

  var makeOpen = function () {
    menuBtn.classList.add('open');
    navigationContainer.classList.add('open');
    isOpen = true;

    if (isSticky) {
      navigationContainerNextSibling.style.setProperty('transition', 'all 0.5s ease-in-out');
      setTimeout(function () {
        updateNextSiblingMarginTop(navigationContainer.clientHeight);
      }, 500);
    }
  };

  var updateOpenState = function () {
    if (isOpen) {
      makeClose();
    } else {
      makeOpen();
    }
  };

  window.addEventListener('load', function () {
    init();

    menuBtn.addEventListener('click', updateOpenState);
    document.addEventListener('scroll', updateStickyState);
    window.addEventListener('resize', updateNavigationContainerTopPosition);
  });
};
