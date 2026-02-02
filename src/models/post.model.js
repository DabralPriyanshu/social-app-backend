const mongoose = require("mongoose");
//this is post model to store post details
const postSchema = new mongoose.Schema(
  {
    // storing userId of user who will create post
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //text related to post
    text: {
      type: String,
      trim: true,
    },
    //image related to post will have url and publicId provided by cloudinary after successfully storing the image
    image: {
      url: String,
      publicId: String,
    },
    //we will store likes as array of userId of users who wil like the post
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    //we will store likes as array of object containing userId and text to comment of users who wil comment on the post
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        text: {
          type: String,
          trim: true,
        },
      },
    ],
  },
//this will store timestamps of created at and updated at of post
  { timestamps: true },
);
//creating post model
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
