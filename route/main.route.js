const express = require("express");
const Router = express.Router();

const mainController = require("../controllers/main.controller");

Router.get("/workspace",mainController.getHealthCareInfo);
Router.get("/",mainController.getMain);

Router.get("/gethealthcareinfo", mainController.getHealthCareInfo);

module.exports = Router;