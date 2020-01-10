const fs = require('fs');
const path = require('path');

const zips = path.join(__dirname, '/zips');

const goodZips = {};

// run script
function init() {
	let dirs = getAllZips(zips);
	let cleanDirs = filterNull(dirs);
	
	getAllFifty(cleanDirs);

	return goodZips;
}

function getAllZips(directory) {
	let dirs = getDirectories(directory);

	// dir is each dated folder
	return dirs.map(function(dir) {
		let currentDir = path.join(zips, dir);
		// every state in each dated folder
		let stateDirInDateDir = fs.readdirSync(currentDir);
		let fullDirPath = getFullDirPath(currentDir, stateDirInDateDir);
		
		return getZips(fullDirPath);
	});
}

function filterNull(dirs) {
	return dirs.filter(function(array) {
		return (array.length) ? true : false;
	});
}

function getAllFifty(dirs) {
	dirs.forEach(function(dir) {
		for(var i=0; i < dir.length; i++) {
			let state = dir[i].split('/')[10];

			if(!goodZips[state]) {
				goodZips[state] = dir[i];
			}
		}
	});
}

// http://stackoverflow.com/questions/18112204/get-all-directories-within-directory-nodejs
function getDirectories(srcpath) {

	let getDirectory = (srcpath) => {
		return fs.readdirSync(srcpath).filter(function(file) {
			return fs.statSync(path.join(srcpath, file)).isDirectory();
		});
	}

	if(Array.isArray(srcpath)) {
		return srcpath.map(function(src) {
			return getDirectory(src)
		});
	}

	return getDirectory(srcpath);
}

// dir is array
function getFullDirPath(cwd, dirs) {
	if(Array.isArray(dirs)) {
		return dirs.map(function(dir) {
			if(dir) {
				return path.join(cwd, dir);
			}
		});
	}
	console.log(`${dirs}\n is not an array`)
	return null;
}

function getZips(fullDirPaths) {
	return fullDirPaths.map(function(folder) {
		if(fs.statSync(folder).isDirectory()) {
			let zipInFolder = fs.readdirSync(folder);

			if(Array.isArray(zipInFolder) && zipInFolder.length === 1) {
				let file = zipInFolder.toString();
				if(path.extname(file) === '.zip') {
					return path.join(folder, file);
				}
			}
		}
	}).filter(function(file) {
		return (file) ? true : false;
	});
}

module.exports = init();