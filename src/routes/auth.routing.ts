import express from 'express';
import { loginController } from '../contrllers/login.controller';
import errorHandlerMiddleware from '../middlewares/errors.middleware';

const authRouter = express.Router();
authRouter.post("/signIn", errorHandlerMiddleware, loginController.signIn);
authRouter.get("/list", loginController.getUsers);

export default authRouter;