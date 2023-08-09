describe('ui-shared-lib-ui-elements', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=drawercomponent--primary&args=navigation;')
  );
  it('should render the component', () => {
    cy.get('crem-drawer').should('exist');
  });
});
