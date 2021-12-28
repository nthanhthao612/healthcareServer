const express = require("express");
const Router = express.Router();

const healthCareControllers = require("../controllers/healthcare.controller");
const authMidlewares = require("../../middlewares/user.authentication");

Router.get("/getfinal", authMidlewares.userAuthentication , healthCareControllers.getfinal);

Router.post("/update",authMidlewares.userAuthentication, healthCareControllers.update);

module.exports = Router;