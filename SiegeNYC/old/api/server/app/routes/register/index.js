var Router = require('express').Router();

Router.get('/', function(req, res) {
	console.log(req.query);
	res.send('ok').status(200);
});

module.exports = Router;