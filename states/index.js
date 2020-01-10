const client = require('./aws')();

client.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: Infinity
}, function(error) {

    if (error) {
        console.trace(error);
    } else {
        console.log('All is well');
    }
});
