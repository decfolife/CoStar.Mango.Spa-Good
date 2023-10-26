import { Injectable } from '@angular/core';

const portfolios: string[] = [
  'Acme',
  'Johnson',
  'Wingate',
  'HelpMe',
  'OhNo',
  'Out of Ideas',
];

const states: string[] = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

var countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Brazil",
  "India",
  "China"
];

@Injectable({
  providedIn: 'root'
})

export class Service {

  getPortfolios() {
    return portfolios;
  }

  getStates() {
    return states;
  }

  getCountries() {
    return countries;
  }
}
