{% set page_title="Homepage Template Title" %}
{% set page_sub_title="Homepage Template Subtitle" %}
{% set page_keywords="Homepage, template, keywords" %}
{% set page_description="Homepage Template Description." %}
{% set page_canonical = "" %}
{% set page_active_navigation = "Home" %}
{% set page_de = "/german/" %}
{% extends "./layouts/en/content-layout.njk" %}

{% block content %}
  <h2>Main Content</h2>
  <p>Some main content</p> 
  <p>Ex nostrud eu aute ipsum consectetur. Sint mollit laboris et deserunt do. Amet Lorem et consectetur enim pariatur eu adipisicing sunt aliqua. Ullamco in veniam elit do duis dolore tempor. Magna commodo aliquip culpa duis et commodo officia.

Commodo ad laboris commodo eiusmod veniam dolor. Mollit nisi nostrud ut ad incididunt consectetur qui anim proident incididunt ea. Duis amet officia sit officia enim velit veniam culpa. Velit Lorem id et consequat est non. Eiusmod labore officia aliquip laboris. Cupidatat amet cupidatat culpa anim labore. Aute est Lorem amet et sit incididunt culpa aliquip adipisicing adipisicing.

Reprehenderit dolor culpa adipisicing sit qui eu. Cupidatat fugiat officia reprehenderit incididunt dolore. Laborum est do in proident elit excepteur. Pariatur ex adipisicing sit excepteur duis adipisicing ipsum est. Sint cupidatat reprehenderit anim nostrud incididunt elit ipsum magna. Elit consectetur ex commodo ex cupidatat aute aliqua aliquip tempor.

Id eiusmod consectetur aliqua cillum irure esse nisi anim ex do enim. Laboris esse consectetur quis culpa pariatur sint. Ipsum irure eiusmod minim deserunt. Ullamco veniam cillum enim est aliqua esse aliquip velit. Eiusmod ipsum sunt ullamco excepteur non eiusmod aute culpa.

Amet officia tempor occaecat ullamco. Ad aute anim fugiat magna dolor Lorem velit magna nisi. Pariatur excepteur voluptate enim nisi qui. Tempor quis cillum eu commodo proident aliquip non esse voluptate cillum amet voluptate sit proident. Est duis laborum occaecat eu. Ex voluptate minim cillum voluptate esse mollit aute magna ea culpa.

Proident enim in labore sit sit commodo non cillum aliqua irure. Reprehenderit ex in voluptate aliquip est Lorem ad excepteur ea sint proident adipisicing. Labore ea ut laborum eu veniam ut veniam eu Lorem. Occaecat sint fugiat incididunt quis anim sunt. Nostrud eu Lorem nostrud minim ad eu sit mollit irure. In est excepteur ea laboris fugiat ex qui adipisicing officia. Duis esse excepteur voluptate proident aliquip do eu magna incididunt enim anim est culpa commodo.

Veniam tempor in laboris duis cillum. Aliquip incididunt nisi excepteur quis veniam duis velit. Eiusmod consequat aliqua eiusmod nisi commodo id. Do commodo tempor do quis eiusmod. Eu quis eiusmod commodo mollit sint eu velit cillum.</p>
<p>Ex nostrud eu aute ipsum consectetur. Sint mollit laboris et deserunt do. Amet Lorem et consectetur enim pariatur eu adipisicing sunt aliqua. Ullamco in veniam elit do duis dolore tempor. Magna commodo aliquip culpa duis et commodo officia.

Commodo ad laboris commodo eiusmod veniam dolor. Mollit nisi nostrud ut ad incididunt consectetur qui anim proident incididunt ea. Duis amet officia sit officia enim velit veniam culpa. Velit Lorem id et consequat est non. Eiusmod labore officia aliquip laboris. Cupidatat amet cupidatat culpa anim labore. Aute est Lorem amet et sit incididunt culpa aliquip adipisicing adipisicing.

Reprehenderit dolor culpa adipisicing sit qui eu. Cupidatat fugiat officia reprehenderit incididunt dolore. Laborum est do in proident elit excepteur. Pariatur ex adipisicing sit excepteur duis adipisicing ipsum est. Sint cupidatat reprehenderit anim nostrud incididunt elit ipsum magna. Elit consectetur ex commodo ex cupidatat aute aliqua aliquip tempor.

Id eiusmod consectetur aliqua cillum irure esse nisi anim ex do enim. Laboris esse consectetur quis culpa pariatur sint. Ipsum irure eiusmod minim deserunt. Ullamco veniam cillum enim est aliqua esse aliquip velit. Eiusmod ipsum sunt ullamco excepteur non eiusmod aute culpa.

Amet officia tempor occaecat ullamco. Ad aute anim fugiat magna dolor Lorem velit magna nisi. Pariatur excepteur voluptate enim nisi qui. Tempor quis cillum eu commodo proident aliquip non esse voluptate cillum amet voluptate sit proident. Est duis laborum occaecat eu. Ex voluptate minim cillum voluptate esse mollit aute magna ea culpa.

Proident enim in labore sit sit commodo non cillum aliqua irure. Reprehenderit ex in voluptate aliquip est Lorem ad excepteur ea sint proident adipisicing. Labore ea ut laborum eu veniam ut veniam eu Lorem. Occaecat sint fugiat incididunt quis anim sunt. Nostrud eu Lorem nostrud minim ad eu sit mollit irure. In est excepteur ea laboris fugiat ex qui adipisicing officia. Duis esse excepteur voluptate proident aliquip do eu magna incididunt enim anim est culpa commodo.

Veniam tempor in laboris duis cillum. Aliquip incididunt nisi excepteur quis veniam duis velit. Eiusmod consequat aliqua eiusmod nisi commodo id. Do commodo tempor do quis eiusmod. Eu quis eiusmod commodo mollit sint eu velit cillum.</p>
  <h3>Social Media</h3>
  {% from "./macros/social-media-links.njk" import socialMediaLinks %} 
  {{ socialMediaLinks(social_media) }}
{% endblock %}