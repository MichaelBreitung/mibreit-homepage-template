var hamburgerNavbar = function () {
  var isOpen = false;
  var menuBtn = undefined;
  var navigationContainer = undefined;
  
  var update = function () {
    if (isOpen) {
      isOpen = false;
      navigationContainer.classList.remove('open');
      menuBtn.classList.remove("open");      
    } else {
      isOpen = true;
      navigationContainer.classList.add('open');
      menuBtn.classList.add('open');
    }
  };

  window.addEventListener('load', function () {
    menuBtn = document.querySelector('.navigation__container .menu-btn');
    navigationContainer = document.querySelector('.navigation__container');
    menuBtn.addEventListener('click', update);
  });
};
