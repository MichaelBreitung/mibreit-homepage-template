var stickyNavbar = function (getStickyThresholdCallback) {
  var navigationTopPosition = undefined;
  var navigationIsSticky = false;
  var navigationContainer = undefined;

  var init = function () {
    makeSmooth = false;
    navigationIsSticky = false;
    navigationContainer = $(".navigation__container");
    currentNavigationContainerHeight = navigationContainer.height();
    updateNavigationContainerTopPosition();
  };

  var updateNavigationContainerTopPosition = function () {
    if (typeof getStickyThresholdCallback !== "undefined") {
      navigationTopPosition = getStickyThresholdCallback() - navigationContainer.height();
    } else if (!navigationIsSticky) {
      navigationTopPosition = navigationContainer.position().top;
    }
  };

  var makeSticky = function () {
    navigationContainer.addClass("sticky");
    navigationIsSticky = true;
  };

  var reset = function () {
    navigationContainer.removeClass("sticky");
    navigationIsSticky = false;
  };

  var update = function () {
    if (!navigationIsSticky) {
      if ($(window).scrollTop() > navigationTopPosition) {
        makeSticky();
      }
    } else {
      if ($(window).scrollTop() <= navigationTopPosition) {
        reset();
      }
    }
    updateNavigationContainerTopPosition();
  };

  $(document).ready(function () {
    init();
    $(window).scroll(update);
    $(window).resize(function () {
      updateNavigationContainerTopPosition();
    });
  });
};
