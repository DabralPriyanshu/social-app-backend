const PostRepository = require("../repositories/post.repository");
const { uploadToCloudinary } = require("../utils/helper");
const postRepository = new PostRepository();
const Errors = require("../utils/errors/index");
const fs = require("node:fs");

async function createPost(postData) {
  try {
    if (postData.image) {
      const filePath = postData.image;
      const { url, publicId } = await uploadToCloudinary(filePath);
      postData.image = {};
      postData.image.url = url;
      postData.image.publicId = publicId;
      fs.unlinkSync(filePath);
    }
    return await postRepository.create(postData);
  } catch (error) {
    console.log(error);
    throw new Errors.ServerError();
  }
}
async function updatePost(postData) {
  try {
    let post;
    console.log(postData);
    if (postData.flag == true) {
      post = await postRepository.findById(postData.postId);
      if (!post) {
        throw new Errors.NotFoundError(
          "Post not found with given id " + postData.postId,
        );
      }
      if (post.likes.includes(postData.userId)) {
        return {};
      }
      post.likes.push(postData.userId);
      await post.save();
      return { likesCount: post.likes.length };
    } else {
      post = await postRepository.findById(postData.postId);
      if (!post) {
        throw new Errors.NotFoundError(
          "Post not found with given id " + postData.postId,
        );
      }
      post.likes = post.likes.filter((id) => id.toString() !== postData.userId);
      await post.save();
      return { likesCount: post.likes.length };
    }
  } catch (error) {
    console.log(error);
    if (error.err) {
      throw error;
    }
    throw new Errors.ServerError();
  }
}

module.exports = { createPost, updatePost };
