class EnvironmentsCrem {
  production = false;
  name = 'DEV';
  appUrls = {
    adminService: '/v06/WebServices/Mango/AdminService/AdminService.asmx/',
  };
  isRestful: false;
}

export const environment = new EnvironmentsCrem();
