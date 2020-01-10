var fs = require('fs');
var csv = require('csv');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var async = require('async');

var file = 'post_codes.csv';

var parentArray = [];
var zipObject = {};

var db = mongoose.connect('mongodb://localhost:27017/NYMedian').connection;

var handleError = function(err) {
    console.log('ERROR: ' + err);
    process.exit(1);
}

require('./zip');

var Zip = Promise.promisifyAll(mongoose.model('Zip'));

var setInObject = function(el, i) {
    switch (i) {
        case 0:
            zipObject.zip_code = el;
            break;
        case 1:
            zipObject.city = el;
            break;
        case 2:
            zipObject.state = el;
            break;
        case 3:
            zipObject.state_abv = el;
            break;
        case 4:
            zipObject.county = el;
            break;
        case 5:
            zipObject.lat = el;
            break;
        case 6:
            zipObject.long = el;
            break;
    }
}

fs.readFile(file, function(err, data) {
    if (err) handleError(err);

    csv.parse(data, function(err, data) {
        if (err) handleError(err);

        async.forEachOf(data, function(dataArray, i, callback1) {
            async.forEachOf(dataArray, function(el, x, callback2) {
                let item;

                // If there is only whitespace return
                if (!/\S/.test(el)) {
                    return callback2();
                    // If there is a semicolon in the string
                } else if (el.indexOf(';') > -1) {
                    // If there is more than one semicolon that means there is a line of them
                    if (el.indexOf(';;') > -1) {
                        return callback2();
                        // if there is just a semicolon, remove it and replace it with a space
                    } else {
                        item = el.split(';').join(' ');
                        setInObject(item, x);
                        return callback2();
                    }
                }
                // otherwise just add it to the zip object
                setInObject(el, x);
                return callback2();
            });

            Zip.findOneAndUpdateAsync({
                    'zip_code': zipObject.zip_code
                }, zipObject, {
                    upsert: true,
                    new: true,
                    setDefaultsOnInsert: true,
                })
                .then(function(result) {
                    console.log(result);
                    return callback1()
                })
                .catch(function(err) {
                    console.log(err);
                    process.kill(0);
                });
        });
    });

});
