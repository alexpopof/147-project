'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('#add-alert-form').submit(alertFormListener);
	$('#faves_save').click(getFavoritesFromSortable2);
}

function alertFormListener() {
	var value = $("input[type='radio'][name='severity']:checked").val();
	if (typeof value == "undefined"){ // error check: none selected!
		alert("You must select a severity.\nChoose by clicking one of the four colored buttons.");
		return false;
	}
	var selected = $('#select-venue').find(":selected").val();
	if (selected == 'default') {
		alert("You must choose a venue from the dropdown.  This is the first item in the form.")
		return false;	
	}
}

function getFavoritesFromSortable2() {
	var faves = $('#sortable2 li');
	var text = "";	
	console.log(faves);
	for (var i = 0; i<faves.length; i++) {
		var str = faves[i]["innerText"].substring(3);
		str = str.substring(0, str.length-1);
		text = text.concat(str+'|');
	}

	console.log(text);
	console.log($('#faves_list').text());
	$('#faves_list').val(text);
}