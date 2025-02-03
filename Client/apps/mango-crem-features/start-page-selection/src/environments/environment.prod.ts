class EnvironmentsCrem {
  production = false;
  name = 'PROD';
  appUrls = {
    dashboards: '/v06/WebServices/Mango/Dashboards/Portfolio.asmx/',
    authenticate: '',
  };
}

export const environment = new EnvironmentsCrem();
