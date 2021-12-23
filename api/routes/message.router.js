const express = require("express");
const Router = express.Router();

const messageControllers = require("../controllers/message.controller");
const authMidlewares = require("../../middlewares/user.authentication");

Router.get("/get", authMidlewares.userAuthentication , messageControllers.get);

Router.get("/test", messageControllers.test);


module.exports = Router;