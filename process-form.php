<?php

$to = 'mazureth@gmail.com';

$subject = 'MAZURETH CONTACT FORM';

$name = $_POST['name'];
$email = $_POST['email'];
$startDate = $_POST['start-date'];
$endDate = $_POST['end-date'];
$service = $_POST['service'];
$message = $_POST['message'];
$token = $_POST['token'];

$emailMessage = "
Name: $name
Email: $email
Start Date: $startDate
End Date: $endDate
Service: $service

Message:
$message
";

$headers = "From: $email" . "\r\n" .
    "Reply-To: $email" . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

if ($token != md5(date('YmdH') . "D4teS4lt")
    || $name == ""
    || $email == ""
    || $startDate == ""
    || $endDate == ""
    || $service == ""
    || $message == "") {
  header($_SERVER["SERVER_PROTOCOL"]." 400 Bad Request");
  echo "<meta http-equiv=\"refresh\" content=\"2;url=https://www.mazureth.com/booking.php#error\" />";
} elseif (mail($to, $subject, $emailMessage, $headers)) {
  header($_SERVER["SERVER_PROTOCOL"]." 200 OK");
  echo "<meta http-equiv=\"refresh\" content=\"2;url=https://www.mazureth.com/booking.php#thanks\" />";
} else {
  header($_SERVER["SERVER_PROTOCOL"]." 500 Internal Server Error");
  echo "<meta http-equiv=\"refresh\" content=\"2;url=https://www.mazureth.com/booking.php#error\" />";
}


?>
