var mibreitCookieConsentBar = function (config) {
  var cookieName = 'consentCookie';
  var pushConsentCookieToGtm = function (consentCookie) {
    if (window['dataLayer']) {
      window['dataLayer'].push(consentCookie);
      window['dataLayer'].push({ event: 'ConsentConfiguredEvent' });
    }
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
        pushConsentCookieToGtm(consentCookie);
        cookieConsentBar.remove();
      },
      config.german
    );
    var body = document.querySelector('body');
    body.append(cookieConsentBar);
  } else {
    pushConsentCookieToGtm(consentCookie);
  }
};
