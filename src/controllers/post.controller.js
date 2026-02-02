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

const likeOrUnlikePost = async (req, res) => {
  try {
    const postData = {
      flag: req.body.flag == "false" || req.body.flag == false ? false : true,
      userId: req.user.id,
      postId: req.params?.id,
    };
    const response = await postService.updatePost(postData);
    successResponseBody.data = response;
    successResponseBody.message =
      postData.flag == true
        ? "Post liked successfully"
        : "Post unlike successfully";
    return res.status(StatusCodes.OK).json(successResponseBody);
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json(error);
  }
};
module.exports = { createPost, likeOrUnlikePost };
