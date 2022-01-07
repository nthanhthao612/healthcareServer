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
    let {_id,listRecorded} = req.body;
    req.body.userId = undefined;
    let error = [];
    let data = await HealthCare.updateOne({_id:_id},
        {listRecorded:listRecorded}
    );
    if(data){
        res.json({nofitication:"thanh cong"});
    }else{
        error.push("loi");
        res.json({error:error});
    }
}


var mqtt = require('mqtt');
// tạo option sử dụng thuộc tính connect để kết nối đến broket MQTT 


module.exports.updateHeartBeat = function (req, res){
    console.log("vao");
    var client = mqtt.connect('mqtt://localhost');
        console.log('Server Connect')
        client.subscribe('/client/heartbeat')
        client.publish('/server/heartbeat', 'Can lay du lieu')
    client.on('message', function(topic, message) {
        console.log(message.toString())
        client.end()
    })
}