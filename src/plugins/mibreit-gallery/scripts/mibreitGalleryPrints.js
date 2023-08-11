var mibreitGalleryPrints = function (imagePrints, gallery, index) {
  var printsDiv = document.querySelector('.mibreit-prints');

  var limitedDiv = document.querySelector('.mibreit-prints__options-limited');
  var limitedLink = document.querySelector('.mibreit-prints__options-limited-link');
  var limitedLinkText = limitedLink.getAttribute('href');

  var woocommerceDiv = document.querySelector('.mibreit-prints__options-woocommerce');
  var woocommerceLink = document.querySelector('.mibreit-prints__options-woocommerce a');

  var customDiv = document.querySelector('.mibreit-prints__options-custom');
  var customLink = document.querySelector('.mibreit-prints__options-custom-link');
  var customLinkText = customLink.getAttribute('href');

  var licenseLink = document.querySelector('.mibreit-prints__options-license-link');
  var licenseLinkText = licenseLink.getAttribute('href');

  var hideElement = function (element) {
    if (element) {
      element.style.setProperty('display', 'none');
    }
  };

  var showElement = function (element) {
    if (element) {
      element.style.removeProperty('display');
    }
  };

  var transitionHeight = function (element) {
    if (element) {
      element.style.transition = 'none';
      var oldHeight = element.style.height;
      element.style.height = 'auto';
      var newHeight = element.scrollHeight;
      element.style.height = oldHeight;
      requestAnimationFrame(function () {
        element.style.transition = '';
        requestAnimationFrame(function () {
          element.style.height = newHeight + 'px';
        });
      });
    }
  };

  // init elements state
  hideElement(woocommerceDiv);
  hideElement(limitedDiv);
  hideElement(customDiv);

  var updatePrintInfo = function (id) {
    var imageInfo = gallery.getImageInfo(gallery.getImageIndex());
    var printInfo;
    if (imageInfo) {
      printInfo = imagePrints[imageInfo.getUrl()];
    }
    if (typeof printInfo !== 'undefined' && printInfo.prints) {
      if (printInfo.limited) {
        limitedLink.setAttribute('href', limitedLinkText + '?subject=Limited - ' + printInfo.name.replace(/ /g, '%20'));
        showElement(limitedDiv);
        hideElement(woocommerceDiv);
        hideElement(customDiv);
      } else {
        hideElement(limitedDiv);
        if (printInfo.woocommerce) {
          woocommerceLink.setAttribute('href', printInfo.woocommerce);
          showElement(woocommerceDiv);
        } else {
          hideElement(woocommerceDiv);
        }
        customLink.setAttribute('href', customLinkText + '?subject=Custom - ' + printInfo.name.replace(/ /g, '%20'));
        licenseLink.setAttribute('href', licenseLinkText + '?subject=License - ' + printInfo.name.replace(/ /g, '%20'));
        showElement(customDiv);
      }
      showElement(printsDiv);
      transitionHeight(printsDiv);
    }
  };

  updatePrintInfo(index);

  return updatePrintInfo;
};
