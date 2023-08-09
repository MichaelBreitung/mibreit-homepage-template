var mibreitGallerySetup = function (containerSelector, thumbContainerSelector, titleSelector) {
  var container = document.querySelector(containerSelector);
  var thumbContainer = document.querySelector(thumbContainerSelector);
  var titleElement = document.querySelector(titleSelector);
  var figCaptions = document.querySelectorAll(containerSelector + ' figcaption');

  // reveal gallery
  container.style.setProperty('opacity', '1');
  thumbContainer.style.setProperty('opacity', '1');

  var gallery = mibreitGalleryTs.createGallery(containerSelector, containerSelector + ' img', {
    scaleMode: mibreitGalleryTs.EImageScaleMode.FIT_ASPECT,
    thumbContainerSelector,
    thumbSelector: thumbContainerSelector + ' > img',
    numberOfVisibleThumbs: 7,
    preloaderBeforeSize: 1,
    preloaderAfterSize: 5,
  });

  var viewer = gallery.getViewer();
  var imageInfo = viewer.getImageInfo();
  if (imageInfo) {
    titleElement.innerHtml = imageInfo.getTitle();
  }
  viewer.addImageChangedCallback((index, imageInfo) => {
    titleElement.innerHtml = imageInfo.getTitle();
  });

  mibreitGalleryCaption(gallery, container, figCaptions);
  mibreitGalleryHistory(gallery);
  mibreitGalleryBackgroundColor(gallery);

  return gallery;
};

var mibreitGallerySetupSimple = function (containerSelector) {
  var container = document.querySelector(containerSelector);
  container.style.setProperty('opacity', '1');
  var gallery = mibreitGalleryTs.createGallery(containerSelector, containerSelector + ' img', {
    scaleMode: mibreitGalleryTs.EImageScaleMode.FIT_ASPECT,
    numberOfVisibleThumbs: 7,
    preloaderBeforeSize: 1,
    preloaderAfterSize: 7,
  });
  mibreitGalleryHistory(gallery);
  mibreitGalleryBackgroundColor(gallery);
};

var mibreitGallerySetupWP = function (imageSelector) {
  var images = document.querySelectorAll(imageSelector);
  var gallery = mibreitGalleryTs.createFullscreenOnlyGallery(imageSelector, {
    scaleMode: mibreitGalleryTs.EImageScaleMode.FIT_ASPECT,
    preloaderBeforeSize: 0,
    preloaderAfterSize: 1,
  });

  images.forEach(function (image, index) {
    image.style.setProperty('cursor', 'pointer');
    image.addEventListener('click', function (e) {
      if (!gallery.getFullscreen().isFullscreenActive()) {
        gallery.getViewer().showImage(index);
        gallery.getFullscreen().activate();
      }
    });
  });

  mibreitGalleryBackgroundColor(gallery);
};

var mibreitSlideshowSetup = function (containerSelector, scaleMode, zoom) {
  var container = document.querySelector(containerSelector);
  container.style.setProperty('opacity', '1');
  mibreitGalleryTs.createSlideshow(containerSelector + ' img', { scaleMode, interval: 4000, zoom });
};
