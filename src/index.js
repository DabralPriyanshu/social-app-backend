const express = require("express");
const { PORT } = require("./config/server.config");
const connectToDB = require("./config/db.config");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Server started at port: ${PORT}`);
});
