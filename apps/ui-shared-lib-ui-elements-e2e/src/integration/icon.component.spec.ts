describe('ui-shared-lib-ui-elements', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=iconcomponent--primary&args=icon;transform;fill:#000;'
    )
  );
  it('should render the component', () => {
    cy.get('crem-icon').should('exist');
  });
});
