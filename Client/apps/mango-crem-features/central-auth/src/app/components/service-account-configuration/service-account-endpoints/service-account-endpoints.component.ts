import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mango-service-account-endpoints',
  templateUrl: './service-account-endpoints.component.html',
  styleUrls: ['./service-account-endpoints.component.scss'],
})
export class ServiceAccountEndpointsComponent implements OnInit {
  @Input() userEmail: string;
  public endpoints: any;

  ngOnInit(): void {
    this.getEndpoints(this.userEmail);
  }

  private getEndpoints(userEmail: string) {
    this.endpoints = [ 
      {endpointName: 'Projects ', active: true},
      {endpointName: 'Portfolio', active: false},
      {endpointName: 'Accounting', active: false},
      {endpointName: 'Financials', active: false},
      {endpointName: 'Company', active: false},
      {endpointName: 'Contacts', active: false}
      ];
  }
}

