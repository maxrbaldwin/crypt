module.exports = {
    app: {
        files: [{
        	expand: true,
        	cwd: 'lib/components',
        	src: ['*.jsx'],
        	dest: 'public/js/',
        	ext: '.js'
        }],
        options: {
            transform: ['reactify']
        }
    }
};
