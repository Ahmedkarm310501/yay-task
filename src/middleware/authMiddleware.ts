import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { sendErrorResponse } from "../utils/response";

export interface AuthRequest extends Request {
  user?: { userId: number };
}

/**
 *  Authenticate token
 * @param req Request object
 * @param res  Response object
 * @param next  Next function
 * @returns  void
 */
export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return sendErrorResponse(res, 401, "Access denied. No token provided.");

  try {
    const user = verifyToken(token) as { userId: number };
    req.user = user;
    next();
  } catch (err) {
    sendErrorResponse(res, 403, "Invalid token.");
  }
}
