import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import validate from "../middleware/validate.js";
import validateObjectID from "../middleware/validateObjectId.js";
import { Genre, validateGenre } from "../models/genre.js";

export const genreRouter = express.Router();

genreRouter.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");

  res.send(genres);
});

genreRouter.post("/", auth, validate(validateGenre), async (req, res) => {
  const genre = new Genre({ name: req.body.name });
  await genre.save();

  res.send(genre);
});

genreRouter.put(
  "/:id",
  auth,
  validateObjectID,
  validate(validateGenre),
  async (req, res) => {
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      {
        new: true,
      }
    );
    if (!genre)
      return res.status(404).send("The genre with the given ID was not found.");

    res.send(genre);
  }
);

genreRouter.delete("/:id", auth, admin, validateObjectID, async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

genreRouter.get("/:id", validateObjectID, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});
