let HealthCare = require("../../models/healthcare.model");
let User = require("../../models/user.model");



module.exports.getfinal = async function (req, res) {
    let id = req.body.userId;
    let error = [];
    let user = await User.findOne({ _id: id });
    let healthCareId = JSON.parse(JSON.stringify(user.healthCare)).$id;
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

module.exports.update = async function (req, res){
    console.log(req.body);
}





// module.exports.updateBmi = async function (req, res) {
//     let {healthcareID,height,weight} = req.body;
//     let numeral = weight/((height/100)*(height/100));
//     if(height ==0 || weight == 0){
//         res.json({error:"Không hợp lệ"});
//         return;
//     }
//     numeral = numeral.toFixed(1);
//     let data = await HealthCare.findOne({_id:healthcareID});
//     let {listRecorded} = data;
//     let temp = listRecorded.pop();
//     let {BMI} = temp;
//     BMI.height = height;
//     BMI.weight = weight;
//     BMI.numeral = numeral;
//     BMI.time = getDateTime().time;
//     let result = await HealthCare.updateOne({_id:healthcareID},{
//         listRecorded:[...listRecorded,temp]
//     });

// }

// function getDateTime() {
//     let temp = {};
//     let date = new Date();
//     temp.time = `${date.getHours()}h${date.getMinutes()}`;
//     temp.date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
//     return temp;
// }

