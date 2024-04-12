class EnvironmentsCrem {
  production = false;
  name = 'PROD';
  appUrls = {
    identity: '',
    authentication: '',
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