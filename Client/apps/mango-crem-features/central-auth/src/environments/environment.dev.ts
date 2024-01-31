class EnvironmentsCrem {
  production = false;
  name = 'DEV';
  appUrls = {
    identity: 'http://mangospa.dev.corp.virtualpremise.com:30080/identity/api',
    authentication: 'http://mangospa.dev.corp.virtualpremise.com:30080/authentication/api',
    bookmarks: '/v06/WebServices/Mango/Bookmarks/Bookmarks.asmx/',
    leftNav: '',
    dashboards: '',
    quickSearch: '',
    userService: '',
    userMaintenance: '',
    taskApproval: '',
    formWizard: '',
    header: '',
    projects: '',
  };
  isRestful: false;
  mangoSpaUrl = 'http://service2.dev.corp.virtualpremise.com:8097/'
  cremBaseUrl = 'http://[CLIENT].dev.corp.virtualpremise.com/';
  CAUrl = 'http://login.dev.corp.virtualpremise.com:30080/';
}

export const environment = new EnvironmentsCrem();
