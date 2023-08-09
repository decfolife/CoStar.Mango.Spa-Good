describe('ui-shared-lib-ui-elements', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=tooltipcomponent--primary&args=OTID;helptextName;fieldHistoryName;portfolioID;objectID;'
    )
  );
  it('should render the component', () => {
    cy.get('crem-tooltip').should('exist');
  });
});
