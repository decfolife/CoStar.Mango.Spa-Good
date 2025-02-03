class EnvironmentsCrem {
  production = false;
  name = 'PROD';
  appUrls = {
    reports: '/v06/WebServices/Mango/Reports/Reports.asmx/',
    dashboards: '/v06/WebServices/Mango/Dashboards/Portfolio.asmx/',
  };
}

export const environment = new EnvironmentsCrem();
