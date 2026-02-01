const Errors = require("../utils/errors/index");

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
module.exports = { validateCreateUserRequest, validateLoginUserRequest };
