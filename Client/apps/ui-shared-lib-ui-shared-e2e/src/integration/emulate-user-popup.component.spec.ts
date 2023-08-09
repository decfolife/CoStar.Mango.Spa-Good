describe('ui-shared-lib-ui-shared', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=emulateuserpopupcomponent--primary')
  );
  it('should render the component', () => {
    cy.get('mango-emulate-user-popup').should('exist');
  });
});
