class EnvironmentsCrem {
  production = false;
  name = 'OPS';
  appUrls = {
    groupMaintenance:
      '/v06/WebServices/Mango/GroupMaintenance/GroupMaintenance.asmx/',
  };
  isRestful: false;
}

export const environment = new EnvironmentsCrem();
