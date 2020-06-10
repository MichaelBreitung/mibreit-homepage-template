  {% extends "./layouts/wordpress/wordpress-layout.njk" %}
  {% block scripts %}
  <script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=9282521f-aa78-4b0d-8a6e-e256d95f070e"></script>
  {% endblock %}
  {% block content %}   
  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
  <article itemscope itemtype="http://schema.org/Article">    
    <link itemprop="mainEntityOfPage" href="<?php the_permalink()?>">
    <h1 itemprop="headline"><a href="<?php the_permalink() ?>" rel="bookmark"><?php the_title(); ?></a></h1>
    <p itemprop="author" itemscope itemtype="https://schema.org/Person"><?php the_time('F j, Y'); ?> | <?php the_category(', ') ?> | by <a rel="author" href="https://www.mibreit-photo.com/about.html"><span itemprop="name">{{page_author}}</span></a></p>    
    <div itemprop="text"><?php the_content(__('Read more'));?></div>
    <div class="content-navigation spacing-top-large spacing-bottom-large small">
      <div class="content-navigation__link"><?php previous_post_link('%link', '&laquo; previous' ); ?></div>
      <div class="image-links">
        <a class="image-links__link" href="https://twitter.com/intent/tweet?url=<?php if(is_home()){echo home_url();}else{the_permalink();} ?>&amp;text=<?php if(is_home()){echo get_bloginfo("name");}else{echo sanitize_title_with_dashes(get_the_title());} ?>" target="_blank"><img class="image-links__image" src="/images/social-media-share/twitter-share.png" alt="share via Twitter" /></a>
        <a class="image-links__link" href="https://facebook.com/sharer.php?u=<?php if(is_home()){echo home_url();}else{the_permalink();} ?>" target="_blank"><img class="image-links__image" src="/images/social-media-share/facebook-share.png" alt="share via Facebook" /></a>
        <a class="image-links__link" href="http://www.pinterest.com/pin/create/button/?url=<?php if(is_home()){echo home_url();}else{the_permalink();} ?>&amp;media=<?php echo $page_image ?>&amp;description=<?php if(is_home()){echo get_bloginfo("name");}else{echo sanitize_title_with_dashes(get_the_title());} ?>"           target="_blank"><img class="image-links__image" src="/images/social-media-share/pinterest-share.png" alt="share via Pinterest" /></a>
      </div>
      <div class="content-navigation__link textright"><?php next_post_link( '%link', 'next &raquo;' ); ?></div>
    </div>
    <div itemprop="image" itemscope itemtype="http://schema.org/ImageObject">
      <meta itemprop="url" content="<?php echo $page_image ?>">
      <meta itemprop="width" content="<?php echo getimagesize($page_image)[0];?>">
      <meta itemprop="height" content="<?php echo getimagesize($page_image)[1];?>">
    </div>
    <div itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
      <div itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
        <meta itemprop="url" content="https://www.mibreit-photo.com/images/me.jpg">
        <meta itemprop="width" content="176">
        <meta itemprop="height" content="200">
      </div>
      <meta itemprop="name" content="Michael Breitung">
    </div>
    <?php $modified_date = get_the_modified_date('Y-m-d');$publish_date = get_the_date('Y-m-d'); ?>
    <meta itemprop="datePublished" content="<?php echo $publish_date; ?>" />
    <meta itemprop="dateModified" content="<?php echo $modified_date; ?>" />
  </article>
  <!--
  <?php trackback_rdf(); ?>
  -->
  <?php endwhile; else: ?>
  <p><?php _e('Sorry, no posts matched your criteria.'); ?></p><?php endif; ?>
  <?php
  $affiliate = get_post_meta( get_the_ID(), 'affiliate', true );
  if (is_single())
  {
    include_once(plugin_dir_path( __FILE__ )."../../../../scripts/affiliate/affiliate_banner.php");
    $affiliateBanner = getAffiliateBanner($affiliate);
    if (strlen($affiliateBanner) > 0)
    {
      echo getAffiliateBanner($affiliate);
    }	
  } 
  ?>  
{% endblock %}
  