<?php

function getAffiliate($affiliateInput)
{
  if ($affiliateInput && strlen($affiliateInput) > 0)
  {
    return $affiliateInput;
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
    return $input[array_rand($input, 1)];    
  }
{%- endif %}
  return '';
}

function getAffiliateBanner($affiliateInput=NULL)
{
  $affiliateBanner = '';
  $affiliate = '';
{%- if page_affiliates and page_affiliates.banners %}
  $affiliate = getAffiliate($affiliateInput);
  {% for banner in page_affiliates.banners -%}    
    {%- if loop.first %}
  if ($affiliate === "{{ banner.name }}")
  {
    {%- else %}
  else if ($affiliate === "{{ banner.name }}")
  {
    {%- endif %}
    $imageSize = getimagesize("{{banner.image}}");
    $affiliateBanner = "<div class=\"aligncenterflex spacing-top-normal\"><a href=\"{{banner.url}}\"><img class=\"fluid\" src=\"{{banner.image}}\" alt=\"{{banner.description}}\" width=\"". $imageSize[0] ."\" height=\"". $imageSize[1] ."\" ></a></div>";
  }
  {%- endfor %}
{%- endif %}
  return $affiliateBanner;
}
?>