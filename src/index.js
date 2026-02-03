const express = require("express");
const { PORT, FRONTEND_URL } = require("./config/server.config");
const connectToDB = require("./config/db.config");
const cookieParser = require("cookie-parser");
const apiRoutes = require("./routes/index");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: FRONTEND_URL, credentials: true })); //config cors to avoid cors error so that frontend can request backend and backend have idea about from where the request is coming
app.use("/api", apiRoutes); //if after server url /api will be present in the endpoints the request will be passed to apiRoutes

app.get("/", (req, res) => {
  res.json({ success: true, message: "Service is alive" });
});
app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Server started at port: ${PORT}`);
});
