import { Request, Response, NextFunction } from "express";
import { AppError } from "../helpers/app-error.helper";

const errorHandlerMiddleware = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Handle known operational errors
  if (err instanceof AppError) {
    console.log("Error middleware:", err.message);
    res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  } else {
    // Handle unknown or programming errors
    console.error("Unexpected error:", err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

export default errorHandlerMiddleware;