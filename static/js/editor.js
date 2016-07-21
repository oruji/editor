$(document).ready(function() {
	var myText = $("#myTextArea");
	var myP = $("#myP");
	myText.hide();
	myP.click(function() {
		myText.show();
		myText.val(myP.html());
	});
});
