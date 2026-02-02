const Post = require("../models/post.model");
//this class is used to perform all the operations related to post model
//this class will interact will the post model in db
class PostRepository {
  //this method will create a post in the post model by taking postData
  async create(postData) {
    try {
      return await Post.create(postData);
    } catch (error) {
      throw error;
    }
  }
  //this method wil find post based on its id as id is unique
  async findById(postId) {
    try {
      return await Post.findById({ _id: postId });
    } catch (error) {
      throw error;
    }
  }
 //this method will return all the post in the post model sorted by most recent created post and  by applying filter of page and limit and populate or we can se join (inner join) to attributes that are foreign key
  async findAll(page, limit) {
    try {
      const skip = (page - 1) * limit;

      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("userId", "username")
        .populate("likes", "_id username")
        .populate("comments.userId", "_id username");

      const totalPosts = await Post.countDocuments();

      return {
        posts,
        hasMore: skip + posts.length < totalPosts,
      };
    } catch (error) {
      throw error;
    }
  }
}
module.exports = PostRepository;
