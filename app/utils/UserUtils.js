'use strict';

const Boom = require('boom');

const ModelConstants = require('../constants/ModelConstants');
const Resource = require('../models/Resource');
const jwt = require('jsonwebtoken');
const secret = ModelConstants.AUTH_KEY;
const expiration_days = ModelConstants.AUTH_EXPIRATION_DAYS;
const bcrypt = require('bcryptjs');


function verifyUniqueUser(req, res) {

    Resource.findOne({ email: req.payload.email
    }, (err, resource) => {
        // Check whether the username or email
        // is already taken and error out if so
        if (resource) {

            if (resource.email === req.payload.email) {
                return res(Boom.badRequest('Email taken'));
            }
        }
        // If everything checks out, send the payload through
        // to the route handler
        return res(req.payload);
    });
}
function createToken(user) {
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

function verifyUniqueUserById(req, res) {
    console.log(req.params.id);

    Resource.findOne({ _id: req.params.id
    }, (err, resource) => {
        // Check whether the username or email
        // is already taken and error out if so
        if (resource==undefined) {
            return res(Boom.badRequest('Invalid user'));
        }
        // If everything checks out, send the payload through
        // to the route handler
        return res(req.payload);
    });
}





module.exports = {
    verifyUniqueUser: verifyUniqueUser,
    createToken: createToken,
    hashPassword: hashPassword,
    verifyUniqueUserById:verifyUniqueUserById
}
