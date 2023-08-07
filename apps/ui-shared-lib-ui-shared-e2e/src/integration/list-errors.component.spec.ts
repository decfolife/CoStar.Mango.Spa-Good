describe('ui-shared-lib-ui-shared', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=listerrorscomponent--primary&args=errors;')
  );
  it('should render the component', () => {
    cy.get('mango-list-errors').should('exist');
  });
});
