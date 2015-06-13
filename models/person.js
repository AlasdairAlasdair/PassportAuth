var mongoose = require('mongoose');

module.exports = mongoose.model('Person',{
  p_id: String,
  name: String,
  info1: String,
  info2: String
});