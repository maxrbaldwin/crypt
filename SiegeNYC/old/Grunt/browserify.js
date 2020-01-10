var alias = require("browserify-alias-grunt");

module.exports = function(grunt, options) {
    app: {
        files: [{
        	expand: true,
        	cwd: 'react/',
        	src: ['*.jsx'],
        	dest: 'public/js/',
        	ext: '.js'
        }],
        options: {
            transform: ['reactify'],
            alias: alias.map(grunt, {
                // alias all js files in the 'app' directory 
                cwd: "src/js/app",
                src: ["**/*.js"],
                dest: ""
            })
        }
    }
};
