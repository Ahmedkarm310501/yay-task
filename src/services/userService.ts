import pool from "../utils/db";
import { User, UserConnect } from "../models/userModel";
import bcrypt from "bcryptjs";
import { AppError } from "../utils/error";
import { hashPassword } from "../utils/hashPassword";

/**
 * Create a new user
 * @param user User object
 * @returns Promise
 * @throws AppError if username already exists
 */
export async function createUser(user: User): Promise<void> {
  const { username, password, firstName, lastName } = user;

  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    throw new AppError("Username already exists", 400);
  }
  const hashedPassword = await hashPassword(password);

  await pool.query(
    "INSERT INTO user (username, password, firstName, lastName) VALUES (?, ?, ?, ?)",
    [username, hashedPassword, firstName, lastName]
  );
}

/**
 * Get user by username
 * @param username  username
 * @returns Promise<User | null>
 */
export async function getUserByUsername(
  username: string
): Promise<User | null> {
  const [rows] = await pool.query("SELECT * FROM user WHERE username = ?", [
    username,
  ]);
  const users = rows as User[];
  if (users.length > 0) {
    return users[0];
  }
  return null;
}

/**
 *  Get user by id
 * @param userId  user id
 * @returns Promise<User | null>
 */
export async function getUserById(userId: number): Promise<User | null> {
  const [rows] = await pool.query("SELECT * FROM user WHERE id = ?", [userId]);
  const users = rows as User[];
  if (users.length > 0) {
    return users[0];
  }
  return null;
}

/**
 * Log user connection
 * @param userConnect UserConnect object
 * @returns Promise
 */
export async function logUserConnection(
  userConnect: UserConnect
): Promise<void> {
  const { id_user, connect_date, ip } = userConnect;
  await pool.query(
    "INSERT INTO user_connect (id_user, connect_date, ip) VALUES (?, ?, ?)",
    [id_user, connect_date, ip]
  );
}

/**
 * Get user connections
 * @param userId  user id
 * @returns Promise<UserConnect[]>
 */
export async function getUserConnections(
  userId: number
): Promise<UserConnect[]> {
  const [rows] = await pool.query(
    "SELECT * FROM user_connect WHERE id_user = ?",
    [userId]
  );
  return rows as UserConnect[];
}
