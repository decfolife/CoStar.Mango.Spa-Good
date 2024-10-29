class EnvironmentsCrem {
  production = false;
  name = 'STAGE';
  appUrls = {
    groupMaintenance:
      '/v06/WebServices/Mango/GroupMaintenance/GroupMaintenance.asmx/',
  };
  isRestful: false;
}

export const environment = new EnvironmentsCrem();
