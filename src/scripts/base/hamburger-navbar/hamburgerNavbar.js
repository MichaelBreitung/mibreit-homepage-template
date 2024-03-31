var hamburgerNavbar = function (containerClassOverride) {
  var containerClass = ".navigation__container";
  if (containerClassOverride) {
    containerClass = containerClassOverride;
  }
  var navigationContainer = document.querySelector(containerClass);
  var menuBtn = document.querySelector(containerClass + " .menu-btn");
  var isOpen = false;

  var update = function () {
    if (isOpen) {
      isOpen = false;
      navigationContainer.classList.remove("open");
      menuBtn.classList.remove("open");
    } else {
      isOpen = true;
      navigationContainer.classList.add("open");
      menuBtn.classList.add("open");
    }
  };

  menuBtn.addEventListener("click", update);
};
