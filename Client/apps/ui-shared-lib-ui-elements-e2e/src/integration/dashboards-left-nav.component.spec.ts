describe('ui-shared-lib-ui-elements', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=dashboardsleftnavcomponent--primary&args=userHasDocumentStoreViewRight;userHasManageTeamListsRight;'
    )
  );
  it('should render the component', () => {
    cy.get('dashboards-left-nav').should('exist');
  });
});
