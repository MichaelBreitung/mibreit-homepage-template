var mibreitCookieConsentBar = function (config) {
  var gaOptOutCookieName = "ga-opt-out";
  var cookieName = "consentCookie";

  var pushConsentCookieToGtm = function (consentCookie, gaOptOutCookie, firstVisit) {
    if (gaOptOutCookie) {
      gtag("set", { GA4_Opt_Out: gaOptOutCookie });
    } else if (typeof config.gaCookieName !== "undefined" && consentCookie[config.gaCookieName]) {
      gtag("consent", "update", { analytics_storage: "granted" });
    }
    gtag("set", consentCookie);
    gtag("set", { First_Visit: firstVisit });
    gtag("event", "ConsentConfiguredEvent");
  };

  var getOptOutCookie = function () {
    var documentCookies = document.cookie.split(";");
    for (var i = 0; i < documentCookies.length; i++) {
      var posEquals = documentCookies[i].indexOf("=");
      var name = documentCookies[i].substring(0, posEquals).replace(/^\s+|\s+$/g, "");
      var value = documentCookies[i].substring(posEquals + 1).replace(/^\s+|\s+$/g, "");
      if (name === gaOptOutCookieName) {
        return value === "true" ? true : false;
      }
    }
    return false;
  };

  var initCookieConsentBar = function () {
    var googleTagConfigured = typeof gtag === "function" ? true : false;
    var gaOptOutCookie = getOptOutCookie();
    var consentCookie = mibreitCookieConsent.getConsentCookie(cookieName);

    if (!consentCookie) {
      var cookieConsentBar = document.createElement("div");
      cookieConsentBar.setAttribute("id", "cookie-msg");

      var mainMessage = document.createElement("div");
      mainMessage.innerHTML = config.mainMessage;
      cookieConsentBar.appendChild(mainMessage);

      mibreitCookieConsent.createCookieConsent(
        cookieConsentBar,
        config.consentConfig,
        function (consentCookie) {
          if (googleTagConfigured) {
            pushConsentCookieToGtm(consentCookie, gaOptOutCookie, true);
          }
          cookieConsentDarkening.remove();
          cookieConsentBar.remove();
        },
        config.german
      );

      var cookieConsentDarkening = document.createElement("div");
      cookieConsentDarkening.setAttribute("id", "cookie-msg__background");

      var body = document.querySelector("body");
      body.append(cookieConsentBar);
      body.append(cookieConsentDarkening);
    } else {
      if (googleTagConfigured) {
        pushConsentCookieToGtm(consentCookie, gaOptOutCookie, false);
      }
    }
  };

  if (typeof googleTagManagerDefined === "undefined") {
    initCookieConsentBar();
  } else {
    window.addEventListener("gtm_loaded", initCookieConsentBar, { once: true });
  }
};
