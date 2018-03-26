var async = require('async');

var AuthDAO = require("./../dao/AuthDAO");
var ResourceDAO = require("./../dao/ResourceDAO");
var authDAO = new AuthDAO();
var resourceDAO = new ResourceDAO();

function AuthService() { }

AuthService.prototype.handleRegister = function (payload, callback) {
  async.waterfall([
       function (counterDoc, cb) {
          // payload.id = counterDoc.counter;
          authDAO.handleRegister(payload, callback);
      }
  ], callback);
}

AuthService.prototype.getAllUsers = function (callback) {
    authDAO.getAllUsers(callback);
}


AuthService.prototype.updateLoginStatus = function (id, data, callback) {
    //TODO : Validations to be done here
    resourceDAO.updateLoginSattus(id, data, callback);
}

module.exports = AuthService;
