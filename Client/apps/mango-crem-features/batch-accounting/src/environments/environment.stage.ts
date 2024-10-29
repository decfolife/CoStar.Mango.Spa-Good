class EnvironmentsCrem {
  production = false;
  name = 'STAGE';
  appUrls = {
    batchAccounting: null,
  };
  isRestful = false;
}

export const environment = new EnvironmentsCrem();
