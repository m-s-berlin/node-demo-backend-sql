process.env["NODE_CONFIG_DIR"] = __dirname + "/../config/";
const config = require("config");
// const dotenv = require("dotenv");

module.exports = function () {
  // const loadedConfig = dotenv.config();
  // console.log(loadedConfig);
  

  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
//   if (!process.env.VIDLY_JWTPRIVATEKEY) {
//     throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
//   }

};
