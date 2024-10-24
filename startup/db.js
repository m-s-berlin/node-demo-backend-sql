const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  const db = config.get("db");  // local
  // const db = process.env.MONGODB_URL;  // cloud

  mongoose.connect(db).then(() => {
    // winston.info(`Connected to ${db}...`);
    console.log(`Connected to ${db}...`);
  });
};
