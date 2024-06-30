{% from "macros/get-base-page-url.njk" import getBasePageUrl %}
<?php
class MibreitGalleryPageData
{
  private $baseUrl;
  private $relativeUrl;
  private $absoluteBaseUrl;

  function __construct()
  {
    $this->relativeUrl = $_SERVER["REQUEST_URI"];

    // request uri might start with / - remove it
    if (str_starts_with($this->relativeUrl, "/")) {
      $this->relativeUrl = substr($this->relativeUrl, 1);
    }

    // This check is important for cases where somebody calls an url with index.php trailed by a path
    $end_of_url = strrpos($this->relativeUrl, "/index.php");
    if (!$end_of_url) {
      $end_of_url = strrpos($this->relativeUrl, "/");
    }
    $this->baseUrl = substr($this->relativeUrl, 0, $end_of_url) . "/";

    $this->absoluteBaseUrl = "{{getBasePageUrl(domain_name, use_https)}}/" . $this->baseUrl;
    $pos_of_lan_de = strrpos($this->relativeUrl, "lan=de");
    $pos_of_image_nr = strrpos($this->relativeUrl, "imageNr");

    // build proper options string
    $options_string = "";
    if ($pos_of_lan_de) {
      $options_string .= "?lan=de";
      if ($pos_of_image_nr) {
        $options_string .= "&";
      }
    } else if ($pos_of_image_nr) {
      $options_string .= "?";
    }

    if ($pos_of_image_nr) {
      $end_pos_of_image_nr = strpos($this->relativeUrl, "&", $pos_of_image_nr);
      $length_of_image_nr = null;
      if ($end_pos_of_image_nr) {
        $length_of_image_nr = $end_pos_of_image_nr - $pos_of_image_nr;
      }
      $options_string .= substr($this->relativeUrl, $pos_of_image_nr, $length_of_image_nr);
    }

    $this->relativeUrl = substr($this->relativeUrl, 0, $end_of_url) . "/" . $options_string;
  }

  // returns the gallery url relative to the domain without a starting /
  //
  // Example:
  //   full url   - https://www.my-site.com/gallery/some-location/
  //   return url - gallery/some-location/
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

  // returns the gallery url relative to the domain without a starting / in encoded form 
  public function getRelativeUrlEncoded($canonical)
  {
    return urlencode($this->getRelativeUrl($canonical));
  }


  public function getBaseUrl()
  {
    return $this->baseUrl;
  }

  // returns the abolute gallery url's base path including the domain, but excluding the page file name
  //
  // Example:
  //   full url   - https://www.my-site.com/gallery/some-location/index.php
  //   return url - https://www.my-site.com/gallery/some-location/
  public function getAbsoluteBaseUrl()
  {
    return $this->absoluteBaseUrl;
  }
}
?>