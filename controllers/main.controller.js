const User = require("../models/user.model");
const Doctor = require("../models/doctor.model");
const HealthCare = require("../models/healthcare.model");
const Calendar = require("../models/calendar.model");

module.exports.getWorkPlace = function (req, res) {
    res.render("main/workspace");
}

module.exports.getMain = function (req, res) {
    res.render("main/mainlayout");
}

module.exports.getHealthCareInfo = async function (req, res) {
    let {searchValue,method} = req.query;
    let error = [];
    let user = {};
    if(method === "phone"){
        user = await User.findOne({ phonenumber: searchValue});
    }else{
        user = await User.findOne({ _id: searchValue});
    }
    let healthCareId = JSON.parse(JSON.stringify(user.healthCare)).$id;
    let data = await HealthCare.findOne({ _id: healthCareId });
    if (!data) {
        error.push("404 error: Not found");
    }
    if (error.length != 0) {
        res.json({ error: error });
    } else {
        let { listRecorded } = data;
        let lastRecorded = listRecorded.pop();
        res.render("main/workspace",{Data:lastRecorded,curUser:user});
    }
}


module.exports.getCalendar = async function (req, res) {
    let {userid} =  req.signedCookies;
    let user = await Doctor.findOne({_id: userid});
    let calendarId = JSON.parse(JSON.stringify(user.calendar)).$id;
    let data = await Calendar.findOne({ _id: calendarId });
    res.render("main/calendar",{Data:data});
}
module.exports.getChat = async function (req, res) {
    res.render("main/chatscreen");
}

module.exports.getStatistics = async function (req, res) {
    let {id} = req.query;
    let user = await User.findOne({ _id: id});
    let healthCareId = JSON.parse(JSON.stringify(user.healthCare)).$id;
    let data = await HealthCare.findOne({ _id: healthCareId });
    res.render("main/statistics",{Data:data});
}