
import { loginService } from "../services/login/login.service";
import { UserLoginDto } from "../types/interfaces/requests/login/user-login";
import { UserDto } from "../types/interfaces/requests/user/user";
import { ResponseData } from "../types/interfaces/api-response.interface";
import { AppError } from "../helpers/app-error.helper";

class LoginManager {

  async signIn(request: UserLoginDto): Promise<ResponseData<string>> {
    const userResponse: ResponseData<string> = await loginService.signIn(request);
    if (!userResponse.success) {
      throw new AppError(userResponse.message, 400);
    }
    return userResponse;

  }

  async getUsers(): Promise<ResponseData<UserDto[]>> {
    const userResponse: ResponseData<UserDto[]> = await loginService.getUsers();
    if (!userResponse.success) {
      throw new AppError(userResponse.message, 400);
  }
    return userResponse;
  }
}
export const loginManager = new LoginManager();