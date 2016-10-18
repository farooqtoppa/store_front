var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

module.exports = mongoose.model('Product', productSchema);
