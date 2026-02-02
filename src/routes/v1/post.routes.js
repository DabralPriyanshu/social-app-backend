const express = require("express");
const { isAuth } = require("../../middlewares/user.middleware");
const postController = require("../../controllers/post.controller");
const {
  upload,
  validateCreatePostRequest,
  validateCommentOnPostRequest,
} = require("../../middlewares/post.middleware");

const postRouter = express.Router();

/*
|--------------------------------------------------------------------------
| Create Post Route
|--------------------------------------------------------------------------
| POST /posts/create
| - isAuth: checks if user is authenticated
| - upload.single("image"): handles image upload
| - validateCreatePostRequest: validates post data
| - createPost: controller to create post
*/
postRouter.post(
  "/create",
  isAuth,
  upload.single("image"),
  validateCreatePostRequest,
  postController.createPost,
);

/*
|--------------------------------------------------------------------------
| Like Post Route
|--------------------------------------------------------------------------
| PATCH /posts/like/:id
| - isAuth: checks if user is authenticated
| - likePost: controller to like a post
*/
postRouter.patch("/like/:id", isAuth, postController.likePost);

/*
|--------------------------------------------------------------------------
| Comment On Post Route
|--------------------------------------------------------------------------
| PATCH /posts/comment/:id
| - isAuth: checks if user is authenticated
| - validateCommentOnPostRequest: validates comment text
| - addComment: controller to add comment
*/
postRouter.patch(
  "/comment/:id",
  isAuth,
  validateCommentOnPostRequest,
  postController.addComment,
);

/*
|--------------------------------------------------------------------------
| Get All Posts Route
|--------------------------------------------------------------------------
| GET /posts
| - isAuth: checks if user is authenticated
| - getAllPost: controller to fetch all posts (supports pagination)
*/
postRouter.get("/", isAuth, postController.getAllPost);

module.exports = postRouter;
