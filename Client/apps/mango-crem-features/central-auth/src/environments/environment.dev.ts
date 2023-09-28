class EnvironmentsCrem {
  production = false;
  name = 'DEV';
  appUrls = {
    authenticate: 'https://identity.dev.crem.aws.dshrp.com/api',
    bookmarks: '/v06/WebServices/Mango/Bookmarks/Bookmarks.asmx/',
    leftNav: '',
    dashboards: '',
    quickSearch: '',
    userService: '',
    userMaintenance: '',
    taskApproval: '',
    formWizard: '',
    header: ''
  };
  isRestful: false;
  mangoSpaUrl = 'http://service2.dev.corp.virtualpremise.com:8097/'
  cremBaseUrl = 'http://[CLIENT].dev.corp.virtualpremise.com/';
  CAUrl = 'https://client-alpha.dev.crem.aws.dshrp.com/';
}

export const environment = new EnvironmentsCrem();
