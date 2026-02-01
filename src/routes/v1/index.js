const express = require("express");
const userRoutes = require("./user.routes");
const v1Router = express.Router();
v1Router.use("/users", userRoutes);
module.exports = v1Router;
