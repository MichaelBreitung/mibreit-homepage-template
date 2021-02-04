var mibreitCookieConsent = function (config) {
  var setCookie = function(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + (exdays == null ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
  }

  var getCookie = function(c_name) {
    var i,
      x,
      y,
      ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
      x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
      y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
      x = x.replace(/^\s+|\s+$/g, "");
      if (x == c_name) {
        return unescape(y);
      }
    }
  }

  var cookieMessageGenerate = function() {
    var html =
      '<small class="msg">' +
      config.mainMessage +
      '</small><div class="mibreit-cookie-accept"><a href="">' +
      config.acceptButton +
      "</a></div></div>";
    var cookieConsentBar = document.createElement("div");
    cookieConsentBar.setAttribute("id", "cookie-msg");
    cookieConsentBar.innerHTML = html;
    var body = document.querySelector("body");
    body.append(cookieConsentBar);
    document
      .querySelector("#cookie-msg .mibreit-cookie-accept")
      .addEventListener("click", function () {
        setCookie(config.cookieName, true, config.expirationDays);
        body.removeChild("#cookie-msg");
      });
  }
  
  var cookie = getCookie(config.cookieName);
  if (cookie !== "true") {
    cookieMessageGenerate();
  }  
};
