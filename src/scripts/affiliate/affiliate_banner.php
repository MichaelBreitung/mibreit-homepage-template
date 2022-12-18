<?php

function getAffiliateBanner($affiliateInput)
{
  $affiliateBanner = '';
  $affiliate = '';
{%- if page_affiliates and page_affiliates.banners %}
  if ($affiliateInput && strlen($affiliateInput) > 0)
  {
    $affiliate = $affiliateInput;
  }
{%- if page_affiliates.random | length %}
  else {    
    $input = array(
    {%- for item in page_affiliates.random -%}
    {%- if loop.last -%}
      "{{item}}"
    {%- else -%}
      "{{item}}",
    {%- endif -%}
    {% endfor -%}
    );
    $affiliate = $input[array_rand($input, 1)];    
  }
{%- endif %} 
{% for banner in page_affiliates.banners -%} 
{%- if loop.first %}
  if ($affiliate == "{{ banner.name }}")
  {
    $imageSize = getimagesize("{{banner.image}}");
    $affiliateBanner = "<div class=\"aligncenterflex spacing-top-normal\"><a href=\"{{banner.url}}\"><img class=\"fluid\" src=\"{{banner.image}}\" alt=\"{{banner.description}}\" width=\"". $imageSize[0] ."\" height=\"". $imageSize[1] ."\" ></a></div>";
  }
{%- else %}
  else if ($affiliate == "{{ banner.name }}")
  {
    $imageSize = getimagesize("{{banner.image}}");
    $affiliateBanner = "<div class=\"aligncenterflex spacing-top-normal\"><a href=\"{{banner.url}}\"><img class=\"fluid\" src=\"{{banner.image}}\" alt=\"{{banner.description}}\" width=\"". $imageSize[0] ."\" height=\"". $imageSize[1] ."\" ></a></div>";
  }
{%- endif -%}
{%- endfor %}
  else if ($affiliate == "none")
  {
    // nothing
  }
{%- endif %}
  return $affiliateBanner;
}

?>