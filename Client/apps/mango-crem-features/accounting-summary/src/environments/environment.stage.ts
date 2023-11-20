class EnvironmentsCrem {
  production = false;
  name = 'STAGE';
  appUrls = {
    accountingSummary: '',
    dashboards: '',
    listpages: '',
    alertsRules: '',
    alerts: '',
    authenticate: '',
    userService: '',
    quickSearch: '',
    header: '',
    identity: ''
  };
  
  isRestful = false
}

export const environment = new EnvironmentsCrem();
