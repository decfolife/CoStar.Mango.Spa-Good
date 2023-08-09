describe('ui-shared-lib-ui-elements', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=hierarchydropdowncomponent--primary&args=id;initialSelectedValue;label;dataSource;placeholder:Select...;valueExpr:valueKey;displayExpr:displayKey;parentIdExpr:parentIdExpr;showClearButton:true;selectMode:single;dropDownContainerCustomClass;'
    )
  );
  it('should render the component', () => {
    cy.get('crem-hierarchy-dropdown').should('exist');
  });
});
