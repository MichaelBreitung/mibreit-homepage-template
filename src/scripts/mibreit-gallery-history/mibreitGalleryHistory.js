var mibreitGalleryHistory = function (gallery) {
  var currentImageId;

  var udpateSeo = function () {
    var imageUrl =
      window.location.href.substr(0, window.location.href.lastIndexOf("/") + 1) +
      gallery.getCurrentImageUrl();
    // update og
    $("meta[property='og\\:url']").attr("content", window.location.href);
    $("meta[property='og\\:image']").attr("content", imageUrl);

    // update twitter cards
    $("meta[name='twitter\\:image']").attr("content", imageUrl);

    // share links
    $(".social-media__share-link").each(function (index) {
      var url = new URL($(this).attr("href"));
      if (url.href.includes("facebook")) {
        url.searchParams.set("u", window.location.href);
      } else if (url.href.includes("twitter")) {
        url.searchParams.set("url", window.location.href);
      } else if (url.href.includes("pinterest")) {
        url.searchParams.set("url", window.location.href);
        url.searchParams.set("media", imageUrl);
      }

      $(this).attr("href", url.href);
    });
  };

  var updateImageBasedOnURLParams = function () {
    var providedImageId = new URLSearchParams(window.location.search).get("imageNr");
    if (providedImageId) {
      currentImageId = parseInt(providedImageId);
      gallery.showImage(currentImageId);
    }
  };

  var imageChangedCallback = function (id) {
    if (id !== currentImageId) {
      var url = new URL(window.location);
      url.searchParams.set("imageNr", id);
      window.history.pushState(
        "image number " + id,
        "image number " + id,
        url.pathname + url.search
      );
      currentImageId = id;
    }

    udpateSeo();
  };

  gallery.addImageChangedCallback(imageChangedCallback);

  window.onpopstate = function (event) {
    updateImageBasedOnURLParams();
  };

  updateImageBasedOnURLParams();
};
