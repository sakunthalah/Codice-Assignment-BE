import { NextFunction, Request, Response } from "express";
import { handleSuccess } from "../helpers/response.helper";
import { UserLoginDto } from "../types/interfaces/requests/login/user-login";
import { authManager } from "../managers/auth.manager";
import { AppError } from "../helpers/app-error.helper";


class AuthController {

  public signIn = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (Object.keys(req.body).length === 0) {
        throw new AppError("Bad request", 404);
      }
      const requestPayload: UserLoginDto = req.body;
      const loginResponse = await authManager.signIn(requestPayload);
      if (loginResponse.success) {
        handleSuccess(res, loginResponse.message, loginResponse);
      }
      else {
        throw new AppError(loginResponse.message, 400);
      }

    }
    catch (error: any) {
      next(error);
    }
  };

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userListResponse = await authManager.getUsers();
      handleSuccess(res, userListResponse.message, userListResponse.data);
    }
    catch (error: any) {
      next(error);
    }
  }
}

export const authController = new AuthController();