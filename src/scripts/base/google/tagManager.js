{% if google_analytics | length -%}
window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}

function initTagManager(w, d, s, l, i) {
  w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != "dataLayer" ? "&l=" + l : "";
  j.async = true;
  j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;

  j.addEventListener("load", function () {
    console.log("Loaded");
    var _ge = new CustomEvent("gtm_loaded", { bubbles: true });
    d.dispatchEvent(_ge);
  });

  f.parentNode.insertBefore(j, f);
}

window.addEventListener("load", function () {
  gtag("consent", "default", { ad_storage: "denied", analytics_storage: "denied", ad_user_data: "denied" });
  gtag("consent", "update", { ad_storage: "denied", analytics_storage: "denied", ad_user_data: "denied" });
  initTagManager(window, document, "script", "dataLayer", "{{google_analytics}}");
});
var googleTagManagerDefined = true;
{% endif %}
