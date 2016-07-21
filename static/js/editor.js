$(document).ready(function() {
	var myText = $("#myTextArea");
	var myP = $("#myP");
	var myB = $("#myB");
	var myBC = $("#myBC");

	myText.hide();
	myB.hide();

	// click on p
	myP.click(function() {
		myText.show();
		myB.show();
		myText.val(myEncode(myP.html()));
	});

	// save changes
	myB.click(function() {
		myText.hide();
		myB.hide();
		myP.html(myDecode(myText.val()));
		setCookie("aminEditor", encodeURIComponent(myP.html()), 30);
	});
	
	myBC.click(function(){
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
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}