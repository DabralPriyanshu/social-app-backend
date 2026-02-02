const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    //username will be of minimum length 3 and it is required
    username: {
      type: String,
      required: true,
      minlength: 3,
    },
    //email of user will be required show be unique and in lowercase
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    //password of user will be required
    password: {
      type: String,
      required: true,
    },
  },
  //this will store timestamps of created at and updated at of user
  { timestamps: true },
);
//creating user model from userSchema
const User = mongoose.model("User", userSchema);
module.exports = User;
