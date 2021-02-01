var mibreitImagePrints = function (imagePrints, gallery) {
  // init elements
  var printsDiv = document.querySelector(".mibreit-prints");
  var limitedDiv = document.querySelector(".mibreit-prints__options-limited");
  var redbubbleDiv = document.querySelector(".mibreit-prints__options-redbubble");
  var customDiv = document.querySelector(".mibreit-prints__options-custom");
  var limitedLink = document.querySelector(".mibreit-prints__options-limited-link");
  var limitedLinkText = limitedLink.getAttribute("href");
  var customLink = document.querySelector(".mibreit-prints__options-custom-link");
  var customLinkText = customLink.getAttribute("href");
  var licenseLink = document.querySelector(".mibreit-prints__options-license-link");
  var licenseLinkText = licenseLink.getAttribute("href");

  function hideElement(element)
  {
    element.style.setProperty("display", "none");
  }

  function showElement(element)
  {
    element.style.removeProperty("display");     
  }

  // init elements state
  hideElement(printsDiv);
  hideElement(redbubbleDiv);
  hideElement(limitedDiv);
  hideElement(customDiv);

  return function (id) {
    var printInfo = imagePrints[gallery.getImageInfo(gallery.getImageIndex()).getUrl()];
    if (typeof printInfo !== "undefined" && printInfo.prints) {
      if (printInfo.limited) {
        limitedLink.setAttribute(
          "href",
          limitedLinkText + "?subject=Limited - " + printInfo.name.replace(/ /g, "%20")
        );
        showElement(limitedDiv);
        hideElement(redbubbleDiv);
        hideElement(customDiv);
      } else {
        hideElement(limitedDiv);
        if (printInfo.redbubble) {
          document.querySelector(".mibreit-prints__options-redbubble a").setAttribute("href", printInfo.redbubble);
          showElement(redbubbleDiv);
        } else {
          hideElement(redbubbleDiv);
        }
        customLink.setAttribute(
          "href",
          customLinkText + "?subject=Custom - " + printInfo.name.replace(/ /g, "%20")
        );
        licenseLink.setAttribute(
          "href",
          licenseLinkText + "?subject=License - " + printInfo.name.replace(/ /g, "%20")
        );
        showElement(customDiv);
      }
      showElement(printsDiv);
    } else {
      hideElement(printsDiv);
    }
  };
};
