export class ApiResponse {
  succeeded: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;

  constructor(success: boolean, message: string = '', data: unknown[] = []) {
    this.succeeded = success;
    this.message = message;
    this.data = data;
  }
}
