export class ApiResponse {
  succeeded: boolean;
  message: string;
  data: unknown[];

  constructor(success: boolean, message: string = '', data: unknown[] = []) {
    this.succeeded = success;
    this.message = message;
    this.data = data;
  }
}
