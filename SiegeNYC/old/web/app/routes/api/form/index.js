var Router = require('express').Router();
var initial_state = require('./initial_state');

Router.get('/', function(req, res) {
	res.send(initial_state);
});

module.exports = Router;