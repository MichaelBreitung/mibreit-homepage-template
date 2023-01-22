{% from "macros/get-page-image.njk" import getPageImage %}
{% from "macros/get-base-page-url.njk" import getBasePageUrl %}
<?php
include_once(plugin_dir_path( __FILE__ )."../../../../scripts/affiliate/affiliate_banner.php");



// ****** CLEANUP ******

//Remove Gutenberg Block Library CSS from loading on the frontend
function smartwp_remove_wp_block_library_css(){
    wp_dequeue_style( 'wp-block-library' );
    wp_dequeue_style( 'wp-block-library-theme' );
    wp_dequeue_style( 'wc-blocks-style' ); // Remove WooCommerce block CSS
} 
add_action( 'wp_enqueue_scripts', 'smartwp_remove_wp_block_library_css', 100 );

// wp_head cleanup
remove_action( 'wp_head','rsd_link' );
remove_action( 'wp_head','wlwmanifest_link' );
remove_action( 'wp_head','locale_stylesheet');
remove_action( 'wp_head','print_emoji_detection_script', 7);
remove_action( 'wp_head','wp_print_styles', 8);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action( 'wp_head','wp_print_head_scripts', 9);
remove_action( 'wp_head','wp_generator' );
remove_action( 'wp_head','rel_canonical');
remove_action( 'wp_head','wp_shortlink_wp_head', 10, 0 );
remove_action( 'wp_head','wp_custom_css_cb', 101 );
remove_filter( 'wp_robots', 'wp_robots_max_image_preview_large' ); // remove robots
function remove_api () {
    remove_action( 'wp_head', 'rest_output_link_wp_head', 10 );
    remove_action( 'wp_head', 'wp_oembed_add_discovery_links', 10 );
}
add_action( 'after_setup_theme', 'remove_api' );

// wp_footer cleanup
function wps_deregister_styles() {
    wp_dequeue_style( 'global-styles' );
    wp_dequeue_style( 'classic-theme-styles' );
}
add_action( 'wp_enqueue_scripts', 'wps_deregister_styles', 100 );

// Remove jQuery Migrate Script from header and Load jQuery from Google API
function stop_loading_wp_embed() {
	if (!is_admin()) {
		wp_deregister_script('wp-embed');		
	}
}
add_action('init', 'stop_loading_wp_embed');



// ****** CONTENT CUSTOMIZATION ******

// custom exerpt
function custom_excerpt_more( $more ) {	
	return "<a href=\"".get_permalink()."\">[...]</a>";
}
add_filter( 'excerpt_more', 'custom_excerpt_more' );

// disabling the image scr set
function disable_srcset( $sources ) {
	return false;
}
add_filter('wp_calculate_image_srcset', 'disable_srcset' );

// remove p tags from around images
function filter_ptags_on_images($content)
{
    return preg_replace('/<p>(\s*)(<img .*\s*\/>)(\s*)<\/p>/iU', '\2', $content);
}
add_filter('the_content', 'filter_ptags_on_images');

// make images fluid
function filter_fluid_images ($class){
    $class .= ' fluid';
    return $class;
}
add_filter('get_image_tag_class','filter_fluid_images');

// make centered images fluid
function filter_fluid_centered_images($content){        
    $add_class = str_replace("aligncenter", "aligncenter fluid", $content); 
    return $add_class;
}
add_filter('the_content', 'filter_fluid_centered_images');

// apply small size to image-desc
function filter_small_image_description($content){        
    $add_class = str_replace("image-desc", "image-desc small", $content); 
    return $add_class;
}
add_filter('the_content', 'filter_small_image_description');

// remove p tags from around iframes
function filter_ptags_on_iframes($content)
{
    return preg_replace('/<p>\s*(<iframe .*>*.<\/iframe>)\s*<\/p>/iU', '\1', $content);
}
add_filter('the_content', 'filter_ptags_on_iframes');

// make all links https
{% if use_https %}
function filter_http_to_https($content)
{
    return preg_replace('/http:\/\/{{domain_name}}/','https://www.{{domain_name}}', $content);
}
add_filter('the_content', 'filter_http_to_https');
{% endif %}

// use youtube no cookies embed
function filter_youtube_no_cookie($content)
{
    return str_replace('www.youtube.com/embed/','www.youtube-nocookie.com/embed/', $content);
}
add_filter('the_content', 'filter_youtube_no_cookie');

// make iframe responsive
function responsive_iframe( $content ) {
    return str_replace(array("<iframe", "</iframe>"), array('<div class="video-container spacing-top-tiny"><iframe', "</iframe></div>"), $content);
}
add_filter('the_content', 'responsive_iframe');



// ****** CUSTOM FUNCTIONS ******

// retrieve site image
function get_site_image() {
    global $post, $posts;
    $first_img = '';
    if (is_single())
    {
        ob_start();
        ob_end_clean();
        $output = preg_match_all('/<img.+?src=[\'"]([^\'"]+)[\'"].*?>/i', $post->post_content,
        $matches);
        if (isset($matches[1]) && isset($matches[1][0]))
        {
            $first_img = $matches[1][0];
        }
    }    
    if(empty($first_img)){
        $first_img = "{{getPageImage(getBasePageUrl(domain_name, use_https), page_header_image)}}";
    }
    return $first_img;
}



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

