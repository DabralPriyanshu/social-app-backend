const bcrypt = require("bcryptjs");
const { BCRYPT_SALT } = require("../config/server.config");
const { JWT_SECRET_KEY, JWT_EXPIRY } = require("../config/server.config");
const jwt = require("jsonwebtoken");
const Errors = require("./errors/index");
const cloudinary = require("../config/cloudinary.config");

function generateErrorObject(error, errorName) {
  let err = [];
  if (errorName == "ValidationError") {
    Object.keys(error).forEach((e) => {
      err.push(`${e} is shorter than the allowed length `);
    });
  } else {
    err = "Email already exists";
  }
  console.log("error", err);
  return err;
}
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(Number(BCRYPT_SALT));
  return await bcrypt.hash(password, salt);
}
async function comparePassword(userEnterPassword, passwordInDb) {
  return await bcrypt.compare(userEnterPassword, passwordInDb);
}

async function generateToken(user) {
  return await jwt.sign({ id: user._id, email: user.email }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRY,
  });
}
async function verifyJwt(token) {
  return await jwt.verify(token, JWT_SECRET_KEY);
}
const uploadToCloudinary = async (filePath) => {
  try {
    const response = await cloudinary.uploader.upload(filePath);
    return { url: response.secure_url, publicId: response.public_id };
  } catch (error) {
    console.log("Error while uploading", error);
    throw new Errors.ServerError();
  }
};

module.exports = {
  generateErrorObject,
  hashPassword,
  comparePassword,
  generateToken,
  verifyJwt,
  uploadToCloudinary,
};
