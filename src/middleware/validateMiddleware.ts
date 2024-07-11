import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { sendErrorResponse } from "../utils/response";

/**
 *  Validate request body
 * @param req Request object
 * @param res  Response object
 * @param next  Next function
 * @returns  void
 */
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendErrorResponse(res, 422, "Validation errors", errors.array());
  }
  next();
};
