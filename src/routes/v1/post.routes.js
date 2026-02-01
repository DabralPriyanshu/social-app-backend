const express = require("express");
const { isAuth } = require("../../middlewares/user.middleware");
const postController = require("../../controllers/post.controller");
const {
  upload,
  validateCreatePostRequest,
} = require("../../middlewares/post.middleware");
const postRouter = express.Router();

postRouter.post(
  "/create",
  isAuth,
  upload.single("image"),
  validateCreatePostRequest,
  postController.createPost,
);

module.exports = postRouter;
