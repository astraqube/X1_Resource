var User = require('../models/User');
const hashPassword = require('../utils/AuthUtils').hashPassword;

function AuthDAO() { }

AuthDAO.prototype.handleRegister = function (payload, callback) {
  console.log("handleRegister payload" + JSON.stringify(payload));
  let user = new User();
  user.id = payload.id;
  user.email = payload.email;
  user.username = payload.username;
  user.admin = false;
  hashPassword(payload.password, (err, hash) => {
    if (err) {
      callback(err, null);
    }
    user.password = hash;
    user.save(function (err, data) {
        callback(err, data);
    });
  });
}

AuthDAO.prototype.getAllUsers = function (callback) {
  User.find({}, (err, data) => {
      console.log("AuthDAO=" + JSON.stringify(data));
      console.log("err=" + JSON.stringify(err));
      callback(err, data);
  });
}
AuthDAO.prototype.handleTest = function (payload, callback) {
    console.log("handleRegister payload" + JSON.stringify(payload));
    let test = new Test();

    test.email = payload.email;
    test.username = payload.username;
    test.save(function (err, data) {
        callback(err, data);
    });


}


module.exports = AuthDAO;
