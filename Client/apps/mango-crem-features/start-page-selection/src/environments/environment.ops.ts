class EnvironmentsCrem {
  production = false;
  name = 'OPS';
  appUrls = {
    dashboards: '/v06/WebServices/Mango/Dashboards/Portfolio.asmx/',
    authenticate: '',
  };
  isRestful: false;
}

export const environment = new EnvironmentsCrem();
