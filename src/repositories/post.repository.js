const Post = require("../models/post.model");

class PostRepository {
  async create(postData) {
    try {
      return await Post.create(postData);
    } catch (error) {
      throw error;
    }
  }
  async findById(postId) {
    try {
      return await Post.findById({ _id: postId });
    } catch (error) {
      throw error;
    }
  }
}
module.exports = PostRepository;
