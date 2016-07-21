$(document).ready(function() {
	var myText = $("#myTextArea");
	var myP = $("#myP");
	var myB = $("#myB");

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
	});
});

function myDecode(myStr) {
	return myStr.replace("*کج*", "<bdo class=\"leftInline\">").replace(
			"*/کج*", "</bdo>")
}

function myEncode(myStr) {
	return myStr.replace("<bdo class=\"leftInline\">", "*کج*").replace(
			"</bdo>", "*/کج*");
}