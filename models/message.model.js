var mongoose = require('mongoose');


var partnerSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    avatar: String
});

var contentSchema = mongoose.Schema({
    senderId: String,
    receivcerId: String,
    time: String,
    content: String
});

var chatBoxSchema = mongoose.Schema({
    partner: partnerSchema,
    Conversation: [contentSchema]
});

var messageSchema = new mongoose.Schema({
    chatBoxList: [chatBoxSchema]
});
var Message = mongoose.model('Message', messageSchema, 'messagese');

module.exports = Message;