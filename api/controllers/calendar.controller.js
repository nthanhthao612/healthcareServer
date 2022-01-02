let Calendar = require("../../models/calendar.model");
let User = require("../../models/user.model");


module.exports.get = async function(req,res){
    let id = req.body.userId;
    let error = [];
    let user = await User.findOne({ _id: id });
    let calendarId = JSON.parse(JSON.stringify(user.calendar)).$id;
    let calendar = await Calendar.findOne({_id:calendarId});
    res.json(calendar);
}