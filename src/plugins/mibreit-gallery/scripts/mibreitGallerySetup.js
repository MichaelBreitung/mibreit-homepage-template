var mibreitGallerySetup = function (containerSelector, thumbContainerSelector, titleSelector) {
  var container = document.querySelector(containerSelector);
  var thumbContainer = document.querySelector(thumbContainerSelector);
  var titleElement = document.querySelector(titleSelector);
  var figCaptions = document.querySelectorAll(containerSelector + " figcaption");

  // reveal gallery
  container.style.setProperty("opacity", "1");
  thumbContainer.style.setProperty("opacity", "1");

  var gallery = mibreitGalleryTs.createGallery(containerSelector, containerSelector + " img", {
    scaleMode: mibreitGalleryTs.EImageScaleMode.FIT_ASPECT,
    thumbContainerSelector,
    thumbSelector: thumbContainerSelector + " > img",
    numberOfVisibleThumbs: 6,
    preloaderBeforeSize: 1,
    preloaderAfterSize: 2,
  });

  if (titleElement) {
    var viewer = gallery.getImageViewer();
    var imageInfo = viewer.getImageInfo();
    if (imageInfo) {
      titleElement.innerHTML = imageInfo.getTitle();
    }
    viewer.addImageChangedCallback((index, imageInfo) => {
      titleElement.innerHTML = imageInfo.getTitle();
    });
  }

  mibreitGalleryImageDescription(gallery, container, figCaptions);
  mibreitGalleryHistory(gallery);
  mibreitGalleryBackgroundColor(gallery);

  return gallery;
};

var mibreitGallerySetupSimple = function (containerSelector, history = true) {
  var container = document.querySelector(containerSelector);
  container.style.setProperty("opacity", "1");
  var gallery = mibreitGalleryTs.createGallery(containerSelector, containerSelector + " img", {
    scaleMode: mibreitGalleryTs.EImageScaleMode.FIT_ASPECT,
    numberOfVisibleThumbs: 6,
    preloaderBeforeSize: 1,
    preloaderAfterSize: 2,
  });
  if (history) {
    mibreitGalleryHistory(gallery);
  }
  mibreitGalleryBackgroundColor(gallery);
};

var mibreitGallerySetupWoo = function (containerSelector, thumbContainerSelector) {
  var container = document.querySelector(containerSelector);
  var thumbContainer = document.querySelector(thumbContainerSelector);

  // reveal gallery
  container.style.setProperty("opacity", "1");
  thumbContainer.style.setProperty("opacity", "1");

  var gallery = mibreitGalleryTs.createGallery(containerSelector, containerSelector + " img", {
    scaleMode: mibreitGalleryTs.EImageScaleMode.FIT_ASPECT,
    thumbContainerSelector,
    thumbSelector: thumbContainerSelector + " > img",
    numberOfVisibleThumbs: 4,
    preloaderBeforeSize: 1,
    preloaderAfterSize: 2,
  });

  mibreitGalleryBackgroundColor(gallery);

  return gallery;
};

var mibreitGallerySetupWP = function (imageSelector) {
  var images = document.querySelectorAll(imageSelector);
  var gallery = mibreitGalleryTs.createFullscreenOnlyGallery(imageSelector, {
    scaleMode: mibreitGalleryTs.EImageScaleMode.FIT_ASPECT,
    preloaderBeforeSize: 0,
    preloaderAfterSize: 1,
  });

  images.forEach(function (image, index) {
    image.style.setProperty("cursor", "pointer");
    image.addEventListener("click", function (e) {
      if (!gallery.getFullscreen().isActive()) {
        gallery.getImageViewer().showImage(index);
        gallery.getFullscreen().activate();
      }
    });
  });

  mibreitGalleryBackgroundColor(gallery);
};

var mibreitSlideshowSetup = function (containerSelector, scaleMode, zoom) {
  var container = document.querySelector(containerSelector);
  container.style.setProperty("opacity", "1");
  mibreitGalleryTs.createSlideshow(containerSelector + " img", { scaleMode, interval: 4000, zoom });
};
