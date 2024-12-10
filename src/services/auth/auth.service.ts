import users from "../../../mockdata/users.json";
import { UserLoginDto } from "../../types/interfaces/requests/login/user-login";
import { UserDto } from "../../types/interfaces/requests/user/user";
import { ResponseData } from "../../types/interfaces/api-response.interface";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { SecretKey } from '../../types/constants/constants';
export const getUsers = () => {
    return users; // Returning data from the JSON file
};

class AuthService {

    async getUsers(): Promise<ResponseData<UserDto[]>> {
        const users = getUsers();
        const userArray: UserDto[] = users;

        return {
            success: true,
            data: userArray,
            message: "Successfuly Retrieved"
        };
    }

    async signIn(request: UserLoginDto): Promise<ResponseData<string>> {

        const email = request.email;
        const password = request.password;
        const users = getUsers();
        const userArray: UserDto[] = users;

        if (email && password) {
            const user = userArray.find(u => u.email === email);

            if (user && (password === "123456")) {
                const token = jwt.sign({ _id: user.email, name: user.name }, SecretKey, {
                    expiresIn: '1 hour',
                });
                return {
                    success: true,
                    data: token,
                    message: "Login successful"
                };

            }

            return {
                success: false,
                data: "",
                message: "Invalid email or password"
            };
        }
        return {
            success: false,
            data: "",
            message: "Bad request!"
        };
    }
}
export const authService = new AuthService();