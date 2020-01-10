var Router = require('express').Router();

Router.use('/auth', require('./auth'));
Router.use('/user', require('./user'));
Router.use('/docs', require('./docs'));

module.exports = Router;