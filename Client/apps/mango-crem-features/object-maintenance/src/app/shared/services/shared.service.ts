import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointService } from './endpoint.service';

@Injectable()
export class SharedService extends EndpointService {
  constructor(protected http: HttpClient) {
    super(http);
  }

}

