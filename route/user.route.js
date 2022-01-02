const express = require("express");
const Router = express.Router();

const userController = require("../controllers/user.controller");

Router.get("/login", userController.getLogin);

Router.get("/info", userController.getInfo);

Router.get("/logout",userController.getLogout);

Router.post("/login", userController.postLogin);

module.exports = Router;