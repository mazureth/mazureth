<?php

// handle the post form data
$to = 'mazureth@gmail.com';

$subject = 'MAZURETH CONTACT FORM';

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$startDate = $_POST['start-date'];
$endDate = $_POST['end-date'];
$service = $_POST['service'];
$message = $_POST['message'];
$token = $_POST['token'];

$emailMessage = "
firstName: $firstName
lastName: $lastName
Email: $email
Start Date: $startDate
End Date: $endDate
Service: $service

Message:
$message
";

// set up the mail to send
$headers = "From: $email" . "\r\n" .
    "Reply-To: $email" . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

// set up variable for error handling
$err = [];
$header = "";

// send the email or fail
if ($token != md5(date('YmdH') . "D4teS4lt")
    || $firstName == ""
    || $lastName == ""
    || $email == ""
    || $startDate == ""
    || $endDate == ""
    || $service == ""
    || $message == "") {
  $header = $_SERVER["SERVER_PROTOCOL"] . " 400 Bad Request";
  // populate error array
  array_push($err, $header);
  array_push($err, $_POST);
} elseif (mail($to, $subject, $emailMessage, $headers)) {
  $header = $_SERVER["SERVER_PROTOCOL"] . " 200 OK";
  // no error, do not populate error array
} else {
  $header = $_SERVER["SERVER_PROTOCOL"] . " 500 Internal Server Error";
  // populate error array
  array_push($err, $header);
}

// SendGrid integration to add the new form fillout to the appropriate list
$curl = curl_init();
$sendGridPayload = "{\"list_ids\": [\"16275b82-a697-4732-95f0-e6e6b2e6e41e\"],\"contacts\": [{\"email\": \"$email\",\"first_name\": \"$firstName\",\"last_name\": \"$lastName\"}]}";

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://api.sendgrid.com/v3/marketing/contacts",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "PUT",
  CURLOPT_POSTFIELDS => $sendGridPayload,
  CURLOPT_HTTPHEADER => array(
    "authorization: Bearer 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",
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$curlError = curl_error($curl);
if (strlen($curlError)) {
  // populate error array
  array_push($err, curl_error($curlError));
}
curl_close($curl);

// if there are any errors dump them and fail, else success!
if (count($err)) {
  header($header);
  echo "<meta http-equiv=\"refresh\" content=\"2;url=https://www.mazureth.com/booking.php#error\" />";
} else {
  header($header);
  echo "<meta http-equiv=\"refresh\" content=\"2;url=https://www.mazureth.com/booking.php#thanks\" />";
}

?>
