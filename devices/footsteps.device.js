let mqtt = require('mqtt')
let options = {
  port: 1883,
  clientId: 'footsteps-61d6dcd3f99e10c9b4453085',
  host:'mqtt://128.199.91.133'
};

let client = mqtt.connect('mqtt://128.199.91.133', options);

client.on('connect', function() { 
    console.log("footsteps Actived!!!!");
    client.subscribe('request/footsteps/61d6dcd3f99e10c9b4453085');
});
client.on('message', function(topic,message){
  client.publish('response/footsteps/61d6dcd3f99e10c9b4453085',"350,950",function(){
  });
});