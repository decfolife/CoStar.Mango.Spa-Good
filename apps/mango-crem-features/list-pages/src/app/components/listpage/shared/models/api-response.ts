export interface ApiResponse {
  clientErrorMessage: string | null;
  success: boolean;
  data: any;
  status: number | null;
}
