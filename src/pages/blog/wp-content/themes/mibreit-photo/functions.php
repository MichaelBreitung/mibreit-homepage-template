{% from "macros/get-page-image.njk" import getPageImage %}
{% from "macros/get-base-page-url.njk" import getBasePageUrl %}
{% include "parts/wordpress/functions-cleanup.njk" %}
{% include "parts/wordpress/functions-customization.njk" %}
<?php
include_once(plugin_dir_path( __FILE__ )."../../../../scripts/affiliate/affiliate_banner.php");

// ****** CUSTOM SHORTCODES ******

// affiliate shortcode setup
function affiliate_shortcode_func($atts = array())
{
    $a = shortcode_atts( array('type' => ''), $atts );
    return getAffiliateBanner($a['type']);
}
add_shortcode( 'affiliate', 'affiliate_shortcode_func' );

// before after shortcode setup
function image_before_after_shortcode_func( $atts = array(), $content = null)
{
return "<div class=\"imageBeforeAfter\">" . $content . "</div>";
}
add_shortcode( 'imageBA', 'image_before_after_shortcode_func' );

?>

