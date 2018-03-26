var async = require('async');



var CategoryDAO = require("./../dao/CategoryDAO");
var categoryDAO = new CategoryDAO();

function CategoryService() { }

CategoryService.prototype.handleCategory = function (payload, callback) {

    async.waterfall([
        function (counterDoc, cb) {
            // payload.id = counterDoc.counter;
            categoryDAO.handleCategory(payload, callback);
        }
    ], callback);
};

CategoryService.prototype.getAllCategories = function (callback) {
    categoryDAO.getAllCategories(callback);
};

CategoryService.prototype.getCategoryById = function (id, callback) {
    categoryDAO.getCategoryById(id, callback);
};

CategoryService.prototype.updateCategoryData = function (id, data, callback) {
    categoryDAO.updateCategoryData(id, data, callback);
};

CategoryService.prototype.deactivateCategoryData = function (id, callback) {
    categoryDAO.deactivateCategoryData(id, callback);
};


module.exports = CategoryService;
