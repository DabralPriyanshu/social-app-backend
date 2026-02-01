const { successResponseBody } = require("../utils/responseBody");
const { StatusCodes } = require("http-status-codes");
const ServerError = require("../utils/errors/internalserver.error");
const postService = require("../services/post.service");
const createPost = async (req, res) => {
  try {
    const postData = {
      userId: req.user.id,
      text: req.body?.text,
      image: req.file?.path,
    };
    const response = await postService.createPost(postData);
    successResponseBody.data = response;
    successResponseBody.message = "Post created successfully";
    return res.status(StatusCodes.CREATED).json(successResponseBody);
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json(error);
  }
};
module.exports = { createPost };
