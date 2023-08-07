describe('ui-shared-lib-ui-shared', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=herometricscontainercomponent--primary&args=schemaMetrics;filterString;unitOfMeasureId;exchangeRateId;moduleId;'
    )
  );
  it('should render the component', () => {
    cy.get('crem-metric-container').should('exist');
  });
});
