var mibreitGalleryBackgroundColor = function (gallery) {
  var fullscreen = gallery.getFullscreen();
  var viewer = gallery.getViewer();
  if (fullscreen && viewer) {
    if (typeof FastAverageColor !== 'undefined') {
      var fastAverageColor = new FastAverageColor();
      var fastAverageColorOptions = { algorithm: 'sqrt' };

      var updateBackgroundColor = function (imageElement) {
        if (imageElement) {
          try {
            var color = fastAverageColor.getColor(imageElement, fastAverageColorOptions);
            fullscreen.setBackgroundColor(color.rgba);
          } catch (e) {
            console.warn('FastAverageColor Exception: ' + e);
          }
        }
      };

      viewer.addImageChangedCallback(function (index, _imageInfo) {
        updateBackgroundColor(viewer.getImageElement(index));
      });
    } else {
      console.warn('no FastAverageColor installed');
      fullscreen.setBackgroundColor('#000000');
    }
  }
};
