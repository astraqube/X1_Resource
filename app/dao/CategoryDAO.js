var Category = require('../models/Category');

function CategoryDAO() { }

CategoryDAO.prototype.handleCategory = function (payload, callback) {

    let category = new Category();
    category.category_name = payload.name;
    category.save(function (err, data) {
        callback(err, data);
    });
}

CategoryDAO.prototype.getAllCategories = function (callback) {
    Category.find({}, (err, data) => {
        callback(err, data);
    });
};

CategoryDAO.prototype.getCategoryById = function (id, callback) {
    Category.findOne({'_id':id}, (err, data) => {
        callback(err, data);
    });
};

CategoryDAO.prototype.updateCategoryData = function (id, data, callback) {
    Category.findOneAndUpdate({ "_id": id }, data,{ "new": true }, callback);
};

CategoryDAO.prototype.deactivateCategoryData = function (id, callback) {
    Category.findOneAndUpdate({ "_id": id }, {is_active:false},{ "new": true }, callback);
};




module.exports = CategoryDAO;
