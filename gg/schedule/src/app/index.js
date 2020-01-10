const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
// ** App level middleware ** //
// configure the body parser
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// configure all routes
app.use('/', require('@routes'));

module.exports = app;