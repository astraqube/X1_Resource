const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true, index: { unique: true }},
    password: {type:String, required: true},
    linkedin_access: { type: Boolean, default: false },
    login_status: {type:Number, default:0},
    token: {type:String, default:''},
    lat: {type:String, default:''},
    long: {type:String, default:''},
    is_active:{type: Boolean, default: true },
    is_deleted:{type: Boolean, default: false },
    work_profile:[{

        profile: { type: String, default: '' },
        image_url: { type: String, default: '' },
        title: { type: String, default: '' },
        position: { type: String, default: '' },
        last_company: { type: String, default: '' },

    }],
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    created_at : {
        type : Date,
        default: Date.now
    },
    modified_at : {
        type : Date,
        default: Date.now
    },


});

module.exports = mongoose.model('Resource', UserSchema, 'Resource');
