class EnvironmentsCrem {
  production = false;
  name = 'OPS';
  appUrls = {
    //portfolioMaintenance: 'http://service2.ops.corp.virtualpremise.com:8090/portfolioMaintenance/api/'
    portfolioMaintenance:
      '/v06/WebServices/Mango/PortfolioMaintenance/PortfolioMaintenance.asmx/',
  };
}

export const environment = new EnvironmentsCrem();
