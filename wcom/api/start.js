// var startDb = require('./db');
var app = require('./app');

var server = require('http').Server();

var PORT = process.env.PORT || 5000;

server.on('request', app);

server.listen(PORT, function() {
    console.log('API server started on port ' + PORT);
});

// var createApplication = function() {
//   server.on('request', app);
// };

// var startServer = function() {
//     server.listen(PORT, function() {
//         console.log('API server started on port ' + PORT);
//     });
// };

// // startDb.then(createApplication).then(startServer).catch(function(err){
// //   console.error(err.stack);
// //   process.kill(1);
// // });
