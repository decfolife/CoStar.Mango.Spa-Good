class EnvironmentsCrem {
    production = false;
    name = 'TEST';
    appUrls = {
        //portfolioMaintenance: 'http://service2.test.corp.virtualpremise.com:8090/portfolioMaintenance/api/'
        portfolioMaintenance: '/v06/WebServices/Mango/PortfolioMaintenance/PortfolioMaintenance.asmx/'
    };
    isRestful: false;
}

export const environment = new EnvironmentsCrem();