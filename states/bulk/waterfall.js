const request = require('request');
const async = require('async');
const zip = require('node-zip');

const zipOptions = { base64: false };

// const stateList = new Array("AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID", "IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY", "OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY");
const stateList = new Array("NY");

async.each(stateList, function (state, stateCallback) {
	async.waterfall([
		function fetchBulkData() {
			var options = {
				url: `http://static.openstates.org/downloads/2016-09-02-${state.toLowerCase()}-json.zip`,
				apiKey: 'c833fc6b098b4c2d9fbcaf1087f1ff29',
				headers: {
					"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.46 Safari/537.36"
				}
			}

			request(options, function (err, response, body) {
				let unzipped = new zip(body, zipOptions);
				console.log(unzipped);
			});
		},
	], function (err, result) {

	});
});