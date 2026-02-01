const userService = require("../services/user.service");
const { successResponseBody } = require("../utils/responseBody");
const { StatusCodes } = require("http-status-codes");
const ServerError = require("../utils/errors/internalserver.error");
const signUp = async (req, res) => {
  try {
    const userData = {
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    };
    const response = await userService.register(userData);
    successResponseBody.data = response;
    successResponseBody.message = "User created successfully";
    return res.status(StatusCodes.CREATED).json(successResponseBody);
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json(error);
  }
};
const signIn = async (req, res) => {
  try {
    const userData = {
      email: req.body.email,
      password: req.body.password,
    };
    const response = await userService.loginUser(userData);
    successResponseBody.data = response;
    successResponseBody.message = "User Logged in  successfully";
    res.cookie("token", response.token, {
      httpOnly: true,
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });
    return res.status(StatusCodes.OK).json(successResponseBody);
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json(error);
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
    });
    successResponseBody.data = true;
    successResponseBody.message = "User Logged out successfully";
    return res.status(StatusCodes.OK).json(successResponseBody);
  } catch (error) {
    console.log(error);
    const err = new ServerError();
    return res.status(error.statusCode).json(error);
  }
};

module.exports = { signUp, signIn, logout };
