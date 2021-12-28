const User = require("../models/user.model");
const HealthCare = require("../models/healthcare.model");

module.exports.getMain = async function (req, res) {
    res.render("workspace");
}

module.exports.getHealthCareInfo = async function (req, res) {
    let { id } = req.body;
    let data = await HealthCare.findOne({ _id: "61c835e5792d3bb6d16ae29c" });
    let { listRecorded } = data;
    let lastRecorded = listRecorded.pop();
    // let {heartBeat,bloodPressure,BMI,sleepingTimes,footSteps} = lastRecorded;
    // let temp = {
    //     heartBeat: heartBeat,
    //     bloodPressure:bloodPressure,
    //     BMI:BMI,
    //     sleepingTimes:sleepingTimes,
    //     footSteps:footSteps
    // }
    // let Data = Object.values(temp);
    // console.log(Data);
    res.render("workspace",{Data:lastRecorded});
}