import { NextFunction, Request, Response } from "express";
import * as userService from "../services/userService";
import { generateToken } from "../utils/jwt";
import { AuthRequest } from "../middleware/authMiddleware";
import { sendSuccessResponse, sendErrorResponse } from "../utils/response";
import bcrypt from "bcryptjs";

export async function createAccount(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await userService.createUser(req.body);
    sendSuccessResponse(res, "User created successfully");
  } catch (err) {
    next(err);
  }
}

export async function authenticate(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body;
  const user = await userService.getUserByUsername(username);

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user.id!);
    await userService.logUserConnection({
      id_user: user.id!,
      connect_date: new Date(),
      ip: req.ip ?? "unknown",
    });
    sendSuccessResponse(res, "Authentication successful", { token });
  } else {
    sendErrorResponse(res, 400, "Invalid credentials");
  }
}

export async function getProfile(
  req: AuthRequest,
  res: Response
): Promise<void> {
  const userId = req.user?.userId!;
  const user = await userService.getUserById(userId);
  const connections = await userService.getUserConnections(userId);

  if (user) {
    const { password, ...userWithoutPassword } = user;
    sendSuccessResponse(res, "Profile fetched successfully", {
      user: userWithoutPassword,
      connections,
    });
  } else {
    sendErrorResponse(res, 404, "User not found");
  }
}
