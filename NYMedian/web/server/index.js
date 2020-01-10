var app = require('./app');

var server = require('http').Server();

var PORT = process.env.PORT || 5000;

server.on('request', app);

server.listen(PORT, function() {
    console.log('Server started on port ' + PORT);
});
