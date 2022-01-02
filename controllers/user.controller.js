const User = require("../models/user.model");

module.exports.getLogin = async function(req,res){
    res.render("login");
}
module.exports.postLogin = async function(req,res){
    let {username,password} = req.body;
    var error = [];
    var user = await User.findOne({username:username,password:password});
    if( !user || username == '' || user.permit != "doc"){
        error.push('Không thể đăng nhập!');
    }
    if(error.length != 0){
        res.render('login',{error:error,values:req.body});
    }
    else{
        res.cookie('userid',user._id,{signed:true});
        res.redirect("/main");
    }
}

module.exports.getLogout = async function(req,res){
    res.render("logout");
}

module.exports.getInfo = async function(req,res){
    let {userid} = req.signedCookies;
    var user = await User.findOne({_id:userid});
    res.render("main/infoscreen",{User:user});
    // console.log(user);
}