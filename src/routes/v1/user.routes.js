const express = require("express");
const userMiddlewares = require("../../middlewares/user.middleware");
const userController = require("../../controllers/user.controller");
const userRouter = express.Router();
userRouter.post(
  "/register",
  userMiddlewares.validateCreateUserRequest,
  userController.signUp,
);
userRouter.post(
  "/login",
  userMiddlewares.validateLoginUserRequest,
  userController.signIn,
);
userRouter.post("/logout", userMiddlewares.isAuth, userController.logout);
module.exports = userRouter;
