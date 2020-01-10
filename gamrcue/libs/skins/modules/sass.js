var fs = require('fs');
var Promise = require('bluebird');
var chalk = require('chalk');

var Sass = Promise.promisifyAll(require('node-sass'));

var mod = {
    sass: function(dirname, filename) {
        if (this.isFileSass(filename)) {
            this.compileSass(dirname, filename);
        } else {
            console.log(chalk.red('Ignoring file type'));
        }
    },
    isFileSass: function(file) {
        if (file.split('.')[1] === 'scss') {
            return true
        }
        return false
    },
    compileSass: function (dirname, filename) {
    	var path = 'sass/' + dirname + '/index.scss';

    	console.log(chalk.yellow(chalk.bold('sass/' + dirname + '/' + filename) + ' changed. Compling ' + chalk.bold('index.scss') + ' in ' + chalk.bold('sass/' + dirname) + ';'));

    	Sass.renderAsync({
    		file: path
    	}).then(function(result){
    		fs.writeFile('css/' + dirname + '.css', (result.css.toString()), function(err){
    			if (err) {
    				console.log(chalk.red.bold('COMPLING ERROR: ') + err);
    			} else {
    				console.log(chalk.green('Complied ' + chalk.bold(path) + ' to ' + chalk.bold('css/' + dirname + '.css')));
    			}
    		});
    	}).catch(function(err){
    		console.log(chalk.red(err));
    	});
    }
}

module.exports = mod;
