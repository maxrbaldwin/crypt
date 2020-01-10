const async = require('async');
const fs = require('fs');
const gfs = require('graceful-fs');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const shortid = require('shortid');

const zip = require('adm-zip');

const EventEmitter = require('events');
const event = new EventEmitter();

const client = require('./aws')();

const { 
	scrapeLinks,
	downloadsOptions,
	getFetchLinkOptions,
	getFileType
} = require('./helpers');

const verb = 'start';

// const flags = require('./flags');
// const flags = flags(process.argv);

// sends HTTP request to openstates.org/downloads. Scrapes zip file links
event.on('start', function () {
	console.log('start');
	request(downloadsOptions, function (err, response, body) {
		let $ = cheerio.load(body);
		let rows = $('#download_list').find('tr');
		// get first one for testing
		let links = scrapeLinks($, rows, ['New-Jersey']);
		console.log('emit links');
		event.emit('links', links);
	});
});

// Take zip file links, sends HTTP request to them, saves zip file.
event.on('links', function(links) {
	let d = new Date();
	let stamp = `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}-z${d.getHours()}:${d.getMinutes() + 1}:${d.getSeconds() + 1}`;
	console.log('links');
	async.map(links, function (link, linkCallback) {
		request(getFetchLinkOptions(link), function(err, response, body) {
			let root = `${__dirname}/zips`;
			let stampDir = `${root}/${stamp}`;
			let stateDir = `${stampDir}/${link.state}`;
			let newFile = `${stateDir}/${link.state}.zip`;

			if(err) {
				console.log(err);
			}

			// make new dirs
			if (!fs.existsSync(stampDir)) {
				fs.mkdirSync(stampDir);
			}

			fs.mkdirSync(stateDir);
			// write zip file
			fs.writeFileSync(newFile, body);
	
			linkCallback(null, { state: link.state, path: newFile, dir: stateDir });
		});
	}, function (err, files) {
		console.log('done links')
		if (err) throw err;
		event.emit('unzip', files);
	});
});

// Unzips zip file. Passes along paths to files that were in zip.
event.on('unzip', function (files) {
	console.log('files');
	async.map(files, function (file, fileCallback) {
		let fileDir = file.dir;
		let stateZip = new zip(file.path);
		let filesInZip = stateZip.getEntries();
		
		let newFiles = filesInZip.filter(function(zipEntry) {
			return (zipEntry.entryName === 'metadata.json' ? null : true);
		}).map(function(zipEntry) {
			let entryName = zipEntry.entryName
			let dataType = getFileType(entryName);

			return { 
				path: `${fileDir}/${entryName}`,
				dataType: dataType,
				state: file.state
			}
		});

		try {
			stateZip.extractAllTo(fileDir);
			fileCallback(null, newFiles);
		} catch (e) {
			console.log('tried: ', file.state);
			fileCallback(null, []);		
		}

	}, function (err, newFiles) {
		if (err) throw err;
		event.emit('readFiles', newFiles[0]);
	});
});

// Reads files by path. All result in JSON.
event.on('readFiles', function (newFiles) {
	let noEmpty = newFiles.filter(newFiles, function(file) {
		if(file.length) {
			return file;
		}
	});

	async.map(noEmpty, function(file, filePathCallback) {
		gfs.readFile(file.path, (err, data) => {
			if (err) throw err;
			filePathCallback(null, { fileData: new Buffer(data).toString(), dataType: file.dataType, state: file.state });
		});
	}, function (err, filesData) {
		console.log('done mapping');
		if (err) throw err;
		event.emit('sortByType', filesData);
	});
});

// Sorts and returns an object elasticsearch indexs to bulk indexing
event.on('sortByType', function (fileData) {
	console.log('sort');
	let bulk = [];
	let types = [];

	fileData.forEach(function(el, i) {
		let action = {
			index: {
				_index: el.dataType,
				_type: el.state
			}
		}

		// https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference-2-3.html#api-bulk-2-3
		types.push(action);
		types.push(el.fileData);

		// if types array is greater than 5mb, push into bulk and empty it.
		if ((types.toString().length * 8) > 625000) {
			bulk.push(types);
			types = [];
		}
	});

	event.emit('bulk', bulk);
});

event.on('bulk', function(indexes) {
	async.each(indexes, function(index, indexCallback) {
		client.bulk({
			body: index
		}, function(err, resp) {
			if(!err) {
				indexCallback()
			} else {
				console.log(err);
			}
		});
	}, function (err) {
		if (err) {
			console.log(err)
		} else {
			console.log('done?')
		}
	});
});

event.on('delete', function() {
	client.indices.delete({
	    index: '_all'
	}, function(err, res) {

	    if (err) {
	        console.error(err.message);
	    } else {
	        console.log('Indexes have been deleted!');
	    }
	});
});

event.on('create', function(indexName) {
	client.indices.create({ 
		index: indexName 
	}, function (err, resp) {
		if (err) {
	        console.error(err.message);
	    } else {
	        console.log('Indexes have been deleted!');
	    }
	});
});

event.on('getAll', function() {
	client.indices.getAliases({}, function(err, resp) {
		if (err) {
	        console.error(err.message);
	    } else {
	        console.log('All: ', resp);
	    }
	});
});

event.emit(verb);