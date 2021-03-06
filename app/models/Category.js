const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    category_name: { type: String, required: true,index: { unique: true }},
    is_active:{type: Boolean, default: true },
    created_at : {
        type : Date,
        default: Date.now
    },
    modified_at : {
        type : Date,
        default: Date.now
    },


});

module.exports = mongoose.model('Category', CategorySchema, 'Category');
