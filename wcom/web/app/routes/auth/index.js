var Router = require('express').Router();
var request = require('request-promise');

// www/auth
Router.get('/', function(req, res) {
    if (!req.query.ref) {
        request({
                uri: 'http://localhost:5000/api/auth/url'
            })
            .then(function(resp) {
                res.render('auth', {
                    authUrl: JSON.parse(resp).url
                });
            });

    } else {
    	res.render('home');
    }
});

module.exports = Router;
