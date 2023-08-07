describe('ui-shared-lib-ui-elements', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=chipcomponent--primary&args=id;width;chipContent;popoverContent;chipStyle;'
    )
  );
  it('should render the component', () => {
    cy.get('crem-chip').should('exist');
  });
});
