describe('ui-shared-lib-ui-elements', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=herometriccomponent--primary&args=metric;')
  );
  it('should render the component', () => {
    cy.get('crem-metric').should('exist');
  });
});
