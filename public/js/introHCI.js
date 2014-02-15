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
	$(".alert-resolved").click(alertResolved);
}

function alertFormListener() {
	var value = $("input[type='radio'][name='severity']:checked").val();
	if (typeof value == "undefined"){ // error check: none selected!
		$('#select-venue-severity-error').show();
		//alert("You must select a severity.\nChoose by clicking one of the four colored buttons.");
		return false;
	}
	var selected = $('#select-venue').find(":selected").val();
	if (selected == 'default') {
		$('#select-venue-dropdown-error').show();
		//alert("You must choose a venue from the dropdown.  This is the first item in the form.");
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

function alertResolved() {
	var closestAlert = $(this).closest('.alertDiv');
	
	var closestText = $(this).prev().children().first().text();
	closestText = closestText.substring(1, closestText.length-1); // remove quotes
	console.log(closestText);
	closestAlert.fadeOut();
	$.post("/removealerts", {"alert":closestText}, dummyFn);
}

function dummyFn() {
	//omitted intentionally
}
