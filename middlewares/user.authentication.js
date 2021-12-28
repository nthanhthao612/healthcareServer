var jwt = require('jsonwebtoken');
var User = require('../models/user.model');

module.exports.userAuthentication = async function(req,res,next){
    let token = req.headers.authorization;
    let user = await jwt.verify(token,process.env.SECRET_CODE);
    if(user){
        req.body.userId = user.userId;
        next();
    }
    else{
        res.json({error:"Login failed!!!"});
    }
}
module.exports.authenticateWebLogin = async function(req,res,next){

        if(!req.signedCookies.userid){
        res.redirect('/user/login');
        return;
    }
    var user = await User.find({_id:req.signedCookies.userid});
    if(user.length == 0){
        res.redirect('/user/login');
        return;
    }
    // console.log(req.signedCookies);
    next();
}