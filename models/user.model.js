var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    avatar: String,
    lastName: String,
    firstName: String,
    Dob: String,
    gender: String,
    healthCare: {
        ref: String,
        id: String,
        db: String
    },
    messagese: {
        ref: String,
        id: String,
        db: String
    }
});
var User = mongoose.model('User', userSchema, 'users');

module.exports = User;