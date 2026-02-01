const User = require("../models/user.model");

class UserRepository {
  async create(userData) {
    try {
      return await User.create(userData);
    } catch (error) {
      throw error;
    }
  }
}
module.exports = UserRepository;
