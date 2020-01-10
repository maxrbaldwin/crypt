var Router = require('express').Router();

Router.get('/zip', function(req, res) {
	var zip = req.query.zip_code;
});

module.exports = Router;