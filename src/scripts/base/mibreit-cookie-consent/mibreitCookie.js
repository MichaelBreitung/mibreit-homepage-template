var mibreitCookieConsent = function (config) {
  var fireGTMEvent = function (eventName) {
    if (window['dataLayer']) {
      window['dataLayer'].push({ event: eventName });
    }
  };

  var setConsentCookie = function (cookieName, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + '; samesite=Lax' + (exdays == null ? '' : '; expires=' + exdate.toUTCString());
    document.cookie = cookieName + '=' + cookieValue;
  };

  var getConsentCookieValue = function (cookieName) {
    var documentCookies = document.cookie.split(';');
    for (var i = 0; i < documentCookies.length; i++) {
      var documentCookieName = documentCookies[i].substr(0, documentCookies[i].indexOf('='));
      var documentCookieValue = documentCookies[i].substr(documentCookies[i].indexOf('=') + 1);
      documentCookieName = documentCookieName.replace(/^\s+|\s+$/g, '');
      if (documentCookieName == cookieName) {
        return unescape(documentCookieValue);
      }
    }
  };

  var giveConsent = function () {
    setConsentCookie(config.cookieName, true, config.expirationDays);
    fireGTMEvent('ConsentGivenEvent');
  };

  var setupGaOptOut = function () {
    document.querySelector('#cookie-msg ' + config.gaOptOutId).addEventListener('click', function (event) {
      event.preventDefault();
      fireGTMEvent('GaOptOutEvent');
    });
  };

  var setupCookieConsent = function () {
    document.querySelector('#cookie-msg .mibreit-cookie-accept').addEventListener('click', function (event) {
      event.preventDefault();
      giveConsent();
      cookieConsentBar.remove();
      cookieConsentDarkening.remove();
    });
  };

  var cookieValue = getConsentCookieValue(config.cookieName);
  if (cookieValue !== 'true') {
    var html =
      '<div>' +
      config.mainMessage +
      '</div><div class="mibreit-cookie-accept"><a href="#">' +
      config.acceptButton +
      '</a></div>';
    var cookieConsentBar = document.createElement('div');
    cookieConsentBar.setAttribute('id', 'cookie-msg');
    cookieConsentBar.innerHTML = html;
    var cookieConsentDarkening = document.createElement('div');
    cookieConsentDarkening.setAttribute('id', 'cookie-msg__background');
    var body = document.querySelector('body');
    body.append(cookieConsentDarkening);
    body.append(cookieConsentBar);

    if (typeof config.gaOptOutId === 'string') {
      setupGaOptOut();
    }

    setupCookieConsent();
  }
};
