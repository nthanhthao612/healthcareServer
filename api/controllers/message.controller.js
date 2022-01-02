let Message = require("../../models/message.model");
let User = require("../../models/user.model");


module.exports.get = async function(req,res){
    let id = req.body.userId;
    let error = []
    let user = await User.findOne({ _id: id });
    let MessageId = JSON.parse(JSON.stringify(user.messagese)).$id;
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