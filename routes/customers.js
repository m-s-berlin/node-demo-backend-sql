import express from "express";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import { Customer, validateCustomer } from "../models/customer.js";

export const customerRouter = express.Router();

customerRouter.get("/", auth, async (req, res) => {
  const customers = await Customer.find().sort("name");

  res.send(customers);
});

customerRouter.post("/", auth, validate(validateCustomer), async (req, res) => {
  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  await customer.save();

  res.send(customer);
});

customerRouter.put("/:id", auth, validate(validateCustomer), async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    },
    { new: true }
  );
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

customerRouter.delete("/:id", auth, async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

customerRouter.get("/:id", auth, async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});
