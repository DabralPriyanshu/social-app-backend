const userService = require("../services/user.service");
const { successResponseBody } = require("../utils/responseBody");
const { StatusCodes } = require("http-status-codes");
const create = async (req, res) => {
  try {
    const userData = {
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    };
    const response = await userService.createUser(userData);
    successResponseBody.data = response;
    successResponseBody.message = "User created successfully";
    return res.status(StatusCodes.CREATED).json(successResponseBody);
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json(error);
  }
};

module.exports = { create };
