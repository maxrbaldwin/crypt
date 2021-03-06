var mongoose = require('mongoose');
var env = require('dotenv').config();

var db = mongoose.connect(env.DATABASE_URI).connection;

/**
* Will envoke Schemas so that they can be accessed by other files
* As mongoose.model
**/

require('./models');

var startDb = new Promise(function(resolve, reject) {
  db.on('connected', resolve);
  db.on('error', reject);
});

console.log('Opening connection to mongodb');

startDb.then(function () {
  console.log('Connection to mongodb successful!');
});

module.exports = startDb;