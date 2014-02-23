
var models = require('../models');

function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}

exports.view = function(req, res){
  	cats_list = ['Food', 'Workout', 'Party']

  	var explored_param = req.params.explore;
  	var explore = typeof explored_param != "undefined"

  	// check if just posted form in "edit favorites"
  	var faves = req.body.faves_list;
  	console.log(faves);
	var posted = false;
	if (typeof faves != "undefined"){
		var category = req.body.category.toLowerCase();
		faves_list = faves.split('|');
		for (var i = 0; i<faves_list.length; i++)
			faves_list[i] = faves_list[i].trim();
		console.log(faves_list);

		models.Venue.find({"category": category}).exec(afterData); 
		function afterData(err, venues) {
			if(err) {console.log(err); res.send(500); }
			var numVens = venues.length;
			var left = numVens;
			for (var i = 0; i<venues.length; i++) {
				var ven_name = venues[i]["name"].trim();
				if (include(faves_list, ven_name)) {
					models.Venue.update({"name": ven_name},{"favorited": true}, afterUpdating);
				}
				else {
					models.Venue.update({"name": ven_name},{"favorited": false}, afterUpdating);	
				}

			}

			function afterUpdating(err, affected) {
				if(err) {console.log(err); res.send(500);}
				numVens--;
				if (numVens <= 0)
					finish();
			}
					
		}

		posted=true;
	}
	else {
		finish();	  	
	}
	function finish() {
	 	res.render('categories', {
	    'cats': [
	            {'name': cats_list[0], 'name_lower': cats_list[0].toLowerCase(), 'icon': 'glyphicon-cutlery', 'explore': explore },
	            {'name': cats_list[1], 'name_lower': cats_list[1].toLowerCase(), 'icon': 'glyphicon-flag', 'explore': explore},
	            {'name': cats_list[2], 'name_lower': cats_list[2].toLowerCase(), 'icon': 'glyphicon-bullhorn', 'explore': explore},
	        ],
	    'posted': posted,
	    'explore': explore // true if we are exploring venues, false if we want to edit faves from here
	  	});
	 }
};

