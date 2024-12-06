
export interface ProjectPaginatedRequest {
    data: ProjectPaginatedFilter;
    paginatedInfo: PagingInfo
  };
  export interface ProjectPaginatedResponse<T> {
    data: T[];
    totalRecords: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
  
export interface ProjectPaginatedFilter {
  projectName:string;
  createdBy:string;
  status:string;
  createdDate:string;
  startDate:string;
  endDate:string;
  budget:number;
  }

  export interface PagingInfo {
    page: number;
    pageSize: number;
  }
  
 