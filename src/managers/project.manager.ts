import { projectService } from '../services/project/project.service';
import { ProjectDto } from '../types/interfaces/requests/project/project';
import { ResponseData } from "../types/interfaces/api-response.interface";
import { ProjectPaginatedRequest, ProjectPaginatedResponse } from '../types/interfaces/requests/project/project-paginated';
import { AppError } from '../helpers/app-error.helper';

class ProjectManager {

    async getProjects(): Promise<ResponseData<ProjectDto[]>> {
        const projectResponse: ResponseData<ProjectDto[]> = await projectService.getProjects();
        if (!projectResponse.success) {
            throw new AppError(projectResponse.message, 400);
        }
        return projectResponse;
    }

    async getPaginatedProjects(request: ProjectPaginatedRequest): Promise<ResponseData<ProjectPaginatedResponse<ProjectDto>>> {
        const projectResponse: ResponseData<ProjectPaginatedResponse<ProjectDto>> =
            await projectService.getPaginatedProjects(request);

        if (!projectResponse.success) {
            throw new AppError(projectResponse.message, 400);
        }
        return projectResponse;
    }
}
export const projectManager = new ProjectManager();