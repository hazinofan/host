<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $country = $_POST['country'];
    $phone = $_POST['phone'];
    $zip = $_POST['zip'];
    $paymentMethod = $_POST['payment_method'];

    // Construct email message
    $to = "ahmedaminemaarouf1@gmail.com"; // Your Gmail address
    $subject = "New Checkout Form Submission";
    $message = "First Name: $firstName\n";
    $message .= "Last Name: $lastName\n";
    $message .= "Email: $email\n";
    $message .= "Country: $country\n";
    $message .= "Phone: $phone\n";
    $message .= "Zip: $zip\n";
    $message .= "Payment Method: $paymentMethod\n";

    // Send email
    if (mail($to, $subject, $message)) {
        echo "Email sent successfully!";
    } else {
        echo "Failed to send email. Please try again later.";
    }
} else {
    echo "Invalid request!";
}

?>
