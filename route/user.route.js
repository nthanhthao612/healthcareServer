const express = require("express");
const Router = express.Router();
const userMiddlewares = require("../middlewares/user.authentication")

const userController = require("../controllers/user.controller");

Router.get("/login", userController.getLogin);

Router.get("/logout",userController.getLogout);

Router.get("/info", userController.getInfo);

Router.get("/info/update", userController.getInfoUpdate);

Router.get("/admin",userMiddlewares.authenticateAdminLogin,userController.getAdmin);

Router.get("/admin/create",userMiddlewares.authenticateAdminLogin,userController.getAdminCreate);

Router.get("/admin/delete",userMiddlewares.authenticateAdminLogin,userController.getAdminDelete);

Router.post("/admin/create",userMiddlewares.authenticateAdminLogin,userController.postAdminCreate);

Router.post("/login", userController.postLogin);

module.exports = Router;