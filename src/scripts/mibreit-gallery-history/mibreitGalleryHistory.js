var mibreitGalleryHistory = function (gallery) {
  var currentImageId;

  var udpateSeo = function () {    
    var href = window.location.href;
    var imageUrl =
      window.location.href.substr(0, href.lastIndexOf('/') + 1) +
      gallery.getViewer().getImageInfo(gallery.getViewer().getImageIndex()).getUrl();
    // update og
    document.querySelector("meta[property='og\\:url']").setAttribute('content', window.location.href);
    document.querySelector("meta[property='og\\:image']").setAttribute('content', imageUrl);

    // update twitter cards
    document.querySelector("meta[name='twitter\\:image']").setAttribute('content', imageUrl);

    // share links
    var socialShareLinks = document.querySelectorAll('.social-media__share-link');
    for (var i = 0; i < socialShareLinks.length; i++) {
      var link = socialShareLinks[i];      
      var url = new URL(link.getAttribute('href'));
      if (url.href.includes('facebook')) {
        url.searchParams.set('u', href);
      } else if (url.href.includes('twitter')) {
        url.searchParams.set('url', href);
      } else if (url.href.includes('pinterest')) {
        url.searchParams.set('url', href);
        url.searchParams.set('media', imageUrl);
      }
      link.setAttribute('href', url.href);
    }
  };

  var updateImageBasedOnURLParams = function () {
    var providedImageId = new URLSearchParams(window.location.search).get('imageNr');    
    if (providedImageId) {
      currentImageId = parseInt(providedImageId);      
      gallery.getViewer().showImage(currentImageId);
      gallery.getLoader().setCurrentIndex(currentImageId);
    }
  };

  var imageChangedCallback = function (id) {    
    if (id !== currentImageId) {
      var url = new URL(window.location);
      url.searchParams.set('imageNr', id);
      window.history.pushState('image number ' + id, 'image number ' + id, url.pathname + url.search);
      currentImageId = id;
    }
    udpateSeo();
  };

  gallery.getViewer().addImageChangedCallback(imageChangedCallback);

  window.onpopstate = function (event) {
    updateImageBasedOnURLParams();
  };
  updateImageBasedOnURLParams();
};
