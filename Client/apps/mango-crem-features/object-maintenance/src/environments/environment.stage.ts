class EnvironmentsCrem {
  production = false;
  name = 'STAGE';
  appUrls = {
    objectMaintenance: '/v06/WebServices/Mango/Admin/ObjectMaintenance.asmx/',
  };
}

export const environment = new EnvironmentsCrem();
