const Router = require('express').Router();
const user = require('google-auth-module');

// api/auth?code=1234567
Router.get('/', function(req, res) {
    var code = req.query.code;

    if (code) {
        // Get files, save and then redirect
        // Send ref with query string, instead of code
        user.getAccessToken(code, function(userWithToken) {
            res.redirect('http://localhost:5001/u/' + encodeURIComponent(userWithToken._id));
        });
    } else {
        res.redirect('http://localhost:5001/auth');
    }
});

// api/auth/url
Router.get('/url', function(req, res) {
    res.send({
        url: user.getAuthUrl()
    });
});

module.exports = Router;
