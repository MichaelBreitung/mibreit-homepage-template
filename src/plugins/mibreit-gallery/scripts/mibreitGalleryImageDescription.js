var mibreitGalleryImageDescription = function (gallery, container, descriptions) {
  if (descriptions.length == 0) {
    return;
  }
  var hoverTimer = -1;
  var hoverTimerTimeout = 1000;
  var imageDescriptionVisible = false;
  var fullscreenActive = gallery.getFullscreen().isFullscreenActive();
  var currentActiveImageDescription = -1;

  var showImageDescription = function (idx) {
    hideImageDescription();
    if (idx >= 0 && idx < descriptions.length) {
      descriptions[idx].style.setProperty('opacity', '1');
      currentActiveImageDescription = idx;
    }
  };

  var hideImageDescription = function () {
    if (currentActiveImageDescription != -1) {
      descriptions[currentActiveImageDescription].style.removeProperty('opacity');
      if (descriptions[currentActiveImageDescription].style.length === 0) {
        descriptions[currentActiveImageDescription].removeAttribute('style');
      }
      currentActiveImageDescription = -1;
    }
  };

  var stopHoverTimer = function () {
    if (hoverTimer != -1) {
      clearTimeout(hoverTimer);
      hoverTimer = -1;
    }
  };

  var imageChangedCallback = function (id) {
    if (imageDescriptionVisible && id !== currentActiveImageDescription) {
      hideImageDescription();
      if (!fullscreenActive) {
        showImageDescription(id);
      }
    }
  };

  var fullscreenChanged = function (active) {
    fullscreenActive = active;
    if (active) {
      hideImageDescription();
    }
  };

  container.addEventListener('mouseenter', function () {
    stopHoverTimer();
    if (!fullscreenActive) {
      hoverTimer = setTimeout(function () {
        imageDescriptionVisible = true;
        showImageDescription(gallery.getViewer().getImageIndex());
      }, hoverTimerTimeout);
    }
  });
  container.addEventListener('mouseleave', function () {
    stopHoverTimer();
    hideImageDescription();
    imageDescriptionVisible = false;
  });

  gallery.getViewer().addImageChangedCallback(imageChangedCallback);

  gallery.getFullscreen().addFullscreenChangedCallback(fullscreenChanged);
};
