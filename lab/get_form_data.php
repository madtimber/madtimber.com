<?php 
	require_once('formstack_api.php');
	header('Cache-Control: no-cache');
	header('Content-Type: application/json');
	
	$id = $_GET['id'];
	
	$result = Formstack_Api::get_form_data_json($id);
	
	echo $result;
?>