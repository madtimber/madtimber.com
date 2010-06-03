
var TB = (window.TB || {});
// singleton
TB.util = (function() {
	
	return {
		// facade to shorten document.getElementBy(id)
		$: function(id) {
			return document.getElementById(id);
		},
		
		// facade around event handler attachment
		attachEventHandler: function(el, evt, fn){
			if (window.attachEvent) {
				el.attachEvent('on' + evt, fn);
			}else if (window.addEventListener) {
				el.addEventListener(evt, fn, false);
			} else {
				el['on' + evt] = fn;
			}
		},
		
		isValidURL: function(url) {
			// RegEx found at www.regexlib.com and slightly modified
			var regex = new RegExp(/^((http|https|ftp)\:\/\/)?([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|localhost|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(\/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$/);
			return regex.test(url);
		},
		
		getEventTarget: function(e) {
			return (e.target || e.srcElement);
		},
		
		catchEnterAndSend: function(e) {
			if(e.keyCode == "13") {
				UrlApp.validateURLandSend(e);
			}
		}
	}
	
})();


// singleton
var AJAX = (function() {
	
	// factory for XHR object
	var getXHRObject = function(){
		var xhr;
		try {
			xhr = new XMLHttpRequest();
			getXHRObject = function() {
				return new XMLHttpRequest();
			};
		} catch(e) {
			var msxhr = ['MSXML2.XMLHTTP.6.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];			
			for(var i=0, len = msxhr.length; i < len; i++) {
				try {
					xhr = new ActiveXObject(msxhr[i]);
					getXHRObject = function() {
						return new ActiveXObject(msxhr[i]);
					};
					break;
				} catch(e) {}
			}			
		}
		return xhr;
	};
	
	return {
		makeAsyncRequest: function(method, url, successCallback, failureCallback, postdata) {
			var xhr = getXHRObject();
			xhr.onreadystatechange = function() {
				if(xhr.readyState !== 4) return;
				(xhr.status === 200) ?
					successCallback(xhr.responseText, xhr.responseXML) :
					failureCallback(xhr.status);
			};
			xhr.open(method, url, true);
			xhr.send(postdata || null);
		}
	}
	
})();

var API = (window.API || {});
// singleton
API.qurl = (function() {
	
	var QURL_PROXY_URL = 'qurlProxy.php?url=';
	return {
		getShortUrl: function(url, succ, fail) {
			AJAX.makeAsyncRequest('GET', QURL_PROXY_URL + url, succ, fail);
		}	
	}
	
})();

// singleton
API.delicious = (function() {
	
	var DELICIOUS_PROXY_URL = 'deliciousProxy.php?url=';
	return {
		getUrlInfo: function(url, succ, fail) {
			AJAX.makeAsyncRequest('GET', DELICIOUS_PROXY_URL + url, succ, fail);
		}
	}
	
})();

// singleton
var UrlApp = (function() {
	
	function qurlSucc(responseText) {
		TB.util.$('qurlRequestError').innerHTML = '';
		TB.util.$('qurlLoad').style.display = "none";
		
		var link = TB.util.$('qurlResult');
		link.innerHTML = responseText;
		link.href = responseText;
		
		TB.util.$('qurlResultSection').style.display = 'block';
	}
	
	function qurlFail(responseStatus) {
		TB.util.$('qurlResult').innerHTML = '';
		TB.util.$('qurlLoad').style.display = "none";
		TB.util.$('qurlRequestError').innerHTML = 'An error occurred during your request.';
		TB.util.$('qurlResultSection').style.display = 'block';
	}
	
	function deliciousSucc(responseText, responseXML) {
		// clear previous results/errors
		var dr = TB.util.$('deliciousResult');
		dr.innerHTML = '';
		TB.util.$('deliciousRequestError').innerHTML = '';
		TB.util.$('delLoad').style.display = "none";
		
		var table = document.createElement('table');
		var tbody = document.createElement('tbody');  // because IE 6 & 7 are awesome
		
		// parse the XML response
		try {
			var posts = responseXML.getElementsByTagName('posts');
			if(posts[0].childNodes.length > 0) {
				for (var i=0, len = posts.length; i < len; i++) {
					var post = posts[i].getElementsByTagName('post');
					for (var j=0, leng = post.length; j < leng; j++) {
						for (var i=0, length = post[j].attributes.length; i < length; i++) {
							var row = document.createElement('tr');
							var key = document.createElement('td');
							key.className = 'attribName';
							var value = document.createElement('td');
							value.className = 'attribValue';
							
							key.appendChild(document.createTextNode(post[j].attributes[i].nodeName));
							value.appendChild(document.createTextNode(post[j].attributes[i].nodeValue));
							
							row.appendChild(key);
							row.appendChild(value);
							tbody.appendChild(row);
						}
					}
				}
				table.appendChild(tbody);
				dr.appendChild(table);
			} else {
				dr.innerHTML = "No Results";
			}
		} catch (e) {
			TB.util.$('deliciousRequestError').innerHTML = 'An error occurred parsing the responseXML.';
		}
		TB.util.$('deliciousResultSection').style.display = 'block';
	}
		
	function deliciousFail(responseStatus) {
		var dr = TB.util.$('deliciousResult');
		dr.innerHTML = '';
		dr.style.display = 'none';
		TB.util.$('delLoad').style.display = "none";
		TB.util.$('deliciousRequestError').innerHTML = 'An error occurred during your request.';
		TB.util.$('deliciousResultSection').style.display = 'block';
	}
	
	
	return {
		// bridge event handler around Qurl and Delicious calls
		validateURLandSend: function(e) {
			// reset URL error section
			var errEl = TB.util.$('urlInputError');
			errEl.innerHTML = '';
						
			var url = TB.util.$('urlInput').value;
			// validate the url
			if (TB.util.isValidURL(url)) {
				
				var delEl = TB.util.$('deliciousResultSection');
				var qurlEl = TB.util.$('qurlResultSection');
				
				// reset(hide) Qurl result sections
				qurlEl.style.display = 'none';
	
				// reset(hide) Delicious result section
				delEl.style.display = 'none';

				// set the laoding gif
				TB.util.$('qurlLoad').style.display = "block";
				TB.util.$('delLoad').style.display = "block";
				
				// disable the button
				// (delicious wants you to send no more than one request a second)
				var btn = TB.util.getEventTarget(e);
				btn.disabled = 'disabled';
				
				// send Qurl request
				API.qurl.getShortUrl(url, qurlSucc, qurlFail);
				
				// send delicious request
				API.delicious.getUrlInfo(url, deliciousSucc, deliciousFail);
				
				// re-enable the button after one second
				setTimeout(function(){ btn.disabled = '';}, 1000);
			} else {
				// show error message
				errEl.innerHTML = 'The URL you entered is not valid.';
			}
		}
	}
	
})();

// attach an 'onload' event handler to the window's load event
TB.util.attachEventHandler(window, 'load', function() {
	TB.util.attachEventHandler(TB.util.$('sendUrlBtn'), 'click', function(e) {UrlApp.validateURLandSend(e)});
	TB.util.attachEventHandler(TB.util.$('urlInput'), 'keypress', function(e) {TB.util.catchEnterAndSend(e)});
});
