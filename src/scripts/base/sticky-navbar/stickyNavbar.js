var stickyNavbar = (function () {
  var navigationTopPosition = undefined;
  var navigationIsSticky = false;

  var update = function () {
    if (!navigationIsSticky) {
      if ($(window).scrollTop() > navigationTopPosition) {
        $(".navigation").addClass("navigation__sticky");
        navigationIsSticky = true;
      }
    } else {
      if ($(window).scrollTop() <= navigationTopPosition) {
        $(".navigation").removeClass("navigation__sticky");
        navigationIsSticky = false;
        updateTopPosition();
      }
    }
  };

  var updateTopPosition = function () {
    navigationTopPosition = $(".navigation").position().top;
  };

  $(document).ready(function () {
    updateTopPosition();
  });

  return function () {
    window.onscroll = update;

    window.onresize = function () {
      if (!navigationIsSticky) {
        updateTopPosition();
      }
    };
  };
})();
