<?php 
	$QURL_API_URL = 'http://www.qurl.com/automate.php?url=';
	
	$url = $QURL_API_URL . urlencode($_GET['url']);
	
	header('Content-Type: text/plain');
	header('Cache-Control: no-cache');
	
	echo file_get_contents($url);
?>