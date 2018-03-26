const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, index: { unique: true }},
  username: {type:String, required: true, index: { unique: true }},
  password: {type:String, required: true},
  admin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema, 'User');
