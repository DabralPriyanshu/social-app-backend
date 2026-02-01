const bcrypt = require("bcryptjs");
const { BCRYPT_SALT } = require("../config/server.config");

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
module.exports = { generateErrorObject, hashPassword };
