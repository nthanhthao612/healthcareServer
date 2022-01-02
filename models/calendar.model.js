var mongoose = require('mongoose');

var infoSchema = new mongoose.Schema({
    userName: String,
    phonenumber: String,
    email: String,
    date: String,
    userId: String,
    docId: String,
    docName: String,
    time: String,
    checked: Boolean
});
var calendarSchema = new mongoose.Schema({
    listDate : [infoSchema]
});
var Calendar = mongoose.model('calendar', calendarSchema, 'Calendar');

module.exports = Calendar;