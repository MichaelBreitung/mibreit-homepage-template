<?php

class MibreitGalleryImage
{
  public $caption;
  public $altEn;
  public $altDe;
  public $imageUrl;
  public $thumbUrl;
  public $prints;
  public $woocommerce;
  public $limited;
  public $size;

  function __construct()
  {
    $this->caption = "";
    $this->altEn = "";
    $this->altDe = "";
    $this->imageUrl = "";
    $this->thumbUrl = "";
    $this->prints = false;
    $this->woocommerce = "";
    $this->limited = false;
    $this->size = "large";
  }

  function initFromXml($imageXml, $path, $thumbPath, $relativePath)
  {
    $tmp = $imageXml->filename;
    if (!empty($tmp)) {
      $this->imageUrl = $relativePath . $path . (string) $tmp;
      $this->thumbUrl = $relativePath . $thumbPath . (string) $tmp;

      $tmp = $imageXml->caption;
      if (!empty($tmp)) {
        $this->caption = (string) $tmp;
        $this->altEn = (string) $tmp;
        $this->altDe = (string) $tmp;
      }
      $tmp = $imageXml->alt;
      if (!empty($tmp)) {
        $this->altEn = (string) $tmp;
      }
      $tmp = $imageXml->altDe;
      if (!empty($tmp)) {
        $this->altDe = (string)  $tmp;
      }
      $prints = $imageXml->prints;
      if (!empty($prints)) {
        $this->prints = true;
        $tmp = $prints["woocommerce"];
        if (!empty($tmp)) {
          $this->woocommerce = (string) $tmp;
        }
        $tmp = $prints["limited"];
        if (!empty($tmp)) {
          $this->limited = (bool) $tmp;
        }
        $tmp = $prints["size"];
        if (!empty($tmp)) {
          $this->size = (string) $tmp;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  function getPrintInfo()
  {
    return array("prints" => $this->prints, "name" => $this->caption, "woocommerce" => $this->woocommerce, "limited" => $this->limited, "size" => $this->size);
  }
}

class MibreitGalleryInfo
{
  public $keywords;
  public $description;
  public $title;
  public $header_h1;
  public $content_category;
  public $content_title;
  public $content;

  function __construct($de)
  {
    $this->header_h1 = "{{page_name}}";
    $this->title = "{{page_name}}";
    $this->content_title = "";
    $this->content_category = "";
    $this->content = "";
    if ($de) {
      $this->keywords = "Fotografie, Foto Galerie";
      $this->description = "Galerie mit Reise und Landschaftsfotos";
    } else {
      $this->keywords = "Photo Gallery, Photography";
      $this->description = "Photo gallery with beautiful landscape and cityscape photos";
    }
  }

  public function initFromXml($infoXml)
  {
    $tmp = $infoXml->header_h1;
    if (!empty($tmp)) {
      $this->header_h1 = (string) $tmp;
    }
    $tmp = $infoXml->content_category;
    if (!empty($tmp)) {
      $this->content_category = (string) $tmp;
    }
    $tmp = $infoXml->content_title;
    if (!empty($tmp)) {
      $this->content_title = (string) $tmp;
    }
    $tmp = $infoXml->content;
    if (!empty($tmp)) {
      $this->content = (string) $tmp;
    }
    $tmp = $infoXml["keywords"];
    if (!empty($tmp)) {
      $this->keywords = (string) $tmp;
    }
    $tmp = $infoXml["description"];
    if (!empty($tmp)) {
      $this->description = (string) $tmp;
    }
    $tmp = $infoXml["title"];
    if (!empty($tmp)) {
      $this->title = (string) $tmp;
    }
  }
}

class MibreitGalleryDataParser
{
  const IMAGE_PATH_TAG = "imagePath";
  const THUMB_PATH_TAG = "thumbPath";

  private $infoEn;
  private $infoDe;
  private $images = array();

  function __construct($file)
  {
    $this->infoEn = new MibreitGalleryInfo(false);
    $this->infoDe = new MibreitGalleryInfo(true);

    // get relative path part of file to use for image paths too
    $relativePath = "";
    $relativePathEndPos = strrpos($file, "/");
    if ($relativePathEndPos != false) {
      $relativePath = substr($file, 0, $relativePathEndPos + 1);
    }

    if (file_exists($file)) {
      $gallery = simplexml_load_file($file);

      $info = $gallery->infoEn;
      if (!empty($info)) {
        $this->infoEn->initFromXml($info);
      }

      $info = $gallery->infoDe;
      if (!empty($info)) {
        $this->infoDe->initFromXml($info);
      }

      $images = $gallery->images;
      $imagePath = "";
      if (!empty($gallery[self::IMAGE_PATH_TAG])) {
        $imagePath = (string) $gallery[self::IMAGE_PATH_TAG];
      }
      $thumbPath = "";
      if (!empty($gallery[self::THUMB_PATH_TAG])) {
        $thumbPath = (string) $gallery[self::THUMB_PATH_TAG];
      }

      if (!empty($images)) {
        foreach ($images->children() as $imageXml) {
          $image = new MibreitGalleryImage();
          if ($image->initFromXml($imageXml, $imagePath, $thumbPath, $relativePath)) {
            array_push($this->images, $image);
          }
        }
      }
    }
  }

  public function getNumberImages()
  {
    return count($this->images);
  }

  public function getImages()
  {
    return $this->images;
  }

  public function getRandomImages($number)
  {
    $randomImages = [];
    $nrImages = $this->getNumberImages();
    $images = $this->images;
    for ($i = 0; $i < $number and $nrImages > 0; $i++) {
      $r = rand(0, $nrImages - 1);
      array_push($randomImages, $images[$r]);
      array_splice($images, $r, 1);
      $nrImages--;
    }
    return $randomImages;
  }

  public function getImage($id)
  {
    if (array_key_exists($id, $this->images)) {
      return $this->images[$id];
    } elseif (count($this->images)) {
      return $this->images[0];
    } else {
      return null;
    }
  }

  public function getPrintInfos()
  {
    $printInfos = array();
    foreach ($this->images as $image) {
      $printInfos[$image->imageUrl] = $image->getPrintInfo();
    }
    return $printInfos;
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
