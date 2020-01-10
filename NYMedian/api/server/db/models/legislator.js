var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var legislatorsSchema = new Schema({});

mongoose.model('Legislator', legislatorsSchema);