class EnvironmentsCrem {
  production = false;
  name = 'STAGE';
  appUrls = {
    adminService: '/v06/WebServices/Mango/AdminService/AdminService.asmx/',
  };
}

export const environment = new EnvironmentsCrem();
