<?php 
	require_once('tha.php');
	header('Cache-Control: no-cache');
	header('Content-Type: text/plain');
	
	$url = $_GET['url'];
	
	$result = THA::call_qurl($url);
	
	echo $result;
?>