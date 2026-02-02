const PostRepository = require("../repositories/post.repository");
const { uploadToCloudinary } = require("../utils/helper");
const postRepository = new PostRepository();
const Errors = require("../utils/errors/index");
const fs = require("node:fs");

/*
|--------------------------------------------------------------------------
| Create Post Service
|--------------------------------------------------------------------------
| - Receives post data from controller
| - Uploads image to Cloudinary if image exists
| - Stores image URL & publicId in DB
| - Deletes local file after successful upload
| - Creates post in database
*/
async function createPost(postData) {
  try {
    // If image is provided, upload it to Cloudinary
    if (postData.image) {
      const filePath = postData.image;

      // Upload image and get URL & publicId
      const { url, publicId } = await uploadToCloudinary(filePath);

      // Replace local image path with cloudinary data
      postData.image = {};
      postData.image.url = url;
      postData.image.publicId = publicId;

      // Remove image from local storage
      fs.unlinkSync(filePath);
    }

    // Create post in database
    return await postRepository.create(postData);
  } catch (error) {
    console.log(error);
    throw new Errors.ServerError();
  }
}

/*
|--------------------------------------------------------------------------
| Like Post Service
|--------------------------------------------------------------------------
| - Finds post by ID
| - Prevents duplicate likes by same user
| - Adds userId to likes array
| - Returns updated likes count
*/
async function updatePost(postData) {
  try {
    // Find post by ID
    let post = await postRepository.findById(postData.postId);

    // If post does not exist
    if (!post) {
      throw new Errors.NotFoundError(
        "Post not found with given id " + postData.postId,
      );
    }

    // If user already liked the post, do nothing
    if (post.likes.includes(postData.userId)) {
      return {};
    }

    // Add userId to likes array
    post.likes.push(postData.userId);
    await post.save();

    // Return updated likes count
    return { likesCount: post.likes.length };
  } catch (error) {
    console.log(error);
    if (error.err) {
      throw error;
    }
    throw new Errors.ServerError();
  }
}

/*
|--------------------------------------------------------------------------
| Comment On Post Service
|--------------------------------------------------------------------------
| - Finds post by ID
| - Adds comment with userId and text
| - Saves updated post
| - Returns total comments count
*/
const commentOnPost = async (postData) => {
  try {
    // Find post by ID
    const post = await postRepository.findById(postData.postId);

    // If post does not exist
    if (!post) {
      throw new Errors.NotFoundError(
        "Post not found with given id " + postData.postId,
      );
    }

    // Push new comment to comments array
    post.comments.push({ userId: postData.userId, text: postData.text });
    await post.save();

    // Return updated comments count
    return { commentsCount: post.comments.length };
  } catch (error) {
    console.log(error);
    if (error.err) {
      throw error;
    }
    throw new Errors.ServerError();
  }
};

/*
|--------------------------------------------------------------------------
| Get Posts Service (Pagination Supported)
|--------------------------------------------------------------------------
| - Fetches posts from database
| - Supports page and limit for pagination
*/
const getPosts = async (page, limit) => {
  try {
    return await postRepository.findAll(page, limit);
  } catch (error) {
    console.log(error);
    throw new Errors.ServerError();
  }
};

module.exports = { createPost, updatePost, commentOnPost, getPosts };
