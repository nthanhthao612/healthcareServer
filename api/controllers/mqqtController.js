let HealthCare = require("../../models/healthcare.model");
let mqtt = require("mqtt");
let ObjectID = require('mongodb').ObjectID;

module.exports.updateHeartBeat = async function (req, res) {
    let {time,date} = getCurrentDay();
    let {data} = req.body;
    let {userId} = req.body;
    console.log(req.body);
    let healthcare = await HealthCare.findOne({_id:data});
    let listRecorded = healthcare.listRecorded;
    let last = listRecorded.pop();
    let temp = JSON.parse(JSON.stringify(last));
    temp._id = new ObjectID();
    options = {
        port: 1883,
        clientId: `HeartBeat_${userId}`,
        host:'mqtt://128.199.91.133'
    };
    let client = mqtt.connect('mqtt://128.199.91.133', options);
    client.on('connect', function () {
        client.subscribe(`response/heartbeat/${userId}`);
        client.publish(`request/heartbeat/${userId}`, "get value")
    });
    client.on('message', async function (topic, message) {
        if (message.toString() !== "" && message) {
            client.end(async function(){
                temp.heartBeat.numeral = parseInt(message.toString());
                temp.heartBeat.time = time;
                temp.Date = date;
                listRecorded.push(last,temp);
                let a = await HealthCare.updateOne({_id:data},{
                    listRecorded:listRecorded
                });
                console.log("co vao");
                res.json({nof:"successful!!"});
            });
        }
    });
}

module.exports.updateBloodPressure = async function (req, res) {
    let {time,date} = getCurrentDay();
    let {data} = req.body;
    let {userId} = req.body;
    console.log(req.body);
    let healthcare = await HealthCare.findOne({_id:data});
    let listRecorded = healthcare.listRecorded;
    let last = listRecorded.pop();
    let temp = JSON.parse(JSON.stringify(last));
    temp._id = new ObjectID();
    options = {
        port: 1883,
        clientId: `BloodPressure_${userId}`,
        host:'mqtt://128.199.91.133'
    };
    let client = mqtt.connect('mqtt://128.199.91.133', options);
    client.on('connect', function () {
        client.subscribe(`response/bloodpressure/${userId}`);
        client.publish(`request/bloodpressure/${userId}`, "get value")
    });
    client.on('message', async function (topic, message) {
        if (message.toString() !== "" && message) {
            client.end(async function(){
                let value = message.toString().split(',');
                temp.bloodPressure.systolic = parseInt(value[0]);
                temp.bloodPressure.diastolic = parseInt(value[1]);
                temp.bloodPressure.numeral = `${temp.bloodPressure.systolic}/${temp.bloodPressure.diastolic}`;
                temp.bloodPressure.time = time;
                temp.Date = date;
                listRecorded.push(last,temp);
                let a = await HealthCare.updateOne({_id:data},{
                    listRecorded:listRecorded
                });
                console.log("co vao BloodPressure");
                res.json({nof:"successful!!"});
            });
        }
    });
}

module.exports.updateBMI = async function (req, res) {
    let {time,date} = getCurrentDay();
    let {data} = req.body;
    let {userId} = req.body;
    console.log(req.body);
    let healthcare = await HealthCare.findOne({_id:data});
    let listRecorded = healthcare.listRecorded;
    let last = listRecorded.pop();
    let temp = JSON.parse(JSON.stringify(last));
    temp._id = new ObjectID();
    options = {
        port: 1883,
        clientId: `BMI_${userId}`,
        host:'mqtt://128.199.91.133'
    };
    let client = mqtt.connect('mqtt://128.199.91.133', options);
    client.on('connect', function () {
        client.subscribe(`response/bmi/${userId}`);
        client.publish(`request/bmi/${userId}`, "get value")
    });
    client.on('message', async function (topic, message) {
        if (message.toString() !== "" && message) {
            client.end(async function(){
                let value = message.toString().split(',');
                temp.BMI.height = parseInt(value[1]);
                temp.BMI.weight = parseInt(value[0]);
                temp.BMI.numeral = parseFloat((temp.BMI.weight/(temp.BMI.height*temp.BMI.height/10000)).toFixed(2));
                temp.BMI.time = time;
                temp.Date = date;
                listRecorded.push(last,temp);
                let a = await HealthCare.updateOne({_id:data},{
                    listRecorded:listRecorded
                });
                console.log("co vao BMI");
                res.json({nof:"successful!!"});
            });
        }
    });
}


module.exports.updateFootSteps = async function (req, res) {
    let {time,date} = getCurrentDay();
    let {data} = req.body;
    let {userId} = req.body;
    let healthcare = await HealthCare.findOne({_id:data});
    let listRecorded = healthcare.listRecorded;
    let last = listRecorded.pop();
    let temp = JSON.parse(JSON.stringify(last));
    temp._id = new ObjectID();
    options = {
        port: 1883,
        clientId: `_${userId}`,
        host:'mqtt://128.199.91.133'
    };
    let client = mqtt.connect('mqtt://128.199.91.133', options);
    client.on('connect', function () {
        client.subscribe(`response/footsteps/${userId}`);
        client.publish(`request/footsteps/${userId}`, "get value")
    });
    client.on('message', async function (topic, message) {
        if (message.toString() !== "" && message) {
            client.end(async function(){
                let value = message.toString().split(',');
                temp.footSteps.numeral = parseInt(value[0]);
                temp.footSteps.distance = parseInt(value[1]);
                temp.footSteps.time = time;
                temp.Date = date;
                listRecorded.push(last,temp);
                let a = await HealthCare.updateOne({_id:data},{
                    listRecorded:listRecorded
                });
                console.log("co vao footSteps");
                res.json({nof:"successful!!"});
            });
        }
    });
}




















function getCurrentDay(){
    let date = new Date();
    let value = {};
    value.date = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    value.time = `${date.getHours()}h${date.getMinutes()}`
    return value
}