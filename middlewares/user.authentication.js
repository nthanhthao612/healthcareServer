var jwt = require('jsonwebtoken');
var Doctor = require('../models/doctor.model');

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
    var doctor = await Doctor.find({_id:req.signedCookies.userid});
    if(doctor.length == 0){
        res.redirect('/user/login');
        return;
    }
    next();
}


module.exports.authenticateWebLogin = async function(req,res,next){
        if(!req.signedCookies.userid){
        res.redirect('/user/login');
        return;
    }
    var doctor = await Doctor.find({_id:req.signedCookies.userid});
    if(doctor.length == 0){
        res.redirect('/user/login');
        return;
    }
    next();
}


module.exports.authenticateAdminLogin = async function(req,res,next){
    if(!req.signedCookies.userid){
        res.redirect('/user/login');
        return;
    }
    var doctor = await Doctor.findOne({_id:req.signedCookies.userid});
    if(!doctor || doctor.permit != "admin"){
        res.redirect('/user/login');    
    }
    next();
}