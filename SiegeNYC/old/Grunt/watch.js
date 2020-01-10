module.exports = {
    react: {
        files: [
            '**/*.jsx',
            '*.jsx'
        ],
        tasks: ['browserify'],
        options: {
            livereload: true
        }
    },
    sass: {
        files: [
            '**/*.scss',
        ],
        tasks: ['sass'],
        options: {
            livereload: true
        }
    },
};
