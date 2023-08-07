describe('ui-shared-lib-ui-elements', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=graphcomponent--primary&args=id;dataSource;xAxis;yAxis;color;type;keyName;width:100%;'
    )
  );
  it('should render the component', () => {
    cy.get('crem-graph').should('exist');
  });
});
