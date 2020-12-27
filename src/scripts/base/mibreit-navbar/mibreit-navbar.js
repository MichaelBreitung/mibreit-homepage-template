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

    menuBtn = $(".navigation__container .menu-btn");
    navigationContainer = $(".navigation__container");
    navigationContainerNextSibling = navigationContainer.next();

    oldNextSiblingMarginTop = parseInt(navigationContainerNextSibling.css("margin-top"));
    updateNavigationContainerTopPosition();
  };

  var increaseNextSiblingMarginTop = function (additionalMargin) {
    navigationContainerNextSibling.css("margin-top", oldNextSiblingMarginTop + additionalMargin);
  };

  var updateNavigationContainerTopPosition = function () {
    if (typeof getStickyThresholdCallback !== "undefined") {
      navigationTopPosition = getStickyThresholdCallback();
    } else if (!navigationIsSticky) {
      navigationTopPosition = navigationContainer.position().top;
    }
  };

  var makeSticky = function () {
    increaseNextSiblingMarginTop(navigationContainer.height());
    navigationContainer.addClass("sticky");
    isSticky = true;
  };

  var makeUnSticky = function () {
    navigationContainer.removeClass("sticky");
    navigationContainerNextSibling.css("transition", "");
    navigationContainerNextSibling.css("margin-top", "");
    isSticky = false;
  };

  var updateStickyState = function () {
    if (!isSticky) {
      if ($(window).scrollTop() > navigationTopPosition) {
        makeSticky();
      }
    } else {
      if ($(window).scrollTop() <= navigationTopPosition) {
        makeUnSticky();
      }
    }
  };

  var makeClose = function () {
    menuBtn.removeClass("open");
    navigationContainer.removeClass("open");
    isOpen = false;

    if (isSticky) {
      navigationContainerNextSibling.css("transition", "all 0.5s ease-in-out");
      setTimeout(function () {
        increaseNextSiblingMarginTop(navigationContainer.height());
      }, 500);
    }
  };

  var makeOpen = function () {
    menuBtn.addClass("open");
    navigationContainer.addClass("open");
    isOpen = true;

    if (isSticky) {
      navigationContainerNextSibling.css("transition", "all 0.5s ease-in-out");
      setTimeout(function () {
        increaseNextSiblingMarginTop(navigationContainer.height());
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

  $(document).ready(function () {
    init();

    menuBtn.click(updateOpenState);
    $(window).scroll(updateStickyState);
    $(window).resize(updateNavigationContainerTopPosition);
  });
};
