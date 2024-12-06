export class AppError extends Error {
    public statusCode: number;
    public isOperational: boolean;
  
    constructor(message: string, statusCode: number, isOperational: boolean = true) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
  
      // Maintain proper stack trace for where the error was thrown
      //Error.captureStackTrace(this, this.constructor);
    }
  }