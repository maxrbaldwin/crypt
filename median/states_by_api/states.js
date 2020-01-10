var async = require('async');
var Promise = require('bluebird');
var request = require('request');
var fs = require('fs');

var Async = Promise.promisifyAll(async);

var apiKey = 'c833fc6b098b4c2d9fbcaf1087f1ff29';

var reps = [];
var bills = [];
var billDetails = [];

// var functionsList = [asyncOperation(options, )]

// var stateList = new Array("AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID", "IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY", "OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY");
var stateList = new Array("CO");

/* 
method: log
Reference: https://docs.nodejitsu.com/articles/file-system/how-to-write-files-in-nodejs 
Example: log('filename', 'message', {log object});
*/
var log = function(file, info, log) {
    var fileName = `${file}.txt`;

    fs.writeFile(fileName, log, function(err) {
        if (err) return console.log(err);
        console.log(`Error: ${info} : ${log} : written to ${fileName}`);
    });
};

var isJSONString = function(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true
}

var APIScrape = function(options, parsingFunction) {
    this.options = options;
    this.parsingFunction = parsingFunction;
    this.data = [];
}

APIScrape.asyncIterator = function(value, callback) {
    var options = this.options;

    request(options, function(err, response, results) {
        if (!err) {
            this.parsingFunction(results);
            callback();
        } else {
            log('err', `value: ${JSON.stringify(value)}`, err);
            callback('1: ', err);
        }
    });
}

var fetchRepsByState = function(state, callback) {
    var options = {
        url: 'openstates.org/api/v1/legislators/',
        qs: {
            state: state,
            apikey: apiKey,
        }
    };

    var pushReps = function(results) {
        var parsedResults;

        if (isJSONString(results)) {
            parsedResults = JSON.parse(results);

            if (parsedResults.length) {
                parsedResults.forEach(function(el, i) {
                    reps.push(el);
                });
            }
        }
    };

    request(options, function(err, response, results) {
        if (!err) {
            pushReps(results);
            callback();
        } else {
            log('err', 'Something broke', err);
            callback('1: ', err);
        }
    });
};

var fetchBillsByLegId = function(rep, callback) {
    var options = {
        url: 'http://openstates.org/api/v1/bills/',
        qs: {
            apikey: apiKey,
            state: rep.state,
            sponsor_id: rep.leg_id,
            chamber: rep.chamber
        }
    }

    var pushBills = function(results) {
        var parsedResults;

        if (isJSONString(results)) {
            parsedResults = JSON.parse(results);

            if (parsedResults.length && Array.isArray(parsedResults)) {
                parsedResults.forEach(function(el, i) {
                    bills.push(el);
                });
            }
        }
    };

    request(options, function(err, response, results) {
        if (!err) {
            pushBills(results)
            callback();
        } else {
            console.log('2: ', err);
            callback(err);
        }
    });
};

var fetchBillByBill = function(bill, callback) {
    var options = {
        url: 'http://openstates.org/api/v1/bills/' + bill.state + '/' + bill.session + '/' + encodeURIComponent(bill.bill_id) + '/',
        qs: {
            apikey: apiKey,
        }
    }

    var pushBillDetails = function(results) 

    request(options, function(err, response, results) {
        if (!err) {
            pushBillDetails(results)
            callback();
        } else {
            console.log('3: ', err);
            callback(err);
        }
    });
}

Async.each(stateList, function(state, eachCallback) {
    Async.waterfall([
        function(callback) {
            var options = get

            request(options, function(err, response, results) {
                if (!err) {
                    pushReps(results);
                    callback();
                } else {
                    log('err', 'Something broke', err);
                    callback('1: ', err);
                }
            });
        },
        function(callback) {

        }
    ]);
});
