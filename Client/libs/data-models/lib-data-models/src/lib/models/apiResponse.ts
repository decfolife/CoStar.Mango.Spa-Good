export interface ApiResponse {
    clientErrorMessage: string | null;
    success: boolean;
    data: any;
  }

  export interface ApiResult<T> { 
    data: T;
    succeeded: boolean;
    message: string;
    errorCode: string;
    statusCode: string;
}