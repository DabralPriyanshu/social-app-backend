const mongoose = require("mongoose");
const { DB_URL } = require("./server.config");
const connectToDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("DB connected successfully");
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1);
  }
};
module.exports = connectToDB;
