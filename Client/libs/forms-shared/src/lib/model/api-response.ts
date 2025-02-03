export interface ApiResponse {
  clientErrorMessage: string | null;
  success: boolean;
  data: any;
  errorCode: string | null;
  statusCode: number | null;
}
