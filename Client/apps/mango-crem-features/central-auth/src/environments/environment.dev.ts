class EnvironmentsCrem {
  production = false;
  name = 'DEV';
  appUrls = {
    identity: 'https://identity.dev.crem.aws.dshrp.com/api',
    authentication: 'https://authentication.dev.crem.aws.dshrp.com/api',
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
  CAUrl = 'https://client-alpha.dev.crem.aws.dshrp.com/';
}

export const environment = new EnvironmentsCrem();
