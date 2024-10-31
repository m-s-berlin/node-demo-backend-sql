import winston from "winston";
import mongoose from "mongoose";
import config from "config";

export default function () {
  const db = config.get("db"); // local
  // const db = process.env.MONGODB_URL;  // cloud

  mongoose.connect(db).then(() => {
    winston.info(`Connected to ${db}...`);
  });
};
