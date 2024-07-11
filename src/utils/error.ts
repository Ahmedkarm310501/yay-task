/**
 * Custom error class to handle application errors
 */
export class AppError extends Error {
  constructor(public message: string, public statusCode: number = 500) {
    super(message);
  }
}
