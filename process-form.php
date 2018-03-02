<?php

$to = 'info@mazureth.com';

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

if (mail($to, $from, $emailMessage)) {
  header("HTTP/1.0 200 OK", false, 200);
} else {
  header("HTTP/1.0 500 Internal Server Error", false, 500);
}

?>
