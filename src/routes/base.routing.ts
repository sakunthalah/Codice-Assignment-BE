import express, { Request, Response } from 'express';
import authRouter from './auth.routing';
import projectRouter from './project.routing';

const router = express.Router();
router.get("/", (req: Request, res: Response) => {
    const msg = {
        success: true,
        message: `API is up and running`
    };
    res.status(200).json(msg);
});

router.use("/auth",authRouter);
router.use("/project", projectRouter);

export { router as baseRouter }