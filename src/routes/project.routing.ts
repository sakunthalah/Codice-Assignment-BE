import express from 'express';
import { projectController } from '../contrllers/project.controller';
import authMiddleware from '../middlewares/auth.middleware';

const projectRouter = express.Router();

projectRouter.get("/list", projectController.getProjects);
//projectRouter.post("/getPaginatedList", projectController.getPaginatedProjects);
projectRouter.post("/paginated", authMiddleware, projectController.getPaginatedProjects);

export default projectRouter;