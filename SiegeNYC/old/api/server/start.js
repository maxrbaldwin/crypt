var chalk = require('chalk');

var startDb = require('./db');
var app = require('./app');

var server = require('http').Server();

var PORT = process.env.PORT || 5000;

var createApplication = function() {
  server.on('request', app);
};

var startServer = function() {
    server.listen(PORT, function() {
        console.log(chalk.green('Server started on port', chalk.blue(PORT)));
    });
};

startDb.then(createApplication).then(startServer).catch(function(err){
  console.error(chalk.red(err.stack));
  process.kill(1);
});

// startDb.then(startServer).then(openSockets).catch(function(err) {
//     console.error(chalk.red(err.stack));
//     process.kill(1);
// });
