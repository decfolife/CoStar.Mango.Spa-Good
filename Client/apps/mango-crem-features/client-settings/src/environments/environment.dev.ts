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
}

export const environment = new EnvironmentsCrem();
