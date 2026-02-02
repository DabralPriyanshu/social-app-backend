//This error class will be used to throw as a error is any unauthorized related error will come

const { StatusCodes } = require("http-status-codes");
class UnAuthorizedError extends Error {
  constructor(error) {
    super();
    this.message = "Your are not authorized to access this resource";
    this.statusCode = StatusCodes.UNAUTHORIZED;
    this.err = error;
    this.success = false;
  }
}
module.exports = UnAuthorizedError;
