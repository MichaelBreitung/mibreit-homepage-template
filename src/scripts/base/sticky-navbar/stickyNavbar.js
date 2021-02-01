var stickyNavbar = function (getStickyThresholdCallback) {
  var navigationTopPosition = undefined;
  var navigationIsSticky = false;
  var navigationContainer = undefined;

  var init = function () {
    makeSmooth = false;
    navigationIsSticky = false;
    navigationContainer = document.querySelector('.navigation__container');
    updateNavigationContainerTopPosition();
  };

  var updateNavigationContainerTopPosition = function () {
    if (typeof getStickyThresholdCallback !== 'undefined') {
      navigationTopPosition = getStickyThresholdCallback();
    } else if (!navigationIsSticky) {
      navigationTopPosition = navigationContainer.getBoundingClientRect().top;
    }
  };

  var makeSticky = function () {
    navigationContainer.classList.add('sticky');
    navigationIsSticky = true;
  };

  var reset = function () {
    navigationContainer.classList.remove('sticky');
    navigationIsSticky = false;
  };

  var update = function () {
    if (!navigationIsSticky) {
      if (window.pageYOffset > navigationTopPosition) {
        makeSticky();
      }
    } else if (window.pageYOffset <= navigationTopPosition) {
      reset();
    }
    updateNavigationContainerTopPosition();
  };

  window.addEventListener('load', function () {
    init();
    document.addEventListener('scroll', update);
    window.addEventListener('resize', function () {
      updateNavigationContainerTopPosition();
    });
  });
};
