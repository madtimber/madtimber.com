<?php 
	$username = 'madtimber';
	$password = 'ewallin1!';
	$DELICIOUS_API_URL = "https://$username:$password@api.del.icio.us/v1/posts/get?url=";
	
	$url = $DELICIOUS_API_URL . urlencode($_GET['url']);
	
	header('Content-Type: text/xml');
	header('Cache-Control: no-cache');
	
	echo file_get_contents($url);
?>