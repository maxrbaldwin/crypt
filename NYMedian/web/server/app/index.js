var express = require('express');
var swig = require('swig');

var app = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

// Views cache
app.set('view cache', false);
swig.setDefaults({
    cache: false
});

app.use('/', require('./routes/home'));

module.exports = app;