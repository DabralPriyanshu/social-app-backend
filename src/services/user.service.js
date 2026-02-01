const UserRepository = require("../repositories/user.repository");
const Errors = require("../utils/errors/index.js");
const {
  generateErrorObject,
  hashPassword,
  comparePassword,
  generateToken,
} = require("../utils/helper");
const userRepository = new UserRepository();

const registerUser = async (userData) => {
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
const loginUser = async (userData) => {
  try {
    const user = await userRepository.findByEmail(userData.email);
    if (!user) {
      throw new Errors.NotFoundError(
        `No user found with the given email ${userData.email}`,
      );
    }
    const isCorrectPassword = await comparePassword(
      userData.password,
      user.password,
    );
    if (!isCorrectPassword) {
      throw new Errors.UnAuthorizedError("Invalid credentials");
    }
    const token = await generateToken(user);
    return { id: user._id, email: user.email, username: user.username, token };
  } catch (error) {
    console.log("service ", error);
    if (error.err) {
      throw error;
    } else {
      throw new Errors.ServerError();
    }
  }
};
module.exports = { registerUser, loginUser };
