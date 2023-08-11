var mibreitGalleryCaption = function (gallery, container, captions) {
  if (captions.length == 0) {
    return;
  }
  var hoverTimer = -1;
  var hoverTimerTimeout = 1000;
  var captionVisible = false;
  var fullscreenActive = gallery.getFullscreen().isFullscreenActive();
  var currentActiveCaption = -1;

  var showCaption = function (idx) {
    hideCaption();
    if (idx >= 0 && idx < captions.length) {
      captions[idx].style.setProperty('opacity', '1');
      currentActiveCaption = idx;
    }
  };

  var hideCaption = function () {
    if (currentActiveCaption != -1) {
      captions[currentActiveCaption].style.removeProperty('opacity');
      if (captions[currentActiveCaption].style.length === 0) {
        captions[currentActiveCaption].removeAttribute('style');
      }
      currentActiveCaption = -1;
    }
  };

  var stopHoverTimer = function () {
    if (hoverTimer != -1) {
      clearTimeout(hoverTimer);
      hoverTimer = -1;
    }
  };

  var imageChangedCallback = function (id) {
    if (captionVisible && id !== currentActiveCaption) {
      hideCaption();
      if (!fullscreenActive) {
        showCaption(id);
      }
    }
  };

  var fullscreenChanged = function (active) {
    fullscreenActive = active;
    if (active) {
      hideCaption();
    }
  };

  container.addEventListener('mouseenter', function () {
    stopHoverTimer();
    if (!fullscreenActive) {
      hoverTimer = setTimeout(function () {
        captionVisible = true;
        showCaption(gallery.getViewer().getImageIndex());
      }, hoverTimerTimeout);
    }
  });
  container.addEventListener('mouseleave', function () {
    stopHoverTimer();
    hideCaption();
    captionVisible = false;
  });

  gallery.getViewer().addImageChangedCallback(imageChangedCallback);

  gallery.getFullscreen().addFullscreenChangedCallback(fullscreenChanged);
};
