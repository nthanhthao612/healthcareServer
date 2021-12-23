var jwt = require('jsonwebtoken');

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