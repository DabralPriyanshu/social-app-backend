///we will throw this class when we have to throw any error related server error

const { StatusCodes } = require("http-status-codes");
class InternalServerError extends Error {
  constructor() {
    super();
    this.message = "Internal server error";
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    this.err = "Something went wrong , Please try again later";
    this.success = false;
  }
}
module.exports = InternalServerError;
