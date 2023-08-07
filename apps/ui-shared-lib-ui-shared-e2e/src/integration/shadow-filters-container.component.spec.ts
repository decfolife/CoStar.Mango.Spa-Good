describe('ui-shared-lib-ui-shared', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=shadowfilterscontainercomponent--primary')
  );
  it('should render the component', () => {
    cy.get('shadow-filters-container').should('exist');
  });
});
