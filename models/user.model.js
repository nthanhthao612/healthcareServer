var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    avatar: String,
    lastName: String,
    firstName: String,
    phonenumber:String,
    dob: String,
    gender: String,
    email: String,
    healthCare: Object,
    messagese: Object,
    permit: String,
});
var User = mongoose.model('User', userSchema, 'users');

module.exports = User;