describe('ui-shared-lib-ui-shared', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=dashboardfilterscomponent--primary&args=showAddButton;showEnterBill;addObjects;filters;dashboardId;isDateEU;cachingEnabled;objectTypeId;objectTypeName;'
    )
  );
  it('should render the component', () => {
    cy.get('dashboard-filters').should('exist');
  });
});
