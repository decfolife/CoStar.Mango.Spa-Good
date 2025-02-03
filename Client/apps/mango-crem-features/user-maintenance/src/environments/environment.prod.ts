class EnvironmentsCrem {
  production = false;
  name = 'PROD';
  appUrls = {
    //userMaintenance: 'http://service2.prod.corp.virtualpremise.com:8090/UserMaintenance/api/'
    userMaintenance:
      '/v06/WebServices/Mango/UserMaintenance/UserMaintenance.asmx/',
    reports: '/v06/WebServices/Mango/Reports/Reports.asmx/',
    objectActions: '',
  };
}

export const environment = new EnvironmentsCrem();
