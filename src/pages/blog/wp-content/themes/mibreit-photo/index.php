{% set page_active_navigation = "Blog" %}
{% extends "./layouts/wordpress/wordpress-sidebar-layout.njk" %}
{% block content %}
  {% include "./parts/wordpress/post-list.njk" %}
	<br>
{% endblock %}
       
	