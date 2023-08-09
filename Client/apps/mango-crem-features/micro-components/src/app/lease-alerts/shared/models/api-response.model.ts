export class ApiResponse {
  succeeded: boolean;
  message: string;
  data: any;

  constructor(success: boolean, message: string = '', data: unknown = null) {
    this.succeeded = success;
    this.message = message;
    this.data = data;
  }
}
