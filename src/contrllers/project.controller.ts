import { NextFunction, Request, Response } from "express";
import { projectManager } from "../managers/project.manager";
import { handleSuccess } from "../helpers/response.helper";
import { ProjectPaginatedRequest } from "../types/interfaces/requests/project/project-paginated";

class ProjectController {
    public getProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const projectListResponse = await projectManager.getProjects();
            handleSuccess(res, projectListResponse.message, projectListResponse.data);
        }
        catch (error: any) {
            next(error);
        }
    }

    public getPaginatedProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const requestPayload: ProjectPaginatedRequest = req.body;
            const projectListResponse = await projectManager.getPaginatedProjects(requestPayload);
            console.log(projectListResponse);
            handleSuccess(res, projectListResponse.message, projectListResponse.data);
        }
        catch (error: any) {
            next(error);
        }
    }
}
export const projectController = new ProjectController();