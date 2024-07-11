import { Response } from "express";

/**
 *  Send a success response
 * @param res  Response object
 * @param message  Message to send in the response
 * @param data  Data to send in the response
 */
export function sendSuccessResponse(
  res: Response,
  message: string,
  data?: any
) {
  res.json({
    success: true,
    message,
    data,
  });
}

/**
 *  Send an error response
 * @param res Response object
 * @param statusCode Status code to send in the response
 * @param message Message to send in the response
 * @param errors Errors to send in the response
 */
export function sendErrorResponse(
  res: Response,
  statusCode: number,
  message: string,
  errors?: any
) {
  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
}
