
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
	"open": String,
	"closed": String,
	"latitude": String,
	"longitude": String,
	"category": String
});

exports.Venue = Mongoose.model('Venue', VenueSchema);


var AlertSchema = new Mongoose.Schema({
  	"venue": String,
	"alert": String,
	"severity": String,
	"timestamp": { type: Date, default: Date.now },
	"pretty_timestamp": {type: String, default: "just now"},
	"status": String
});

exports.Alert = Mongoose.model('Alert', AlertSchema);


