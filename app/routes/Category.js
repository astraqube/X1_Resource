
//Imports
const Boom = require('boom');
const ResponseHandler = require('../handlers/ResponseHandler.js');
const ERROR_CONSTANTS = require('../constants/ErrorMessageConstants');
let CategoryService = require("../services/CategoryService");
let categoryService = new CategoryService();
const Joi = require('joi');
const createCategorySchema = require('../validators/createCategory').createCategorySchema;
const verifyUniqueCategory = require('../utils/CategoryUtils').verifyUniqueCategory;

// const createToken = require('../utils/UserUtils').createToken;




module.exports.createCategory = () => {
    return {
        auth:false,
        // "tags" enable swagger to document API
        tags: ['api'],
        description: 'Category Create',
        notes: 'Returns category information when create is successful',
        pre: [
            { method: verifyUniqueCategory }
        ],
        handler: (request, reply) => {
            categoryService.handleCategory(request.payload, function (err, resourceInfo) {
                if (err) {
                    console.error(err);
                    reply(Boom.badImplementation(ERROR_CONSTANTS.INTERNAL_ERROR));
                }
                console.log("Category info=" + resourceInfo);
                let data = resourceInfo;
                reply(ResponseHandler.handleSuccessResponse(request, data)).code(201);
            });
        },
        // Validate the payload against the Joi schema
        validate: {
            payload: createCategorySchema
        }
    };
};





module.exports.getAllCategory = () => {
    return {

        auth: false,
        // "tags" enable swagger to document API
        tags: ['api'],
        description: 'Get All Categories',
        notes: 'Returns a list of all valid categories',
        handler: (request, reply) => {
            categoryService.getAllCategories(function (err, users) {
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


module.exports.getCategoryById = () => {
    return {

        auth: false,
        // "tags" enable swagger to document API
        tags: ['api'],
        description: 'Get Category By Id',
        notes: 'Returns category details',
        handler: (request, reply) => {
            categoryService.getCategoryById(request.params.id, function (err, users) {
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


module.exports.updateCategoryById = () => {
    return {

        auth: false,
        // "tags" enable swagger to document API
        tags: ['api'],
        description: 'Update Category',
        notes: 'Update category details',
        handler: (request, reply) => {
            categoryService.updateCategoryData(request.params.id, request.payload, function (err, users) {
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

module.exports.deactivateCategoryById = () => {
    return {

        auth: false,
        // "tags" enable swagger to document API
        tags: ['api'],
        description: 'Deactivate Category',
        notes: 'Deactivate category details',
        handler: (request, reply) => {
            categoryService.deactivateCategoryData(request.params.id, function (err, users) {
                if (err) {
                    console.error(err);
                    reply(Boom.badImplementation(ERROR_CONSTANTS.INTERNAL_ERROR));
                }
                reply(ResponseHandler.handleSuccessResponse(request, users));
            });
        }
    };
};