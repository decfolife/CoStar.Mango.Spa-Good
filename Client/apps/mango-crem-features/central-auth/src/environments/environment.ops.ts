class EnvironmentsCrem {
  production = false;
  name = 'OPS';
  appUrls = {
    authenticate: 'https://identity.tsm.crem.aws.dshrp.com/api',
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