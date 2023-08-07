import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointService } from '../../shared/services/endpoint.service';
import { Observable } from 'rxjs';
import { environment } from 'apps/mango/src/environments/environment.local';

@Injectable()
export class JournalEntriesToApproveService extends EndpointService {
  constructor(protected http: HttpClient) {
    super(http);
  }
}