var Router = require('express').Router();

Router.use('/form', require('./form'));

module.exports = Router;