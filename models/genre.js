import Joi from "joi";
import joiObjectId from "joi-objectid";
import mongoose from "mongoose";

Joi.objectId = joiObjectId(Joi);

export const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
});

export const Genre = mongoose.model("Genre", genreSchema);

export function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  });

  return schema.validate(genre);
}
