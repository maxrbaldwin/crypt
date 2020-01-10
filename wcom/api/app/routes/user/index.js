var Router = require('express').Router();
var user = require('google-auth-module');

// api/user/:id
Router.get('/:id', function(req, res) {
    var id = req.params.id;

    if (id) {
        user.fetchUserDocsById(id, function(userWithDocs) {
            res.send(userWithDocs);
        });
    }
});

module.exports = Router;