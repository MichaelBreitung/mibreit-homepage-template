var mibreitGalleryBackgroundColor = function (gallery) {
  var updateBackgroundColor = function(imageElement)
  {
    try{
      var color = fastAverageColor.getColor(imageElement, fastAverageColorOptions);
      fullscreen.setBackgroundColor(color.rgba);
    }
    catch (e)
    {
      console.warn("FastAverageColor Exception: "+e);
    }
  }

  // check if fastAverageColor is installed
  if (typeof FastAverageColor !== "undefined")
  {
    var fullscreen = gallery.getFullscreen();
    var viewer = gallery.getViewer();
    var fastAverageColor = new FastAverageColor();
    var fastAverageColorOptions = {algorithm: 'sqrt'};

    updateBackgroundColor(viewer.getImageElement(viewer.getImageIndex()));
  
    viewer.addImageChangedCallback(function(index, _imageInfo) {
      updateBackgroundColor(viewer.getImageElement(index));
    });
  }
  else{
    console.warn("no FastAverageColor installed");
  }
 
} 
