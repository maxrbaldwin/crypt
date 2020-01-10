module.exports = {
    sass: {
        files: [
            '**/*.scss',
        ],
        tasks: ['sass'],
        options: {
            livereload: true
        }
    },
    react: {
    	files: [
    		'react/*.jsx',
    		'react/app/**/*.jsx'
    	],
    	tasks: ['browserify'],
    	options: {
    		livereload: true
    	}
    }
};
