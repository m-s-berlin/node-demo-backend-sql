const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/config")();
require("./startup/logging")();
require("./startup/db")();
require("./startup/prod")(app);
require("./startup/routes")(app);
require("./startup/validation")();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  //   winston.info(`Listening on http://localhost:${port}`);
  console.log(`Listening on http://localhost:${port}`);
});

// console.log("env  prvt key: " + process.env.VIDLY_JWTPRIVATEKEY);

if (process.env.NODE_ENV === "test") {
  module.exports = server;
}
