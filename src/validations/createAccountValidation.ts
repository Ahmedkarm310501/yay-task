import { body } from "express-validator";
import { validate } from "../middleware/validateMiddleware";

export const validateCreateAccount = [
  body("username").isString().notEmpty(),
  body("password").isString().notEmpty(),
  body("firstName").isString().notEmpty(),
  body("lastName").isString().notEmpty(),
  validate,
];
