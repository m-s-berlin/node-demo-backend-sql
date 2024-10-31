import winston from "winston";
import "winston-mongodb";
import "express-async-errors";

const exeptionTransports = [
  new winston.transports.Console({ colorize: true, prettyPrint: true }),
];

// in production no file writings on free host
if (process.env.NODE_ENV !== "production") {
  exeptionTransports.push(
    new winston.transports.File({ filename: "./logs/uncaughtExceptions.log" })
  );
}

winston.exceptions.handle(exeptionTransports);

process.on("unhandledRejection", (ex) => {
  throw ex;
});

if (process.env.NODE_ENV !== "production") {
  winston.add(
    new winston.transports.File({
      filename: "./logs/errors.log",
      level: "error",
    })
  );
  winston.add(new winston.transports.File({ filename: "./logs/combined.log" }));
}

winston.add(
  new winston.transports.Console({ format: winston.format.simple() })
);
