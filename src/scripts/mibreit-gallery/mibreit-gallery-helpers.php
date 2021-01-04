<?php

class MibreitGalleryPageData
{
  private $page;
  private $pageEncoded;
  private $basePath;

  function __construct()
  {
    $this->page = $_SERVER["REQUEST_URI"];
    if (substr($this->page, 0, 1) === "/")
    {
      $this->page = substr($this->page, 1);
    }
    $imageNrPos = strpos($this->page, "&imageNr");
    if ($imageNrPos === FALSE)
    {
      $imageNrPos = strpos($this->page, "?imageNr");
    }
    if ($imageNrPos !== FALSE)
    {
      $this->page = substr($this->page, 0, $imageNrPos);
    }
    $this->pageEncoded = urlencode(substr($this->page, 1));
    $this->basePath = "{{page_base_url}}/" . substr($this->page, 0, strrpos($this->page, "/", -1)) . "/";    
  }
  public function getPage()
  {
    return $this->page;
  }
  public function getPageEncoded()
  {
    return $this->pageEncoded;
  }
  public function getBasePath()
  {
    return $this->basePath;
  }
}
?>