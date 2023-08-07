import { Injectable } from '@angular/core';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  
  public baseUrl = environment.appUrls.accounting || EndpointService.baseUrl();

  constructor() { }
}
