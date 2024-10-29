class EnvironmentsCrem {
  production = true;
  name = 'PROD';
  appUrls = {
    batchAccounting: null,
  };
  isRestful = false;
}

export const environment = new EnvironmentsCrem();
