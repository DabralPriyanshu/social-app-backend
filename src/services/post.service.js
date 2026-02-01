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

module.exports = { createPost };
