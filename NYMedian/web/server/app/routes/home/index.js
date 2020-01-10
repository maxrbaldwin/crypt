var Router = require('express').Router();

Router.get('/', function(req, res) {
	res.render('home');
});

module.exports = Router;