var mibreitGalleryHistory = function (gallery) {
  var currentImageId = 0;

  var getImageElementFromSchema = function (schemaMarkup) {
    return schemaMarkup.associatedMedia[currentImageId];
  };

  var updateOgParameters = function (imageUrl) {
    document.querySelector("meta[property='og\\:url']").setAttribute('content', window.location.href);
    document.querySelector("meta[property='og\\:image']").setAttribute('content', imageUrl);

    // updating the image size, requires the gallery schema markup.
    // If not present, metadata will be removed to avoid incorrect markup
    var galleryMarkup = null;
    var galleryMarkupJSONElements = document.querySelectorAll("script[type='application/ld+json']");
    for (var i = 0; i < galleryMarkupJSONElements.length; ++i) {
      if (galleryMarkupJSONElements[i].innerHTML.search('"@type": "ImageGallery"') != -1) {
        try {
          galleryMarkup = JSON.parse(galleryMarkupJSONElements[i].innerHTML);
        } catch (e) {/** error not relevant for user of homepage - will still work */}
      }
    }

    var ogImageWidthElement = document.querySelector("meta[property='og\\:image\\:width']");
    if (ogImageWidthElement) {
      if (galleryMarkup) {
        ogImageWidthElement.setAttribute('content', getImageElementFromSchema(galleryMarkup).width);
      } else {
        ogImageWidthElement.remove();
      }
    }

    var ogImageHeightElement = document.querySelector("meta[property='og\\:image\\:height']");
    if (ogImageHeightElement) {
      if (galleryMarkup) {
        ogImageHeightElement.setAttribute('content', getImageElementFromSchema(galleryMarkup).height);
      } else {
        ogImageHeightElement.remove();
      }
    }
  };

  var updateShareLinks = function (imageUrl) {
    var href = window.location.href;
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

  var udpateSeo = function () {
    var imageUrl =
      window.location.href.substr(0, window.location.href.lastIndexOf('/') + 1) +
      gallery.getViewer().getImageInfo(gallery.getViewer().getImageIndex()).getUrl();

    updateOgParameters(imageUrl);

    // update twitter cards
    document.querySelector("meta[name='twitter\\:image']").setAttribute('content', imageUrl);

    updateShareLinks(imageUrl);
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
