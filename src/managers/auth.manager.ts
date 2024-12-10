
import { authService } from "../services/auth/auth.service";
import { SignInDto } from "../types/interfaces/requests/signin/sign-in";
import { UserDto } from "../types/interfaces/requests/user/user";
import { ResponseData } from "../types/interfaces/api-response.interface";
import { AppError } from "../helpers/app-error.helper";

class AuthManager {

  async signIn(request: SignInDto): Promise<ResponseData<string>> {
    const userResponse: ResponseData<string> = await authService.signIn(request);
    if (!userResponse.success) {
      throw new AppError(userResponse.message, 400);
    }
    return userResponse;
  }

  async getUsers(): Promise<ResponseData<UserDto[]>> {
    const userResponse: ResponseData<UserDto[]> = await authService.getUsers();
    if (!userResponse.success) {
      throw new AppError(userResponse.message, 400);
    }
    return userResponse;
  }
}
export const authManager = new AuthManager();