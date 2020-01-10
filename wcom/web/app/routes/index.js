var Router = require('express').Router();

Router.use('/auth', require('./auth'));
Router.use('/u', require('./home'));

module.exports = Router;