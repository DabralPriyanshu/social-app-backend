//we are exporting all the error classes as a object because import these many variables in the file will decrease the code readability

module.exports = {
  BadRequestError: require("./badrequest.error"),
  NotFoundError: require("./notfound.error"),
  ServerError: require("./internalserver.error"),
  UnAuthorizedError: require("./unauthorized.error"),
};
