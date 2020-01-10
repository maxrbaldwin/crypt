module.exports = {
	sass: {
		files: [{
			expand: true,
			cwd: 'sass',
			src: ['*.scss'],
			dest: 'public/css/',
			ext: '.css'
		}]
	}
}