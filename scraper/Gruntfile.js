module.exports = function(grunt) {
    var options = {
      config: {
        src: './Grunt/*.js'
      },
      pkg: grunt.file.readJSON('package.json')
    };
  
    var config = require('load-grunt-config')(grunt, options);
  
    grunt.initConfig(config);
  
    grunt.registerTask('default', ['chrome_extension_reload']);
  };