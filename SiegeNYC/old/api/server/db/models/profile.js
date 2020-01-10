var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ProfileSchema = new Schema({
  gamerTag: String,
  rank: Number,
  eslRank: String,
  platform: String,
  country: String,
  hours: [Number],
  operators: {
  	attackers: [Number],
  	defenders: [Number]
  }
});

mongoose.model('Profile', ProfileSchema);