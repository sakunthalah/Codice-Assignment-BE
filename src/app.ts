import express, { Request, Response, NextFunction } from "express"
import { baseRouter } from "./routes/base.routing";
import cors from "cors";
import errorHandlerMiddleware from "./middlewares/errors.middleware"
import authMiddleware from "./middlewares/auth.middleware";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", baseRouter);

app.use(authMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.APP_PORT ?? 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
