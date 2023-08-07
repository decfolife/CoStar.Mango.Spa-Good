describe('ui-shared-lib-ui-shared', () => {
  beforeEach(() => cy.visit('/iframe.html?id=headercomponent--primary'));
  it('should render the component', () => {
    cy.get('mango-header').should('exist');
  });
});
