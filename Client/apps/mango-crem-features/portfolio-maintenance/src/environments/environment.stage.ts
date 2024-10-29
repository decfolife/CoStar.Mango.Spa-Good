class EnvironmentsCrem {
  production = false;
  name = 'STAGE';
  appUrls = {
    portfolioMaintenance:
      '/v06/WebServices/Mango/PortfolioMaintenance/PortfolioMaintenance.asmx/',
  };
  isRestful: false;
}

export const environment = new EnvironmentsCrem();
