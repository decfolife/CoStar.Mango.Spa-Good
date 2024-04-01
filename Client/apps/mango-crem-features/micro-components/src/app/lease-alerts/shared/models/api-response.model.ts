export class ApiResponse {
  success: boolean;
  message: string;
  data: any;

  constructor(success: boolean, message: string = '', data: unknown = null) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
