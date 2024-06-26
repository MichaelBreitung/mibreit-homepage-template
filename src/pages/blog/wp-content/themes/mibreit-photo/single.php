{% set page_active_navigation = "Blog" %}
{% from "./macros/get-base-page-url.njk" import getBasePageUrl %}
{% from "./macros/get-page-image.njk" import getPageImage %}
{% extends "./layouts/wordpress/wordpress-layout.njk" %}
{% block scripts %}
{% from "./macros/mibreit-lazy-loader.njk" import scriptLazyScroller %}
{{scriptLazyScroller("article iframe", false)}}  
{% from "./macros/mibreit-image-before-after.njk" import scriptImageBeforeAfter %}
{{scriptImageBeforeAfter("article .imageBeforeAfter")}}
{% from "./macros/mibreit-gallery.njk" import scriptGalleryWP %}
{{scriptGalleryWP()}}
{% endblock %}
{% block content %}   
<article itemscope itemtype="https://schema.org/Article">    
  <link itemprop="mainEntityOfPage" href="<?php the_permalink()?>">
  <h1 itemprop="headline"><a href="/blog/">Blog</a> - <?php the_title(); ?></h1>
  <p itemprop="author" itemscope itemtype="https://schema.org/Person"><?php the_category(', ') ?> | by <a rel="author" href="{{page_about.en}}"><span itemprop="name">{{page_author}}</span></a></p>    
  <div itemprop="text"><?php the_content();?></div>
  <div class="content-navigation spacing-top-large spacing-bottom-large small">
    <div class="content-navigation__link"><?php previous_post_link('%link', '&laquo; previous' ); ?></div>      
    <div class="content-navigation__link textright"><?php next_post_link( '%link', 'next &raquo;' ); ?></div>
  </div>
  <div itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
    <meta itemprop="url" content="<?php echo $page_image ?>">
    <meta itemprop="width" content="<?php echo getimagesize($page_image)[0];?>">
    <meta itemprop="height" content="<?php echo getimagesize($page_image)[1];?>">
  </div>
  <div itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
    {% if page_author_image | length %}
    <div itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
      <meta itemprop="url" content="{{getPageImage(getBasePageUrl(domain_name), page_author_image)}}">
      <meta itemprop="width" content="{{page_author_image_width}}">
      <meta itemprop="height" content="{{page_author_image_height}}">
    </div>
    {% endif %}
    <meta itemprop="name" content="{{page_author}}">
  </div>
  <?php $modified_date = get_the_modified_date('Y-m-d');$publish_date = get_the_date('Y-m-d'); ?>
  <meta itemprop="datePublished" content="<?php echo $publish_date; ?>" >
  <meta itemprop="dateModified" content="<?php echo $modified_date; ?>" >
</article>
<!--
<?php trackback_rdf(); ?>
-->
<?php
$affiliate = get_post_meta( get_the_ID(), 'affiliate', true );
include_once(plugin_dir_path( __FILE__ )."../../../../scripts/affiliate/affiliate_banner.php");
$affiliateBanner = getAffiliateBanner($affiliate);
if (strlen($affiliateBanner) > 0)
{
  echo getAffiliateBanner($affiliate);
}	
?>  
{% endblock %}
{% block newsletter %}
<div class="content">
{% include "./parts/wordpress/newsletter-box.njk" %}
</div>
{% endblock %}  
