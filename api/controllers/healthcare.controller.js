let HealthCare = require("../../models/healthcare.model");
let User = require("../../models/user.model");



module.exports.getfinal = async function (req, res) {
    let id = req.body.userId;
    let error = [];
    let user = await User.findOne({ _id: id });
    let healthCareId = JSON.parse(JSON.stringify(user.healthCare)).oid;
    let data = await HealthCare.findOne({ _id: healthCareId });
    if (!data) {
        error.push("404 error: Not found");
    }
    if (error.length != 0) {
        res.json({ error: error });
    } else {
        res.json(data);
    }
}