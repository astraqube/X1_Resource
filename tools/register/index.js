module.exports.plugins = [
  require('inert'),
  require('vision'),
  require('./good-plugin'),
  require('./hapi-swagger-plugin'),
  require('hapi-auth-jwt')
];
