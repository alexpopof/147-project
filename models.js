
var Mongoose = require('mongoose');


var VenueSchema = new Mongoose.Schema({
  	"name": String,
	"description": String,
	"imageURL": String,
	"favorited": Boolean,
	"address": String,
	"telephone": String,
	"hours": String,
	"website": String,
	"latitude": String,
	"longitude": String,
	"category": String
});

exports.Venue = Mongoose.model('Venue', VenueSchema);


