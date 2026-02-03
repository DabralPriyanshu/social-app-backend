//all the env variables are exported from this file

const env = require("dotenv");
env.config({ quiet: true });
module.exports = {
  PORT: process.env.PORT || 3001,
  DB_URL: process.env.DB_URL,
  BCRYPT_SALT: process.env.BCRYPT_SALT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  FRONTEND_URL: process.env.FRONTEND_URL,
};
