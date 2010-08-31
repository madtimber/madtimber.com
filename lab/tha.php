<?php

// Take Home API (THA)
class THA {
	
	private static $QURL_API_URL = 'http://www.qurl.com/automate.php?url=';
	
	private static $DEL_USSERNAME = '';
	private static $DEL_PASSWORD = '';
	private static $DELICIOUS_API_URL = "https://$DEL_USSERNAME:$DEL_PASSWORD@api.del.icio.us/v1/posts/get?url=";
	
	public static function call_qurl($url) {
		header('Content-Type: text/plain');
		header('Cache-Control: no-cache');
		
		$qurl_uri = $QURL_API_URL.urlencode($url);
		
		curl_get($qurl_uri);
	}
	
	public static function call_delicious($url) {
		header('Content-Type: text/xml');
		header('Cache-Control: no-cache');
		
		$del_uri = $DELICIOUS_API_URL.urlencode($url);
		
		curl_get($del_uri);
	}
	
	private function curl_get($url, $headers = null) {
		$result = false;
		$retries = 3;
		
		$curl = curl_init($url);
		
		if($curl) {
			
			if($headers !== null && is_array($headers)) {
				curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
			}
		
			while(($result === false) && (--$retries > 0)) {
				$result = curl_exec($curl);
			}
		
			curl_close($curl);
		}
		
		return $result;
	}
}

?>