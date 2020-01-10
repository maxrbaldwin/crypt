// create app, configurations and api routes
var express = require('express');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// All data routes will be prefaced with /api
app.use('/api', require('./routes'));

/**
 * Needs:
 * Error Middleware
 * Passport
 * View cache should only be in production
 **/

module.exports = app;
