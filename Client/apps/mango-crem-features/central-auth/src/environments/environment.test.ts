class EnvironmentsCrem {
  production = false;
  name = 'TEST';
  appUrls = {
    identity: 'https://identity.tst.crem.aws.dshrp.com/api',
    authentication: 'https://authentication.tst.crem.aws.dshrp.com/api',
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
  mangoSpaUrl = 'http://service2.test.corp.virtualpremise.com:8097/'
  cremBaseUrl = 'http://[CLIENT].test.corp.virtualpremise.com/';
  CAUrl = 'https://client-alpha.tst.crem.aws.dshrp.com/';
}

export const environment = new EnvironmentsCrem();