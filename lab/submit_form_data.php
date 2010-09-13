<?php 
	require_once('formstack_api.php');
	header('Cache-Control: no-cache');
	header('Content-Type: application/json');
	
	$id = $_GET['id'];
	
	$result = Formstack_Api::submit_form_data_json($id, $_GET);
	
	echo $result;
?>