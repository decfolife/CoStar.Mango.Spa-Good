class EnvironmentsCrem {
  production = false;
  name = 'OPS';
  appUrls = {
    accountingSummary:
      '/v06/WebServices/Mango/AccountingSummary/AccountingSummary.asmx/',
    dashboards: '/v06/WebServices/Mango/Dashboards/Project.asmx/',
    listpages: '/v06/WebServices/Mango/ListPages/Project.asmx/',
    alertsRules: '/v06/WebServices/Mango/Alerts/Alerts.asmx',
    alerts: '/v06/WebServices/Mango/Alerts/Alerts.asmx',
    authenticate: '',
    userService: '',
    quickSearch: '',
    header: '',
    identity: '',
  };

  isRestful = false;
}

export const environment = new EnvironmentsCrem();
