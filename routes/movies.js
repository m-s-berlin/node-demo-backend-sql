import express from "express";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import { Movie, validateMovie } from "../models/movie.js";
import { Genre } from "../models/genre.js";

export const movieRouter = express.Router();

movieRouter.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");

  res.send(movies);
});

movieRouter.post("/", auth, validate(validateMovie), async (req, res) => {
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre!");

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  await movie.save();

  res.send(movie);
});

movieRouter.put("/:id", auth, validate(validateMovie), async (req, res) => {
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre!");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

movieRouter.delete("/:id", auth, async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

movieRouter.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});
