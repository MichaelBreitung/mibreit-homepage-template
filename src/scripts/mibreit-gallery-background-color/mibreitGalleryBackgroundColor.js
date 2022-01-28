var mibreitGalleryBackgroundColor = function (gallery) {
  // check if fastAverageColor is installed
  if (typeof FastAverageColor !== "undefined")
  {
    var fullscreen = gallery.getFullscreen();
    var viewer = gallery.getViewer();
    var fastAverageColor = new FastAverageColor();
    var fastAverageColorOptions = {algorithm: 'sqrt'};
  
    viewer.addImageChangedCallback(function(index, _imageInfo) {
      var imageElement = viewer.getImageElement(index);
      var color = fastAverageColor.getColor(imageElement, fastAverageColorOptions);
      fullscreen.setBackgroundColor(color.rgba);
    });
  }
  else{
    console.warn("no FastAverageColor installed");
  }
 
} 
