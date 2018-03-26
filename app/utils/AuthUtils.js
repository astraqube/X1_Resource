'use strict';

const Boom = require('boom');
const Resource = require('../models/Resource');
const jwt = require('jsonwebtoken');
const ModelConstants = require('../constants/ModelConstants');
const secret = ModelConstants.AUTH_KEY;
const expiration_days = ModelConstants.AUTH_EXPIRATION_DAYS;
const bcrypt = require('bcryptjs');



function rand() {
    return Math.random().toString(36).substr(2); // remove `0.`
}

function token() {
    return rand() + rand(); // to make it longer
}


function verifyCredentials(req, res) {

  const password = req.payload.password;
  Resource.findOneAndUpdate({ email: req.payload.email,is_active:true
  },{login_status:1,token:token()}).populate('categories').exec((err, resource) => {
    if (resource) {
     bcrypt.compare(password, resource.password, (err, isValid) => {
              if (isValid) {

                  return res(resource);
              }
              else {
                  return res(Boom.badRequest('Incorrect password!'));
              }
          });
    } else {
      return res(Boom.badRequest('Incorrect username or email!'));
    }
  });
}


function createToken(user) {
  console.log("token create ::", user);

  let scopes;
  let one_day_secs = 60 * 60 * 24;
  // Sign the JWT
    return jwt.sign({ id: user._id, email: user.email, scope: scopes }, secret, { algorithm: 'HS256', expiresIn: one_day_secs * expiration_days } );
}


function hashPassword(password, cb) {
  // Generate a salt at level 10 strength
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      return cb(err, hash);
    });
  });
}

module.exports = {
  // verifyUniqueUser: verifyUniqueUser,
  verifyCredentials: verifyCredentials,
  createToken: createToken,
  hashPassword: hashPassword
}
