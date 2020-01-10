var Router = require('express').Router();

Router.get('/', require('./home'));
Router.use('/api', require('./api'));

module.export = Router;