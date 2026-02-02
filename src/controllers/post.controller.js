const { successResponseBody } = require("../utils/responseBody");
const { StatusCodes } = require("http-status-codes");
const ServerError = require("../utils/errors/internalserver.error");
const postService = require("../services/post.service");

//controllers only job is to collect the request and pass it to services and collect the response from services and build that response with successResponseBody and pass to client else pass error to client
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

const likePost = async (req, res) => {
  try {
    const postData = {
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
const addComment = async (req, res) => {
  try {
    const postData = {
      userId: req.user.id,
      postId: req.params?.id,
      text: req.body.text,
    };
    const response = await postService.commentOnPost(postData);
    successResponseBody.data = response;
    successResponseBody.message = "Commented successfully";
    return res.status(StatusCodes.OK).json(successResponseBody);
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json(error);
  }
};
const getAllPost = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const response = await postService.getPosts(page, limit);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully fetched all the posts";
    return res.status(StatusCodes.OK).json(successResponseBody);
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json(error);
  }
};
module.exports = { createPost, likePost, addComment, getAllPost };
