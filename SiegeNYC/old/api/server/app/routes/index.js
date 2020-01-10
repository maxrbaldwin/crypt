var Router = require('express').Router();

Router.use('/api/v1/register', require('./register'));

module.exports = Router;
