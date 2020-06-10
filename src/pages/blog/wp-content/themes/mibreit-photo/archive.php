{% extends "./layouts/wordpress/wordpress-sidebar-layout.njk" %}
{% block content %}
  <?php $post = $posts[0]; // Hack. Set $post so that the_date() works. ?>
  <?php /* If this is a category archive */ if (is_category()) { ?>
  <h2 class="pagetitle">Archive for the '<?php echo single_cat_title(); ?>' Category</h2>
  <?php /* If this is a daily archive */ } elseif (is_day()) { ?>
  <h2 class="pagetitle">Archive for <?php the_time('F jS, Y'); ?></h2>
  <?php /* If this is a monthly archive */ } elseif (is_month()) { ?>
  <h2 class="pagetitle">Archive for <?php the_time('F, Y'); ?></h2>
  <?php /* If this is a yearly archive */ } elseif (is_year()) { ?>
  <h2 class="pagetitle">Archive for <?php the_time('Y'); ?></h2>
  <?php /* If this is a search */ } elseif (is_search()) { ?>
  <h2 class="pagetitle">Search Results</h2>
  <?php /* If this is an author archive */ } elseif (is_author()) { ?>
  <h2 class="pagetitle">Author Archive</h2>
  <?php /* If this is a paged archive */ } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>
  <h2 class="pagetitle">Blog Archives</h2>
  <?php } ?>
  {% include "./parts/wordpress/post-list.njk" %}
  <br>
{% endblock %}
   