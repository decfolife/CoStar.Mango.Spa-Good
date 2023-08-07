describe('ui-shared-lib-ui-elements', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=simplegridcomponent--primary&args=id;dataSource;paging:true;allowSorting:true;grouping;customColumns;headerFilter;buttonColumn;allowColumnReordering;customContentTemplate;enableMasterDetails:false;columns;pageSize:50;customPageSize;exportFileName:Grid_Export;gridHeight;keyExpr;'
    )
  );
  it('should render the component', () => {
    cy.get('crem-simple-grid').should('exist');
  });
});
