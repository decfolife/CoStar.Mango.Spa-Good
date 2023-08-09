class EnvironmentsCrem {
    production = false;
    name = 'STAGE';
    appUrls = {
      dashboards: '/v06/WebServices/Mango/Dashboards/Portfolio.asmx/',
      authenticate: ''
    };
    isRestful: false;
  }
  
  export const environment = new EnvironmentsCrem();
  