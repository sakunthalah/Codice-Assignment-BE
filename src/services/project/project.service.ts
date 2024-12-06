import { addDays, subDays } from "date-fns";
import projects from "../../../mockdata/projects.json";
import { ResponseData } from "../../types/interfaces/api-response.interface";
import { ProjectDto } from "../../types/interfaces/requests/project/project";
import { ProjectPaginatedRequest, ProjectPaginatedResponse } from "../../types/interfaces/requests/project/project-paginated";

export const getProjects = () => {
    return projects; // Returning data from the JSON file
};

class ProjectService {

    async getProjects(): Promise<ResponseData<ProjectDto[]>> {
        //const projects = getProjects();

        const projectList: ProjectDto[] = getProjects();

        return {
            success: true,
            data: projectList,
            message: "Successfuly Retrieved"
        };
    }

    async getPaginatedProjects(request: ProjectPaginatedRequest): Promise<ResponseData<ProjectPaginatedResponse<ProjectDto>>> {
        //const projects = getProjects();
        const projectList: ProjectDto[] = getProjects();

        let filteredData = projectList;

        if (request.data.projectName) {
            filteredData = filteredData.filter(prod => prod.projectName.toLowerCase().includes(request.data.projectName.toLowerCase()))
        }
        if (request.data.createdBy) {
            filteredData = filteredData.filter(prod => prod.createdBy.toLowerCase().includes(request.data.createdBy.toLowerCase()))
        }
        if (request.data.status) {
            filteredData = filteredData.filter(prod => prod.status = request.data.status)
        }
        if (request.data.startDate) {
            console.log(request.data.startDate, new Date(request.data.startDate));
            filteredData = filteredData.filter(prod => new Date(prod.startDate) >= subDays(new Date(request.data.startDate), 1)
                && new Date(prod.startDate) <= addDays(request.data.startDate, 1))
        }
        if (request.data.endDate) {
            filteredData = filteredData.filter(prod => new Date(prod.endDate) >= subDays(new Date(request.data.endDate), 1)
                && new Date(prod.endDate) <= addDays(request.data.endDate, 1))
        }

        // Calculate pagination
        const { page, pageSize } = request.paginatedInfo;
        const totalRecords = filteredData.length;
        const totalPages = Math.ceil(totalRecords / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        // Get paginated data
        const paginatedData = filteredData.slice(startIndex, endIndex);

        const projectPaginatedResponse: ProjectPaginatedResponse<ProjectDto> =
        {
            data: paginatedData,
            totalRecords: totalRecords,
            currentPage: page,
            totalPages: totalPages,
            pageSize: pageSize
        }
        const response: ResponseData<ProjectPaginatedResponse<ProjectDto>> = {
            success: true,
            message: "Projects retrieved successfully",
            data: projectPaginatedResponse

        };

        return response;
    }
}

export const projectService = new ProjectService();
