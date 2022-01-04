var mongoose = require('mongoose');

var doctorSchema = new mongoose.Schema({
    index: Number,
    username: String,
    password: String,
    avatar: String,
    lastName: String,
    firstName: String,
    phonenumber:String,
    dob: String,
    gender: String,
    email: String,
    calendar: Object,
    specialization: String,
    permit: String,
    address: String
});
var Doctor = mongoose.model('Doctor', doctorSchema, 'doctors');

module.exports = Doctor;