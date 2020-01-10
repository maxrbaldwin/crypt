var fs = require('fs');
var chalk = require('chalk');
var sassMod = require('./modules/sass.js');

fs.readdir('sass', function (err, directories){
	if (err) throw err;

	directories.forEach(function(dirname){
		fs.watch('sass/' + dirname, function(e, filename){
			sassMod.sass(dirname, filename);
		});
	});
});

console.log(chalk.green('Watching...'));
