var Resource = require('../models/Resource');
var Category = require('../models/Category');

const hashPassword = require('../utils/UserUtils').hashPassword;

function ResourceDAO() { }

ResourceDAO.prototype.handleRegister = function (payload, callback) {

    let resource = new Resource();
    resource.email = payload.email;
    hashPassword(payload.password, (err, hash) => {
        if (err) {
            callback(err, null);
        }
        resource.password = hash;
        resource.save(function (err, data) {
            callback(err, data);
        });
    });
};

ResourceDAO.prototype.getAllUsers = function (callback) {
    Resource.find({}).populate('categories').exec((err, data) => {
       callback(err, data);
    });
};
ResourceDAO.prototype.getUserById = function (id, callback) {
    Resource.findOne({_id:id}).populate('categories').exec((err, data) =>{
        callback(err, data);
    });
};

ResourceDAO.prototype.updateLoginSattus = function (id, data, callback) {
    Resource.findOneAndUpdate({ "_id": id }, data, callback);
};

ResourceDAO.prototype.updateUserDetails = function (id, data, callback) {
    console.log(data);
    Resource.findOneAndUpdate({ "_id": id }, data,{ "new": true }, callback);
};

ResourceDAO.prototype.deactivateUserData = function (id, callback) {
    Resource.findOneAndUpdate({ "_id": id }, {is_active:false,is_deleted:true},{ "new": true }, callback);
};

ResourceDAO.prototype.handleCategory = function (id, payload, callback) {

   Resource.findOneAndUpdate({"_id":id}, { $push: {categories:{ $each:payload}} }, callback);


};



module.exports = ResourceDAO;
