<?php

function getAffiliateBanner($affiliateInput)
{
  $affiliateBanner = '';
  $affiliate = '';
  if ($affiliateInput && strlen($affiliateInput) > 0)
  {
    $affiliate = $affiliateInput;
  }
  else{    
    $randomNumber = "affiliateLink1"; // do some randome here about all affiliate links you have
  }
  

  if ($affiliate == "affiliateLink1")
  {
    $affiliateBanner .= "<div class=\"aligncenterflex spacing-top-normal\">Your affiliate Link with Banner</div>";
  }
  else if ($affiliate == "none")
  {
    // nothing
  } 
  
  return $affiliateBanner;
}

?>