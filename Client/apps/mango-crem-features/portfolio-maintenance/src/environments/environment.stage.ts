class EnvironmentsCrem {
  production = false;
  name = 'STAGE';
  appUrls = {
    portfolioMaintenance:
      '/v06/WebServices/Mango/PortfolioMaintenance/PortfolioMaintenance.asmx/',
  };
}

export const environment = new EnvironmentsCrem();
