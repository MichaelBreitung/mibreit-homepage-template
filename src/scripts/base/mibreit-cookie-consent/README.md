# Simple Cookie Consent Banner

## Purpose

This banner can serve two purposes:

1. Homepage with no Cookies: Inform visitor that no cookies are used and provide a link to privacy policy.
2. Homepage with Google Analytics: Inform visitor about use of Google Analytics on site and provide him with **opt-out option**. In addition to that, link to privacy policy.

While use case one is simple, number two requires additional setup.

## Usage

Call ``mibreitCookieConsent``, once the website is loaded. This is already setup under **variant-base** under **templates/parts/[en|de]/script-cookie-consent.njk**. It's not compliant to EU Data Protection though. Custom adjustments are required under **variant-custom**.

Here's an example: 

````
mibreitCookieConsent({'mainMessage': '<p>This website uses cookies from Google Analytics, which provides us with general, anonymized information about the usage of this homepage. We use this information to further improve our offering. You can deactivate the usage of Google Analytics by using the opt-out option. To use this option <a id="ga-opt-out" href="#!">click here</a>. Further information can be found in our <a href="{{page_cookie_consent.en.privacy_url}}#google_analytics">Privacy Policy</a>.</p>', 'acceptButton': 'Got It!', expirationDays: 20, cookieName: 'cookieConsent', gaOptOutId: '#ga-opt-out'});
````

Note the provision of ``<a id="ga-opt-out" href="#!">click here</a>`` in the paragraph. Providing a link with this id informs the **mibreitCookieConsent** script that Google Analytics is used and an opt out option should be set up.

## Consent Form with GTM

The opt-out option described above only works if Google Analytics is included in the website via Google Tag Manager. It's secure and flexible way of using Google Analytics and There are several tutorials on how to set this up.

If GTM is setup on a page, the following two custom events will be triggered via GTMs **dataLayer**:

1. **GaOptOutEvent** - Visitor clicks on provided opt out link (see above)
2. **ConsentGivenEvent** - Visitor clicks on accept button

Those events can be used within GTM via **CustomEvent Triggers**.


