
Array.prototype.foreach = function(fn) {
	if (typeof(fn) === 'function') {
		var len = this.length;
		for(var i=0;  i < len; i++) {
			fn.apply(this[i], fn.arguments);
		}
	} else {
		console.log("you done fucked up!");
	}
}


var arr = ['test', 'me', 'yo', 'couch'];
var a = "a";
var r = "r";
var g = "g";

arr.foreach(function() {
	alert(this);
});

function forEach(arr, fn) {
	if( typeof(arr) === 'object' && typeof(fn) === 'function') {
		var len = arr.length;
		for(var i=0; i < len; i++) {
			fn.apply(arr[i], fn.arguments);
		}
	} else {
		console.log("you didn't pass the correct parms, fool!");
	}
}

forEach(arr, function() {
//	alert(this);
});