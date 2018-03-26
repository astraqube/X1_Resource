//Imports
const ROUTES = require('../constants/RouteConstants');
let Errors = require('./Errors');
let Auth = require('./Auth');
let Resource = require('./Resource');
let Category = require('./Category');


//Register the module specific endpoints here.
module.exports.endpoints = [



    { method: 'GET', path: ROUTES.ERROR_404, config: Errors.handleBadRequest },
    { method: 'GET', path: ROUTES.RESOURCES, config: Resource.getAllUsers },
    { method: 'GET', path: ROUTES.RESOURCE_BY_ID, config: Resource.getUserById },
    { method: 'GET', path: ROUTES.CATEGORY_BY_ID, config: Category.getCategoryById },
    { method: 'GET', path: ROUTES.CATEGORIES, config: Category.getAllCategory },





    //X1 Routes
    { method: 'POST', path: ROUTES.REGISTER, config: Resource.handleRegister },
    { method: 'POST', path: ROUTES.LOGIN, config: Auth.handleLogin },
    { method: 'POST', path: ROUTES.CATEGORY, config: Category.createCategory },
    { method: 'POST', path: ROUTES.CATEGORY_ADD_IN_USER, config: Resource.addCategoryInUser },




    { method: 'PUT', path: ROUTES.RESOURCE_UPDATE_BY_ID, config: Resource.updateUserById},
    { method: 'PUT', path: ROUTES.CATEGORY_UPDATE_BY_ID, config: Category.updateCategoryById},



    { method: 'DELETE', path: ROUTES.RESOURCE_DELETE_BY_ID, config: Resource.deactivateUserById},
    { method: 'DELETE', path: ROUTES.CATEGORY_DELETE_BY_ID, config: Category.deactivateCategoryById},







];
