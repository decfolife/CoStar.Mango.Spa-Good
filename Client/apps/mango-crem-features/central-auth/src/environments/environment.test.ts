class EnvironmentsCrem {
  production = false;
  name = 'TEST';
  appUrls = {
    identity: 'http://mangospa.test.corp.virtualpremise.com:30080/identity/api',
    authentication: 'http://mangospa.test.corp.virtualpremise.com:30080/authentication/api',
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
    tasks: ''
  };
  isRestful: false;
  mangoSpaUrl = 'http://service2.test.corp.virtualpremise.com:8097/'
  cremBaseUrl = 'http://[CLIENT].test.corp.virtualpremise.com/';
  CAUrl = 'http://login.test.corp.virtualpremise.com:30080/';
}

export const environment = new EnvironmentsCrem();