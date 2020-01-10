module.exports = {
    app: {
        src: ['react/*.jsx', 'react/app/*.jsx', 'react/app/**/*.jsx'],
        dest: 'public/scripts/app.js',
        options: {
            transform: ['reactify']
        }
    }
};
