const UserRepository = require("../repositories/user.repository");
const Errors = require("../utils/errors/index.js");
const {
  generateErrorObject,
  hashPassword,
  comparePassword,
  generateToken,
} = require("../utils/helper");

// Create instance of UserRepository to interact with database
const userRepository = new UserRepository();

/*
|--------------------------------------------------------------------------
| Register User Service
|--------------------------------------------------------------------------
| - Receives user data from controller
| - Hashes the password before saving
| - Stores user in database using repository
| - Returns minimal user info on success
| - Handles validation, duplicate, and server errors properly
*/
const registerUser = async (userData) => {
  try {
    // Hash user password before saving to DB
    userData.password = await hashPassword(userData.password);

    // Create new user in database
    const user = await userRepository.create(userData);

    // Return safe user data (no password)
    return { id: user._id, email: user.email, username: user.username };
  } catch (error) {
    console.log("service ", error);

    // Handle mongoose validation errors
    if (error.name == "ValidationError") {
      let err = generateErrorObject(error.errors, error.name);
      throw new Errors.BadRequestError(err);

    // Handle duplicate key error (email / username already exists)
    } else if (error.name == "MongoServerError" && error.code == 11000) {
      let err = generateErrorObject(error);
      throw new Errors.BadRequestError(err);

    // Handle any other server error
    } else {
      throw new Errors.ServerError();
    }
  }
};

/*
|--------------------------------------------------------------------------
| Login User Service
|--------------------------------------------------------------------------
| - Finds user by email
| - Compares entered password with hashed password
| - Generates JWT token on successful login
| - Throws proper errors for invalid credentials or server issues
*/
const loginUser = async (userData) => {
  try {
    // Find user by email
    const user = await userRepository.findByEmail(userData.email);

    // If user does not exist
    if (!user) {
      throw new Errors.NotFoundError(
        `No user found with the given email ${userData.email}`,
      );
    }

    // Compare entered password with stored hashed password
    const isCorrectPassword = await comparePassword(
      userData.password,
      user.password,
    );

    // If password does not match
    if (!isCorrectPassword) {
      throw new Errors.UnAuthorizedError("Invalid credentials");
    }

    // Generate JWT token
    const token = await generateToken(user);

    // Return user data with token
    return { id: user._id, email: user.email, username: user.username, token };
  } catch (error) {
    console.log("service ", error);

    // If error is already a custom error, throw as it is
    if (error.err) {
      throw error;
    } else {
      // Handle unknown server errors
      throw new Errors.ServerError();
    }
  }
};

module.exports = { registerUser, loginUser };
