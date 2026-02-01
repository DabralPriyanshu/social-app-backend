const Errors = require("../utils/errors/index");
const { verifyJwt } = require("../utils/helper");

const validateCreateUserRequest = (req, res, next) => {
  try {
    if (!req.body?.email) {
      const err = new Errors.BadRequestError(
        "Email is not present in the incoming request body",
      );
      return res.status(err.statusCode).json(err);
    }
    if (!req.body?.password) {
      const err = new Errors.BadRequestError(
        "Password is not present in the incoming request body",
      );
      return res.status(err.statusCode).json(err);
    }
    if (!req.body?.username) {
      const err = new Errors.BadRequestError(
        "Username is not present in the incoming request body",
      );
      return res.status(err.statusCode).json(err);
    }
    next();
  } catch (error) {
    const err = new Errors.ServerError();
    return res.status(err.statusCode).json(err);
  }
};
const validateLoginUserRequest = (req, res, next) => {
  try {
    if (!req.body?.email) {
      const err = new Errors.BadRequestError(
        "Email is not present in the incoming request body",
      );
      return res.status(err.statusCode).json(err);
    }
    if (!req.body?.password) {
      const err = new Errors.BadRequestError(
        "Password is not present in the incoming request body",
      );
      return res.status(err.statusCode).json(err);
    }
    next();
  } catch (error) {
    const err = new Errors.ServerError();
    return res.status(err.statusCode).json(err);
  }
};
const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      const err = new Errors.UnAuthorizedError("Token not provided");
      return res.status(err.statusCode).json(err);
    }
    const decoded = await verifyJwt(token);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    if (error.name == "JsonWebTokenError") {
      const err = new Errors.UnAuthorizedError("Invalid token provided");
      return res.status(err.statusCode).json(err);
    } else {
      const err = new Errors.ServerError();
      return res.status(err.statusCode).json(err);
    }
  }
};
module.exports = {
  validateCreateUserRequest,
  validateLoginUserRequest,
  isAuth,
};
