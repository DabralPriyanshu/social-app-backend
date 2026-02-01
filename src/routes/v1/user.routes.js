const express = require("express");
const userController = require("../../controllers/user.controller");
const userRouter = express.Router();
userRouter.post("/register", userController.create);
module.exports = userRouter;
