describe('ui-shared-lib-ui-elements', () => {
  beforeEach(() => cy.visit('/iframe.html?id=leftnavcomponent--primary'));
  it('should render the component', () => {
    cy.get('crem-nav').should('exist');
  });
});
