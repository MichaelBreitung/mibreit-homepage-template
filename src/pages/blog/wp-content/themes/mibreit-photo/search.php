{% set page_active_navigation = "Blog" %}
{% extends "./layouts/wordpress/wordpress-layout.njk" %}
{% block content %}
<h1><a href="/blog/">Blog</a> - <?php the_search_query() ?></h1>
<?php
if (have_posts()) :
  while (have_posts()) :
    the_post();
?>
    <h2>
      <a href="<?php the_permalink() ?>" rel="bookmark"><?php the_title(); ?></a>
    </h2>
    <?php the_excerpt(); ?>
    <!--
        <?php trackback_rdf(); ?>
        -->
  <?php
  endwhile;
else:
  ?>
  <p>Sorry, no posts matched your criteria.</p>
<?php endif; ?>
<p><?php posts_nav_link(' &#8212; ', __('&larr; Previous Page'), __('Next Page &rarr;')); ?></p>
<br />
{% endblock %}