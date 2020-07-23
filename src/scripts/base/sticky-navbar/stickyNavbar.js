var stickyNavbar = function () {
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
    navigationTopPosition =
      navigationContainer.position().top + parseInt(navigationContainer.css("margin-top"));
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
  };

  $(document).ready(function () {
    init();
    $(window).scroll(update);
    $(window).resize(function () {
      updateNavigationContainerTopPosition();
    });
  });
};
