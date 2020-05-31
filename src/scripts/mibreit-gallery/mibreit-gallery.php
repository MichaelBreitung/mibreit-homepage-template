<?php

class MibreitGalleryImage
{
  public $caption;
  public $altEn;   
  public $altDe;        
  public $imageUrl;
  public $thumbUrl;

  function __construct($imageXml, $path, $thumbPath, $relativePath) {
    $this->caption = "image";
    $this->altEn = "image";
    $this->altDe = "image";
    $this->imageUrl = "";

    $tmp = $imageXml->filename;
    if (!empty($tmp))
    {
      $this->imageUrl = $relativePath . $path . $tmp;
      $this->thumbUrl = $relativePath . $thumbPath . $tmp;
    }
    $tmp = $imageXml->caption;
    if (!empty($tmp))
    {
      $this->caption = $tmp;
      $this->altEn = $tmp;
      $this->altDe = $tmp;
    }
    $tmp = $imageXml->alt;    
    if (!empty($tmp))
    {    
      $this->altEn = $tmp;
    }
    $tmp = $imageXml->altDe;
    if (!empty($tmp))
    {
      $this->altDe = $tmp;
    }   
  }
}

class MibreitGalleryInfo
{
  public $keywords;
  public $description;
  public $title;
  public $header_h1;
  public $header_h2;
  public $content_category;
  public $content_title;
  public $content;

  function __construct($de) {
    $this->header_h1 = "Michael Breitung Photography";
    $this->title = "Michael Breitung Photography";
    $this->content_title = "";    
    $this->content_category = "";
    $this->content = "";
    if ($de)
    {
      $this->header_h2 = "Reisefoto Galerie";
      $this->keywords = "Reisefotografie, Michael Breitung, Reisefoto Galerie";
      $this->description = "Galerie mit Reise und Landschaftsfotos";    
    }
    else{      
      $this->header_h2 = "Travel Photo Gallery";
      $this->keywords = "Travel Photo Gallery, Travel Photography, Michael Breitung";
      $this->description = "Travel photo gallery with beautiful landscape and cityscape photos";    
    }   
  }

  public function initFromXml($infoXml)
  {
    $tmp = $infoXml->header_h1;
    if (!empty($tmp))
    {
      $this->header_h1 = $tmp;
    }
    $tmp = $infoXml->header_h2;
    if (!empty($tmp))
    {
      $this->header_h2 = $tmp;
    }
    $tmp = $infoXml->content_category;
    if (!empty($tmp))
    {
      $this->content_category = $tmp;
    }
    $tmp = $infoXml->content_title;
    if (!empty($tmp))
    {
      $this->content_title = $tmp;
    }
    $tmp = $infoXml->content;
    if (!empty($tmp))
    {
      $this->content = $tmp;
    }
    $tmp = $infoXml["keywords"];
    if (!empty($tmp))
    {
      $this->keywords = $tmp;
    }
    $tmp = $infoXml["description"];
    if (!empty($tmp))
    {
      $this->description = $tmp;
    }
    $tmp = $infoXml["title"];
    if (!empty($tmp))
    {
      $this->title = $tmp;
    }    
  }
}

class MibreitGalleryDataParser
{
  const IMAGE_PATH_TAG = "imagePath";
  const THUMB_PATH_TAG = "thumbPath";

  private $gallery;
  private $infoEn;
  private $infoDe;
  private $images = array();

  function __construct($file)
  {
    // get relative path part of file to use for image paths too
    $relativePath = "";
    $relativePathEndPos = strrpos($file, "/");
    if ($relativePathEndPos != false)
    {
      $relativePath = substr($file, 0, $relativePathEndPos+1);
    }

    $gallery = simplexml_load_file($file);    
    $this->infoEn = new MibreitGalleryInfo(false);  
    $this->infoDe = new MibreitGalleryInfo(true);
    
    $info = $gallery->infoEn;
    if (!empty($info))
    {
      $this->infoEn->initFromXml($info);
    }
    
    $info = $gallery->infoDe;
    if (!empty($info))
    {
      $this->infoDe->initFromXml($info);
    }  
     
    $images = $gallery->images;
    $imagePath = "";
    if (!empty($gallery[self::IMAGE_PATH_TAG]))
    {
      $imagePath = $gallery[self::IMAGE_PATH_TAG];
    }
    $thumbPath = "";
    if (!empty($gallery[self::THUMB_PATH_TAG]))
    {
      $thumbPath = $gallery[self::THUMB_PATH_TAG];
    }

    if (!empty($images))
    {
      foreach ($images->children() as $imageXml)
      {
        $image = new MibreitGalleryImage($imageXml, $imagePath, $thumbPath, $relativePath);
        array_push($this->images, $image);
      }  
    }     
  }

  public function getImages()
  {
    return $this->images;
  }

  public function getInfoEn()
  {    
    return $this->infoEn;
  }

  public function getInfoDe()
  {
    return $this->infoDe;
  }
}
?>