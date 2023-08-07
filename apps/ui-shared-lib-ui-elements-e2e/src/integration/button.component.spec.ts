describe('ui-shared-lib-ui-elements', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=buttoncomponent--primary&args=type:primary;size:medium;disabled:false;icon;iconPosition;ariaLabel;'
    )
  );
  it('should render the component', () => {
    cy.get('crem-button').should('exist');
  });
});
