var venues = {
	"venues": [
		{
			"name": "Gott's",
			"description": "Burgers and Brew",
			"imageURL": "http://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Douglas_Engelbart_in_2008.jpg/972px-Douglas_Engelbart_in_2008.jpg"			
		},
		{
			"name": "Subway",
			"description": "Eat fresh",
			"imageURL": "http://upload.wikimedia.org/wikipedia/commons/5/5c/Ivan_Sutherland_at_CHM.jpg"			
		},
		{
			"name": "Jimmy V's",
			"description": "Teams that eat together, play together, win together",
			"imageURL": "http://upload.wikimedia.org/wikipedia/commons/d/df/Lucy_Suchman.jpeg"			
		},
		
	]
};

exports.view = function(req, res){
  res.render('addalerts', venues);
};