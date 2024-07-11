import bcrypt from "bcryptjs";

/**
 * Hash password
 * @param password password to hash
 * @returns  Promise<string>
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}
