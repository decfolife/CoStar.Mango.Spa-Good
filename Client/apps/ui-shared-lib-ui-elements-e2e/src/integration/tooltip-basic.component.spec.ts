describe('ui-shared-lib-ui-elements', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=tooltipbasiccomponent--primary&args=helpTextData;externalId;'
    )
  );
  it('should render the component', () => {
    cy.get('crem-tooltip-basic').should('exist');
  });
});
