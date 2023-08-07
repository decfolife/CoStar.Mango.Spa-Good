describe('ui-shared-lib-ui-elements', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=datepickercomponent--primary&args=value;dateFormat:MM/dd/yyyy;invalidDateMessage;useMaskBehavior:true;showClearButton:false;'
    )
  );
  it('should render the component', () => {
    cy.get('crem-date-picker').should('exist');
  });
});
