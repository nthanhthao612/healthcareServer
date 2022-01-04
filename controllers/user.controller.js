const Doctor = require("../models/doctor.model");
let defaultDoctor = require("../defaultDoctor.json");
let Calendar = require("../models/calendar.model");
let defaultRecord = require("../healthcareDEF.json");
const { redirect } = require("express/lib/response");


module.exports.getLogin = async function (req, res) {
    res.render("login");
}
module.exports.postLogin = async function (req, res) {
    let { username, password } = req.body;
    var error = [];
    var doctor = await Doctor.findOne({ username: username, password: password });
    if (!doctor || username == '') {
        error.push('Không thể đăng nhập!');
    }
    if (error.length != 0) {
        res.render('login', { error: error, values: req.body });
    }
    else {
        if (doctor.permit == "doc") {
            res.cookie('userid', doctor._id, { signed: true });
            res.redirect("/main");
        } else {
            res.cookie('userid', doctor._id, { signed: true });
            res.redirect("/user/admin");
        }
    }
}
module.exports.getLogout = async function (req, res) {
    res.render("logout");
}

module.exports.getInfo = async function (req, res) {
    let { userid } = req.signedCookies;
    var doctor = await Doctor.findOne({ _id: userid });
    res.render("main/infoscreen", { User: doctor });
}

module.exports.getInfoUpdate = async function (req, res) {
    let { userid } = req.signedCookies;
    var doctor = await Doctor.findOne({ _id: userid });
        
}


module.exports.getAdmin = async function (req, res) {
    let listDoc = await Doctor.find({ permit: "doc" });
    res.render("admin/admin", { listDoc: listDoc });
}
module.exports.getAdminCreate = async function (req, res) {
    res.render("admin/createDoctor");
}
module.exports.postAdminCreate = async function (req, res) {
    let { username} = req.body;
    let error = [];
    let check = await Doctor.findOne({ username: username });
    if (check) {
        error.push("Tài khoản đã tồn tại");
    }
    if (error.length != 0) {
        res.render("admin/createDoctor", { error: error })
    }
    else {
        defaultDoctor = { ...defaultDoctor, ...req.body }
        let temp = await Doctor.find({ permit: "doc" });
        let temp1 = temp.pop().index;
        if (temp)
            defaultDoctor.index = temp1 + 1;
        else
            defaultDoctor.index = 1;
        let calendar = await Calendar.create({ listDate: [] });
        defaultDoctor.calendar = { $ref: "calendar", $id: calendar._id, $db: "heathcareMGServer" }
        let result = await Doctor.create(defaultDoctor);
        res.redirect("/user/admin");
    }
}
module.exports.getAdminDelete = async function (req, res) {
    let {id} = req.query;
    let doctor = await Doctor.findOne({_id:id});
    let calendarId = JSON.parse(JSON.stringify(doctor.calendar)).$id;
    await Calendar.deleteOne({_id:calendarId});
    await Doctor.deleteOne({_id:id});
    res.redirect("/user/admin");
}