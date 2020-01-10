var Router = require('express').Router();

Router.get('/', function(req, res) {
	res.render('home');
});

Router.get('/sign-up', function(req, res) {
	res.render('sign-up');
});

Router.use('/api', require('./api'));

module.exports = Router;
