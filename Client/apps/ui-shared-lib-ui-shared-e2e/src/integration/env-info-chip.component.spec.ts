describe('ui-shared-lib-ui-shared', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=envinfochipcomponent--primary&args=id;width;chipContent;popoverContent;chipStyle;withPopup:true;actionText;actionHandlerWindowFunction;closable:false;'
    )
  );
  it('should render the component', () => {
    cy.get('crem-env-info-chip').should('exist');
  });
});
