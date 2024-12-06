import express from 'express';
import { loginController } from '../contrllers/login.controller';
import errorHandlerMiddleware from '../middlewares/errors.middleware';
import authMiddleware from '../middlewares/auth.middleware';


const authRouter = express.Router();
authRouter.post("/login",errorHandlerMiddleware, loginController.login);
authRouter.get("/getUserList", loginController.getUsers);

export default authRouter;