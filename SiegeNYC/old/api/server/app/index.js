// create app, configurations and api routes
var express = require('express');
var swig = require('swig');

var app = express();

// Set view render engine
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

// Views cache
app.set('view cache', false);
swig.setDefaults({
    cache: false
});

// All data routes will be prefaced with /api
app.use('/', require('./routes'));

/**
 * Needs:
 * Error Middleware
 * Passport
 * View cache should only be in production
 **/

module.exports = app;
