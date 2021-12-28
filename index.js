require("dotenv").config();
const Port = 7000;
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const userApi = require("./api/routes/user.router");
const messageApi = require("./api/routes/message.router");
const healthCareApi = require("./api/routes/healthcare.router");
mongoose.connect("mongodb+srv://admin:qwer123@cluster0.nyrj3.mongodb.net/healthcareMGServer?retryWrites=true&w=majority");
// mongoose.connect("mongodb+srv://admin:qwer123@cluster0.nyrj3.mongodb.net/healthcareMGServer?retryWrites=true&w=majority");
const app = express();
const server = http.createServer(app);
const userRoute = require("./route/user.route");
const mainRoute = require("./route/main.route");
const authMiddleWares = require("./middlewares/user.authentication");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","pug");
app.set("views","./views");
app.use(cookieParser("thanhthao"));
app.use(cookieParser());
server.listen(7000,()=>{
    console.log("start server successful !!!");
});

app.use("/api/user",userApi);
app.use("/api/message",messageApi);
app.use("/api/healthcare",healthCareApi);

app.get("/",function(req,res){
    res.render('homepage');
});
app.use("/user",userRoute);
app.use("/main",authMiddleWares.authenticateWebLogin,mainRoute);