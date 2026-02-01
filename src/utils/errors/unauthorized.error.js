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
