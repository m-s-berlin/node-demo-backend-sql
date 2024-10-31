import express from "express";
import validate from "../middleware/validate.js";
import Joi from "joi";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";

export const authRouter = express.Router();

authRouter.post("/", validate(validateCredentials), async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();

  res.send({ token, name: user.name, email: user.email });
});

function validateCredentials(body) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(body);
}
