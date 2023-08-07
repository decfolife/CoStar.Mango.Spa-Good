class EnvironmentsCrem {
  production = false;
  name = 'TEST';
  appUrls = {
    authenticate: 'https://identity.tst.crem.aws.dshrp.com/api',
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
}

export const environment = new EnvironmentsCrem();