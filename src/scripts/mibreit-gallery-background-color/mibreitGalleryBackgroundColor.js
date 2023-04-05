var mibreitGalleryBackgroundColor = function (gallery) {
  var fullscreen = gallery.getFullscreen();
  if (typeof FastAverageColor !== "undefined")
  {
    var viewer = gallery.getViewer();
    var fastAverageColor = new FastAverageColor();
    var fastAverageColorOptions = {algorithm: 'sqrt'};

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

    updateBackgroundColor(viewer.getImageElement(viewer.getImageIndex()));
  
    viewer.addImageChangedCallback(function(index, _imageInfo) {
      updateBackgroundColor(viewer.getImageElement(index));
    });
  }
  else{
    console.warn("no FastAverageColor installed");
    fullscreen.setBackgroundColor("#000000");
  }
} 
