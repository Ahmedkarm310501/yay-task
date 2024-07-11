import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

/**
 * Generate token for user
 * @param userId user id to generate token
 * @returns string
 */
export function generateToken(userId: number): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
}

/**
 * Verify token
 * @param token token to verify
 * @returns string | JwtPayload
 */
export function verifyToken(token: string): string | JwtPayload {
  return jwt.verify(token, JWT_SECRET);
}
