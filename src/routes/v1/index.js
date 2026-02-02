const express = require("express");
const userRoutes = require("./user.routes");
const postRoutes = require("./post.routes");
const v1Router = express.Router();
//if after /v1 /users will be there in the route so request will come here and pass  to userRoutes
v1Router.use("/users", userRoutes);
//if after /v1 /posts will be there in the route so request will come here and pass  to postRoutes
v1Router.use("/posts", postRoutes);
module.exports = v1Router;
