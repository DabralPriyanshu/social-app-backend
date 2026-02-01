const { StatusCodes } = require("http-status-codes");
class BadRequestError extends Error {
  constructor(error) {
    super();
    this.message = "BAD REQUEST ";
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.err = error;
    this.success = false;
  }
}
module.exports = BadRequestError;
