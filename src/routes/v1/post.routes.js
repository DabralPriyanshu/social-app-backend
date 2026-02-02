const express = require("express");
const { isAuth } = require("../../middlewares/user.middleware");
const postController = require("../../controllers/post.controller");
const {
  upload,
  validateCreatePostRequest,
  validateCommentOnPostRequest,
} = require("../../middlewares/post.middleware");
const postRouter = express.Router();

postRouter.post(
  "/create",
  isAuth,
  upload.single("image"),
  validateCreatePostRequest,
  postController.createPost,
);
postRouter.patch("/like/:id", isAuth, postController.likeOrUnlikePost);
postRouter.patch(
  "/comment/:id",
  isAuth,
  validateCommentOnPostRequest,
  postController.addComment,
);

module.exports = postRouter;
