<?php

class MibreitGalleryImage
{
  public $caption;
  public $altEn;
  public $altDe;
  public $imageUrl;
  public $mediumUrl;
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
    $this->mediumUrl = "";
    $this->thumbUrl = "";
    $this->prints = false;
    $this->woocommerce = "";
    $this->limited = false;
    $this->size = "large";
  }

  function initFromXml($imageXml, $path, $mediumPath, $thumbPath, $relativePath)
  {
    $tmp = $imageXml->filename;
    if (!empty($tmp)) {
      $tmp = strval($tmp);
      $this->imageUrl = $relativePath . $path . $tmp;
      $this->mediumUrl = $relativePath . $mediumPath . $tmp;
      $this->thumbUrl = $relativePath . $thumbPath . $tmp;

      $tmp = $imageXml->caption;
      if (!empty($tmp)) {
        $tmp = strval($tmp);
        $this->caption = $tmp;
        $this->altEn = $tmp;
        $this->altDe = $tmp;
      }
      $tmp = $imageXml->alt;
      if (!empty($tmp)) {
        $this->altEn = strval($tmp);
      }
      $tmp = $imageXml->altDe;
      if (!empty($tmp)) {
        $this->altDe =  strval($tmp);
      }
      $prints = $imageXml->prints;
      if (!empty($prints)) {
        $this->prints = true;
        $tmp = $prints["woocommerce"];
        if (!empty($tmp)) {
          $this->woocommerce = strval($tmp);
        }
        $tmp = $prints["limited"];
        if (!empty($tmp)) {
          $this->limited = boolval($tmp);
        }
        $tmp = $prints["size"];
        if (!empty($tmp)) {
          $this->size = strval($tmp);
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
      $this->header_h1 = strval($tmp);
    }
    $tmp = $infoXml->content_category;
    if (!empty($tmp)) {
      $this->content_category = strval($tmp);
    }
    $tmp = $infoXml->content_title;
    if (!empty($tmp)) {
      $this->content_title = strval($tmp);
    }
    $tmp = $infoXml->content;
    if (!empty($tmp)) {
      $this->content = strval($tmp);
    }
    $tmp = $infoXml["keywords"];
    if (!empty($tmp)) {
      $this->keywords = strval($tmp);
    }
    $tmp = $infoXml["description"];
    if (!empty($tmp)) {
      $this->description = strval($tmp);
    }
    $tmp = $infoXml["title"];
    if (!empty($tmp)) {
      $this->title = strval($tmp);
    }
  }
}

class MibreitGalleryData
{
  const IMAGE_PATH_TAG = "imagePath";
  const MEDIUM_PATH_TAG = "mediumPath";
  const THUMB_PATH_TAG = "thumbPath";
  const DEFAULT_IMAGE_PATH = "image/";
  const DEFAULT_MEDIUM_PATH = "medium/";
  const DEFAULT_THUMB_PATH = "thumb/";

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
      $imagePath = self::DEFAULT_IMAGE_PATH;
      if (!empty($gallery[self::IMAGE_PATH_TAG])) {
        $imagePath = strval($gallery[self::IMAGE_PATH_TAG]);
      }
      $mediumPath = self::DEFAULT_MEDIUM_PATH;
      if (!empty($gallery[self::MEDIUM_PATH_TAG])) {
        $mediumPath = strval($gallery[self::MEDIUM_PATH_TAG]);
      }
      $thumbPath = self::DEFAULT_THUMB_PATH;
      if (!empty($gallery[self::THUMB_PATH_TAG])) {
        $thumbPath = strval($gallery[self::THUMB_PATH_TAG]);
      }

      if (!empty($images)) {
        foreach ($images->children() as $imageXml) {
          $image = new MibreitGalleryImage();
          if ($image->initFromXml($imageXml, $imagePath, $mediumPath, $thumbPath, $relativePath)) {
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

class MibreitGalleryPageData
{
  // const VALID_URL_REGEX = "/^([a-zA-Z0-9.\-\_:\/]*\/)([a-zA-Z0-9\-\_]*.php)?(\?lan=(de|en)&imageNr=[0-9]{1,3}|\?lan=(de|en)|\?imageNr=[0-9]{1,3}){0,1}$/";
  const VALID_URL_REGEX = "/^([a-zA-Z0-9.\-\_:\/]*\/)([a-zA-Z0-9\-\_]*.php)?(\?[a-zA-Z0-9\-\_]*=[a-zA-Z0-9\-\_]*(\&[a-zA-Z0-9\-\_]*=[a-zA-Z0-9\-\_]*)*)?$/";

  private $domainUrl;
  private $relativeBaseUrl;
  private $relativeUrl;
  private $language;
  private $initialImageNr;
  private $initialImageUrl;
  private $initialImageWidth;
  private $initialImageHeight;

  function __construct(string $domainUrl, array $images)
  {
    $requestUri = $_SERVER["REQUEST_URI"];
    $isValid = preg_match(self::VALID_URL_REGEX, $requestUri, $matches);

    if (!$isValid) {
      header('Location: ' . $domainUrl . '/errors/error400.html');
      exit();
    } else {
      $this->domainUrl = $domainUrl;
      $this->relativeBaseUrl = substr($matches[1], 1);
      $this->initializeLanguage();
      $this->initializeInitialImage($images);
      if ($this->language == "de") {
        $this->relativeUrl = $this->relativeBaseUrl . "?lan=de";
        if ($this->initialImageNr > 0) {
          $this->relativeUrl = $this->relativeUrl . "&imageNr=" . $this->initialImageNr;
        }
      } else {
        $this->relativeUrl = $this->relativeBaseUrl;
        if ($this->initialImageNr > 0) {
          $this->relativeUrl = $this->relativeUrl . "?imageNr=" . $this->initialImageNr;
        }
      }
    }
  }

  // returns the gallery url
  public function getRelativeUrl($canonical)
  {
    if ($canonical) {
      // exclude imageNr parameter if present, to get unique canonical
      $imageNrPos = strpos($this->relativeUrl, "&imageNr");
      if (!$imageNrPos) {
        $imageNrPos = strpos($this->relativeUrl, "?imageNr");
      }
      if ($imageNrPos) {
        return substr($this->relativeUrl, 0, $imageNrPos);
      }
    }
    return $this->relativeUrl;
  }

  // returns the gallery url in encoded form 
  public function getRelativeUrlEncoded($canonical)
  {
    return urlencode($this->getRelativeUrl($canonical));
  }

  // returns the gallery url relative to the domain without a starting / and without any options
  public function getRelativeBaseUrl()
  {
    return $this->relativeBaseUrl;
  }

  // returns the abolute gallery url including the domain without any options
  //
  // Example:
  //   full url   - https://www.my-site.com/gallery/some-location/index.php
  //   return url - https://www.my-site.com/gallery/some-location/
  public function getAbsoluteBaseUrl()
  {
    return $this->domainUrl . "/" . $this->getRelativeBaseUrl();
  }

  // returns the gallery url
  public function getAbsoluteUrl($canonical)
  {

    return $this->domainUrl . "/" . $this->getRelativeUrl($canonical);
  }

  // returns the gallery url in encoded form 
  public function getAbsoluteUrlEncoded($canonical)
  {
    return urlencode($this->getAbsoluteUrl($canonical));
  }

  public function getLanguage()
  {
    return $this->language;
  }

  public function getInitialImageNr()
  {
    return $this->initialImageNr;
  }

  public function getInitialImageInfo()
  {
    return array("url" => $this->initialImageUrl, "width" => $this->initialImageWidth, "height" => $this->initialImageHeight);
  }

  private function initializeLanguage()
  {
    $this->language = "en";
    if (isset($_GET['lan']) && $_GET['lan'] == "de") {
      $this->language = "de";
    }
  }

  private function initializeInitialImage(array $images)
  {
    $numberOfImages = count($images);
    $this->initialImageNr = 0;
    $imageNr = 0;
    if (isset($_GET['imageNr']) && ctype_digit($_GET['imageNr'])) {
      $imageNr = (int) $_GET['imageNr'];
    }
    $this->initialImageUrl = "";
    $this->initialImageWidth = 0;
    $this->initialImageHeight = 0;
    if ($numberOfImages) {
      $this->initialImageNr = $imageNr >= 0 ? ($imageNr < $numberOfImages ? $imageNr : 0) : 0;
      $this->initialImageUrl = $this->getAbsoluteBaseUrl() . $images[$this->initialImageNr]->imageUrl;
      $this->initialImageWidth = getimagesize($this->initialImageUrl)[0];
      $this->initialImageHeight = getimagesize($this->initialImageUrl)[1];
    }
  }
}

function getImageMarkup($image, $language, $includeNoScript, $srcset = NULL)
{
  if ($includeNoScript) {
    echo "<noscript><img ";
  } else {
    echo "<img loading=\"lazy\" class=\"mbll__marker\" ";
  }

  echo "src=\"" . $image->imageUrl . "\" style=\"position: absolute;\" title=\"" . $image->caption . "\" ";

  if (!$includeNoScript) {
    echo "alt=\"";
    if ($language == 'de') {
      echo $image->altDe . "\" ";
    } else {
      echo $image->altEn . "\" ";
    }
  }

  $size = getimagesize($image->imageUrl);
  echo "width=\"" . $size[0] . "\" height=\"" . $size[1] . "\" ";

  if ($srcset && $srcset["image"] && $srcset["medium"]) {
    echo "srcset=\"" . $image->imageUrl . " " . $srcset["image"] . "w, " . $image->mediumUrl . " " . $srcset["medium"] . "w\" ";
    echo "sizes=\"(max-width: " . $srcset["image"] . "px) 100vw, " . $srcset["image"] . "px\" ";
  }

  echo ">";
  if ($includeNoScript) {
    echo "</noscript>";
  }
}

function getThumbMarkup($image)
{
  $size = getimagesize($image->thumbUrl);
  echo "<img loading=\"lazy\" class=\"mbll__marker\" src=\"" . $image->thumbUrl . "\" style=\"position: absolute;\" title=\"" . $image->caption . "\" alt=\"Thumbnail\" width=\"" . $size[0] . "\" height=\"" . $size[1] . "\" >";
}

function getFigureMarkup($image, $language, $srcset)
{
  echo "<figure>";
  getImageMarkup($image, $language, false, $srcset);
  getImageMarkup($image, $language, true, NULL);
  if ($language == 'de') {
    echo "<figcaption><p>$image->altDe</p></figcaption>";
  } else {
    echo "<figcaption><p>$image->altEn</p></figcaption>";
  }
  echo "</figure>";
}
