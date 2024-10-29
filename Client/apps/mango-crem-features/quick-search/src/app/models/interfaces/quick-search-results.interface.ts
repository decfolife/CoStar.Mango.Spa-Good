export interface quickSearchResults {
  objectTypeTypeId: number;
  objectTypeType: string;
  objectTypeId: string;
  results: any[];
}

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

export interface RedirectorLink {
  basePageUrl: string;
  fieldType: number;
  objectTypeId: number;
  objectTypeTypeId: number;
  urlLink: string;
}

export interface RedirectorLinks {
  redirectorLinks: RedirectorLink[];
}
