const express = require("express");
const userRoutes = require("./user.routes");
const postRoutes = require("./post.routes");
const v1Router = express.Router();
v1Router.use("/users", userRoutes);
v1Router.use("/posts", postRoutes);
module.exports = v1Router;
