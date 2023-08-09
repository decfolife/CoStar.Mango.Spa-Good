describe('ui-shared-lib-ui-shared', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=toolbarcomponent--primary&args=chipContent;popoverContent;moduleLinks;'
    )
  );
  it('should render the component', () => {
    cy.get('mango-toolbar').should('exist');
  });
});
