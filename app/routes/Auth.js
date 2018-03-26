//Imports
const Boom = require('boom');
const ResponseHandler = require('../handlers/ResponseHandler.js');
const ERROR_CONSTANTS = require('../constants/ErrorMessageConstants');
let AuthService = require("../services/AuthService");
let authService = new AuthService();
const Joi = require('joi');
const createUserSchema = require('../validators/createUser').createUserSchema;
const createTestSchema = require('../validators/createUser').createTestSchema;
const verifyUniqueUser = require('../utils/AuthUtils').verifyUniqueUser;
const verifyCredentials = require('../utils/AuthUtils').verifyCredentials;
const createToken = require('../utils/AuthUtils').createToken;
const authenticateUserSchema = require('../utils/AuthUtils').authenticateUser;
let ResourceService = require("../services/ResourceService");
const APIkeyConstants = require('../constants/APIKeyConstants');
let resourceService = new ResourceService();
const verifyUniqueTest = require('../utils/AuthUtils').verifyUniqueTest;

//Return return user inform when login success
module.exports.handleLogin = () => {
    return {
        auth:false,
        // "tags" enable swagger to document API
        tags: ['api'],
        description: 'Login Handler',
        notes: 'Returns user information when login is successful',
        pre: [
            { method: verifyCredentials, assign: 'user' }
        ],
        handler: (request, reply) => {
            let data = {
                id_token: createToken(request.pre.user), //request.pre.user
                userInfo: request.pre.user
            };
            reply(ResponseHandler.handleSuccessResponse(request, data)).code(201);
        },
        // Validate the payload against the Joi schema
        validate: {
            payload: authenticateUserSchema
        }
    };
};



// module.exports.linkedinLogin = () => {
//     return {
//         auth:false,
//         // "tags" enable swagger to document API
//         tags: ['api'],
//         description: 'Linkedin Login Handler',
//         notes: 'Returns user information when login is successful',
//         pre: [ ],
//         handler: (request, reply) => {
//             console.log("i m here");
//             passport.authenticate('linkedin');
//         },
//         // Validate the payload against the Joi schema
//
//     };
// };

// module.exports.callbackLinkden = () => {
//     return {
//         auth:false,
//         // "tags" enable swagger to document API
//         tags: ['api'],
//         description: 'Linkedin Login Handler',
//         notes: 'Returns user information when login is successful',
//         pre: [ ],
//         handler: (request, reply) => {
//             console.log("i m also here");
//             passport.authenticate('linkedin')(request, reply, function (user) {
//                 console.log(user);
//             });
//         },
//         // Validate the payload against the Joi schema
//
//     };
// };



module.exports.handleRegister = () => {
  return {
    auth:false,
    // "tags" enable swagger to document API
    tags: ['api'],
    description: 'Regsiter Handler',
    notes: 'Returns user information when register is successful',
    pre: [
      { method: verifyUniqueUser }
    ],
    handler: (request, reply) => {
      authService.handleRegister(request.payload, function (err, userInfo) {
        if (err) {
          console.error(err);
          reply(Boom.badImplementation(ERROR_CONSTANTS.INTERNAL_ERROR));
        }
        console.log("User info=" + userInfo);
        let data = {
          id_token: createToken(userInfo),
          userInfo: userInfo
        };
        reply(ResponseHandler.handleSuccessResponse(request, data)).code(201);
      });
    },
    // Validate the payload against the Joi schema
    validate: {
      payload: createUserSchema
    }
  };
};

module.exports.getAllUsers = () => {
  return {
    // Add authentication to this route
    // The user must have a scope of `admin`
    /*auth:{
      strategy: 'jwt',
      scope: ['admin']
    },*/
    auth: false,
    // "tags" enable swagger to document API
    tags: ['api'],
    description: 'Get All Users',
    notes: 'Returns a list of all valid users',
    handler: (request, reply) => {
      authService.getAllUsers(function (err, users) {
        if (err) {
          console.error(err);
          reply(Boom.badImplementation(ERROR_CONSTANTS.INTERNAL_ERROR));
        }
        console.log("User List=" + users);
        reply(ResponseHandler.handleSuccessResponse(request, users));
      });
    }
  };
};



module.exports.handleTest = () => {
    return {
        auth:false,
        // "tags" enable swagger to document API
        tags: ['api'],
        description: 'Regsiter Handler',
        notes: 'Returns user information when register is successful',
        pre: [
            { method: verifyUniqueTest }
        ],
        handler: (request, reply) => {
            authService.handleTest(request.payload, function (err, userInfo) {
                if (err) {
                    console.error(err);
                    reply(Boom.badImplementation(ERROR_CONSTANTS.INTERNAL_ERROR));
                }
                console.log("User info=" + userInfo);
                let data = {
                   userInfo: userInfo
                };
                reply(ResponseHandler.handleSuccessResponse(request, data)).code(201);
            });
        },
        // Validate the payload against the Joi schema
        validate: {
            payload: createTestSchema
        }
    };
};
