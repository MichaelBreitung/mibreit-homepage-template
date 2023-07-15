<form id="searchform" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
  <input type="text" name="s" id="search" size="30" value="<?php echo get_search_query(); ?>"  autocomplete="off" maxlength="29">
</form>