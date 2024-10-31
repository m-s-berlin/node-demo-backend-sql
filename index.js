import winston from "winston";
import express from "express";
import config from "./startup/config.js";
import "./startup/logging.js";
import db from "./startup/db.js";
import prod from "./startup/prod.js";
import routes from "./startup/routes.js";
import validation from "./startup/validation.js";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

process.env["NODE_CONFIG_DIR"] = __dirname + "/../config/";

const app = express();

config();
db();
prod(app);
validation();
routes(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  winston.info(`Listening on http://localhost:${port}`);
});

export default process.env.NODE_ENV === "test" && server;
