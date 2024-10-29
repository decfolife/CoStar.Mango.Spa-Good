export interface ApiResponse {
  clientErrorMessage: string | null;
  success: boolean;
  data: any;
  status: number | null;
}

export interface PagedResult<T> {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  items: T[];
}
