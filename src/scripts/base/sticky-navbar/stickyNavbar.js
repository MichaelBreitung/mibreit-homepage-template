var stickyNavbar = function () {
  var navigationTopPosition = undefined;
  var makeSmooth = false;
  var navigationIsSticky = false;
  var navigationContainer = undefined;
  var currentNavigationContainerHeight = undefined;
  var navigationContainerNextSibling = undefined;
  var oldNextSiblingMarginTop = undefined;

  var init = function () {
    makeSmooth = false;
    navigationIsSticky = false;
    navigationContainer = $(".navigation__container");
    currentNavigationContainerHeight = navigationContainer.height();
    navigationContainerNextSibling = navigationContainer.next();
    oldNextSiblingMarginTop = parseInt(navigationContainerNextSibling.css("margin-top"));
    updateNavigationContainerTopPosition();
  };

  var increaseNextSiblingMarginTop = function (additionalMargin) {
    navigationContainerNextSibling.css("margin-top", oldNextSiblingMarginTop + additionalMargin);
  };

  var updateNavigationContainerTopPosition = function () {
    navigationTopPosition =
      navigationContainer.prev().position().top +
      navigationContainer.prev().height() +
      parseInt(navigationContainer.css("margin-top"));
  };

  var makeSticky = function () {
    currentNavigationContainerHeight = navigationContainer.height();
    increaseNextSiblingMarginTop(currentNavigationContainerHeight);
    navigationContainer.addClass("sticky");
    navigationIsSticky = true;
    makeSmooth = true;
  };

  var reset = function () {
    navigationContainer.removeClass("sticky");
    navigationContainerNextSibling.css("transition", "");
    navigationContainerNextSibling.css("margin-top", "");
    navigationIsSticky = false;
    makeSmooth = false;
  };

  var update = function () {
    if (makeSmooth) {
      navigationContainerNextSibling.css("transition", "all 0.5s ease-in-out");
      makeSmooth = false;
    }
    if (!navigationIsSticky) {
      if ($(window).scrollTop() > navigationTopPosition) {
        makeSticky();
      }
    } else {
      var navigationContainerHeight = navigationContainer.height();
      if (navigationContainerHeight !== currentNavigationContainerHeight) {
        currentNavigationContainerHeight = navigationContainerHeight;
        increaseNextSiblingMarginTop(currentNavigationContainerHeight);
      }
      if ($(window).scrollTop() <= navigationTopPosition) {
        reset();
      }
    }
  };

  $(document).ready(function () {
    init();
    $(window).scroll(update);
    $(window).resize(function () {
      updateNavigationContainerTopPosition();
    });
  });
};
