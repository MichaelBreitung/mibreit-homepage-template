var mibreitImagePrints = function (imagePrints, gallery) {
  // init elements
  var printsDiv = $(".mibreit-prints");
  var limitedDiv = $(".mibreit-prints__options-limited");
  var redbubbleDiv = $(".mibreit-prints__options-redbubble");
  var customDiv = $(".mibreit-prints__options-custom");
  var limitedLink = $(".mibreit-prints__options-limited-link");
  var limitedLinkText = limitedLink.attr("href");
  var customLink = $(".mibreit-prints__options-custom-link");
  var customLinkText = customLink.attr("href");
  var licenseLink = $(".mibreit-prints__options-license-link");
  var licenseLinkText = licenseLink.attr("href");

  // init elements state
  printsDiv.hide();
  redbubbleDiv.hide();
  limitedDiv.hide();
  customDiv.hide();

  return function (id) {
    var printInfo = imagePrints[gallery.getCurrentImageUrl()];
    if (typeof printInfo !== "undefined" && printInfo.prints) {
      if (printInfo.limited) {
        limitedLink.attr(
          "href",
          limitedLinkText + "?subject=Limited - " + printInfo.name.replace(/ /g, "%20")
        );
        limitedDiv.show();
        redbubbleDiv.hide();
        customDiv.hide();
      } else {
        limitedDiv.hide();
        if (printInfo.redbubble) {
          $(".mibreit-prints__options-redbubble a").attr("href", printInfo.redbubble);
          redbubbleDiv.show();
        } else {
          redbubbleDiv.hide();
        }
        customLink.attr(
          "href",
          customLinkText + "?subject=Custom - " + printInfo.name.replace(/ /g, "%20")
        );
        licenseLink.attr(
          "href",
          licenseLinkText + "?subject=License - " + printInfo.name.replace(/ /g, "%20")
        );
        customDiv.show();
      }
      printsDiv.show();
    } else {
      printsDiv.hide();
    }
  };
};
