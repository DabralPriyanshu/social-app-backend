const express = require("express");
const userMiddlewares = require("../../middlewares/user.middleware");
const userController = require("../../controllers/user.controller");

const userRouter = express.Router();

/*
|--------------------------------------------------------------------------
| User Registration Route
|--------------------------------------------------------------------------
| POST /user/register
| - validateCreateUserRequest: validates signup data
| - signUp: controller to register new user
*/
userRouter.post(
  "/register",
  userMiddlewares.validateCreateUserRequest,
  userController.signUp,
);

/*
|--------------------------------------------------------------------------
| User Login Route
|--------------------------------------------------------------------------
| POST /user/login
| - validateLoginUserRequest: validates login credentials
| - signIn: controller to authenticate user
*/
userRouter.post(
  "/login",
  userMiddlewares.validateLoginUserRequest,
  userController.signIn,
);

/*
|--------------------------------------------------------------------------
| User Logout Route
|--------------------------------------------------------------------------
| POST /user/logout
| - isAuth: checks if user is authenticated
| - logout: controller to logout user
*/
userRouter.post("/logout", userMiddlewares.isAuth, userController.logout);

/*
|--------------------------------------------------------------------------
| Get Current User Route
|--------------------------------------------------------------------------
| GET /user/me
| - isAuth: checks if user is authenticated
| - me: controller to get logged-in user details
*/
userRouter.get("/me", userMiddlewares.isAuth, userController.me);

module.exports = userRouter;
