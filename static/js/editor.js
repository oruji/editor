$(document).ready(function() {
	var myP = $("#myP");
	var myBC = $("#myBC");
	var myText = $("<textarea id=\"myTextArea\"></textarea>");
	var myB = $("<button id=\"myB\">save</button>");

	// click on p
	myP.click(function() {
		myText.show();
		myB.show();
		$("body").append(myText);
		$("body").append(myB);
		myText.val(myEncode(myP.html()));
	});

	// save changes
	myB.click(function() {
		myP.html(myDecode(myText.val()));
		setCookie("aminEditor", encodeURIComponent(myP.html()), 30);
		myText.hide();
		myB.hide();
	});

	myBC.click(function() {
		alert(decodeURIComponent(getCookie("aminEditor")));
	});
});

function myDecode(myStr) {
	return myStr.replace("*کج*", "<bdo class=\"leftInline\">").replace("*/کج*",
			"</bdo>")
}

function myEncode(myStr) {
	return myStr.replace("<bdo class=\"leftInline\">", "*کج*").replace(
			"</bdo>", "*/کج*");
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}