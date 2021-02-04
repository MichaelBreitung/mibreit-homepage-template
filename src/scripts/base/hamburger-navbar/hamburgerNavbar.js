var hamburgerNavbar = function () {
  var navigationContainer = document.querySelector('.navigation__container');
  var menuBtn = document.querySelector('.navigation__container .menu-btn');  
  var isOpen = false;  

  var update = function() {
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
  
  menuBtn.addEventListener('click', update);
};
