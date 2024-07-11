import { body } from "express-validator";
import { validate } from "../middleware/validateMiddleware";

export const validateAuthenticate = [
  body("username").isString().notEmpty(),
  body("password").isString().notEmpty(),
  validate,
];
