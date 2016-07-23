$(document).ready(function() {
	var currentElement = $("#myP");
	var myBC = $("#myBC");
	var myText = $("<textarea id=\"myTextArea\"></textarea>");
	var saveButton = $("<button id=\"saveButton\">save</button>");
	var addButton = $("<button id=\"addButton\">add</button>");
	var removeButton = $("<button id=\"removeButton\">remove</button>");
	var boldButton = $("<button id=\"boldButton\">bold</button>");

	// click on p
	$(document).on("click", "p, h1, h2, h3", function() {
		currentElement = $(this);

		saveButton.show();
		myText.show();
		addButton.show();
		removeButton.show();
		boldButton.show();
		currentElement.after(myText);
		currentElement.after(saveButton);
		currentElement.after(addButton);
		currentElement.after(removeButton);
		currentElement.after(boldButton);

		myText.val(myEncode(currentElement.html()));
	});

	// save changes
	saveButton.click(function() {
		currentElement.html(myDecode(myText.val()));
		var myStr = "";

		// add all tags to cookie
		$("p, h1, h2, h3").each(
				function(i, obj) {
					myStr = myStr + "<" + obj.nodeName + ">"
							+ obj.innerHTML + "</"
							+ obj.nodeName + ">\n";
				});

		setCookie("aminEditor", myStr, 30);
		myText.hide();
		saveButton.hide();
		addButton.hide();
		removeButton.hide();
		boldButton.hide();
	});

	addButton.click(function() {
		var newElement = $("<p>new Element!</p>");
		currentElement.after(newElement);
		myText.hide();
		saveButton.hide();
		addButton.hide();
		removeButton.hide();
	});

	removeButton.click(function() {
		currentElement.remove();
		myText.hide();
		saveButton.hide();
		addButton.hide();
		removeButton.hide();
	});

	boldButton.click(function() {
		replacer();
	});

	myBC.click(function() {
		alert(getCookie("aminEditor"));
		download("myIndex.html", getCookie("aminEditor"));
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

function replacer() {
    var sel, range;
    if (window.getSelection) {
    	var html = window.getSelection().toString();
    	if(html.length == 0)
    		return;
    	html = "<b>" + html + "</b>";
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // non-standard and not supported in all browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);
            
            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
    }
}