
///we will throw this class when we have to throw any error related to not found error
const { StatusCodes } = require("http-status-codes");
class NotFoundError extends Error {
  constructor(error) {
    super();
    this.message = "NOT FOUND ";
    this.statusCode = StatusCodes.NOT_FOUND;
    this.err = error;
    this.success = false;
  }
}
module.exports = NotFoundError;
