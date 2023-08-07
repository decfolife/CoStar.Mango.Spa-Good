describe('ui-shared-lib-ui-elements', () => {
  beforeEach(() => cy.visit('/iframe.html?id=loadercomponent--primary'));
  it('should render the component', () => {
    cy.get('crem-loader').should('exist');
  });
});
