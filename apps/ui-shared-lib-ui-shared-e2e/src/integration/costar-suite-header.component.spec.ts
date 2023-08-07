describe('ui-shared-lib-ui-shared', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=costarsuiteheadercomponent--primary')
  );
  it('should render the component', () => {
    cy.get('costar-header').should('exist');
  });
});
