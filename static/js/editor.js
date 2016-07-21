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
		myText.val(myP.html());
	});
	
	// save changes
	myB.click(function() {
		myText.hide();
		myB.hide();
		myP.html(myText.val());
	});
});
