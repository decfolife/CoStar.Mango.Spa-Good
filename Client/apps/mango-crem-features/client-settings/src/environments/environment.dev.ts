class EnvironmentsCrem {
  production = false;
  name = 'DEV';
  appUrls = {
    authenticate:
      '/v06/WebServices/Mango/CentralAuthentication/Authentication.asmx',
    bookmarks: '/v06/WebServices/Mango/Bookmarks/Bookmarks.asmx/',
    dashboards: '',
    taskApproval: '',
    userService: '',
    formWizard: '',
    quickSearch: '',
    userMaintenance: '',
  };
  isRestful: false;
}

export const environment = new EnvironmentsCrem();
