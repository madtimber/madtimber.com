<?php
class Formstack_Api {
	
	private static $root_url = 'https://www.formstack.com/api/';
	private static $api_key = '?api_key=E8A9D4D2CEF3135B9ABC760432767E32';
	
	private function curl($url, $options) {
		$result = false;
		$errors = null;
		
		$default_options = array(
			CURLOPT_HEADER 			=> 0,
			CURLOPT_RETURNTRANSFER 	=> TRUE
		);
		
		$curl = curl_init($url);
		curl_setopt_array($curl, ($options + $default_options));
		
		$result = curl_exec($curl);
		
		curl_close($curl);
		
		return $result;
	}
	
	private function curl_get($url, array $options = array()) {
		$default_options = array(
			CURLOPT_HTTPGET => TRUE
		);
		
		return self::curl($url, ($options + $default_options));
	}
	
	private function curl_post($url, array $options = array()) {
		$default_options = array(
			CURLOPT_POST => TRUE
		);
		
		return self::curl($url, ($options + $default_options));
	}
	
	private function build_endpoint_url($endpoint, $data) {
		return self::$root_url.$endpoint.self::$api_key.'&'.http_build_query($data);
	}
	
	public static function get_all_forms_json() {
		$retval = false;
		
		$default_data = array(
			"type"	=> "json"
		);
		
		$url = self::build_endpoint_url('forms', $default_data);
		$retval = self::curl_get($url);
		
		return $retval;
	}
	
	public static function get_single_form_json($id) {
		$retval = false;
		
		$default_data = array(
			"type"	=> "json",
			"id"	=>	$id
		);
		
		$url = self::build_endpoint_url('form', $default_data);
		$retval = self::curl_get($url);
		
		return $retval;
	}
	
	public static function get_form_data_json($id) {
		$retval = false;
		
		$default_data = array(
			"type"	=> "json",
			"id"	=>	$id
		);
		
		$url = self::build_endpoint_url('data', $default_data);
		$retval = self::curl_get($url);
		
		return $retval;
	}
	
	public static function get_single_submission_json($id) {
		$retval = false;
		
		$default_data = array(
			"type"	=> "json",
			"id"	=>	$id
		);
		
		$url = self::build_endpoint_url('submission', $default_data);
		$retval = self::curl_get($url);
		
		return $retval;
	}
	
	public static function submit_form_data_json($id, $data) {
		$retval = false;
		
		$default_data = array(
			"type"	=> "json",
			"id"	=>	$id
		);
		
		$url = self::build_endpoint_url('submit', $default_data + $data);
		
		$retval = self::curl_get($url);
		
		return $retval;
	}
	
	public static function edit_existing_submission_json($id, $data) {
		$retval = false;
		
		$default_data = array(
			"type"	=> "json",
			"id"	=>  $id
		);
		
		$url = self::build_endpoint_url('edit', $default_data + $data);
		$retval = self::curl_get($url);
		
		return $retval;
	}
	
	public static function delete_existing_submission_json($id) {
		$retval = false;
		
		$default_data = array(
			"type"	=> "json",
			"id"	=>	$id
		);
		
		$url = self::build_endpoint_url('delete', $default_data);
		$retval = self::curl_get($url);
		
		return $retval;
	}
}
?>