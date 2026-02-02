const User = require("../models/user.model");
//this class is used to perform all the operations related to user model
//this class will interact will the user model in db
class UserRepository {
  //this method is used to create a user by taking user Data
  async create(userData) {
    try {
      return await User.create(userData);
    } catch (error) {
      throw error;
    }
  }
  //this method is used to search a user based on its email as email is unique
  async findByEmail(userEmail) {
    try {
      return await User.findOne({ email: userEmail });
    } catch (error) {
      throw error;
    }
  }
}
module.exports = UserRepository;
