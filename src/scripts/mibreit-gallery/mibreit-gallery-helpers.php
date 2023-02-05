{% from "macros/get-base-page-url.njk" import getBasePageUrl %}
<?php
class MibreitGalleryPageData
{
  private $relativeUrl;
  private $basePath;

  function __construct()
  {
    $this->relativeUrl = $_SERVER["REQUEST_URI"];

    // request uri might start with / - remove it
    if (str_starts_with($this->relativeUrl, "/"))
    {
      $this->relativeUrl = substr($this->relativeUrl, 1);
    }
    
    // make sure all relativeUrls will include index.php and language parameter
    if (str_ends_with($this->relativeUrl, "/"))
    {
      $this->relativeUrl .= "index.php?lan=en";
    }
    elseif (strpos($this->relativeUrl, "?lan") == false )
    {
      // if no language parameter is given, en must be added -> otherwise we get multiple canonicals
      $posImageNr = strpos($this->relativeUrl, "?imageNr");
      if ($posImageNr)
      {
        $this->relativeUrl = substr_replace($this->relativeUrl, "lan=en&", $posImageNr+1, 0);
      }
      else
      {
        $this->relativeUrl .= "?lan=en";
      }
    }
    $this->basePath = "{{getBasePageUrl(domain_name, use_https)}}/" . substr($this->relativeUrl, 0, strrpos($this->relativeUrl, "/", 0)) . "/";    
  }

  // returns the gallery url relative to the domain without a starting /
  //
  // Example:
  //   full url   - https://www.my-site.com/gallery/some-location/index.php
  //   return url - gallery/some-location/index.php
  public function getUrl($canonical)
  {
    if ($canonical)
    {
      // exclude imageNr parameter if present, to get unique canonical
      $imageNrPos = strpos($this->relativeUrl, "&imageNr");
      if ($imageNrPos != FALSE)
      {
        return substr($this->relativeUrl, 0, $imageNrPos);
      }      
    }    
    return $this->relativeUrl;    
  }

  // returns the gallery url relative to the domain without a starting / in encoded form 
  public function getUrlEncoded($canonical)
  {
    return urlencode($this->getUrl($canonical));
  }

  // returns the abolute gallery url's base path including the domain, but excluding the page file name
  //
  // Example:
  //   full url   - https://www.my-site.com/gallery/some-location/index.php
  //   return url - https://www.my-site.com/gallery/some-location/
  public function getBasePath()
  {
    return $this->basePath;
  }
}
?>
