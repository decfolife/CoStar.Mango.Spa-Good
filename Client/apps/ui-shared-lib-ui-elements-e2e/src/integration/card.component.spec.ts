describe('ui-shared-lib-ui-elements', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=cardcomponent--primary&args=id;filterData;moreOptions;customDropdownMenu:false;showCustomHeader;filterInitialValue;showFilterClearButton;searchlabel;searchPlaceholder:Search...;title;pendoTitleId;subtitle;counter;exportId;dropDisplay;dropValue;dropdownPlaceholder;'
    )
  );
  it('should render the component', () => {
    cy.get('crem-card').should('exist');
  });
});
