class EnvironmentsCrem {
  production = false;
  name = 'OPS';
  appUrls = {
    identity: 'https://identity.tsm.crem.aws.dshrp.com/api',
    authentication: 'https://authentication.tsm.crem.aws.dshrp.com/api',
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
}

export const environment = new EnvironmentsCrem();