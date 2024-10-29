class EnvironmentsCrem {
  production = false;
  name = 'PROD';
  appUrls = {
    accountingService: '/v06/WebServices/Mango/Accounting/Accounting.asmx/',
    dashboards: '/v06/WebServices/Mango/Dashboards/Project.asmx/',
    portfolio: '/v06/WebServices/Mango/Dashboards/Portfolio.asmx/',
    leftNav: '/v06/WebServices/Mango/LeftNav/LeftNav.asmx/',
    listpages: '/v06/WebServices/Mango/ListPages/Project.asmx/',
    financials: '/v06/WebServices/Mango/Financials/Financials.asmx/',
    authenticate: '',
    quickSearch: '',
    userService: '',
    taskApproval: '',
    formWizard: '/v06/WebServices/Mango/FormsEngine/FormsEngine.asmx/',
    reports: '/v06/WebServices/Mango/Reports/Reports.asmx/',
    inAppDisclosure: '',
  };
  isRestful: false;
}

export const environment = new EnvironmentsCrem();
