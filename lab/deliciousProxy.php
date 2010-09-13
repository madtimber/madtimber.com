<?php 	
	require_once('tha.php');
	header("Content-Type: text/xml");
	header("Cache-Control: no-cache");
	
	$url = $_GET['url'];
	
	$result = THA::call_delicious($url);
	
	echo $result;
?>