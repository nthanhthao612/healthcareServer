const express = require("express");
const Router = express.Router();

const calendarControllers = require("../controllers/calendar.controller");
const authMidlewares = require("../../middlewares/user.authentication");

Router.get("/get", authMidlewares.userAuthentication , calendarControllers.get);

module.exports = Router;