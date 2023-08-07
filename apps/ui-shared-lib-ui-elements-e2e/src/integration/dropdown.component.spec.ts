describe('ui-shared-lib-ui-elements', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=dropdowncomponent--primary&args=id;initialSelectedValue;placeholder:Select...;label;useSelectBox:false;selectBoxValue;valueExpr:valueKey;keyExpr;displayExpr:displayKey;isSearchable;contentTemplate;columnHeader;showHeader:false;showClearButton:true;selectMode:single;dropdownHeaderDisplay;showColumnHeader:false;required:false;isVisible:true;dataField;showCheckBoxesMode:none;dataSource;allowSearch:false;isDisabled:false;dropDownContainerCustomClass;'
    )
  );
  it('should render the component', () => {
    cy.get('crem-dropdown').should('exist');
  });
});
