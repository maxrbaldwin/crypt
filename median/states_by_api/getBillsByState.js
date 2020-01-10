const async = require('async');
const request = require('request');
const elasticsearch = require('elasticsearch');
const ProgressBar = require('progress');
const { parseArray, parseObject } = require('./utils');
const { log } = require('./logger');
const { getRepsByStateOptions, getBillsByLegIDOptions, getBillDetailsByBillIDOptions} = require('./options');

// const client = new elasticsearch.Client({
// 	host: 'localhost:9200',
// 	log: 'trace'
// });

// const stateList = new Array("AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID", "IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY", "OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY");
const stateList = new Array("AK","AL","AR","AZ","CA","CO","CT");

const Progress = new ProgressBar('Current State :state : :process : :checkpoint [:bar] :percent', {
	complete: '=',
	incomplete: ' ',
	width: 40,
	total: stateList.length * 6,
})

async.each(stateList, function(state, stateCallback) {
	// Docs: http://caolan.github.io/async/docs.html#waterfall
    async.waterfall([
        function fetchRepsByState(callback) {
            let options = getRepsByStateOptions(state);
            
            Progress.tick({ state: state, process: 'Fetch Reps by state', checkpoint: 'start' });

            request(options, function(err, response, reps) {
                if (!err) {
                    Progress.tick({ state: state, process: 'Fetch Reps by state', checkpoint: 'end' });
                    callback(null, parseArray(reps));
                } else {
                    log('err', 'Error in rep by state request', err);
                    stateCallback(err);
                }
            });
        },
        function fetchBillsByLegID(reps, callback) {
        	Progress.tick({ state: state, process: 'Fetch Bills by Leg ID', checkpoint: 'start' });
        	// for each rep fetch the bills they have submitted
        	async.map(reps, function (rep, repCallback) {
        		let options = getBillsByLegIDOptions(rep);

        		request(options, function(err, response, bills) {
        			if (!err) {
                    	repCallback(null, parseArray(bills));
                	} else {
                    	log('err', 'Error in bill by rep request', err);
                	}
        		});
        	// when map is done, callback parent function
        	}, function getBillsByLegIDMapCallback(err, bills) {
        		if (!err) {
                    Progress.tick({ state: state, process: 'Fetch Bills by Leg ID', checkpoint: 'end' });
        			callback(null, bills[0])
        		} else {
        			log('err', 'Error in mapping of bills', err);
        			stateCallback(err)
        		}
        	});
        },
        function fetchBillsByBillID(bills, callback) {
        	Progress.tick({ state: state, process: 'Fetch Bills by Bill ID', checkpoint: 'start' });
        	// for each bill fetch the details of that bill
        	async.map(bills, function (bill, billCallback) {
        		let options = getBillDetailsByBillIDOptions(bill);
        	
        		request(options, function(err, response, bill) {
        			if (!err) {
                    	billCallback(null, parseObject(bill));
                	} else {
                    	log('err', 'Error in bill by rep request', err);
                    	stateCallback(err);
                	}
        		});
        	// when map is done, callback parent function
        	}, function getBillsByLegIDMapCallback(err, bills) {
        		if (!err) {
                    Progress.tick({ state: state, process: 'Fetch Bills by Bill ID', checkpoint: 'end' });
        			callback(null, bills)
        		} else {
        			log('err', 'Error in mapping of bills', err);
        			stateCallback(err)
        		}
        	});
        }
    ], function waterfallCallback(err, bills) {
    	if (!err) {
    		stateCallback(null, bills)
    	} else {
            stateCallback(err);
        }
    });
});