describe('ui-shared-lib-ui-elements', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=crempivottablecomponent--primary&args=config;id;showRowGrandTotals:false;showColumnGrandTotals:false;allowDrillDown:false;exportFileName:Grid_Export;showColumnChooser:false;chartVisible:true;applyChangesMode:instantly;summationTypeConfig;fieldModal;'
    )
  );
  it('should render the component', () => {
    cy.get('crem-pivot-table').should('exist');
  });
});
