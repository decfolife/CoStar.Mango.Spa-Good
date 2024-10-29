class EnvironmentsCrem {
  production = false;
  name = 'PROD';
  appUrls = {
    adminService: '/v06/WebServices/Mango/AdminService/AdminService.asmx/',
  };
  isRestful: false;
}

export const environment = new EnvironmentsCrem();
