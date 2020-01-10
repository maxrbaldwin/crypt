var Router = require('express').Router();

Router.get('/search', require('./search'));

module.exports = Router;