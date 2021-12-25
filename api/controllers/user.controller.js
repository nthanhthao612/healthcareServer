const User = require("../../models/user.model");
var jwt = require('jsonwebtoken');

module.exports.get = async function (req, res) {
    let data = await User.find({});
    res.json(data);
}
module.exports.getById = async function (req, res) {
    let id = req.body.userId;
    let error = [];
    let data = await User.findOne({ _id: id });
    
    if (!data) {
        error.push("error: not found!!!");
    }
    if (error.length !== 0) {
        res.json({ error: error });
    } else {
        data.password = undefined;
        data.username = undefined;
        res.json(data);
    }
}

module.exports.Login = async function (req, res) {
    const { username, password } = req.body.data;
    console.log(data);
    var error = [];
    var user = await User.findOne({ username: username, password: password });
    if (!user || username == '') {
        error.push('Username or Password is wrong!');
        console.log("sai");
    }
    if (error.length != 0) {
        console.log("co loi");
        res.json({ error: error });
    }
    else {
        console.log("dang nhap thanh cong");
        var token = jwt.sign({ userId: user._id }, process.env.SECRET_CODE);
        res.json(token);
    }
}

module.exports.Register = async function (req, res) {
    const { lastName,firstName,usename,email,phonenumber,dob,password,gender
    } = req.body.data;
    var error = [];
    var user = await User.findOne({ username: username});
    if(username =="" || password ==""){
        error.push("Tên tài khoản và mật khẩu không được bỏ trống");
    }
    if (user) {
        error.push('Tên đăng nhập đã tồn tại');
    }
    if (error.length != 0) {
        res.json({ error: error });
    }
    else {
        let temp = await User.create
        console.log("dang ky thanh cong");
        res.json({notification:"successful!"});
    }
}