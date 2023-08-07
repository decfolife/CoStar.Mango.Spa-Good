describe('ui-shared-lib-ui-elements', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=favoriteiconcomponent--primary&args=favIconColor;'
    )
  );
  it('should render the component', () => {
    cy.get('favorite-icon').should('exist');
  });
});
