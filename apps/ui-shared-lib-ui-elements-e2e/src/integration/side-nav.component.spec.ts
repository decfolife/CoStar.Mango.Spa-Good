describe('ui-shared-lib-ui-elements', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=sidenavcomponent--primary&args=links;')
  );
  it('should render the component', () => {
    cy.get('crem-sidenav').should('exist');
  });
});
