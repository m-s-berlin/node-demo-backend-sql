import express from "express";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import Joi from "joi";
import { Rental } from "../models/rental.js";
import { Movie } from "../models/movie.js";

export const returnRouter = express.Router();

returnRouter.post("/", auth, validate(validateReturn), async (req, res) => {
  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

  if (!rental) return res.status(404).send("Rental not found.");

  if (rental.dateReturned)
    return res.status(400).send("Return already processed.");

  rental.return();
  await rental.save();

  await Movie.updateOne(
    { _id: rental.movie._id },
    {
      $inc: { numberInStock: 1 },
    }
  );

  res.send(rental);
});

function validateReturn(body) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });

  return schema.validate(body);
}
