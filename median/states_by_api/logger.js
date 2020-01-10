const fs = require('fs');
/* 
method: log
Reference: https://docs.nodejitsu.com/articles/file-system/how-to-write-files-in-nodejs 
Example: log('filename', 'message', {log object});
*/
module.exports.log = function (file, info, log) {
	let fileName = `${file}.txt`;
	let message = `Error: ${info} : ${log} : written to ${fileName} \n`

	fs.appendFileSync(fileName, message);
};