<?php

$to = 'mazureth@gmail.com';

$subject = 'MAZURETH CONTACT FORM';

$name = $_POST['name'];
$from = $_POST['email'];
$start = $_POST['startDate'];
$end = $_POST['endDate'];
$message = $_POST['message'];

$emailMessage = "
Name: $name
Email: $email
Start Date: $start
End Date: $end

Message:
$message
";

$headers = "From: $from" . "\r\n" .
    "Reply-To: $from" . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

if (mail($to, $subject, $emailMessage)) {
  header("HTTP/1.0 200 OK", false, 200);
} else {
  header("HTTP/1.0 500 Internal Server Error", false, 500);
}

?>
