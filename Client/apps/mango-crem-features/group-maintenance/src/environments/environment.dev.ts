class EnvironmentsCrem {
  production = false;
  name = 'DEV';
  appUrls = {
    groupMaintenance:
      '/v06/WebServices/Mango/GroupMaintenance/GroupMaintenance.asmx/',
  };
}

export const environment = new EnvironmentsCrem();
