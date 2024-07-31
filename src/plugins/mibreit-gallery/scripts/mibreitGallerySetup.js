var mibreitGallerySetup = function (gallery, containerSelector, thumbContainerSelector) {
  var container = document.querySelector(containerSelector);
  var figCaptions = document.querySelectorAll(containerSelector + " figcaption");

  mibreitGalleryImageDescription(gallery, container, figCaptions);
  mibreitGalleryHistory(gallery);
};

var mibreitGallerySetupWP = function (imageSelector) {
  mibreitGalleryTs.createFullscreenOnlyGallery(imageSelector, {
    scaleMode: mibreitGalleryTs.EImageScaleMode.FIT_ASPECT,
    loaderWindowLeft: 0,
    loaderWindowRight: 1,
  });
};
