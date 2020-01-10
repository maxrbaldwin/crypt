var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	docs: [],
	auth: {},
    ref: { type: String, default: id.generate() },
    stamp: { type: Date, default: Date.now },
    in : { type: Boolean, default: false }
});

mongoose.model('User', UserSchema);
