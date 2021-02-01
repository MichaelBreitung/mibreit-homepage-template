var mibreitSearch = function () {  
  window.addEventListener('load', function () {       
    if (document.querySelector(".search__container input")) {      
      document.querySelector(".search__container input").addEventListener('click', function () {                   
        document.querySelector(".search__container .search__privacy-link").style.setProperty("display", "unset");
      });
    }
  });
};
