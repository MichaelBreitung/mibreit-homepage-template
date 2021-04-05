{% set page_active_navigation = "Portfolio" %}
{% extends "./layouts/en/gallery-layout.njk" %}
{% block content %}
{{ super() }}
<h2>Some Headline</h2>
<p>Some text about the gallery.</p>
{% endblock %}