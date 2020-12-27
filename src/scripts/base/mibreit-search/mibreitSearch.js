var mibreitSearch = function () {
  $(document).ready(function () {
    if ($(".search__container input").length) {
      $(".search__container input").click(function () {
        $(".search__container .search__privacy-link").show();
      });
    }
  });
};
