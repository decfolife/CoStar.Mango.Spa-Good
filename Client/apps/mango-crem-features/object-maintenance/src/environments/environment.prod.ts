class EnvironmentsCrem {
  production = false;
  name = 'PROD';
  appUrls = {
    objectMaintenance: '/v06/WebServices/Mango/Admin/ObjectMaintenance.asmx/',
  };
}

export const environment = new EnvironmentsCrem();
