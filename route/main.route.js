const express = require("express");
const Router = express.Router();

const mainController = require("../controllers/main.controller");

Router.get("/workspace",mainController.getWorkPlace);

Router.get("/workspace/get",mainController.getHealthCareInfo);

Router.get("/workspace/statistics",mainController.getStatistics);

Router.get("/calendar",mainController.getCalendar);

Router.get("/chat",mainController.getChat);

Router.get("/",mainController.getMain);


module.exports = Router;