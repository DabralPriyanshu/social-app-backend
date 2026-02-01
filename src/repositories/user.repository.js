const User = require("../models/user.model");

class UserRepository {
  async create(userData) {
    try {
      return await User.create(userData);
    } catch (error) {
      throw error;
    }
  }
  async findByEmail(userEmail) {
    try {
      return await User.findOne({ email: userEmail });
    } catch (error) {
      throw error;
    }
  }
}
module.exports = UserRepository;
