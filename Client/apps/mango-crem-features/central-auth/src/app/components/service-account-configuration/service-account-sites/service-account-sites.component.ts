import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mango-service-account-sites',
  templateUrl: './service-account-sites.component.html',
  styleUrls: ['./service-account-sites.component.scss'],
})
export class ServiceAccountSitesComponent implements OnInit {
  public sites: any;

  ngOnInit(): void {
    this.getSites();
  }

  private getSites() {
    this.sites = [
      // {changeDate: 191, user: 'Li Liu', description: 'Create Account', oldValue: 'Old value', newValue: 'New value'},
      // {changeDate: 402, user: 'Li Liu', description: 'Create Account', oldValue: 'Old value', newValue: 'New value'},
      // {changeDate: 403, user: 'Li Liu', description: 'Create Account', oldValue: 'Old value', newValue: 'New value'},
      // {changeDate: 415, user: 'Li Liu', description: 'Create Account', oldValue: 'Old value', newValue: 'New value'},
      // {changeDate: 955, user: 'Li Liu', description: 'Create Account', oldValue: 'Old value', newValue: 'New value'},
      ];
  }
}
