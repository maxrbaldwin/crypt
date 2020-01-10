var app = require('./app');

var server = require('http').Server();

var PORT = process.env.PORT || 5001;

server.on('request', app);

server.listen(PORT, function() {
    console.log('Web server started on port ' + PORT);
});