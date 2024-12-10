import express from 'express';
import { authController } from '../contrllers/auth.controller';
import errorHandlerMiddleware from '../middlewares/errors.middleware';

const authRouter = express.Router();
authRouter.post("/signIn", errorHandlerMiddleware, authController.signIn);
authRouter.get("/list", authController.getUsers);

export default authRouter;