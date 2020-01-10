var Router = require('express').Router();
var request = require('request-promise');

// www/
Router.get('/', function(req, res) {
    res.send('home');
});

Router.get('/:id', function(req, res) {
    // request({
    //         uri: 'http://localhost:5000/api/user/' + req.params.id
    //     })
    //     .then(function(resp) {
    //         res.render('home', {
    //         	files: JSON.parse(resp).files
    //         });
    //     });
    res.render('home');
});

module.exports = Router;
