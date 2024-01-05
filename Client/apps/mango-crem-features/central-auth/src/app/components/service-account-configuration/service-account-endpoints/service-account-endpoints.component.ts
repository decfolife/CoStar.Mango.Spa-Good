import { Component, Input } from '@angular/core';
import { ServiceAccountEndpoint } from 'libs/data-models/lib-data-models/src/lib/models/central-auth/service-account-info';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [MatCardModule, MatSlideToggleModule, CommonModule],
  selector: 'mango-service-account-endpoints',
  templateUrl: './service-account-endpoints.component.html',
  styleUrls: ['./service-account-endpoints.component.scss'],
})
export class ServiceAccountEndpointsComponent {
  @Input() endpoints: ServiceAccountEndpoint[];
}

