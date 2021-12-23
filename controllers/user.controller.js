const User = require("../models/user.model");

module.exports.get = async function(req,res){
    
    let data = await User.find({});
    console.log(data);
}