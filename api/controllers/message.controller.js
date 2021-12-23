let Message = require("../../models/message.model");
let User = require("../../models/user.model");

// module.exports.get = async function(req,res){
//     let id = req.body.userId;
//     let error = [];
//     let user = await User.findOne({ _id: id });
//     let MessageId = JSON.parse(JSON.stringify(user.messagese)).oid;
//     let data = await Message.findOne({ _id: MessageId });
//     if (!data) {
//         error.push("404 error: Not found");
//     }
//     if (error.length != 0) {
//         res.json({ error: error });
//     } else {
//         res.json(data);
//     }
// }
module.exports.test = async function(req,res){
    let id = "6189ce8f166b35fa8feb4d8b";
    let error = []
    let message = await Message.findOne({ _id: id});
    let {chatBoxList} = message;
    if (!chatBoxList){
        error.push("No data!");
    }
    if(error.length != 0){
        res.json({error:error})
    }else{
        res.json(chatBoxList);
    }
}

module.exports.get = async function(req,res){
    // let id = "6189ce3f166b35fa8feb4d7a";
    let id = req.body.userId;
    let error = []
    let user = await User.findOne({ _id: id });
    let MessageId = JSON.parse(JSON.stringify(user.messagese)).oid;
    let message = await Message.findOne({ _id: MessageId });
    let {chatBoxList} = message;
    if (!chatBoxList){
        error.push("No data!");
    }
    if(error.length != 0){
        res.json({error:error})
    }else{
        res.json(chatBoxList);
    }
}