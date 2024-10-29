class EnvironmentsCrem {
  production = false;
  name = 'PROD';
  appUrls = {
    accounting: null,
  };
  isRestful = false;
}

export const environment = new EnvironmentsCrem();
