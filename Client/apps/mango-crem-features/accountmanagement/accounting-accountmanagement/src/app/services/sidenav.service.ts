/* eslint-disable import/prefer-default-export */
import { Injectable } from '@angular/core';
import { Link } from '@mango/data-models/lib-data-models';

const navigation: Link[] = [
  {
    text: 'Amortization',
    href: '\\v06\\LeaseRecognition\\Admin\\AmortizationPolicies.aspx',
    routerLink: null,
  },
  {
    text: 'Discount Rate',
    href: '\\v06\\Mango\\AccountingProfiles\\AccountingProfiles.aspx\\discountrateprofiles',
    routerLink: null,
  },
  {
    text: 'JE Accounts',
    href: '\\v06\\LeaseRecognition\\Admin\\AccountPolicies.aspx',
    routerLink: null,
  },
  {
    text: 'Calendars',
    href: '\\v06\\LeaseRecognition\\Admin\\FiscalCalendarSettings.aspx',
    routerLink: null,
  },
  {
    text: 'Settings',
    routerLink: 'accountingsettings',
  },
  {
    text: 'Workflow',
    href: '\\v06\\LeaseRecognition\\Admin\\AccountingWorkflow.aspx',
    routerLink: null,
  },
  {
    text: 'View History',
    href: '\\v06\\LeaseRecognition\\Admin\\ViewHistory.aspx',
    routerLink: null,
  },
];

@Injectable()
export class SidenavService {
  getNavigationList(): Link[] {
    return navigation;
  }
}
