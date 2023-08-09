describe('ui-shared-lib-ui-shared', () => {
  beforeEach(() => cy.visit('/iframe.html?id=notfoundcomponent--primary'));
  it('should render the component', () => {
    cy.get('not-found').should('exist');
  });
});
