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
	$('#faves_list').click(getFavoritesFromSortable2);
}

function alertFormListener() {
	var value = $("input[type='radio'][name='severity']:checked").val();
	if (typeof value == "undefined"){ // error check: none selected!
		alert("You must select a severity.\nChoose by clicking one of the four colored buttons.");
		return false;
	}
}

function getFavoritesFromSortable2() {
	var faves = $('#sortable2 li');
	var text = "";	
	console.log(faves);
	for (var i = 0; i<faves.length; i++) {
		var str = faves[i]["innerText"].substring(3);
		text = text.concat(str+'|');
	}
	console.log(text);
	console.log($('#faves_list2').text());
	$('#faves_list2').text(text);
}