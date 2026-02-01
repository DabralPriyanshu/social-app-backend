const Post = require("../models/post.model");

class PostRepository {
  async create(postData) {
    try {
      return await Post.create(postData);
    } catch (error) {
      throw error;
    }
  }
}
module.exports = PostRepository;
