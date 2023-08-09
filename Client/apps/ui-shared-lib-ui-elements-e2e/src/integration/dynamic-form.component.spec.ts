describe('ui-shared-lib-ui-elements', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=dynamicformcomponent--primary&args=config;configKey;initialFocusElement;dateFormat;idPrefix;'
    )
  );
  it('should render the component', () => {
    cy.get('dynamic-form').should('exist');
  });
});
