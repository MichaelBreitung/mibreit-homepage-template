var stickyNavbar = function () {
  var navigationTopPosition = undefined;
  var navigationIsSticky = false;

  var update = function () {
    if (!navigationIsSticky) {
      if ($(window).scrollTop() > navigationTopPosition) {
        $(".navigation").before('<div class="navigation__place-holder"></div>');
        $(".navigation").addClass("navigation__sticky");
        navigationIsSticky = true;
      }
    } else {
      if ($(window).scrollTop() <= navigationTopPosition) {
        $(".navigation__place-holder").remove();
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

  $(window).scroll(update);

  $(window).resize(function () {
    if (!navigationIsSticky) {
      updateTopPosition();
    }
  });
};
