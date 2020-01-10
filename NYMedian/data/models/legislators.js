var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Mixed = Schema.Types.Mixed;

var legislatorsSchema = new Schema({
	zip_code: ObjectId,
	data: Mixed
});

mongoose.model('Legislator', legislatorsSchema);