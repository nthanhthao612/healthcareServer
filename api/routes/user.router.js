const express = require("express");
const Router = express.Router();

const authMidlewares = require("../../middlewares/user.authentication");
const userControllers = require("../controllers/user.controller");

Router.get("/users", userControllers.get);

Router.get("/info",authMidlewares.userAuthentication,userControllers.getById);

Router.post("/login",userControllers.Login);
Router.post("/register",userControllers.Register);
module.exports = Router;