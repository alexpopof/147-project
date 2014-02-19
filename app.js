
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var mongoose = require('mongoose');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'freedom';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);


var index = require('./routes/index');

var favorites = require('./routes/favorites');

var categories = require('./routes/categories');

var alerts = require('./routes/alerts');

var addalerts = require('./routes/addalerts');

var venues = require('./routes/venues');

var removealerts = require('./routes/removealerts');

var changefavorite = require('./routes/changefavorite');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.post('/', index.view);

app.get('/favorites/:category', favorites.view);

app.get('/categories', categories.view);
app.post('/categories', categories.view);

app.get('/categories/:explore', categories.view)

app.get('/alerts/:venue', alerts.view);

app.get('/addalerts', addalerts.view);
app.get('/addalerts/:venue', addalerts.view);

app.get('/venues/:category', venues.view);

app.post('/removealerts', removealerts.view);
app.post('/changefavorite', changefavorite.view);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});