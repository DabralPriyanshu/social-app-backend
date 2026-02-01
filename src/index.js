const express = require("express");
const { PORT } = require("./config/server.config");
const connectToDB = require("./config/db.config");
const cookieParser = require("cookie-parser");
const apiRoutes = require("./routes/index");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", apiRoutes);
app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Server started at port: ${PORT}`);
});
