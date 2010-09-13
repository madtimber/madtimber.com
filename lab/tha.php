<?php

// Take Home API (THA)
class THA {
	
	private static $QURL_API_URL = 'http://qurl.com/automate.php?url=';
	
	private static $DEL_USERNAME = 'madtimber';
	private static $DEL_PASSWORD = 'ewallin1!';
	private static $DELICIOUS_API_URL = "https://api.del.icio.us/v1/posts/get?url=";
	
	public static function call_qurl($url) {
		
		$qurl_uri = self::$QURL_API_URL.urlencode($url);
		
		$options = array(
			CURLOPT_TIMEOUT => 5
		);
		
		return self::curl_get($qurl_uri, $options);
	}
	
	public static function call_delicious($url) {
		
		$del_uri = self::$DELICIOUS_API_URL.urlencode($url);
		
		$options = array(
			CURLOPT_USERPWD => self::$DEL_USERNAME.":".self::$DEL_PASSWORD,
			CURLOPT_TIMEOUT => 5
		);
		
		return self::curl_get($del_uri, $options);
	}
	
	private function curl_get($url, array $options = array()) {
		$result = false;
		$errors = null;
		
		$default_options = array(
			CURLOPT_HEADER => 0,
			CURLOPT_RETURNTRANSFER => TRUE
		);
		
		$curl = curl_init($url);
		curl_setopt_array($curl, ($options + $default_options));
		
		$result = curl_exec($curl);
		
		curl_close($curl);
		
		return $result;
	}
}
?>