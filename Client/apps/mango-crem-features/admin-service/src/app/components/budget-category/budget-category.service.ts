import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService } from '../../shared/services/endpoint.service';

@Injectable()
export class BudgetCategoryService extends EndpointService {
  constructor(protected http: HttpClient) {
    super(http);
  }

}
