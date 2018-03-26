
//Imports
const Boom = require('boom');
const ResponseHandler = require('../handlers/ResponseHandler.js');
const ERROR_CONSTANTS = require('../constants/ErrorMessageConstants');
let ResourceService = require("../services/ResourceService");
let resourceService = new ResourceService();
const Joi = require('joi');
const createUserSchema = require('../validators/createUser').createUserSchema;
const verifyUniqueUser = require('../utils/UserUtils').verifyUniqueUser;
const createToken = require('../utils/UserUtils').createToken;
const verifyUniqueUserById = require('../utils/UserUtils').verifyUniqueUserById;




module.exports.handleRegister = () => {
    return {
        auth:false,
        // "tags" enable swagger to document API
        tags: ['api'],
        description: 'Register Handler',
        notes: 'Returns user information when register is successful',
        pre: [
            { method: verifyUniqueUser }
        ],
        handler: (request, reply) => {
            resourceService.handleRegister(request.payload, function (err, resourceInfo) {
                if (err) {
                    console.error(err);
                    reply(Boom.badImplementation(ERROR_CONSTANTS.INTERNAL_ERROR));
                }
                console.log("User info=" + resourceInfo);
                let data = {
                    id_token: createToken(resourceInfo),
                    resourceInfo: resourceInfo
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

        auth: false,
        // "tags" enable swagger to document API
        tags: ['api'],
        description: 'Get All Resources',
        notes: 'Returns a list of all valid resources',
        handler: (request, reply) => {
            resourceService.getAllUsers(function (err, users) {
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

module.exports.getUserById = () => {
    return {

        auth: false,
        // "tags" enable swagger to document API
        tags: ['api'],
        description: 'Get Resources By Id',
        notes: 'Returns resources details',
        handler: (request, reply) => {
            resourceService.getUserById(request.params.id, function (err, users) {
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

module.exports.addCategoryInUser = () => {
    return {
        auth:false,
        // "tags" enable swagger to document API
        tags: ['api'],
        description: 'Add Category In user',
        notes: 'Returns category information when add is successful',
        pre: [
            { method: verifyUniqueUserById }
        ],
        handler: (request, reply) => {
            console.log("i m here  in side handler");
            resourceService.handleCategory(request.params.id,request.payload, function (err, resourceInfo) {
                if (err) {
                    console.error(err);
                    reply(Boom.badImplementation(ERROR_CONSTANTS.INTERNAL_ERROR));
                }
                console.log("Category info=" + resourceInfo);
                let data = resourceInfo;
                reply(ResponseHandler.handleSuccessResponse(request, data)).code(200);
            });
        }
    };
};



module.exports.updateUserById = () => {
    return {

        auth: false,
        // "tags" enable swagger to document API
        tags: ['api'],
        description: 'Update Resources',
        notes: 'Update resources details',
        handler: (request, reply) => {
            resourceService.updateUserData(request.params.id, request.payload, function (err, users) {
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


module.exports.deactivateUserById = () => {
    return {

        auth: false,
        // "tags" enable swagger to document API
        tags: ['api'],
        description: 'Deactivate Resources',
        notes: 'Deactivate resources details',
        handler: (request, reply) => {
            resourceService.deactivateUserData(request.params.id, function (err, users) {
                if (err) {
                    console.error(err);
                    reply(Boom.badImplementation(ERROR_CONSTANTS.INTERNAL_ERROR));
                }
               reply(ResponseHandler.handleSuccessResponse(request, users));
            });
        }
    };
};