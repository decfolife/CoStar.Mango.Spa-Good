import { Component, Input } from '@angular/core';
import { ServiceAccountEndpoint } from 'libs/data-models/lib-data-models/src/lib/models/central-auth/service-account-info';

@Component({
  selector: 'mango-service-account-endpoints',
  templateUrl: './service-account-endpoints.component.html',
  styleUrls: ['./service-account-endpoints.component.scss'],
})
export class ServiceAccountEndpointsComponent {
  @Input() endpoints: ServiceAccountEndpoint[];
}

