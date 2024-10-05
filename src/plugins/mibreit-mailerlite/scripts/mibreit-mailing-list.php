<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form fields and remove whitespace. 
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $lang = trim($_POST["lang"]);

    if (empty($lang)) {
        http_response_code(400);
        echo "Invalid Submission.";
        exit;
    }

    // Check that data was sent to the mailer.
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Set a 400 (bad request) response code and exit.
        http_response_code(400);
        if ($lang == "de") {
            echo "Es gab ein Problem mit den übermittelten Daten. Bitte versuchen Sie es erneut.";
        } else {
            echo "There was a problem with your submission. Please complete the form and try again.";
        }
        exit;
    }

    $script_url = "{{mailer_lite}}";

    // Initialize cURL session
    $subscribe = curl_init($script_url);

    $post_data = array(
        'fields[email]' => $email,
        'ml-submit' => '1',
        'anticsrf' => 'true',
    );

    // Set cURL options for POST request
    curl_setopt($subscribe, CURLOPT_POST, 1);
    curl_setopt($subscribe, CURLOPT_POSTFIELDS, http_build_query($post_data));
    curl_setopt($subscribe, CURLOPT_RETURNTRANSFER, true);

    // Execute cURL session and get the response
    $response = curl_exec($subscribe);

    if (curl_errno($subscribe)) {
        http_response_code(502);
        if ($lang == "de") {
            echo "Es ist ein Problem aufgetreten.";
        } else {
            echo "A problem has occured.";
        }
    } else {
        http_response_code(200);

        if ($lang == "de") {
            echo "Vielen Dank. Zum Abschließen der Anmeldung, bestätigen Sie bitte die Email, die Sie empfangen haben.";
        } else {
            echo "Thank You. To complete the subscribe process, please confirm the email you just received.";
        }
    }

    // Close cURL session
    curl_close($subscribe);
} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
