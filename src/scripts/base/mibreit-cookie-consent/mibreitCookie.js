var mibreitCookieConsentBar = function (config) {
  var cookieName = 'consentCookie';
  var gaOptOutCookieName = 'ga-opt-out';
  var googleTagConfigured = typeof gtag === 'function' ? true : false;

  var pushConsentCookieToGtm = function (consentCookie, gaOptOutCookie, firstVisit) {
    if (gaOptOutCookie) {
      gtag('set', { GA4_Opt_Out: gaOptOutCookie });
    } else if (typeof config.gaCookieName !== 'undefined' && consentCookie[config.gaCookieName]) {
      gtag('consent', 'update', { analytics_storage: 'granted' });
    }
    gtag('set', consentCookie);
    gtag('set', { First_Visit: firstVisit });
    gtag('event', 'ConsentConfiguredEvent');
  };

  var getOptOutCookie = function () {
    const documentCookies = document.cookie.split(';');
    for (const cookie of documentCookies) {
      const posEquals = cookie.indexOf('=');
      const name = cookie.substring(0, posEquals).replace(/^\s+|\s+$/g, '');
      const value = cookie.substring(posEquals + 1).replace(/^\s+|\s+$/g, '');
      if (name === gaOptOutCookieName) {
        return value === 'true' ? true : false;
      }
    }
    return false;
  };

  var gaOptOutCookie = getOptOutCookie();
  var consentCookie = mibreitCookieConsent.getConsentCookie(cookieName);

  if (!consentCookie) {
    var cookieConsentBar = document.createElement('div');
    cookieConsentBar.setAttribute('id', 'cookie-msg');

    var mainMessage = document.createElement('div');
    mainMessage.innerHTML = config.mainMessage;
    cookieConsentBar.appendChild(mainMessage);

    mibreitCookieConsent.createCookieConsent(
      cookieConsentBar,
      config.consentConfig,
      function (consentCookie) {
        if (googleTagConfigured) {
          pushConsentCookieToGtm(consentCookie, gaOptOutCookie, true);
        }
        cookieConsentBar.remove();
      },
      config.german
    );
    var body = document.querySelector('body');
    body.append(cookieConsentBar);
  } else {
    pushConsentCookieToGtm(consentCookie, gaOptOutCookie, false);
  }
};
