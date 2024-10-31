import { Rental, validateRental } from "../models/rental.js";
import { Movie } from "../models/movie.js";
import { Customer } from "../models/customer.js";
import express from "express";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";

export const rentalRouter = express.Router();

rentalRouter.get("/", auth, async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

rentalRouter.post("/", auth, validate(validateRental), async (req, res) => {
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
      isGold: customer.isGold,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  rental = await rental.save();

  movie.numberInStock--;
  movie.save();

  res.send(rental);
});

rentalRouter.get("/:id", auth, async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
});
