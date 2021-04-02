{% from "macros/get-base-page-url.njk" import getBasePageUrl %}
<?php
class MibreitGalleryPageData
{
  private $url;
  private $basePath;

  function __construct()
  {
    $this->url = $_SERVER["REQUEST_URI"];
    if (substr($this->url, 0, 1) === "/")
    {
      $this->url = substr($this->url, 1);
    }
    $this->basePath = "{{getBasePageUrl(domain_name, use_https)}}/" . substr($this->url, 0, strrpos($this->url, "/", -1)) . "/";    
  }
  public function getUrl($canonical)
  {
    if ($canonical)
    {
      $imageNrPos = strpos($this->url, "&imageNr");
      if ($imageNrPos === FALSE)
      {
        $imageNrPos = strpos($this->url, "?imageNr");
      }
      if ($imageNrPos !== FALSE)
      {
        return substr($this->url, 0, $imageNrPos);
      }      
    }    
    return $this->url;    
  }
  public function getUrlEncoded($canonical)
  {
    return urlencode($this->getUrl($canonical));
  }
  public function getBasePath()
  {
    return $this->basePath;
  }
}
?>