{% set page_title="Haupt Titel" %}
{% set page_sub_title="Sub Titel" %}
{% set page_keywords="Homepage, Template, Keywords" %}
{% set page_description="Homepage Template Description." %}
{% set page_canonical = "german/" %}
{% set page_active_navigation = "Home" %}
{% set page_en = "/" %}
{% extends "./layouts/de/content-layout.njk" %}

{% block content %}
  <h2>Haupt Inhalt</h2>
  <p>Haupt Inhalte hier</p>  
  <h3>Social Media</h3>
  {% from "./macros/social-media-links.njk" import socialMediaLinks %} 
  {{ socialMediaLinks(social_media) }}
{% endblock %}