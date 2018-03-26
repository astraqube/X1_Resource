'use strict';

const Mongoose = require('mongoose');
const assert = require('assert');
const config = require('config');
const mongoConfig = config.get('mongo');
const fs = require('fs');
const ConnectionUtils =require('./ConnectionUtils.js');
const ca = [ fs.readFileSync(__dirname + "/cert/boons-mongodb-cert.crt") ];
const env = process.env.NODE_ENV || 'development';
// var options = process.env.NODE_ENV === "alpha" ? blumix_options : { useMongoClient : true };

var options = { useMongoClient : true };

const URI = ConnectionUtils.createMongoUri(mongoConfig)
console.log(" Mongo Connection Uri {}  , ", URI);
const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error'));
db.on('open', function (err) {
  console.log("Successfully Connected to MongoDB...URI = " + URI);
  console.log("Mongodb running in : " + env);
});
Mongoose.connect(URI, options);
exports.Mongoose = Mongoose;
