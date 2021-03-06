const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
// ** App level middleware ** //
// configure the body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: false }));
// configure all routes
app.use('/', require('@routes'));

module.exports = app;