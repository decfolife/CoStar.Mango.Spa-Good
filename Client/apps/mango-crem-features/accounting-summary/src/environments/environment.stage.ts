class EnvironmentsCrem {
  production: false;
  name: 'STAGE';
  appUrls: {
    accountingSummary: '',
    listpages: '',
    alertsRules: '',
    alerts: ''
  };
  
  isRestful:true
}

export const environment = new EnvironmentsCrem();
