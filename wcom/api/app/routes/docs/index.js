const Router = require('express').Router();
const user = require('google-auth-module');

// api/docs/:id
Router.get('/:id', function (req, res) {
	var docId = req.params.id;
	var userId = req.query.user;

	user.fetchOneDocById(docId, userId, function(doc) {
		console.log(doc);
		res.send(docId);
	});
});

module.exports = Router;