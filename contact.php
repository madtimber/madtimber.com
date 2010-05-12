<?php
require_once ('Mail.php');

$json;
$name = $_POST['name'];
$from = $_POST['email'];
$message = $_POST['message'];


$recipients = "toddlbaker@gmail.com";

$headers['From']	= $from;
$headers['To']		= $recipients;
$headers['Subject']	= "Madtimber.com - Contact Form";

$mail =& Mail::Factory('mail');
$result = $mail->send($recipients, $headers, $message);

if(!PEAR::isError($result)) {
	$json = array("success"=> true);
} else {
	$json = array("success"=> false);
}

echo json_encode($json);

?>