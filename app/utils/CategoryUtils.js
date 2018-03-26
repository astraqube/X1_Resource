'use strict';

const Boom = require('boom');

const ModelConstants = require('../constants/ModelConstants');
const Category = require('../models/Category');
const Resource = require('../models/Resource')


function verifyUniqueCategory(req, res) {

    Category.findOne({ category: req.payload.name
    }, (err, category) => {
        // Check whether the username or email
        // is already taken and error out if so
        if (category) {
            var category_name = req.payload.name;

            if (category.category === category_name.toLowerCase()) {
                return res(Boom.badRequest('Category name all ready present in system'));
            }
        }
        // If everything checks out, send the payload through
        // to the route handler
        return res(req.payload);
    });
}










module.exports = {
    verifyUniqueCategory: verifyUniqueCategory
}
