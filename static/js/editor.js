$(document).ready(function() {
	
if (getQueryStrings()['edit'] == "true") {
	
	var currentElement;

	// click on p
	$(document).on("click", "p, h1, h2, h3, h4, h5, pre, li", function() {
		currentElement = $(this);
		
		if ($('#editText').length)
			$('#editText').remove();
		currentElement.after($("<textarea id=\"editText\"></textarea>"));

		if ($('#saveButton').length)
			$('#saveButton').remove();
		currentElement.after($("<button id=\"saveButton\">save</button>"));
		
		if ($('#addButton').length)
			$('#addButton').remove();
		currentElement.after($("<button id=\"addButton\">add</button>"));
		
		if ($('#removeButton').length)
			$('#removeButton').remove();
		currentElement.after($("<button id=\"removeButton\">remove</button>"));
			
		if ($('#ltrButton').length)
			$('#ltrButton').remove();
		currentElement.after($("<button id=\"ltrButton\">ltr</button>"));
				
		if ($('#boldButton').length)
			$('#boldButton').remove();
		currentElement.after($("<button id=\"boldButton\">bold</button>"));
		
		if ($('#downloadButton').length)
			$('#downloadButton').remove();
		currentElement.after($("<button id=\"downloadButton\">download</button>"));

		if ($('#cancelButton').length)
			$('#cancelButton').remove();
		currentElement.after($("<button id=\"cancelButton\">cancel</button>"));

		$('#editText').val(currentElement.html());
	});

	// save changes
	$(document).on("click", "#saveButton", function() {
		currentElement.html($('#editText').val());

		$('#editText').remove();
		$('#saveButton').remove();
		$('#addButton').remove();
		$('#removeButton').remove();
		$('#ltrButton').remove();
		$('#boldButton').remove();
		$('#cancelButton').remove();
	});

	$(document).on("click", "#addButton", function() {
		currentElement.after($("<p>new Element!</p>"));
	});

	$(document).on("click", "#removeButton", function() {
		currentElement.remove();
	});

	$(document).on("click", "#ltrButton", function() {
		surroundSelection(this.id);
		$('#editText').val(currentElement.html(currentElement.html()).html());
	});

	$(document).on("click", "#boldButton", function() {
		surroundSelection(this.id);
		$('#editText').val(currentElement.html(currentElement.html()).html());
	});

	$(document).on("click", "#downloadButton", function() {
		$('#saveButton').remove();
		$('#editText').remove();
		$('#addButton').remove();
		$('#removeButton').remove();
		$('#ltrButton').remove();
		$('#downloadButton').remove();
		$('#boldButton').remove();
		$('#cancelButton').remove();
		
		var myContent = $(".center").html().slice(1, -1);
		download("index.html", myContent);
	});
	
	$(document).on("click", "#cancelButton", function() {
		$('#saveButton').remove();
		$('#editText').remove();
		$('#addButton').remove();
		$('#removeButton').remove();
		$('#ltrButton').remove();
		$('#downloadButton').remove();
		$('#boldButton').remove();
		$('#cancelButton').remove();
	});
}
});

function surroundSelection(typeName) {
    if (window.getSelection) {
    	var myEl;
        var sel = window.getSelection();
        
        if (sel.toString() == "")
        	return;

        var myParent = getSpe(sel);
        
        if (sel.rangeCount) {
        	var myEl;
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

function clearSelection() {
    if (document.selection) 
        document.selection.empty();

    else if (window.getSelection) 
        window.getSelection().removeAllRanges();
}