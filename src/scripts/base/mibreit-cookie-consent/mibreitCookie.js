var mibreitCookieConsentBar = function (config) {
  var cookieName = 'consentCookie';
  var googleTagConfigured = typeof gtag === 'function' ? true : false;

  var pushConsentCookieToGtm = function (consentCookie, firstVisit) {
    if (typeof config.gaCookieName !== 'undefined' && consentCookie[config.gaCookieName]) {
      gtag('consent', 'update', { analytics_storage: 'granted' });
    }
    gtag('set', consentCookie);
    gtag('set', { First_Visit: firstVisit });
    gtag('event', 'ConsentConfiguredEvent');
  };

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
          pushConsentCookieToGtm(consentCookie, true);
        }
        cookieConsentBar.remove();
      },
      config.german
    );
    var body = document.querySelector('body');
    body.append(cookieConsentBar);
  } else {
    pushConsentCookieToGtm(consentCookie, false);
  }
};
