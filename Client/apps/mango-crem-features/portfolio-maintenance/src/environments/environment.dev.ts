class EnvironmentsCrem {
  production = false;
  name = 'DEV';
  appUrls = {
    //portfolioMaintenance: 'http://service2.dev.corp.virtualpremise.com:8090/portfolioMaintenance/api/'
    portfolioMaintenance: '/v06/WebServices/Mango/PortfolioMaintenance/PortfolioMaintenance.asmx/'
  };
  isRestful: false;
}

export const environment = new EnvironmentsCrem();