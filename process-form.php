<?php

$to = 'mazureth@gmail.com';

$subject = 'MAZURETH CONTACT FORM';

$name = $_POST['name'];
$email = $_POST['email'];
$startDate = $_POST['start-date'];
$endDate = $_POST['end-date'];
$message = $_POST['message'];

$emailMessage = "
Name: $name
Email: $email
Start Date: $startDate
End Date: $endDate

Message:
$message
";

$headers = "From: $email" . "\r\n" .
    "Reply-To: $email" . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

if (mail($to, $subject, $emailMessage, $headers)) {
  header("HTTP/1.0 200 OK", false, 200);
  header('Location: ./booking.html#thanks');
} else {
  header("HTTP/1.0 500 Internal Server Error", false, 500);
  header('Location: ./booking.html#error');
}


?>
