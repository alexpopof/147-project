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
	$(".add-faves-btn").click(addToFaves);
	$(".remove-faves-btn").click(removeFromFaves);
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

function addToFaves() {
	var btn = $(this);
	console.log('add click');
	btn.addClass("remove-faves-btn");
	btn.removeClass("add-faves-btn");

	btn.text(" Remove from Favorites");
	var venue = btn.parent().prev().children().first().children().first().text();
	//console.log(venue);
	var url = document.URL;
	var path_list = url.split("/");
	var category = path_list[path_list.length-1];
	//console.log(category);
	btn.click(removeFromFaves);
	$.post("/changefavorite", {"venue":venue, "category":category, "newBoolean": true}, dummyFn);
}


function removeFromFaves() {
	var btn = $(this);
	console.log('remove click');
	console.log(btn.text());
	btn.removeClass("remove-faves-btn");
	btn.addClass("add-faves-btn");
	btn.text(" Add to Favorites");
	var venue = btn.parent().prev().children().first().children().first().text();
	btn.prepend('<i class="glyphicon glyphicon-star"></i>')
	var url = document.URL;
	var path_list = url.split("/");
	var category = path_list[path_list.length-1];
	//console.log(category);
	btn.click(addToFaves);
	$.post("/changefavorite", {"venue":venue, "category":category, "newBoolean": false}, dummyFn);
}

