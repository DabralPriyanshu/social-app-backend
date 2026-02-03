const userService = require("../services/user.service");
const { successResponseBody } = require("../utils/responseBody");
const { StatusCodes } = require("http-status-codes");
const ServerError = require("../utils/errors/internalserver.error");

//controllers only job is to collect the request and pass it to services and collect the response from services and build that response with successResponseBody and pass to client else pass error to client

const signUp = async (req, res) => {
  try {
    const userData = {
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    };
    const response = await userService.registerUser(userData);
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
    successResponseBody.data = {
      id: response.id,
      username: response.name,
      email: response.email,
    };
    successResponseBody.message = "User Logged in  successfully";
    res.cookie("token", response.token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
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
    //this will clear the token from the cookie
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
//this controller will return the current logged in user
const me = async (req, res) => {
  try {
    successResponseBody.data = { id: req.user.id, email: req.user.email };
    successResponseBody.message = "Successfully fetched auth user details";
    return res.status(StatusCodes.OK).json(successResponseBody);
  } catch (error) {
    console.log(error);
    const err = new ServerError();
    return res.status(error.statusCode).json(error);
  }
};

module.exports = { signUp, signIn, logout, me };
