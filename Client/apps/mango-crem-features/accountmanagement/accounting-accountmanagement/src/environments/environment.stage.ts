class EnvironmentsCrem {
  production = false;
  name = 'STAGE';
  appUrls = {
    accounting: null,
  };
  isRestful = false;
}

export const environment = new EnvironmentsCrem();
