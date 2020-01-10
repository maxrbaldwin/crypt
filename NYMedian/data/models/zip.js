var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var zipSchema = new Schema({
    zip_code: String,
    city: String,
    state: String,
    state_abv: String,
    county: String,
    lat: String,
    long: String
});

mongoose.model('Zip', zipSchema);
