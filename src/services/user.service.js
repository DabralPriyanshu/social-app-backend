const UserRepository = require("../repositories/user.repository");
const Errors = require("../utils/errors/index.js");
const { generateErrorObject, hashPassword } = require("../utils/helper");
const userRepository = new UserRepository();

const createUser = async (userData) => {
  try {
    userData.password = await hashPassword(userData.password);
    const user = await userRepository.create(userData);
    return { id: user._id, email: user.email, username: user.username };
  } catch (error) {
    console.log("service ", error);
    if (error.name == "ValidationError") {
      let err = generateErrorObject(error.errors, error.name);
      throw new Errors.BadRequestError(err);
    } else if (error.name == "MongoServerError" && error.code == 11000) {
      let err = generateErrorObject(error);
      throw new Errors.BadRequestError(err);
    } else {
      throw new Errors.ServerError();
    }
  }
};
module.exports = { createUser };
