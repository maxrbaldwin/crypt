/* 
	This is the start up script for running the apps on your local machine

	Script Should: 
	-	Start the API First. It is a dependency for all apps
	-	Then other apps come through as parameters.
	-	Start all with PM2 and Async.
*/

var chalk = require('chalk');
var Promises = require('bluebird');
var Async = require('async');

var PM2 = Promises.promisifyAll(require('pm2'));

var apps = {
	running: [
		// API app will always run
		'./api/start.js',
	],
    available: {
    	web: './web/start.js'
    }
}

process.argv.forEach(function (val, i, array) {
	if (apps.available[val]) {
		apps.running.push(apps.available[val]);
	}
});

// Connect to PM2
PM2.connectAsync()
	.then(function (){
	// Iterate over apps that are passed in
	Async.eachSeries(apps.running, function (app, callback) {
		PM2.startAsync({
			script: app
		})
		.then(function(){
			// If the app starts, console log and callback to async
			console.log(chalk.green('started ' + app));
			callback();
		})
		.catch(function(err){
			console.log(chalk.red('Error: ' + err.msg + '\nApp: ' + app));
			// on error exit
			process.exit(0);
		});
	}, function () {
		// If it is all a success exit
		process.exit(1);
	});
});
