describe('ui-shared-lib-ui-elements', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=searchcomponent--primary&args=label;placeholder:Search;hint;showLabel:false;disabled:false;required:false;optional:false;'
    )
  );
  it('should render the component', () => {
    cy.get('crem-search').should('exist');
  });
});
