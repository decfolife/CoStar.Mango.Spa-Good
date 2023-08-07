describe('ui-shared-lib-ui-elements', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=modalcomponent--primary&args=modalTitle;modalTitleId;closeIconVisible;primaryFooterButtonText;primaryFooterButtonEnabledDisabled:false;closeOrCancelButtonText;modalId;customFooter:false;'
    )
  );
  it('should render the component', () => {
    cy.get('crem-modal').should('exist');
  });
});
