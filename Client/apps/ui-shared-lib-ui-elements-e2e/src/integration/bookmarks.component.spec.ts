describe('ui-shared-lib-ui-elements', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=bookmarkscomponent--primary&args=bookmarkGroups;useRouterOutletTag;'
    )
  );
  it('should render the component', () => {
    cy.get('crem-bookmarks').should('exist');
  });
});
