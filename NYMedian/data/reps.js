var mongoose = require('mongoose');
var async = require('async');
var Promise = require('bluebird');
var Request = require('request');

var db = mongoose.connect('mongodb://localhost:27017/NYMedian').connection;

require('./models/zip');
require('./models/legislators');

var Zip = Promise.promisifyAll(mongoose.model('Zip'));
var Leg = Promise.promisifyAll(mongoose.model('Legislator'));

var key = '5e2583f2e8a842ccb0ffbfe9ad8cd4bc';
var host = 'http://openstates.org';

var legislatorEndpoint = function(item) {
    let route = '/api/v1/legislators/geo/';
    return host + route + '?lat=' + item.lat + '&long=' + item.long + '&apikey=' + key;
}

var billsEndpoint = function(item) {
    let route = '/api/v1//bills/';
    return host + route + '?sponsor_id=' + item.leg_id + '&apikey=' + key;
}

var billByLegEndpoint = function(item) {
    let route = '/api/v1//bills/' + item.state + '/' + item.session + '/' + encodeURIComponent(item.bill_id.trim()) + '/';
    return host + route + '?apikey=' + key

}

var handleError = function(err) {
    console.log(err);
    process.exit(0);
}

var legislators = [];
var legBills = [];
var billByLeg = [];

var count = 0;

// Get all geo information about zip codes
Zip.findAsync({})
    .then(function(results) {
        console.log('Results...');
        async.eachSeries(results, function(item, callback) {
            // Get legislators based on lat and long of zip code
            Request.get(legislatorEndpoint(item), function(err, response, body) {
                let resBody = JSON.parse(body);

                if (err) {
                    handleError(err);
                }

                for (let i = 0; i < resBody.length; i++) {
                    let newLeg = resBody[i];
                    newLeg.zip_code = item._id;
                    legislators.push(newLeg);
                }

                count = count + 1
                console.log('Legislators: ' + count + ' ' + item.zip_code);
                callback();
            });
            // done async.eachSeries
        }, function() {
            async.eachSeries(legislators, function(item, callback) {
                Request.get(billsEndpoint(item), function(err, response, body) {
                    console.log(2);
                    if (err) {
                        handleError(err);
                    }

                    for (let i = 0; i < body.length; i++) {
                        legBills.push(body[i])
                    }

                    count = count + 1
                    console.log('Bills by Legislators: ' + count);
                    callback();
                });
            }, function() {
                async.eachSeries(legBills, function(item, callback) {
                    Request.get(billByLegEndpoint(item), function(err, response, body) {
                        console.log(3);
                        if (err) {
                            handleError(err);
                        }

                        for (let i = 0; i < body.length; i++) {
                            billByLeg.push(body[i]);
                        }

                        count = count + 1
                        console.log('Bills by Legislators: ' + count);
                        callback();
                    });
                });
            }, function() {
                async.eachSeries(legislators, function(item, callback) {
                    Leg.findOneAndUpdateAsync({
                            'leg_id': item.leg_id
                        }, item, {
                            upsert: true,
                            new: true,
                            setDefaultsOnInsert: true,
                        })
                        .then(function(result) {
                            console.log(result);
                            return callback()
                        })
                        .catch(function(err) {
                            console.log(err);
                            process.kill(0);
                        });
                }, function() {
                    
                });
            });
        });
    });
});
