var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/storeapp');
var db = mongoose.connection;

var csvdata = require('csvdata');

var Product = require('../models/product.js');
var OrderItem = require('../models/orderitem.js');
var Order = require('../models/order.js');

Product.remove({})
.then(function(){
  return csvdata.load('example_data.csv');
})
.then(function(products){
  var productPromisesArray = products.map(function(product){
    return Product.create(product);
  });
  return Promise.all(productPromisesArray);
})
.then(function(records){
  console.log(`'Products' collection now contains ${records.length} records.`);
})
.catch(function(err){
  console.log("Hit an Error: ", err);
})
.then(function(){
  db.close();
});
