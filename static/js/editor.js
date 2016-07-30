$(document).ready(function() {
	var editMode = getQueryStrings();
	
if (editMode['edit'] == "true") {
	
	var currentElement;
	var myText = $("<textarea id=\"myTextArea\"></textarea>");
	var saveButton = $("<button id=\"saveButton\">save</button>");
	var addButton = $("<button id=\"addButton\">add</button>");
	var removeButton = $("<button id=\"removeButton\">remove</button>");
	var ltrButton = $("<button id=\"ltrButton\">ltr</button>");
	var boldButton = $("<button id=\"boldButton\">bold</button>");
	var dlButton = $("<button id=\"dlButton\">download</button>");

	// click on p
	$(document).on("click", "p, h1, h2, h3", function() {
		currentElement = $(this);
		
		if ($('#myTextArea').length) 
			myText.remove();
		myText = $("<textarea id=\"myTextArea\"></textarea>");
		currentElement.after(myText);

		if ($('#saveButton').length)
			saveButton.remove();
		saveButton = $("<button id=\"saveButton\">save</button>");
		currentElement.after(saveButton);
		
		if ($('#addButton').length)
			addButton.remove();
		addButton = $("<button id=\"addButton\">add</button>");
		currentElement.after(addButton);
		
		if ($('#removeButton').length)
			removeButton.remove();
		removeButton = $("<button id=\"removeButton\">remove</button>");
		currentElement.after(removeButton);
			
		if ($('#ltrButton').length)
			ltrButton.remove();
		ltrButton = $("<button id=\"ltrButton\">ltr</button>");
		currentElement.after(ltrButton);
				
		if ($('#boldButton').length)
			boldButton.remove();
		boldButton = $("<button id=\"boldButton\">bold</button>");
		currentElement.after(boldButton);
		
		if ($('#dlButton').length)
			dlButton.remove();
		dlButton = $("<button id=\"dlButton\">download</button>");
		currentElement.after(dlButton);

		myText.val(currentElement.html());
	});

	// save changes
	$(document).on("click", "#saveButton", function() {
		currentElement.html(myText.val());

		myText.remove();
		saveButton.remove();
		addButton.remove();
		removeButton.remove();
		ltrButton.remove();
		boldButton.remove();
	});

	$(document).on("click", "#addButton", function() {
		var newElement = $("<p>new Element!</p>");
		currentElement.after(newElement);
	});

	$(document).on("click", "#removeButton", function() {
		currentElement.remove();
	});

	$(document).on("click", "#ltrButton", function() {
		surroundSelection(this.id);
		myText.val(currentElement.html());
	});

	$(document).on("click", "#boldButton", function() {
		surroundSelection(this.id);
		myText.val(currentElement.html());
	});

	$(document).on("click", "#dlButton", function() {
		saveButton.remove();
		myText.remove();
		addButton.remove();
		removeButton.remove();
		ltrButton.remove();
		dlButton.remove();
		
		var myContent = document.documentElement.innerHTML;
		download("index.html", myContent);
	});
}
});

function surroundSelection(typeName) {
	var myEl;
	var myParent;
	
    if (window.getSelection) {
        var sel = window.getSelection();
        myParent = getSpe(sel);
        
        if (sel.rangeCount) {
        	if (typeName == "ltrButton") {
        		if (hasMyEl(myParent, "BDO", "leftInline"))
        			return;
        		
        	    myEl = document.createElement("BDO");
        	    myEl.className = "leftInline";
        	    
        	} else if (typeName == "boldButton") {
        		if (hasMyEl(myParent, "STRONG", ""))
        			return;
        		
        		myEl = document.createElement("STRONG");
        	}
        	
            var range = sel.getRangeAt(0).cloneRange();
            range.surroundContents(myEl);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
}

// check in parent tags recursively
function hasMyEl(myParent, tagName, className) {
	if (myParent.nodeName == "BODY") {
		return false;
	}
	
	if (myParent.nodeName == tagName && myParent.className == className) {
		return true;
	}
	
    return hasMyEl(myParent.parentNode, tagName, className);
}

// get Selected Parent
function getSpe(sel) {
    var parentEl = sel.anchorNode;
    
    if (parentEl.nodeType != 1) 
        parentEl = parentEl.parentNode;
        
    return parentEl;
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + encodeURIComponent(cvalue) + "; " + expires;
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
			return decodeURIComponent(c.substring(name.length, c.length));
		}
	}
	return "";
}

function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,'
			+ encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

function getQueryStrings() { 
	  var assoc  = {};
	  var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
	  var queryString = location.search.substring(1); 
	  var keyValues = queryString.split('&'); 

	  for(var i in keyValues) { 
	    var key = keyValues[i].split('=');
	    if (key.length > 1) {
	      assoc[decode(key[0])] = decode(key[1]);
	    }
	  } 

	  return assoc; 
} 