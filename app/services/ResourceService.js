var async = require('async');



var ResourceDAO = require("./../dao/ResourceDAO");
var resourceDAO = new ResourceDAO();

function ResourceService() { }

ResourceService.prototype.handleRegister = function (payload, callback) {

    async.waterfall([
        function (counterDoc, cb) {
            // payload.id = counterDoc.counter;
            resourceDAO.handleRegister(payload, callback);
        }
    ], callback);
};

ResourceService.prototype.getAllUsers = function (callback) {
    resourceDAO.getAllUsers(callback);
};

ResourceService.prototype.getUserById = function (id, callback) {
    resourceDAO.getUserById(id, callback);
};

ResourceService.prototype.updateUserData = function (id, userdetail, callback) {
    delete userdetail.password;
    resourceDAO.updateUserDetails(id, userdetail, callback);
};

ResourceService.prototype.deactivateUserData = function (id, callback) {
    resourceDAO.deactivateUserData(id, callback);
};

ResourceService.prototype.handleCategory = function (id, payload, callback) {
    console.log("im here");

    async.waterfall([
        function (counterDoc, cb) {
            // payload.id = counterDoc.counter;
            resourceDAO.handleCategory(id, payload, callback);
        }
    ], callback);
};




//
// ResourceService.prototype.handleLinkedin = function (payload, callback) {
//     async.waterfall([
//         function (counterDoc, cb) {
//             // payload.id = counterDoc.counter;
//             resourceDAO.handleRegister(payload, callback);
//         }
//     ], callback);
// };





module.exports = ResourceService;
