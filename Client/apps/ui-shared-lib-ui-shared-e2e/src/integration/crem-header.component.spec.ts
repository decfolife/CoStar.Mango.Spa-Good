describe('ui-shared-lib-ui-shared', () => {
  beforeEach(() => cy.visit('/iframe.html?id=cremheadercomponent--primary'));
  it('should render the component', () => {
    cy.get('crem-header').should('exist');
  });
});
