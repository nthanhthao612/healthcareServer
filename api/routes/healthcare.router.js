const express = require("express");
const Router = express.Router();

const mqqtController = require("../controllers/mqqtController");
const healthCareControllers = require("../controllers/healthcare.controller");
const authMidlewares = require("../../middlewares/user.authentication");

Router.get("/getfinal", authMidlewares.userAuthentication , healthCareControllers.getfinal);

Router.post("/updateheartbeat",authMidlewares.userAuthentication ,mqqtController.updateHeartBeat);

Router.post("/updatebloodpressure",authMidlewares.userAuthentication ,mqqtController.updateBloodPressure);

Router.post("/updatebmi",authMidlewares.userAuthentication ,mqqtController.updateBMI);

Router.post("/updatebodytemperature",authMidlewares.userAuthentication ,mqqtController.updateBodyTemperature);

Router.post("/update",authMidlewares.userAuthentication, healthCareControllers.update);

module.exports = Router;