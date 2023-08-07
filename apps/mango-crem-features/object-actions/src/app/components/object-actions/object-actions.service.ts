import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointService } from '../../shared/services/endpoint.service';

@Injectable()
export class ObjectActionsService extends EndpointService {
  constructor(protected http: HttpClient) {
    super(http);
  }
}