var mibreitCookieConsentBar = function (config) {
  var cookieName = 'consentCookie';
  var fireGTMEvent = function (eventName) {
    if (window['dataLayer']) {
      window['dataLayer'].push({ event: eventName });
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
        window['dataLayer'].push(consentCookie);
        fireGTMEvent('ConsentConfiguredEvent');
        cookieConsentBar.remove();
      },
      config.german
    );

    var body = document.querySelector('body');
    body.append(cookieConsentBar);
  } else {
    window['dataLayer'].push(consentCookie);
    fireGTMEvent('ConsentConfiguredEvent');
  }
};
