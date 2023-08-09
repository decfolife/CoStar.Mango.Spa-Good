describe('ui-shared-lib-ui-shared', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=sharedleftnavcomponent--primary&args=navigationLinks;activeLink;'
    )
  );
  it('should render the component', () => {
    cy.get('shared-left-nav').should('exist');
  });
});
