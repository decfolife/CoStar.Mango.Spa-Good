import { Injectable } from '@angular/core';
import { Link } from '@mango/data-models/lib-data-models';



const navigation: Link[] =[
  {

    text: 'Amortization',
    href: '..\\Admin\\AmortizationPolicies.aspx'
  },
  {

    text: 'Discount Rate',
    href: '..\\Admin\\DiscountRate.aspx'
  },
  {

    text: 'JE Accounts',
    href:'..\\Admin\\AccountPolicies.aspx'
  },
  {

    text: 'Calendars',
    href: '..\\Admin\\FiscalCalendarSettings.aspx',
  },
  {

    text: 'Settings',
    href: '..\\AccountManagement\\AccountManagement.aspx',
  },
  {

    text: 'Workflow',
    href: '..\\Admin\\AccountingWorkflow.aspx',
    style: '<%=IIf(Session("WorkflowVisible"), "display:block", "display:none")%>'
  },
  {

    text: 'View History',
    href: '..\\Admin\\ViewHistory.aspx'
  }
];




@Injectable()
export class SideNavService {
  getNavigationList(): Link[] {
    return navigation;
  }


}
