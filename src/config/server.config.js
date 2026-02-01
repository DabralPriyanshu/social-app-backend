const env = require("dotenv");
env.config({ quiet: true });
module.exports = {
  PORT: process.env.PORT || 3001,
};
