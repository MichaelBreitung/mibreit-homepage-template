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
  <h3>Social Media</h3>
  {% from "./macros/social-media-links.njk" import socialMediaLinks %} 
  {{ socialMediaLinks(social_media) }}
{% endblock %}