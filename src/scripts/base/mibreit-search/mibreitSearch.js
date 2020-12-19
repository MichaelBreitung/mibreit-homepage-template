var mibreitSearch = function () {
  $(document).ready(function () {
    if ($(".search input").length) {
      $(".search input").click(function () {
        $(".search .search__privacy-link").show();
      });
    }
  });
};
