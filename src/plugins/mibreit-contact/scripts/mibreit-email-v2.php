<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require '../vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") 
{
    // Check Presence of required fields in POST
    if (!isset($_POST["email"]) ||
        !isset($_POST["homepage"]) ||
        !isset($_POST["subject"]) ||
        !isset($_POST["message"]) ||
        !isset($_POST["lang"]))
    {
        http_response_code(400);
        echo "Invalid Submission."; 
        exit;
    }

    // Get the form fields and remove whitespace. 
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $homepage = filter_var(trim($_POST["homepage"]), FILTER_SANITIZE_URL);
    $subject = trim($_POST["subject"]);
    $message = trim($_POST["message"]);  
    $lang = trim($_POST["lang"]);

    // Validate fields
    if ( empty($lang) ) {
        http_response_code(400);
        echo "Invalid Submission Parameter."; 
        exit;
    }

    if ( empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Set a 400 (bad request) response code and exit.
        http_response_code(400);
        if ($lang == "de")
        {
            echo "Es gab ein Problem mit den übermittelten Daten. Bitte versuchen Sie es erneut.";
        }
        else{
            echo "There was a problem with your submission. Please complete the form and try again.";
        }          
        exit;
    }

    // Build the email content.  
    $email_content = "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // Try to create a new instance of PHPMailer class, where exceptions are enabled
    $mail = new PHPMailer (true);

    // configure PHPMailer to use our SMTP server
    try {
        // Authenticate
        $mail-> isSMTP();
        $mail->SMTPAuth = true;
        
        // Login
        $mail->Host = "smtp.ionos.de";
        $mail->Port = 587;
        $mail->Username = "{{page_smtp.username}}";
        $mail->Password = "{{page_smtp.password}}";
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

        $mail->setFrom("{{page_smtp.from}}");
        $mail->addReplyTo($email);
        $mail->addAddress("{{page_email}}");

        $mail->CharSet = 'UTF-8';
        $mail->Encoding = 'base64';

        $mail->isHTML(true);
        $mail->Subject = "{{page_name}}: $subject";
        $mail->Body = $email_content;

        $mail->send();
        http_response_code(200);
        if ($lang == "de")
        {
            echo "Vielen Dank! Die Nachricht wurde gesendet.";
        }
        else{
            echo "Thank You! Your message has been sent.";            
        }  
    } catch (Exception $e) {
        http_response_code(500);
        if ($lang == "de")
        {
            echo "Es gab ein Problem mit dem Versenden der Email. Bitte senden Sie direkt an {{page_email}}. {$mail->ErrorInfo}";
        }
        else{
            echo "There was a problem with sending the Email. Please send directly to {{page_email}}. {$mail->ErrorInfo}";
        }          
        exit;
    }    
} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}

?>