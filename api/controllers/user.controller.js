const User = require("../../models/user.model");
const Message = require("../../models/message.model");
const HealthCare = require("../../models/healthcare.model");
var jwt = require('jsonwebtoken');
const FemaleAvatar = "https://i.imgur.com/PNV9Tr8.png";
const MaleAvatar = "https://i.imgur.com/f94KMy4.png";
let defaultRecord = require("../../healthcareDEF.json");
let ObjectID = require('mongodb').ObjectID;
let Calendar = require("../../models/calendar.model");

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
    var error = [];
    var user = await User.findOne({ username: username, password: password });
    if (!user || username == '') {
        error.push('Username or Password is wrong!');
    }
    if (error.length != 0) {
        res.json({ error: error });
    }
    else {
        var token = jwt.sign({ userId: user._id }, process.env.SECRET_CODE);
        res.json(token);
    }
}

module.exports.Register = async function (req, res) {
    const { data } = req.body;
    var error = [];
    var user = await User.findOne({ username: data.username });
    if (data.username == "" || data.password == "") {
        error.push("Tên tài khoản và mật khẩu không được bỏ trống");
    }
    if (user) {
        error.push('Tên đăng nhập đã tồn tại');
    }
    if (error.length != 0) {
        res.json({ error: error });
    }
    else {
        let message = await Message.create({ chatBoxList: [] });
        let healthcare = await HealthCare.create({ listRecorded: [] });
        let calendar = await Calendar.create({ listDate: [] });
        data.gender == "Nam" ? data.avatar = MaleAvatar : data.avatar = FemaleAvatar;
        data.healthCare = { $ref: "healthcareStatistics", $id: healthcare._id, $db: "heathcareMGServer" };
        data.messagese = { $ref: "message", $id: message._id, $db: "heathcareMGServer" }
        data.calendar = { $ref: "calendar", $id: calendar._id, $db: "heathcareMGServer" }
        let date = new Date();
        let currentTime = `${date.getHours()}h${date.getMinutes()}`;
        let currentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        defaultRecord.Date = currentDate;
        defaultRecord.footSteps.time = currentTime;
        defaultRecord.bloodPressure.time = currentTime;
        defaultRecord.BMI.time = currentTime;
        defaultRecord.heartBeat.time = currentTime;
        defaultRecord._id = new ObjectID();
        await HealthCare.updateOne({ _id: healthcare._id }, { listRecorded: [defaultRecord] });
        let temp = await User.create(data);
        res.json({ notification: "successful!" });
    }
}

function getDateTime() {
    let temp = {};
    let date = new Date();
    let currentTime = `${date.getHours()}h${date.getMinutes()}`;
    let currentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return temp;
}

