<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") 
{
    // Get the form fields and remove whitespace. 
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $homepage = filter_var(trim($_POST['homepage']), FILTER_SANITIZE_URL);
    $subject = trim($_POST["subject"]);
    $message = trim($_POST["message"]);  
    $lang = trim($_POST["lang"]);

    // Check that data was sent to the mailer.
    if ( empty($lang) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
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

    // Set the recipient email address.  
    $recipient = "{{page_email}}";

    // Set the email subject.
    $subject = "{{page_name}}: $subject";

    // Build the email content.  
    $email_content = "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // Build the email headers.
    $email_headers = "From: $email";

    // Send the email.
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Set a 200 (okay) response code.
        http_response_code(200);
        if ($lang == "de")
        {
            echo "Vielen Dank! Die Nachricht wurde gesendet.";
        }
        else{
            echo "Thank You! Your message has been sent.";            
        }        
    } else {
        // Set a 500 (internal server error) response code.
        http_response_code(500);
        if ($lang == "de")
        {
            echo "Die Nachricht konnte nicht gesendet werden.";
        }
        else{
            echo "Something went wrong and we couldn't send your message.";       
        }        
    }      
} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}

?>