var hamburgerNavbar = function () {
  var isOpen = false;
  var menuBtn = undefined;
  var navigationContainer = undefined;

  var update = function () {
    if (isOpen) {
      isOpen = false;
      navigationContainer.removeClass("open");
      menuBtn.removeClass("open");
    } else {
      isOpen = true;
      navigationContainer.addClass("open");
      menuBtn.addClass("open");
    }
  };

  $(document).ready(function () {
    menuBtn = $(".navigation__container .menu-btn");
    navigationContainer = $(".navigation__container");

    menuBtn.click(update);
  });
};
