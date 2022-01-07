require("dotenv").config();
const Port = 7000;
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var path = require('path');
const schedule = require('node-schedule');


const calendarApi = require("./api/routes/calendar.router");
const userApi = require("./api/routes/user.router");
const messageApi = require("./api/routes/message.router");
const healthCareApi = require("./api/routes/healthcare.router");
mongoose.connect("mongodb+srv://admin:qwer123@cluster0.nyrj3.mongodb.net/healthcareMGServer?retryWrites=true&w=majority");

const Healthcare = require("./models/healthcare.model");
const app = express();
const server = http.createServer(app);
const userRoute = require("./route/user.route");
const mainRoute = require("./route/main.route");
const authMiddleWares = require("./middlewares/user.authentication");
let ObjectID = require('mongodb').ObjectID;


app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.set("view engine","pug");
app.set("views","./views");
app.use(cookieParser("thanhthao"));
app.use(cookieParser());
server.listen(Port,()=>{
    console.log("start server successful !!!");
});

app.use("/api/calendar",calendarApi);
app.use("/api/user",userApi);
app.use("/api/message",messageApi);
app.use("/api/healthcare",healthCareApi);

app.get("/",function(req,res){
    res.render('homepage');
});
app.use("/user",userRoute);
app.use("/main",authMiddleWares.authenticateWebLogin,mainRoute);



const rule = new schedule.RecurrenceRule();
const date = new Date();
rule.hour = 4;
rule.minute = 12;
const job = schedule.scheduleJob(rule,async function(){
    let healthcare = await Healthcare.find({});
    healthcare.map(async function(item){
        let id = item.id;
        let {listRecorded} = item;
        let last = listRecorded.pop();
        let temp = JSON.parse(JSON.stringify(last));
        temp._id = new ObjectID();
        temp.sleepingTimes.start = "10:00:PM";
        temp.sleepingTimes.end = "6:00:AM";
        temp.sleepingTimes.numeral = 28800;
        temp.Date = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
        listRecorded.push(last,temp);
        await Healthcare.updateOne({_id:id},{
            listRecorded:listRecorded
        });
    });
});


