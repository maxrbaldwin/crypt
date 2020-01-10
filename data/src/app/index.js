const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const env = process.env.environment;
// configure the body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// configure all routes
app.use('/', require('@routes'));

module.exports = app;