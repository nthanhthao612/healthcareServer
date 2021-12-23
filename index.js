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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
server.listen(7000,()=>{
    console.log("start server successful !!!");
});

app.use("/api/user",userApi);
app.use("/api/message",messageApi);
app.use("/api/healthcare",healthCareApi);