import express from "express";
import cors from "cors";
import { genreRouter } from "../routes/genres.js";
import { customerRouter } from "../routes/customers.js";
import { movieRouter } from "../routes/movies.js";
import { rentalRouter } from "../routes/rentals.js";
import { userRouter } from "../routes/users.js";
import { returnRouter } from "../routes/returns.js";
import { authRouter } from "../routes/auth.js";
import error from "../middleware/error.js";

export default function (app) {
  app.use(express.json());
  app.use(cors());

  app.use("/api/genres", genreRouter);
  app.use("/api/customers", customerRouter);
  app.use("/api/movies", movieRouter);
  app.use("/api/rentals", rentalRouter);
  app.use("/api/users", userRouter);
  app.use("/api/returns", returnRouter);
  app.use("/api/auth", authRouter);

  app.use(error);
}
