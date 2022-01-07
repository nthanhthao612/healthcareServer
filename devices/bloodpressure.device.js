let mqtt = require('mqtt')
let options = {
  port: 1883,
  clientId: 'bloodpressure-61d6dcd3f99e10c9b4453085',
  host:'mqtt://128.199.91.133'
};

let client = mqtt.connect('mqtt://128.199.91.133', options);

client.on('connect', function() { 
    console.log("bloodpressure Actived!!!!");
    client.subscribe('request/bloodpressure/61d6dcd3f99e10c9b4453085');
});
client.on('message', function(topic,message){
  client.publish('response/bloodpressure/61d6dcd3f99e10c9b4453085',"120,80",function(){
  });
});