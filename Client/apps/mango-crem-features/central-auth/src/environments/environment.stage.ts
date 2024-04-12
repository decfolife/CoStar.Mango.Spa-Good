class EnvironmentsCrem {
  production = false;
  name = 'STAGE';
  appUrls = {
    identity: 'https://api.stage.costarremanager.com/identity/api',
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