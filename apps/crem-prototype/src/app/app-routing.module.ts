import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CostarComponent } from './costar/costar.component';
import { LoginComponent } from './login/login.component';
import { CremAComponent } from './crem-a/crem-a.component';
import { PrototypeSelectComponent } from './prototype-select/prototype-select.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ClientSelectComponent } from './client-select/client-select.component';
import { SearchResultsComponent } from './components/shared/search-results/search-results.component';

import { NewsComponent } from './components/shared/news/news.component';
import { MyAssetsComponent } from './components/shared/my-assets/my-assets.component';
import { MyDealsComponent } from './components/shared/my-deals/my-deals.component';
import { MyLoansComponent } from './components/shared/my-loans/my-loans.component';
import { MyFacilitiesComponent } from './components/shared/my-facilities/my-facilities.component';
import { PropertiesComponent } from './components/shared/properties/properties.component';
import { LeasingComponent } from './components/shared/leasing/leasing.component';
import { SalesComponent } from './components/shared/sales/sales.component';
import { CompaniesComponent } from './components/shared/companies/companies.component';
import { MarketsComponent } from './components/shared/markets/markets.component';
import { StrComponent } from './components/shared/str/str.component';
import { ProfessionalsComponent } from './components/shared/professionals/professionals.component';
import { PublicRecordComponent } from './components/shared/public-record/public-record.component';
import { MarketingCenterComponent } from './components/shared/marketing-center/marketing-center.component';
import { EnterpriseComponent } from './components/shared/enterprise/enterprise.component';


// CREM Components
import { ProjectsComponent } from './components/shared/my-facilities/projects/projects.component';
import { PortfolioComponent } from './components/shared/my-facilities/portfolio/portfolio.component';
import { StrategyComponent } from './components/shared/my-facilities/strategy/strategy.component';
import { FinancialsComponent } from './components/shared/my-facilities/financials/financials.component';
import { AccountingComponent } from './components/shared/my-facilities/accounting/accounting.component';
import { ContactsComponent } from './components/shared/my-facilities/contacts/contacts.component';
import { ReportsComponent } from './components/shared/my-facilities/reports/reports.component';
import { AdminComponent } from './components/shared/my-facilities/admin/admin.component';
import { DealsComponent } from './components/shared/my-facilities/deals/deals.component';
import { SandboxComponent } from './components/shared/my-facilities/sandbox/sandbox.component';

// Projects Components
import { ProjectsHomeComponent } from './components/shared/my-facilities/projects/projects-home/projects-home.component';
import { ProjectsDashboardComponent } from './components/shared/my-facilities/projects/projects-dashboard/projects-dashboard.component';
import { ProjectsListComponent } from './components/shared/my-facilities/projects/projects-list/projects-list.component';
import { ProjectsTeamsComponent } from './components/shared/my-facilities/projects/projects-teams/projects-teams.component';
import { ProjectsTemplatesComponent } from './components/shared/my-facilities/projects/projects-templates/projects-templates.component';
import { ProjectComponent } from './components/shared/my-facilities/projects/project/project.component';
import { ProjectTasksComponent } from './components/shared/my-facilities/projects/project/project-tasks/project-tasks.component';
import { ProjectDetailsComponent } from './components/shared/my-facilities/projects/project/project-details/project-details.component';
import { ProjectGanttComponent } from './components/shared/my-facilities/projects/project/project-gantt/project-gantt.component';
import { ProjectDealsComponent } from './components/shared/my-facilities/projects/project/project-deals/project-deals.component';
import { ProjectTeamComponent } from './components/shared/my-facilities/projects/project/project-team/project-team.component';
import { ProjectBudgetComponent } from './components/shared/my-facilities/projects/project/project-budget/project-budget.component';
import { TasksListComponent } from './components/shared/my-facilities/projects/tasks-list/tasks-list.component';
import { DocumentStoreComponent } from './components/document-store/document-store.component';
import { OfflineComponent } from './components/shared/my-facilities/projects/offline/offline.component';

// Strategy Components
import { StrategyDashboardComponent } from './components/shared/my-facilities/strategy/dashboard/dashboard.component';
import { StrategyOverviewComponent } from './components/shared/my-facilities/strategy/overview/overview.component';

// Accounting Components
import { AccountingDashboardComponent } from './components/shared/my-facilities/accounting/accounting-dashboard/accounting-dashboard.component';
import { AmortizationProfilesComponent } from './components/shared/my-facilities/accounting/amortization-profiles/amortization-profiles.component';
import { DiscountRateProfilesComponent } from './components/shared/my-facilities/accounting/discount-rate-profiles/discount-rate-profiles.component';
import { JournalEntryProfilesComponent } from './components/shared/my-facilities/accounting/journal-entry-profiles/journal-entry-profiles.component';
import { WorkflowStatusComponent } from './components/shared/my-facilities/accounting/workflow-status/workflow-status.component';
import { AccountingProfilesHistoryComponent } from './components/shared/my-facilities/accounting/accounting-profiles-history/accounting-profiles-history.component';
import { BulkWorkflowComponent } from './components/shared/my-facilities/accounting/bulk-workflow/bulk-workflow.component';
import { JournalEntryApproveComponent } from './components/shared/my-facilities/accounting/journal-entry-approve/journal-entry-approve.component';
import { JournalEntryExportComponent } from './components/shared/my-facilities/accounting/journal-entry-export/journal-entry-export.component';
import { AccountingHealthComponent } from './components/shared/my-facilities/accounting/accounting-health/accounting-health.component';
import { AccountingSchedulesComponent } from './components/shared/my-facilities/accounting/accounting-schedules/accounting-schedules.component';
import { JournalEntryReverseComponent } from './components/shared/my-facilities/accounting/journal-entry-reverse/journal-entry-reverse.component';
import { AmortizationProfileDetailComponent } from './components/shared/my-facilities/accounting/amortization-profiles/amortization-profile-detail/amortization-profile-detail.component';
import { AmortizationProfileListComponent } from './components/shared/my-facilities/accounting/amortization-profiles/amortization-profile-list/amortization-profile-list.component';
import { DiscountRateProfileDetailComponent } from './components/shared/my-facilities/accounting/discount-rate-profiles/discount-rate-profile-detail/discount-rate-profile-detail.component';
import { DiscountRateProfileListComponent } from './components/shared/my-facilities/accounting/discount-rate-profiles/discount-rate-profile-list/discount-rate-profile-list.component';
import { JournalEntryProfileDetailComponent } from './components/shared/my-facilities/accounting/journal-entry-profiles/journal-entry-profile-detail/journal-entry-profile-detail.component';
import { JournalEntryProfileListComponent } from './components/shared/my-facilities/accounting/journal-entry-profiles/journal-entry-profile-list/journal-entry-profile-list.component';
import { WorkflowStatusSettingsComponent } from './components/shared/my-facilities/accounting/workflow-status/workflow-status-settings/workflow-status-settings.component';
import { WorkflowStatusDetailComponent } from './components/shared/my-facilities/accounting/workflow-status/workflow-status-detail/workflow-status-detail.component';
import { AccountingSettingsComponent } from './components/shared/my-facilities/accounting/accounting-settings/accounting-settings.component';
import { PeriodCloseComponent } from './components/shared/my-facilities/accounting/period-close/period-close.component';

// Financials Components
import { FinancialsDashboardComponent } from './components/shared/my-facilities/financials/financials-dashboard/financials-dashboard.component';
import { EnterBillComponent } from './components/shared/my-facilities/financials/enter-bill/enter-bill.component';
import { ApApproveComponent } from './components/shared/my-facilities/financials/ap-approve/ap-approve.component';
import { ApSubmitComponent } from './components/shared/my-facilities/financials/ap-submit/ap-submit.component';
import { InvoiceApproveComponent } from './components/shared/my-facilities/financials/invoice-approve/invoice-approve.component';
import { InvoiceGenerateComponent } from './components/shared/my-facilities/financials/invoice-generate/invoice-generate.component';
import { ReceivePaymentComponent } from './components/shared/my-facilities/financials/receive-payment/receive-payment.component';
import { EditPaymentComponent } from './components/shared/my-facilities/financials/edit-payment/edit-payment.component';
import { ApExportComponent } from './components/shared/my-facilities/financials/ap-export/ap-export.component';
import { InvoiceExportComponent } from './components/shared/my-facilities/financials/invoice-export/invoice-export.component';
import { ProcessMtmComponent } from './components/shared/my-facilities/financials/process-mtm/process-mtm.component';
import { ProcessPercentRentComponent } from './components/shared/my-facilities/financials/process-percent-rent/process-percent-rent.component';
import { ProcessIndexChargeComponent } from './components/shared/my-facilities/financials/process-index-charge/process-index-charge.component';
import { VendorCustomerMgmtComponent } from './components/shared/my-facilities/financials/vendor-customer-mgmt/vendor-customer-mgmt.component';
import { ExportHistoryComponent } from './components/shared/my-facilities/financials/export-history/export-history.component';
import { LedgerAccountsComponent } from './components/shared/my-facilities/financials/ledger-accounts/ledger-accounts.component';
import { AllocationCentersComponent } from './components/shared/my-facilities/financials/allocation-centers/allocation-centers.component';
import { InvoiceFormatsComponent } from './components/shared/my-facilities/financials/invoice-formats/invoice-formats.component';
import { IndexesComponent } from './components/shared/my-facilities/financials/indexes/indexes.component';
import { VariancesComponent } from './components/shared/my-facilities/financials/variances/variances.component';
import { SalesTaxAuthoritiesComponent } from './components/shared/my-facilities/financials/sales-tax-authorities/sales-tax-authorities.component';
import { AdamFilterComponent } from './components/shared/my-facilities/financials/adam-filter/adam-filter.component';
import { PercentRentComponent } from './components/shared/my-facilities/financials/percent-rent/percent-rent.component';
import { LeaseOptionClassificationsComponent } from './components/shared/my-facilities/financials/lease-option-classifications/lease-option-classifications.component';
import { StraightlineDatesComponent } from './components/shared/my-facilities/financials/straightline-dates/straightline-dates.component';
import { FourWallComponent } from './components/shared/my-facilities/financials/four-wall/four-wall.component';

// Admin Components
import { DynamicFormsComponent } from './components/shared/my-facilities/admin/dynamic-forms/dynamic-forms.component';
import { EtlComponent } from './components/shared/my-facilities/admin/etl/etl.component';
import { IntegrationsComponent } from './components/shared/my-facilities/admin/integrations/integrations.component';
import { ClientSetupComponent } from './components/shared/my-facilities/admin/client-setup/client-setup.component';
import { DatasetsComponent } from './components/shared/my-facilities/admin/datasets/datasets.component';
import { EtlImportsComponent } from './components/shared/my-facilities/admin/etl/etl-imports/etl-imports.component';
import { EtlTemplatesComponent } from './components/shared/my-facilities/admin/etl/etl-templates/etl-templates.component';
import { EtlLogComponent } from './components/shared/my-facilities/admin/etl/etl-log/etl-log.component';
import { EtlQueueComponent } from './components/shared/my-facilities/admin/etl/etl-queue/etl-queue.component';
import { DataFieldsComponent } from './components/shared/my-facilities/admin/datasets/data-fields/data-fields.component';
import { DataGroupsComponent } from './components/shared/my-facilities/admin/datasets/data-groups/data-groups.component';
import { ColumnGroupsComponent } from './components/shared/my-facilities/admin/datasets/column-groups/column-groups.component';
import { ColumnFieldsComponent } from './components/shared/my-facilities/admin/datasets/column-fields/column-fields.component';
import { DataSetsComponent } from './components/shared/my-facilities/admin/datasets/data-sets/data-sets.component';
import { DataFieldAssociationsComponent } from './components/shared/my-facilities/admin/datasets/data-field-associations/data-field-associations.component';
import { DataConnectorIntegrationsComponent } from './components/shared/my-facilities/admin/integrations/data-connector-integrations/data-connector-integrations.component';
import { DataConnectorLogComponent } from './components/shared/my-facilities/admin/integrations/data-connector-log/data-connector-log.component';
import { IntegrationListComponent } from './components/shared/my-facilities/admin/integrations/data-connector-integrations/integration-list/integration-list.component';
import { IntegrationComponent } from './components/shared/my-facilities/admin/integrations/data-connector-integrations/integration/integration.component';
import { EtlFormItemListComponent } from './components/shared/my-facilities/admin/etl/etl-form-item-list/etl-form-item-list.component';
import { SecurityComponent } from './components/shared/my-facilities/admin/security/security.component';
import { CostarAdminComponent } from './components/shared/my-facilities/admin/costar-admin/costar-admin.component';
import { UserMaintenanceComponent } from './components/shared/my-facilities/admin/security/user-maintenance/user-maintenance.component';
import { SecurityGroupMaintenanceComponent } from './components/shared/my-facilities/admin/security/security-group-maintenance/security-group-maintenance.component';
import { SecurityProfilesComponent } from './components/shared/my-facilities/admin/security/security-profiles/security-profiles.component';
import { AdditionalObjectRightsComponent } from './components/shared/my-facilities/admin/security/additional-object-rights/additional-object-rights.component';
import { PortfolioHierarchyComponent } from './components/shared/my-facilities/admin/portfolio-object/portfolio-hierarchy/portfolio-hierarchy.component';
import { ObjectMaintenanceComponent } from './components/shared/my-facilities/admin/client-setup/object-maintenance/object-maintenance.component';
import { LeftNavAdminComponent } from './components/shared/my-facilities/admin/client-setup/left-nav-admin/left-nav-admin.component';
import { LeftNavListComponent } from './components/shared/my-facilities/admin/client-setup/left-nav-list/left-nav-list.component';
import { NavPagesComponent } from './components/shared/my-facilities/admin/client-setup/nav-pages/nav-pages.component';
import { AdminDashboardsComponent } from './components/shared/my-facilities/admin/client-setup/admin-dashboards/admin-dashboards.component';
import { AdminDashboardComponentsComponent } from './components/shared/my-facilities/admin/client-setup/admin-dashboard-components/admin-dashboard-components.component';
import { AdminDashboardSectionsComponent } from './components/shared/my-facilities/admin/client-setup/admin-dashboard-sections/admin-dashboard-sections.component';
import { UserDashboardAdminComponent } from './components/shared/my-facilities/admin/client-setup/user-dashboard-admin/user-dashboard-admin.component';
import { QuicksearchComponent } from './components/shared/my-facilities/admin/client-setup/quicksearch/quicksearch.component';
import { CostarLookupComponent } from './components/shared/my-facilities/admin/client-setup/costar-lookup/costar-lookup.component';
import { ClientSiteSetupComponent } from './components/shared/my-facilities/admin/client-setup/client-site-setup/client-site-setup.component';
import { ListPagesComponent } from './components/shared/my-facilities/admin/client-setup/list-pages/list-pages.component';
import { MenuHeadingsComponent } from './components/shared/my-facilities/admin/client-setup/menu-headings/menu-headings.component';
import { AdminReportsComponent } from './components/shared/my-facilities/admin/admin-reports/admin-reports.component';
import { ObjectTypeTypesComponent } from './components/shared/my-facilities/admin/costar-admin/object-type-types/object-type-types.component';
import { ObjectRelationshipsComponent } from './components/shared/my-facilities/admin/costar-admin/object-relationships/object-relationships.component';
import { RelationshipTypesComponent } from './components/shared/my-facilities/admin/costar-admin/relationship-types/relationship-types.component';
import { GenerateXmlComponent } from './components/shared/my-facilities/admin/costar-admin/generate-xml/generate-xml.component';
import { UploadXmlComponent } from './components/shared/my-facilities/admin/costar-admin/upload-xml/upload-xml.component';
import { MerchandiseCategoriesComponent } from './components/shared/my-facilities/admin/costar-admin/merchandise-categories/merchandise-categories.component';
import { MerchandiseDepartmentsComponent } from './components/shared/my-facilities/admin/costar-admin/merchandise-departments/merchandise-departments.component';
import { FileManagerComponent } from './components/shared/my-facilities/admin/costar-admin/file-manager/file-manager.component';
import { FileCleanupComponent } from './components/shared/my-facilities/admin/costar-admin/file-cleanup/file-cleanup.component';
import { DocumentTemplatesComponent } from './components/shared/my-facilities/admin/costar-admin/document-templates/document-templates.component';
import { DocumentTemplateTypesComponent } from './components/shared/my-facilities/admin/costar-admin/document-template-types/document-template-types.component';
import { TableMaintenanceComponent } from './components/shared/my-facilities/admin/costar-admin/table-maintenance/table-maintenance.component';
import { MapConfigurationComponent } from './components/shared/my-facilities/admin/costar-admin/map-configuration/map-configuration.component';
import { ReportCriteriaComponent } from './components/shared/my-facilities/admin/admin-reports/report-criteria/report-criteria.component';
import { DataExtractComponent } from './components/shared/my-facilities/admin/integrations/data-extract/data-extract.component';
import { BudgetCategoriesComponent } from './components/shared/my-facilities/admin/client-setup/budget-categories/budget-categories.component';
import { CannedReportsComponent } from './components/shared/my-facilities/admin/admin-reports/canned-reports/canned-reports.component';
import { DynamicFormComponent } from './components/shared/my-facilities/admin/dynamic-forms/dynamic-form/dynamic-form.component';
import { DynamicFormListComponent } from './components/shared/my-facilities/admin/dynamic-forms/dynamic-form-list/dynamic-form-list.component';

// Contacts Components
import { ContactsHomeComponent } from './components/shared/my-facilities/contacts/contacts-home/contacts-home.component';
import { PeopleListComponent } from './components/shared/my-facilities/contacts/people-list/people-list.component';
import { CompaniesListComponent } from './components/shared/my-facilities/contacts/companies-list/companies-list.component';
import { CompanyComponent } from './components/shared/my-facilities/contacts/company/company.component';
import { ContactComponent } from './components/shared/my-facilities/contacts/contact/contact.component';
import { ContactDetailsComponent } from './components/shared/my-facilities/contacts/contact/contact-details/contact-details.component';
import { ContactScheduledReportsComponent } from './components/shared/my-facilities/contacts/contact/contact-scheduled-reports/contact-scheduled-reports.component';
import { ContactProxiesComponent } from './components/shared/my-facilities/contacts/contact/contact-proxies/contact-proxies.component';
import { ContactPrivilegesComponent } from './components/shared/my-facilities/contacts/contact/contact-privileges/contact-privileges.component';
import { CompanyDetailsComponent } from './components/shared/my-facilities/contacts/company/company-details/company-details.component';

// Real Estate Portfolio Components
import { PropertyComponent } from './components/shared/my-facilities/portfolio/property/property.component';
import { LeaseComponent } from './components/shared/my-facilities/portfolio/lease/lease.component';
import { PortfolioHomeComponent } from './components/shared/my-facilities/portfolio/portfolio-home/portfolio-home.component';
import { PortfolioDashboardComponent } from './components/shared/my-facilities/portfolio/portfolio-dashboard/portfolio-dashboard.component';
import { PortfolioLeasesComponent } from './components/shared/my-facilities/portfolio/portfolio-leases/portfolio-leases.component';
import { PortfolioPropertiesComponent } from './components/shared/my-facilities/portfolio/portfolio-properties/portfolio-properties.component';
import { PortfolioBenchmarkingComponent } from './components/shared/my-facilities/portfolio/portfolio-benchmarking/portfolio-benchmarking.component';
import { PortfolioStrategyComponent } from './components/shared/my-facilities/portfolio/portfolio-strategy/portfolio-strategy.component';

// Property Components
import { MyPropertyDetailsComponent } from './components/shared/my-facilities/portfolio/property/my-property-details/my-property-details.component';
import { MyLeaseDetailsComponent } from './components/shared/my-facilities/portfolio/property/my-lease-details/my-lease-details.component';
import { MyImagesComponent } from './components/shared/my-facilities/portfolio/property/my-images/my-images.component';
import { MyFloorplanComponent } from './components/shared/my-facilities/portfolio/property/my-floorplan/my-floorplan.component';
import { CostarSummaryComponent } from './components/costar-summary/costar-summary.component';
import { CostarLeaseComponent } from './components/costar-lease/costar-lease.component';
import { CostarTenantComponent } from './components/costar-tenant/costar-tenant.component';
import { CostarDemographicsComponent } from './components/costar-demographics/costar-demographics.component';
import { CostarImagesComponent } from './components/costar-images/costar-images.component';
import { CostarPeersComponent } from './components/costar-peers/costar-peers.component';
import { CostarAnalyticsComponent } from './components/costar-analytics/costar-analytics.component';
import { CostarContactsComponent } from './components/costar-contacts/costar-contacts.component';
import { PropertySustainabilityComponent } from './components/shared/my-facilities/portfolio/property/sustainability/sustainability.component';

// Lease Components
import { LeaseAbstractComponent } from './components/shared/my-facilities/portfolio/lease/lease-abstract/lease-abstract.component';
import { LeaseFinancialsComponent } from './components/shared/my-facilities/portfolio/lease/lease-financials/lease-financials.component';
import { LeaseAccountingComponent } from './components/shared/my-facilities/portfolio/lease/lease-accounting-home/lease-accounting/lease-accounting.component';
import { LeaseVerificationComponent } from './components/shared/my-facilities/portfolio/lease/lease-verification/lease-verification.component';
import { LeaseOperatingExpensesComponent } from './components/shared/my-facilities/portfolio/lease/lease-operating-expenses/lease-operating-expenses.component';
import { SubleasesComponent } from './components/shared/my-facilities/portfolio/lease/subleases/subleases.component';
import { LeaseConstructionAllowancesComponent } from './components/shared/my-facilities/portfolio/lease/lease-construction-allowances/lease-construction-allowances.component';
import { AdamComponent } from './components/shared/my-facilities/portfolio/lease/adam/adam.component';
import { MetricsComponent } from './components/shared/my-facilities/portfolio/lease/metrics/metrics.component';

// Lease Financials Components
import { AllocationsComponent } from './components/shared/my-facilities/portfolio/lease/lease-financials/allocations/allocations.component';
import { IndexAdjustmentsComponent } from './components/shared/my-facilities/portfolio/lease/lease-financials/index-adjustments/index-adjustments.component';
import { MtmComponent } from './components/shared/my-facilities/portfolio/lease/lease-financials/mtm/mtm.component';
import { EditExpenseComponent } from './components/shared/my-facilities/portfolio/lease/lease-financials/edit-expense/edit-expense.component';
import { EditRevenueComponent } from './components/shared/my-facilities/portfolio/lease/lease-financials/edit-revenue/edit-revenue.component';

import { LeaseAccountingHomeComponent } from './components/shared/my-facilities/portfolio/lease/lease-accounting-home/lease-accounting-home.component';
import { AccountingScheduleComponent } from './components/shared/my-facilities/portfolio/lease/lease-accounting-home/lease-accounting/accounting-schedule/accounting-schedule.component';
import { AmortizationComponent } from './components/shared/my-facilities/portfolio/lease/lease-accounting-home/lease-accounting/accounting-schedule/amortization/amortization.component';
import { EditScheduleComponent } from './components/shared/my-facilities/portfolio/lease/lease-accounting-home/edit-schedule/edit-schedule.component';
import { AccountingYearComponent } from './components/shared/my-facilities/accounting/period-close/accounting-year/accounting-year.component';
import { AccountingPeriodComponent } from './components/shared/my-facilities/accounting/period-close/accounting-year/accounting-period/accounting-period.component';
import { BlacklineComponent } from './components/shared/my-facilities/accounting/blackline/blackline.component';

import { PortfoliosComponent } from './components/shared/my-facilities/admin/portfolios/portfolios.component';
import { PortfolioObjectComponent } from './components/shared/my-facilities/admin/portfolio-object/portfolio-object.component';
import { AdminHomeComponent } from './components/shared/my-facilities/admin/admin-home/admin-home.component';
import { PortfolioPreferencesComponent } from './components/shared/my-facilities/admin/portfolio-object/portfolio-preferences/portfolio-preferences.component';
import { PortfolioSecurityComponent } from './components/shared/my-facilities/admin/portfolio-object/portfolio-security/portfolio-security.component';
import { PortfolioTemplatesComponent } from './components/shared/my-facilities/admin/portfolio-object/portfolio-templates/portfolio-templates.component';
import { PortfolioCurrenciesComponent } from './components/shared/my-facilities/admin/portfolio-object/portfolio-currencies/portfolio-currencies.component';

// My Deals Components
import { MyDealsListComponent } from './components/shared/my-deals/my-deals-list/my-deals-list.component';
import { MyDealsDashboardComponent } from './components/shared/my-deals/my-deals-dashboard/my-deals-dashboard.component';
import { MyDealsBoardComponent } from './components/shared/my-deals/my-deals-board/my-deals-board.component';
import { MyDealsDealComponent } from './components/shared/my-deals/my-deals-deal/my-deals-deal.component';

import { ObjectCommentsComponent } from './components/object-comments/object-comments.component';
import { ObjectFilesComponent } from './components/object-files/object-files.component';
import { ObjectHistoryComponent } from './components/object-history/object-history.component';

// Reports Components
import { ReportsHomeComponent } from './components/shared/my-facilities/reports/reports-home/reports-home.component';
import { PortfolioReportsComponent } from './components/shared/my-facilities/reports/portfolio-reports/portfolio-reports.component';
import { FinancialsReportsComponent } from './components/shared/my-facilities/reports/financials-reports/financials-reports.component';
import { AccountingReportsComponent } from './components/shared/my-facilities/reports/accounting-reports/accounting-reports.component';
import { ProjectReportsComponent } from './components/shared/my-facilities/reports/project-reports/project-reports.component';
import { ContactReportsComponent } from './components/shared/my-facilities/reports/contact-reports/contact-reports.component';
import { SystemReportsComponent } from './components/shared/my-facilities/reports/system-reports/system-reports.component';
import { AdHocReportComponent } from './components/shared/my-facilities/reports/ad-hoc-report/ad-hoc-report.component';

import { DealsHomeComponent } from './components/shared/my-facilities/deals/deals-home/deals-home.component';
import { DealsDashboardComponent } from './components/shared/my-facilities/deals/deals-dashboard/deals-dashboard.component';
import { DealsListComponent } from './components/shared/my-facilities/deals/deals-list/deals-list.component';
import { DealComponent } from './components/shared/my-facilities/deals/deal/deal.component';

import { RemeasurementsComponent } from './components/shared/my-facilities/accounting/remeasurements/remeasurements.component';
import { BulkRemeasureListComponent } from './components/shared/my-facilities/accounting/remeasurements/bulk-remeasure-list/bulk-remeasure-list.component';
import { RemeasureComponent } from './components/shared/my-facilities/accounting/remeasurements/remeasure/remeasure.component';

import { PortfolioSuppliersComponent } from './components/shared/my-facilities/portfolio/portfolio-suppliers/portfolio-suppliers.component';
import { PortfolioEquipmentComponent } from './components/shared/my-facilities/portfolio/portfolio-equipment/portfolio-equipment.component';
import { EquipmentLeaseComponent } from './components/shared/my-facilities/portfolio/equipment-lease/equipment-lease.component';
import { SupplierComponent } from './components/shared/my-facilities/portfolio/supplier/supplier.component';

import { PivotComponent } from './components/shared/my-facilities/financials/pivot/pivot.component';
import { LeaseChargesComponent } from './components/shared/my-facilities/portfolio/lease/lease-financials/lease-charges/lease-charges.component';
import { FinancialChargesComponent } from './components/shared/my-facilities/financials/financial-charges/financial-charges.component';
import { ChartSandboxComponent } from './components/shared/my-facilities/chart-sandbox/chart-sandbox.component';

import { InsightsComponent } from './components/shared/my-facilities/admin/insights/insights.component';

import { AuthGuard } from './helpers/auth.guard';
import { GroupAndUserBlockedAdminLinksComponent } from './components/shared/my-facilities/reports/system-reports/group-and-user-blocked-admin-links/group-and-user-blocked-admin-links.component';
import { ExchangeRateSetsComponent } from './components/shared/my-facilities/reports/system-reports/exchange-rate-sets/exchange-rate-sets.component';
import { GroupAndUserRightsHistoryComponent } from './components/shared/my-facilities/reports/system-reports/group-and-user-rights-history/group-and-user-rights-history.component';
import { GroupAndUserModuleRightsComponent } from './components/shared/my-facilities/reports/system-reports/group-and-user-module-rights/group-and-user-module-rights.component';
import { GroupAndUserNavigationRightsComponent } from './components/shared/my-facilities/reports/system-reports/group-and-user-navigation-rights/group-and-user-navigation-rights.component';

import { HierarchyMaintenanceComponent } from './components/shared/my-facilities/admin/security/hierarchy-maintenance/hierarchy-maintenance.component';
import { TaskComponent } from './components/shared/my-facilities/projects/project/project-tasks/task/task.component';
import { QuickApprovalComponent } from './components/shared/my-facilities/projects/project/project-tasks/quick-approval/quick-approval.component';
import { TasksSettingsComponent } from './components/shared/my-facilities/projects/project/project-tasks/tasks-settings/tasks-settings.component';

import { CremHomeComponent } from './components/shared/my-facilities/sandbox/crem-home/crem-home.component';
import { CremPortfolioComponent } from './components/shared/my-facilities/sandbox/crem-portfolio/crem-portfolio.component';
import { CremProjectsComponent } from './components/shared/my-facilities/sandbox/crem-projects/crem-projects.component';
import { MiscComponent } from './components/shared/my-facilities/sandbox/misc/misc.component';

import { StartPageSelectComponent } from './start-page-select/start-page-select.component';
import { PasswordSettingsComponent } from './components/shared/my-facilities/admin/security/password-settings/password-settings.component';
import { ProjectActivityComponent } from './components/shared/my-facilities/projects/project/project-activity/project-activity.component';
import { ProjectsBoardComponent } from './components/shared/my-facilities/projects/projects-board/projects-board.component';
import { ProjectsSettingsComponent } from './components/shared/my-facilities/projects/projects-settings/projects-settings.component';
import { ProjectTypeComponent } from './components/shared/my-facilities/projects/projects-settings/project-type/project-type.component';
import { ProjectAddComponent } from './components/shared/my-facilities/projects/project-add/project-add.component';

import { SegmentBuilderComponent } from './components/segment-builder/segment-builder.component';

import { ReportsListComponent } from './components/shared/my-facilities/reports/reports-list/reports-list.component';
import { DistributionListsComponent } from './components/shared/my-facilities/reports/distribution-lists/distribution-lists.component';
import { ReportSchedulesComponent } from './components/shared/my-facilities/reports/report-schedules/report-schedules.component';
import { ManageTagsDialogComponent } from './components/shared/my-facilities/reports/manage-tags-dialog/manage-tags-dialog.component';
import { UploadOfflineDialogComponent } from './components/shared/my-facilities/reports/upload-offline-dialog/upload-offline-dialog.component';
import { AssignTagsDialogComponent } from './components/shared/my-facilities/reports/assign-tags-dialog/assign-tags-dialog.component';
import { ShareReportDialogComponent } from './components/shared/my-facilities/reports/share-report-dialog/share-report-dialog.component';
import { DeleteReportDialogComponent } from './components/shared/my-facilities/reports/delete-report-dialog/delete-report-dialog.component';

import { PropertyStrategyThreeComponent } from './components/shared/my-facilities/portfolio/property/property-strategy-three/property-strategy-three.component';
import { AlertRulesComponent } from './components/shared/my-facilities/accounting/alert-rules/alert-rules.component';

const routes: Routes = [
  { path: '', redirectTo: 'client-select', pathMatch: 'full' },
  {
    path: 'prototype',
    component: PrototypeSelectComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'client-select',
    component: ClientSelectComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'start-page',
    component: StartPageSelectComponent,
    canActivate: [ AuthGuard ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'reset', component: ResetPasswordComponent },
  {
    path: 'costar',
    component: CostarComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', redirectTo: 'news', pathMatch: 'full' },
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: 'str',
        component: StrComponent
      },
      {
        path: 'assets',
        component: MyAssetsComponent
      },
      {
        path: 'deals',
        component: MyDealsComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: MyDealsDashboardComponent },
          { path: 'board', component: MyDealsBoardComponent },
          { path: 'list', component: MyDealsListComponent },
          { path: 'deal/:deal_id', component: MyDealsDealComponent }
        ]
      },
      {
        path: 'loans',
        component: MyLoansComponent
      },
      {
        path: 'facilities',
        component: MyFacilitiesComponent,
        children: [
          { path: '', redirectTo: 'portfolio', pathMatch: 'full' },
          {
            path: 'projects',
            component: ProjectsComponent,
            children: [
              { path: '', redirectTo: "home", pathMatch: "full" },
              {
                path: 'home',
                component: ProjectsHomeComponent,
                children: [
                  { path: '', redirectTo: "dashboard", pathMatch: "full" },
                  { path: 'dashboard', component: ProjectsDashboardComponent },
                  { path: 'board', component: ProjectsBoardComponent },
                  { path: 'list', component: ProjectsListComponent },
                  { path: 'teams', component: ProjectsTeamsComponent },
                  { path: 'templates', component: ProjectsTemplatesComponent },
                  { path: 'tasks', component: TasksListComponent },
                  { path: 'documentstore', component: DocumentStoreComponent },
                  { path: 'offline', component: OfflineComponent },
                  {
                    path: 'settings',
                    component: ProjectsSettingsComponent,
                    children: [
                      { path: 'projecttype/:project_type_id', component: ProjectTypeComponent },
                    ]
                  },
                  { path: 'add', component: ProjectAddComponent }
                ]
              },
              {
                path: 'project/:project_id',
                component: ProjectComponent,
                children: [
                  { path: '', redirectTo: "tasks", pathMatch: "full" },
                  { path: 'details', component: ProjectDetailsComponent },
                  { path: 'activity', component: ProjectActivityComponent },
                  {
                    path: 'tasks',
                    component: ProjectTasksComponent,
                    children: [
                      { path: 'task/:task_id', component: TaskComponent },
                      { path: 'quick-approval', component: QuickApprovalComponent },
                      { path: 'settings', component: TasksSettingsComponent },
                    ]
                  },
                  { path: 'gantt', component: ProjectGanttComponent },
                  { path: 'deals', component: ProjectDealsComponent },
                  { path: 'team', component: ProjectTeamComponent },
                  { path: 'budget', component: ProjectBudgetComponent },
                ]
              }
            ]
          },
          {
            path: 'portfolio',
            component: PortfolioComponent,
            children: [
              { path: '', redirectTo: "home", pathMatch: "full" },
              {
                path: 'home',
                component: PortfolioHomeComponent,
                children: [
                  { path: '', redirectTo: "dashboard", pathMatch: "full" },
                  { path: 'dashboard', component: PortfolioDashboardComponent },
                  { path: 're-properties', component: PortfolioPropertiesComponent },
                  { path: 're-leases', component: PortfolioLeasesComponent },
                  { path: 'nonre-properties', component: PortfolioSuppliersComponent },
                  { path: 'nonre-leases', component: PortfolioEquipmentComponent },
                  { path: 'portfolios', component: PortfoliosComponent },
                  { path: 'benchmarking', component: PortfolioBenchmarkingComponent },
                  { path: 'strategy', component: PortfolioStrategyComponent },
                  { path: 'documentstore', component: DocumentStoreComponent },

                ]
              },
              {
                path: 'portfolio/:portfolio_id',
                component: PortfolioObjectComponent,
                children: [
                  { path: '', redirectTo: 'preferences', pathMatch: 'full' },
                  { path: 'preferences', component: PortfolioPreferencesComponent },
                  { path: 'properties', component: PortfolioPropertiesComponent },
                  { path: 'leases', component: PortfolioLeasesComponent },
                  { path: 'hierarchy', component: PortfolioHierarchyComponent },
                  { path: 'security', component: PortfolioSecurityComponent },
                  { path: 'templates', component: PortfolioTemplatesComponent },
                  { path: 'currencies', component: PortfolioCurrenciesComponent },
                  {
                    path: 'jeprofiles',
                    component: JournalEntryProfilesComponent,
                    children: [
                      { path: '', redirectTo: 'list', pathMatch: "full" },
                      { path: 'list', component: JournalEntryProfileListComponent },
                      { path: 'new', component: JournalEntryProfileDetailComponent },
                      { path: ':journal_entry_profile_id', component: JournalEntryProfileDetailComponent }
                    ]
                  },
                  {
                    path: 'amzprofiles',
                    component: AmortizationProfilesComponent,
                    children: [
                      { path: '', redirectTo: 'list', pathMatch: "full" },
                      { path: 'list', component: AmortizationProfileListComponent },
                      { path: 'new', component: AmortizationProfileDetailComponent },
                      { path: ':amortization_profile_id', component: AmortizationProfileDetailComponent }
                    ]
                  },
                  {
                    path: 'workflow',
                    component: WorkflowStatusComponent,
                    children: [
                      { path: '', redirectTo: 'settings', pathMatch: "full" },
                      { path: 'settings', component: WorkflowStatusSettingsComponent },
                      { path: ':workflow_status_id', component: WorkflowStatusDetailComponent }
                    ]
                  },
                  { path: 'ledgeraccounts', component: LedgerAccountsComponent },
                  { path: 'allocationcenters', component: AllocationCentersComponent },
                  { path: 'invoiceformat', component: InvoiceFormatsComponent },
                  { path: 'indexes', component: IndexesComponent },
                  { path: 'variances', component: VariancesComponent },
                  { path: 'fourwall', component: FourWallComponent },
                  { path: 'salestax', component: SalesTaxAuthoritiesComponent },
                  { path: 'adamfilter', component: AdamFilterComponent },
                  { path: 'percentrent', component: PercentRentComponent },
                  { path: 'leaseoption', component: LeaseOptionClassificationsComponent },
                  { path: 'straightlinedates', component: StraightlineDatesComponent },
                ]
              },
              {
                path: 'property/:property_id',
                component: PropertyComponent,
                children: [
                  { path: '', redirectTo: "mydetails", pathMatch: "full" },
                  { path: 'mydetails', component: MyPropertyDetailsComponent },
                  { path: 'myleases', component: MyLeaseDetailsComponent },
                  { path: 'myimages', component: MyImagesComponent },
                  { path: 'myfloorplan', component: MyFloorplanComponent },
                  { path: 'sustainability', component: PropertySustainabilityComponent },
                  { path: 'mystrategythree', component: PropertyStrategyThreeComponent },
                  { path: 'summary', component: CostarSummaryComponent },
                  { path: 'lease', component: CostarLeaseComponent },
                  { path: 'tenant', component: CostarTenantComponent },
                  { path: 'demographics', component: CostarDemographicsComponent },
                  { path: 'images', component: CostarImagesComponent },
                  { path: 'analytics', component: CostarAnalyticsComponent },
                  { path: 'contacts', component: CostarContactsComponent },
                  { path: 'peers', component: CostarPeersComponent },
                  { path: 'notes', component: ObjectCommentsComponent },
                  { path: 'files', component: ObjectFilesComponent },
                  { path: 'history', component: ObjectHistoryComponent },
                ]
              },
              {
                path: 'lease/:lease_id',
                component: LeaseComponent,
                children: [
                  { path: '', redirectTo: "abstract", pathMatch: "full" },
                  { path: 'abstract', component: LeaseAbstractComponent },
                  {
                    path: 'financials',
                    component: LeaseFinancialsComponent,
                    children: [
                      { path: 'charges', component: LeaseChargesComponent },
                      { path: 'allocations', component: AllocationsComponent },
                      { path: 'indexadjustments', component: IndexAdjustmentsComponent },
                      { path: 'mtm', component: MtmComponent },
                      { path: 'addexpense', component: EditExpenseComponent },
                      { path: 'addrevenue', component: EditRevenueComponent },
                    ]
                  },
                  {
                    path: 'accounting', component: LeaseAccountingHomeComponent,
                    children: [
                      { path: '', redirectTo: "schedules", pathMatch: "full" },
                      {
                        path: 'schedules',
                        component: LeaseAccountingComponent,
                        children: [
                          {
                            path: 'schedule/:schedule_id', component: AccountingScheduleComponent, children: [
                              { path: 'measurement/:measurement_id', component: AmortizationComponent },
                            ]
                          },
                        ]
                      },
                      { path: 'addschedule', component: EditScheduleComponent },
                    ]
                  },
                  { path: 'verification', component: LeaseVerificationComponent },
                  { path: 'allowances', component: LeaseConstructionAllowancesComponent },
                  { path: 'opex', component: LeaseOperatingExpensesComponent },
                  { path: 'adam', component: AdamComponent },
                  { path: 'subleases', component: SubleasesComponent },
                  { path: 'metrics', component: MetricsComponent },
                  { path: 'notes', component: ObjectCommentsComponent },
                  { path: 'files', component: ObjectFilesComponent },
                  { path: 'history', component: ObjectHistoryComponent },
                  { path: 'summary', component: CostarSummaryComponent },
                  { path: 'lease', component: CostarLeaseComponent },
                  { path: 'tenant', component: CostarTenantComponent },
                  { path: 'demographics', component: CostarDemographicsComponent },
                  { path: 'images', component: CostarImagesComponent },
                  { path: 'analytics', component: CostarAnalyticsComponent },
                  { path: 'contacts', component: CostarContactsComponent },
                  { path: 'peers', component: CostarPeersComponent },
                ]
              },
              {
                path: 'supplier/:supplier_id',
                component: SupplierComponent,
              },
              {
                path: 'equipment/:equipment_lease_id',
                component: EquipmentLeaseComponent,
              },
            ]
          },
          { path: 'strategy',
            component: StrategyComponent,
            children: [
              { path: '', redirectTo: "dashboard", pathMatch: "full" },
              { path: 'dashboard', component: StrategyDashboardComponent },
              { path: 'overview', component: StrategyOverviewComponent },
            ],
          },
          {
            path: 'financials',
            component: FinancialsComponent,
            children: [
              { path: '', redirectTo: "dashboard", pathMatch: "full" },
              { path: 'dashboard', component: FinancialsDashboardComponent },
              { path: 'enterbill', component: EnterBillComponent },
              { path: 'paymentsapprove', component: ApApproveComponent },
              { path: 'paymentssubmit', component: ApSubmitComponent },
              { path: 'invoiceapprove', component: InvoiceApproveComponent },
              { path: 'invoicegenerate', component: InvoiceGenerateComponent },
              { path: 'receivepayment', component: ReceivePaymentComponent },
              { path: 'editpayment', component: EditPaymentComponent },
              { path: 'paymentsexport', component: ApExportComponent },
              { path: 'invoiceexport', component: InvoiceExportComponent },
              { path: 'processmtm', component: ProcessMtmComponent },
              { path: 'processpercentrent', component: ProcessPercentRentComponent },
              { path: 'processindexcharge', component: ProcessIndexChargeComponent },
              { path: 'vendorcustomermgmt', component: VendorCustomerMgmtComponent },
              { path: 'exporthistory', component: ExportHistoryComponent },
              { path: 'ledgeraccounts', component: LedgerAccountsComponent },
              { path: 'allocationcenters', component: AllocationCentersComponent },
              { path: 'invoiceformat', component: InvoiceFormatsComponent },
              { path: 'indexes', component: IndexesComponent },
              { path: 'variances', component: VariancesComponent },
              { path: 'fourwall', component: FourWallComponent },
              { path: 'salestax', component: SalesTaxAuthoritiesComponent },
              { path: 'adamfilter', component: AdamFilterComponent },
              { path: 'percentrent', component: PercentRentComponent },
              { path: 'leaseoption', component: LeaseOptionClassificationsComponent },
              { path: 'straightlinedates', component: StraightlineDatesComponent },
              { path: 'pivot', component: PivotComponent },
              { path: 'charges', component: FinancialChargesComponent },
            ]
          },
          {
            path: 'accounting',
            component: AccountingComponent,
            children: [
              { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
              { path: 'dashboard', component: AccountingDashboardComponent },
              {
                path: 'period-close', component: PeriodCloseComponent, children: [
                  {
                    path: ':portfolio/:year/:accounting_standard', component: AccountingYearComponent, children: [
                      { path: 'period/:accounting_period_id', component: AccountingPeriodComponent }
                    ]
                  },
                ]
              },
              { path: 'schedules', component: AccountingSchedulesComponent },
              { path: 'health', component: AccountingHealthComponent },
              {
                path: 'amzprofiles', component: AmortizationProfilesComponent, children: [
                  { path: '', redirectTo: 'list', pathMatch: "full" },
                  { path: 'list', component: AmortizationProfileListComponent },
                  { path: 'new', component: AmortizationProfileDetailComponent },
                  { path: ':amortization_profile_id', component: AmortizationProfileDetailComponent }
                ]
              },
              {
                path: 'discountrate', component: DiscountRateProfilesComponent, children: [
                  { path: '', redirectTo: 'list', pathMatch: "full" },
                  { path: 'list', component: DiscountRateProfileListComponent },
                  { path: 'new', component: DiscountRateProfileDetailComponent },
                  { path: ':discount_rate_profile_id', component: DiscountRateProfileDetailComponent }
                ]
              },
              {
                path: 'jeprofiles', component: JournalEntryProfilesComponent, children: [
                  { path: '', redirectTo: 'list', pathMatch: "full" },
                  { path: 'list', component: JournalEntryProfileListComponent },
                  { path: 'new', component: JournalEntryProfileDetailComponent },
                  { path: ':journal_entry_profile_id', component: JournalEntryProfileDetailComponent }
                ]
              },
              {
                path: 'workflow', component: WorkflowStatusComponent, children: [
                  { path: '', redirectTo: 'settings', pathMatch: "full" },
                  { path: 'settings', component: WorkflowStatusSettingsComponent },
                  { path: ':workflow_status_id', component: WorkflowStatusDetailComponent }
                ]
              },
              { path: 'history', component: AccountingProfilesHistoryComponent },
              { path: 'bulkworkflow', component: BulkWorkflowComponent },
              { path: 'jeapprove', component: JournalEntryApproveComponent },
              { path: 'jeexport', component: JournalEntryExportComponent },
              { path: 'jereverse', component: JournalEntryReverseComponent },
              { path: 'blackline', component: BlacklineComponent },
              { path: 'settings', component: AccountingSettingsComponent },
              {
                path: 'remeasures', component: RemeasurementsComponent, children: [
                  { path: '', redirectTo: 'list', pathMatch: "full" },
                  { path: 'list', component: BulkRemeasureListComponent },
                  { path: 'new', component: RemeasureComponent },
                  { path: ':remeasure_id', component: RemeasureComponent }
                ]
              },
            ]
          },
          {
            path: 'contacts',
            component: ContactsComponent,
            children: [
              { path: '', redirectTo: "home", pathMatch: "full" },
              {
                path: 'home',
                component: ContactsHomeComponent,
                children: [
                  { path: '', redirectTo: "people", pathMatch: "full" },
                  { path: 'people', component: PeopleListComponent },
                  { path: 'companies', component: CompaniesListComponent },
                ]
              },
              {
                path: 'contact/:contact_id',
                component: ContactComponent,
                children: [
                  { path: '', redirectTo: 'details', pathMatch: "full" },
                  { path: 'details', component: ContactDetailsComponent },
                  { path: 'scheduledreports', component: ContactScheduledReportsComponent },
                  { path: 'proxies', component: ContactProxiesComponent },
                  { path: 'privileges', component: ContactPrivilegesComponent },
                  { path: 'notes', component: ObjectCommentsComponent },
                  { path: 'files', component: ObjectFilesComponent },
                  { path: 'history', component: ObjectHistoryComponent },
                ]
              },
              {
                path: 'company/:company_id',
                component: CompanyComponent,
                children: [
                  { path: '', redirectTo: 'details', pathMatch: "full" },
                  { path: 'details', component: CompanyDetailsComponent },
                  { path: 'notes', component: ObjectCommentsComponent },
                  { path: 'files', component: ObjectFilesComponent },
                  { path: 'history', component: ObjectHistoryComponent },
                ]
              }
            ]
          },
          {
            path: 'reports',
            component: ReportsComponent,
            children: [
              { path: '', redirectTo: "home", pathMatch: "full" },
              {
                path: 'home',
                component: ReportsHomeComponent,
                children: [
                  { path: '', redirectTo: "reportslist", pathMatch: "full" },
                  // { path: 'portfolio', component: PortfolioReportsComponent },
                  // { path: 'financials', component: FinancialsReportsComponent },
                  // { path: 'accounting', component: AccountingReportsComponent },
                  // { path: 'projects', component: ProjectReportsComponent },
                  // { path: 'contacts', component: ContactReportsComponent },
                  // { path: 'system', component: SystemReportsComponent },
                  { path: 'reportslist', component: ReportsListComponent, children : [
                    { path: 'managetags', component: ManageTagsDialogComponent },
                    { path: 'uploadoffline', component: UploadOfflineDialogComponent },
                    { path: 'assigntags/:report_id', component: AssignTagsDialogComponent },
                    { path: 'share/:report_id', component: ShareReportDialogComponent },
                    { path: 'delete/:report_id', component: DeleteReportDialogComponent },
                  ] },
                  { path: 'schedules', component: ReportSchedulesComponent },
                  { path: 'distributionlists', component: DistributionListsComponent },
                ]
              },
              { path: 'GROUP_AND_USER_MODULE_RIGHTS', component: GroupAndUserModuleRightsComponent },
              { path: 'GROUP_AND_USER_HISTORY', component: GroupAndUserRightsHistoryComponent },
              { path: 'GROUP_AND_USER_BLOCKED_ADMIN_LINKS', component: GroupAndUserBlockedAdminLinksComponent },
              { path: 'EXCHANGE_RATE_SET', component: ExchangeRateSetsComponent },
              { path: 'GROUP_AND_USER_NAVIGATION_RIGHTS', component: GroupAndUserNavigationRightsComponent },
              { path: ':report_id', component: AdHocReportComponent }
            ]
          },
          {
            path: 'admin',
            component: AdminComponent,
            children: [
              { path: '', redirectTo: 'home', pathMatch: 'full' },
              {
                path: 'home',
                component: AdminHomeComponent,
                children: [
                  { path: 'portfolios', component: PortfoliosComponent },
                  { path: 'insights', component: InsightsComponent },
                  {
                    path: 'dynamicforms',
                    component: DynamicFormsComponent,
                    children: [
                      { path: '', redirectTo: 'list', pathMatch: 'full' },
                      { path: 'list', component: DynamicFormListComponent },
                      { path: ':form_id', component: DynamicFormComponent },
                      { path: 'new', component: DynamicFormComponent },
                    ]
                  },
                  {
                    path: 'etl',
                    component: EtlComponent,
                    children: [
                      { path: '', redirectTo: 'imports', pathMatch: 'full' },
                      { path: 'imports', component: EtlImportsComponent },
                      { path: 'templates', component: EtlTemplatesComponent },
                      { path: 'log', component: EtlLogComponent },
                      { path: 'queue', component: EtlQueueComponent },
                      { path: 'formitemlist', component: EtlFormItemListComponent },
                    ]
                  },
                  {
                    path: 'integrations',
                    component: IntegrationsComponent,
                    children: [
                      { path: '', redirectTo: 'dataconnector', pathMatch: 'full' },
                      {
                        path: 'dataconnector', component: DataConnectorIntegrationsComponent,
                        children: [
                          { path: '', redirectTo: 'list', pathMatch: "full" },
                          { path: 'list', component: IntegrationListComponent },
                          { path: ':integration_id', component: IntegrationComponent }
                        ]
                      },
                      { path: 'log', component: DataConnectorLogComponent },
                      { path: 'dataextracts', component: DataExtractComponent }
                    ]
                  },
                  {
                    path: 'clientsetup',
                    component: ClientSetupComponent,
                    children: [
                      { path: 'leftnavadmin', component: LeftNavAdminComponent },
                      { path: 'leftnavlist', component: LeftNavListComponent },
                      { path: 'navpages', component: NavPagesComponent },
                      { path: 'dashboards', component: AdminDashboardsComponent },
                      { path: 'dashboardcomponents', component: AdminDashboardComponentsComponent },
                      { path: 'dashboardsections', component: AdminDashboardSectionsComponent },
                      { path: 'userdashboardadmin', component: UserDashboardAdminComponent },
                      { path: 'quicksearch', component: QuicksearchComponent },
                      { path: 'costarlookup', component: CostarLookupComponent },
                      { path: 'clientsitesetup', component: ClientSiteSetupComponent },
                      { path: 'listpages', component: ListPagesComponent },
                      { path: 'menuheadings', component: MenuHeadingsComponent },
                      { path: 'budgetcategories', component: BudgetCategoriesComponent },
                    ]
                  },
                  {
                    path: 'datasets',
                    component: DatasetsComponent,
                    children: [
                      { path: 'datafields', component: DataFieldsComponent },
                      { path: 'datagroups', component: DataGroupsComponent },
                      { path: 'columngroups', component: ColumnGroupsComponent },
                      { path: 'columnfields', component: ColumnFieldsComponent },
                      { path: 'datasets', component: DataSetsComponent },
                      { path: 'datafieldassociations', component: DataFieldAssociationsComponent }
                    ]
                  },
                  {
                    path: 'security',
                    component: SecurityComponent,
                    children: [
                      { path: 'users', component: UserMaintenanceComponent },
                      { path: 'groups', component: SecurityGroupMaintenanceComponent },
                      { path: 'profiles', component: SecurityProfilesComponent },
                      { path: 'rights', component: AdditionalObjectRightsComponent },
                      { path: 'objectmaintenance', component: ObjectMaintenanceComponent },
                      { path: 'hierarchies', component: HierarchyMaintenanceComponent },
                      { path: 'password-settings', component: PasswordSettingsComponent },

                    ]
                  },
                  {
                    path: 'costaradmin',
                    component: CostarAdminComponent,
                    children: [
                      { path: 'objecttypetypes', component: ObjectTypeTypesComponent },
                      { path: 'objectrelationships', component: ObjectRelationshipsComponent },
                      { path: 'relationshiptypes', component: RelationshipTypesComponent },
                      { path: 'generatexml', component: GenerateXmlComponent },
                      { path: 'uploadxml', component: UploadXmlComponent },
                      { path: 'merchandisecategories', component: MerchandiseCategoriesComponent },
                      { path: 'merchandisedepartments', component: MerchandiseDepartmentsComponent },
                      { path: 'filemanager', component: FileManagerComponent },
                      { path: 'filecleanup', component: FileCleanupComponent },
                      { path: 'documenttemplates', component: DocumentTemplatesComponent },
                      { path: 'documenttemplatetypes', component: DocumentTemplateTypesComponent },
                      { path: 'tablemaintenance', component: TableMaintenanceComponent },
                      { path: 'mapconfiguration', component: MapConfigurationComponent },
                    ]
                  },
                  {
                    path: 'reports',
                    component: AdminReportsComponent,
                    children: [
                      { path: 'cannedreports', component: CannedReportsComponent },
                      { path: 'criteria', component: ReportCriteriaComponent },
                    ]
                  }
                ]
              },
              {
                path: 'portfolio/:portfolio_id',
                component: PortfolioObjectComponent,
                children: [
                  { path: '', redirectTo: 'preferences', pathMatch: 'full' },
                  { path: 'preferences', component: PortfolioPreferencesComponent },
                  { path: 'hierarchy', component: PortfolioHierarchyComponent },
                  { path: 'security', component: PortfolioSecurityComponent },
                  { path: 'templates', component: PortfolioTemplatesComponent },
                  { path: 'currencies', component: PortfolioCurrenciesComponent },
                  {
                    path: 'jeprofiles', component: JournalEntryProfilesComponent, children: [
                      { path: '', redirectTo: 'list', pathMatch: "full" },
                      { path: 'list', component: JournalEntryProfileListComponent },
                      { path: 'new', component: JournalEntryProfileDetailComponent },
                      { path: ':journal_entry_profile_id', component: JournalEntryProfileDetailComponent }
                    ]
                  },
                  {
                    path: 'amzprofiles', component: AmortizationProfilesComponent, children: [
                      { path: '', redirectTo: 'list', pathMatch: "full" },
                      { path: 'list', component: AmortizationProfileListComponent },
                      { path: 'new', component: AmortizationProfileDetailComponent },
                      { path: ':amortization_profile_id', component: AmortizationProfileDetailComponent }
                    ]
                  },
                  {
                    path: 'workflow', component: WorkflowStatusComponent, children: [
                      { path: '', redirectTo: 'settings', pathMatch: "full" },
                      { path: 'settings', component: WorkflowStatusSettingsComponent },
                      { path: ':workflow_status_id', component: WorkflowStatusDetailComponent }
                    ]
                  },
                  { path: 'ledgeraccounts', component: LedgerAccountsComponent },
                  { path: 'allocationcenters', component: AllocationCentersComponent },
                  { path: 'invoiceformat', component: InvoiceFormatsComponent },
                  { path: 'indexes', component: IndexesComponent },
                  { path: 'variances', component: VariancesComponent },
                  { path: 'fourwall', component: FourWallComponent },
                  { path: 'salestax', component: SalesTaxAuthoritiesComponent },
                  { path: 'adamfilter', component: AdamFilterComponent },
                  { path: 'percentrent', component: PercentRentComponent },
                  { path: 'leaseoption', component: LeaseOptionClassificationsComponent },
                  { path: 'straightlinedates', component: StraightlineDatesComponent },
                ]
              },


            ]
          },
          {
            path: 'deals',
            component: DealsComponent,
            children: [
              { path: '', redirectTo: "home", pathMatch: "full" },
              {
                path: 'home',
                component: DealsHomeComponent,
                children: [
                  { path: '', redirectTo: "dashboard", pathMatch: "full" },
                  { path: 'dashboard', component: DealsDashboardComponent },
                  { path: 'list', component: DealsListComponent },
                ]
              },
              {
                path: 'deal/:deal_id',
                component: DealComponent,
                // children: [
                // 	{ path: '', redirectTo: "tasks", pathMatch: "full" },
                // 	{ path: 'tasks', component: ProjectTasksComponent },
                // 	{ path: 'gantt', component: ProjectGanttComponent },
                // 	{ path: 'team', component: ProjectTeamComponent },
                // ]
              }
            ]
          },
          {
            path: 'sandbox',
            component: SandboxComponent,
            children: [
              { path: '', redirectTo: 'crem-home', pathMatch: 'full' },
              { path: 'crem-home', component: CremHomeComponent },
              { path: 'crem-portfolio', component: CremPortfolioComponent },
              { path: 'crem-projects', component: CremProjectsComponent },
              { path: 'misc', component: MiscComponent },
            ]
          },
          {
            path: 'chart-sandbox',
            component: ChartSandboxComponent
          },
          {
            path: 'search-results',
            component: SearchResultsComponent
          },
          {
            path: 'edit-segment/:segment_id',
            component: SegmentBuilderComponent
          }
        ]
      },
      {
        path: 'properties',
        component: PropertiesComponent
      },
      {
        path: 'leasing',
        component: LeasingComponent
      },
      {
        path: 'sales',
        component: SalesComponent
      },
      {
        path: 'tenants',
        component: CompaniesComponent
      },
      {
        path: 'markets',
        component: MarketsComponent
      },
      {
        path: 'professionals',
        component: ProfessionalsComponent
      },
      {
        path: 'public-record',
        component: PublicRecordComponent
      },
      {
        path: 'marketing-center',
        component: MarketingCenterComponent
      },
      {
        path: 'enterprise',
        component: EnterpriseComponent
      },
    ]
  },
  {
    path: 'rem-a',
    component: CremAComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', redirectTo: 'facilities', pathMatch: 'full' },
      {
        path: 'facilities',
        component: MyFacilitiesComponent,
        children: [
          { path: '', redirectTo: 'portfolio', pathMatch: 'full' },
          {
            path: 'projects',
            component: ProjectsComponent,
            children: [
              { path: '', redirectTo: "home", pathMatch: "full" },
              {
                path: 'home',
                component: ProjectsHomeComponent,
                children: [
                  { path: '', redirectTo: "dashboard", pathMatch: "full" },
                  { path: 'dashboard', component: ProjectsDashboardComponent },
                  { path: 'board', component: ProjectsBoardComponent },
                  { path: 'list', component: ProjectsListComponent },
                  { path: 'teams', component: ProjectsTeamsComponent },
                  { path: 'templates', component: ProjectsTemplatesComponent },
                  { path: 'tasks', component: TasksListComponent },
                  { path: 'documentstore', component: DocumentStoreComponent },
                  { path: 'offline', component: OfflineComponent },
                  {
                    path: 'settings',
                    component: ProjectsSettingsComponent,
                    children: [
                      { path: 'projecttype/:project_type_id', component: ProjectTypeComponent },
                    ]
                  },
                  { path: 'add', component: ProjectAddComponent }
                ]
              },
              {
                path: 'project/:project_id',
                component: ProjectComponent,
                children: [
                  { path: '', redirectTo: "tasks", pathMatch: "full" },
                  { path: 'details', component: ProjectDetailsComponent },
                  { path: 'activity', component: ProjectActivityComponent },
                  {
                    path: 'tasks',
                    component: ProjectTasksComponent,
                    children: [
                      { path: 'task/:task_id', component: TaskComponent },
                      { path: 'quick-approval', component: QuickApprovalComponent },
                      { path: 'settings', component: TasksSettingsComponent },
                    ]
                  },
                  { path: 'gantt', component: ProjectGanttComponent },
                  { path: 'deals', component: ProjectDealsComponent },
                  { path: 'team', component: ProjectTeamComponent },
                  { path: 'budget', component: ProjectBudgetComponent },
                ]
              }
            ]
          },
          {
            path: 'portfolio',
            component: PortfolioComponent,
            children: [
              { path: '', redirectTo: "home", pathMatch: "full" },
              {
                path: 'home',
                component: PortfolioHomeComponent,
                children: [
                  { path: '', redirectTo: "dashboard", pathMatch: "full" },
                  { path: 'dashboard', component: PortfolioDashboardComponent },
                  { path: 're-properties', component: PortfolioPropertiesComponent },
                  { path: 're-leases', component: PortfolioLeasesComponent },
                  { path: 'nonre-properties', component: PortfolioSuppliersComponent },
                  { path: 'nonre-leases', component: PortfolioEquipmentComponent },
                  { path: 'portfolios', component: PortfoliosComponent },
                  { path: 'benchmarking', component: PortfolioBenchmarkingComponent },
                  { path: 'strategy', component: PortfolioStrategyComponent },
                  { path: 'documentstore', component: DocumentStoreComponent },

                ]
              },
              {
                path: 'portfolio/:portfolio_id',
                component: PortfolioObjectComponent,
                children: [
                  { path: '', redirectTo: 'preferences', pathMatch: 'full' },
                  { path: 'preferences', component: PortfolioPreferencesComponent },
                  { path: 'properties', component: PortfolioPropertiesComponent },
                  { path: 'leases', component: PortfolioLeasesComponent },
                  { path: 'hierarchy', component: PortfolioHierarchyComponent },
                  { path: 'security', component: PortfolioSecurityComponent },
                  { path: 'templates', component: PortfolioTemplatesComponent },
                  { path: 'currencies', component: PortfolioCurrenciesComponent },
                  {
                    path: 'jeprofiles',
                    component: JournalEntryProfilesComponent,
                    children: [
                      { path: '', redirectTo: 'list', pathMatch: "full" },
                      { path: 'list', component: JournalEntryProfileListComponent },
                      { path: 'new', component: JournalEntryProfileDetailComponent },
                      { path: ':journal_entry_profile_id', component: JournalEntryProfileDetailComponent }
                    ]
                  },
                  {
                    path: 'amzprofiles',
                    component: AmortizationProfilesComponent,
                    children: [
                      { path: '', redirectTo: 'list', pathMatch: "full" },
                      { path: 'list', component: AmortizationProfileListComponent },
                      { path: 'new', component: AmortizationProfileDetailComponent },
                      { path: ':amortization_profile_id', component: AmortizationProfileDetailComponent }
                    ]
                  },
                  {
                    path: 'workflow',
                    component: WorkflowStatusComponent,
                    children: [
                      { path: '', redirectTo: 'settings', pathMatch: "full" },
                      { path: 'settings', component: WorkflowStatusSettingsComponent },
                      { path: ':workflow_status_id', component: WorkflowStatusDetailComponent }
                    ]
                  },
                  { path: 'ledgeraccounts', component: LedgerAccountsComponent },
                  { path: 'allocationcenters', component: AllocationCentersComponent },
                  { path: 'invoiceformat', component: InvoiceFormatsComponent },
                  { path: 'indexes', component: IndexesComponent },
                  { path: 'variances', component: VariancesComponent },
                  { path: 'fourwall', component: FourWallComponent },
                  { path: 'salestax', component: SalesTaxAuthoritiesComponent },
                  { path: 'adamfilter', component: AdamFilterComponent },
                  { path: 'percentrent', component: PercentRentComponent },
                  { path: 'leaseoption', component: LeaseOptionClassificationsComponent },
                  { path: 'straightlinedates', component: StraightlineDatesComponent },
                ]
              },
              {
                path: 'property/:property_id',
                component: PropertyComponent,
                children: [
                  { path: '', redirectTo: "mydetails", pathMatch: "full" },
                  { path: 'mydetails', component: MyPropertyDetailsComponent },
                  { path: 'myleases', component: MyLeaseDetailsComponent },
                  { path: 'myimages', component: MyImagesComponent },
                  { path: 'myfloorplan', component: MyFloorplanComponent },
                  { path: 'sustainability', component: PropertySustainabilityComponent },
                  { path: 'mystrategythree', component: PropertyStrategyThreeComponent },
                  { path: 'peers', component: CostarPeersComponent },
                  { path: 'notes', component: ObjectCommentsComponent },
                  { path: 'files', component: ObjectFilesComponent },
                  { path: 'history', component: ObjectHistoryComponent },
                ]
              },
              {
                path: 'lease/:lease_id',
                component: LeaseComponent,
                children: [
                  { path: '', redirectTo: "abstract", pathMatch: "full" },
                  { path: 'abstract', component: LeaseAbstractComponent },
                  {
                    path: 'financials',
                    component: LeaseFinancialsComponent,
                    children: [
                      { path: 'charges', component: LeaseChargesComponent },
                      { path: 'allocations', component: AllocationsComponent },
                      { path: 'indexadjustments', component: IndexAdjustmentsComponent },
                      { path: 'mtm', component: MtmComponent },
                      { path: 'addexpense', component: EditExpenseComponent },
                      { path: 'addrevenue', component: EditRevenueComponent },
                    ]
                  },
                  {
                    path: 'accounting', component: LeaseAccountingHomeComponent,
                    children: [
                      { path: '', redirectTo: "schedules", pathMatch: "full" },
                      {
                        path: 'schedules',
                        component: LeaseAccountingComponent,
                        children: [
                          {
                            path: 'schedule/:schedule_id', component: AccountingScheduleComponent, children: [
                              { path: 'measurement/:measurement_id', component: AmortizationComponent },
                            ]
                          },
                        ]
                      },
                      { path: 'addschedule', component: EditScheduleComponent },
                    ]
                  },
                  { path: 'verification', component: LeaseVerificationComponent },
                  { path: 'allowances', component: LeaseConstructionAllowancesComponent },
                  { path: 'opex', component: LeaseOperatingExpensesComponent },
                  { path: 'adam', component: AdamComponent },
                  { path: 'subleases', component: SubleasesComponent },
                  { path: 'metrics', component: MetricsComponent },
                  { path: 'notes', component: ObjectCommentsComponent },
                  { path: 'files', component: ObjectFilesComponent },
                  { path: 'history', component: ObjectHistoryComponent },
                  { path: 'summary', component: CostarSummaryComponent },
                  { path: 'lease', component: CostarLeaseComponent },
                  { path: 'tenant', component: CostarTenantComponent },
                  { path: 'demographics', component: CostarDemographicsComponent },
                  { path: 'images', component: CostarImagesComponent },
                  { path: 'analytics', component: CostarAnalyticsComponent },
                  { path: 'contacts', component: CostarContactsComponent },
                  { path: 'peers', component: CostarPeersComponent },
                ]
              },
              {
                path: 'supplier/:supplier_id',
                component: SupplierComponent,
              },
              {
                path: 'equipment/:equipment_lease_id',
                component: EquipmentLeaseComponent,
              },
            ]
          },
          { path: 'strategy',
            component: StrategyComponent,
            children: [
              { path: '', redirectTo: "overview", pathMatch: "full" },
              { path: 'overview', component: StrategyOverviewComponent },
            ],
          },
          {
            path: 'financials',
            component: FinancialsComponent,
            children: [
              { path: '', redirectTo: "dashboard", pathMatch: "full" },
              { path: 'dashboard', component: FinancialsDashboardComponent },
              { path: 'enterbill', component: EnterBillComponent },
              { path: 'paymentsapprove', component: ApApproveComponent },
              { path: 'paymentssubmit', component: ApSubmitComponent },
              { path: 'invoiceapprove', component: InvoiceApproveComponent },
              { path: 'invoicegenerate', component: InvoiceGenerateComponent },
              { path: 'receivepayment', component: ReceivePaymentComponent },
              { path: 'editpayment', component: EditPaymentComponent },
              { path: 'paymentsexport', component: ApExportComponent },
              { path: 'invoiceexport', component: InvoiceExportComponent },
              { path: 'processmtm', component: ProcessMtmComponent },
              { path: 'processpercentrent', component: ProcessPercentRentComponent },
              { path: 'processindexcharge', component: ProcessIndexChargeComponent },
              { path: 'vendorcustomermgmt', component: VendorCustomerMgmtComponent },
              { path: 'exporthistory', component: ExportHistoryComponent },
              { path: 'ledgeraccounts', component: LedgerAccountsComponent },
              { path: 'allocationcenters', component: AllocationCentersComponent },
              { path: 'invoiceformat', component: InvoiceFormatsComponent },
              { path: 'indexes', component: IndexesComponent },
              { path: 'variances', component: VariancesComponent },
              { path: 'fourwall', component: FourWallComponent },
              { path: 'salestax', component: SalesTaxAuthoritiesComponent },
              { path: 'adamfilter', component: AdamFilterComponent },
              { path: 'percentrent', component: PercentRentComponent },
              { path: 'leaseoption', component: LeaseOptionClassificationsComponent },
              { path: 'straightlinedates', component: StraightlineDatesComponent },
              { path: 'pivot', component: PivotComponent },
              { path: 'charges', component: FinancialChargesComponent },
            ]
          },
          {
            path: 'accounting',
            component: AccountingComponent,
            children: [
              { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
              { path: 'dashboard', component: AccountingDashboardComponent },
              {
                path: 'period-close', component: PeriodCloseComponent, children: [
                  {
                    path: ':portfolio/:year/:accounting_standard', component: AccountingYearComponent, children: [
                      { path: 'period/:accounting_period_id', component: AccountingPeriodComponent }
                    ]
                  },
                ]
              },
              { path: 'schedules', component: AccountingSchedulesComponent },
              { path: 'health', component: AccountingHealthComponent },
              {
                path: 'amzprofiles', component: AmortizationProfilesComponent, children: [
                  { path: '', redirectTo: 'list', pathMatch: "full" },
                  { path: 'list', component: AmortizationProfileListComponent },
                  { path: 'new', component: AmortizationProfileDetailComponent },
                  { path: ':amortization_profile_id', component: AmortizationProfileDetailComponent }
                ]
              },
              {
                path: 'discountrate', component: DiscountRateProfilesComponent, children: [
                  { path: '', redirectTo: 'list', pathMatch: "full" },
                  { path: 'list', component: DiscountRateProfileListComponent },
                  { path: 'new', component: DiscountRateProfileDetailComponent },
                  { path: ':discount_rate_profile_id', component: DiscountRateProfileDetailComponent }
                ]
              },
              {
                path: 'jeprofiles', component: JournalEntryProfilesComponent, children: [
                  { path: '', redirectTo: 'list', pathMatch: "full" },
                  { path: 'list', component: JournalEntryProfileListComponent },
                  { path: 'new', component: JournalEntryProfileDetailComponent },
                  { path: ':journal_entry_profile_id', component: JournalEntryProfileDetailComponent }
                ]
              },
              {
                path: 'workflow', component: WorkflowStatusComponent, children: [
                  { path: '', redirectTo: 'settings', pathMatch: "full" },
                  { path: 'settings', component: WorkflowStatusSettingsComponent },
                  { path: ':workflow_status_id', component: WorkflowStatusDetailComponent }
                ]
              },
              { path: 'history', component: AccountingProfilesHistoryComponent },
              { path: 'bulkworkflow', component: BulkWorkflowComponent },
              { path: 'jeapprove', component: JournalEntryApproveComponent },
              { path: 'jeexport', component: JournalEntryExportComponent },
              { path: 'jereverse', component: JournalEntryReverseComponent },
              { path: 'blackline', component: BlacklineComponent },
              { path: 'settings', component: AccountingSettingsComponent },
              {
                path: 'remeasures', component: RemeasurementsComponent, children: [
                  { path: '', redirectTo: 'list', pathMatch: "full" },
                  { path: 'list', component: BulkRemeasureListComponent },
                  { path: 'new', component: RemeasureComponent },
                  { path: ':remeasure_id', component: RemeasureComponent }
                ]
              },
              { path: 'alert-rules', component: AlertRulesComponent }
            ]
          },
          {
            path: 'contacts',
            component: ContactsComponent,
            children: [
              { path: '', redirectTo: "home", pathMatch: "full" },
              {
                path: 'home',
                component: ContactsHomeComponent,
                children: [
                  { path: '', redirectTo: "people", pathMatch: "full" },
                  { path: 'people', component: PeopleListComponent },
                  { path: 'companies', component: CompaniesListComponent },
                ]
              },
              {
                path: 'contact/:contact_id',
                component: ContactComponent,
                children: [
                  { path: '', redirectTo: 'details', pathMatch: "full" },
                  { path: 'details', component: ContactDetailsComponent },
                  { path: 'scheduledreports', component: ContactScheduledReportsComponent },
                  { path: 'proxies', component: ContactProxiesComponent },
                  { path: 'privileges', component: ContactPrivilegesComponent },
                  { path: 'notes', component: ObjectCommentsComponent },
                  { path: 'files', component: ObjectFilesComponent },
                  { path: 'history', component: ObjectHistoryComponent },
                ]
              },
              {
                path: 'company/:company_id',
                component: CompanyComponent,
                children: [
                  { path: '', redirectTo: 'details', pathMatch: "full" },
                  { path: 'details', component: CompanyDetailsComponent },
                  { path: 'notes', component: ObjectCommentsComponent },
                  { path: 'files', component: ObjectFilesComponent },
                  { path: 'history', component: ObjectHistoryComponent },
                ]
              }
            ]
          },
          {
            path: 'reports',
            component: ReportsComponent,
            children: [
              { path: '', redirectTo: "home", pathMatch: "full" },
              {
                path: 'home',
                component: ReportsHomeComponent,
                children: [
                  { path: '', redirectTo: "reportslist", pathMatch: "full" },
                  // { path: 'portfolio', component: PortfolioReportsComponent },
                  // { path: 'financials', component: FinancialsReportsComponent },
                  // { path: 'accounting', component: AccountingReportsComponent },
                  // { path: 'projects', component: ProjectReportsComponent },
                  // { path: 'contacts', component: ContactReportsComponent },
                  // { path: 'system', component: SystemReportsComponent },
                  { path: 'reportslist', component: ReportsListComponent, children : [
                    { path: 'managetags', component: ManageTagsDialogComponent },
                    { path: 'uploadoffline', component: UploadOfflineDialogComponent },
                    { path: 'assigntags/:report_id', component: AssignTagsDialogComponent },
                    { path: 'share/:report_id', component: ShareReportDialogComponent },
                    { path: 'delete/:report_id', component: DeleteReportDialogComponent },
                  ] },
                  { path: 'schedules', component: ReportSchedulesComponent },
                  { path: 'distributionlists', component: DistributionListsComponent },
                ]
              },
              { path: 'GROUP_AND_USER_MODULE_RIGHTS', component: GroupAndUserModuleRightsComponent },
              { path: 'GROUP_AND_USER_HISTORY', component: GroupAndUserRightsHistoryComponent },
              { path: 'GROUP_AND_USER_BLOCKED_ADMIN_LINKS', component: GroupAndUserBlockedAdminLinksComponent },
              { path: 'EXCHANGE_RATE_SET', component: ExchangeRateSetsComponent },
              { path: 'GROUP_AND_USER_NAVIGATION_RIGHTS', component: GroupAndUserNavigationRightsComponent },
              { path: ':report_id', component: AdHocReportComponent }
            ]
          },
          {
            path: 'admin',
            component: AdminComponent,
            children: [
              { path: '', redirectTo: 'home', pathMatch: 'full' },
              {
                path: 'home',
                component: AdminHomeComponent,
                children: [
                  { path: 'portfolios', component: PortfoliosComponent },
                  { path: 'insights', component: InsightsComponent },
                  {
                    path: 'dynamicforms',
                    component: DynamicFormsComponent,
                    children: [
                      { path: '', redirectTo: 'list', pathMatch: 'full' },
                      { path: 'list', component: DynamicFormListComponent },
                      { path: ':form_id', component: DynamicFormComponent },
                      { path: 'new', component: DynamicFormComponent },
                    ]
                  },
                  {
                    path: 'etl',
                    component: EtlComponent,
                    children: [
                      { path: '', redirectTo: 'imports', pathMatch: 'full' },
                      { path: 'imports', component: EtlImportsComponent },
                      { path: 'templates', component: EtlTemplatesComponent },
                      { path: 'log', component: EtlLogComponent },
                      { path: 'queue', component: EtlQueueComponent },
                      { path: 'formitemlist', component: EtlFormItemListComponent },
                    ]
                  },
                  {
                    path: 'integrations',
                    component: IntegrationsComponent,
                    children: [
                      { path: '', redirectTo: 'dataconnector', pathMatch: 'full' },
                      {
                        path: 'dataconnector', component: DataConnectorIntegrationsComponent,
                        children: [
                          { path: '', redirectTo: 'list', pathMatch: "full" },
                          { path: 'list', component: IntegrationListComponent },
                          { path: ':integration_id', component: IntegrationComponent }
                        ]
                      },
                      { path: 'log', component: DataConnectorLogComponent },
                      { path: 'dataextracts', component: DataExtractComponent }
                    ]
                  },
                  {
                    path: 'clientsetup',
                    component: ClientSetupComponent,
                    children: [
                      { path: 'leftnavadmin', component: LeftNavAdminComponent },
                      { path: 'leftnavlist', component: LeftNavListComponent },
                      { path: 'navpages', component: NavPagesComponent },
                      { path: 'dashboards', component: AdminDashboardsComponent },
                      { path: 'dashboardcomponents', component: AdminDashboardComponentsComponent },
                      { path: 'dashboardsections', component: AdminDashboardSectionsComponent },
                      { path: 'userdashboardadmin', component: UserDashboardAdminComponent },
                      { path: 'quicksearch', component: QuicksearchComponent },
                      { path: 'costarlookup', component: CostarLookupComponent },
                      { path: 'clientsitesetup', component: ClientSiteSetupComponent },
                      { path: 'listpages', component: ListPagesComponent },
                      { path: 'menuheadings', component: MenuHeadingsComponent },
                      { path: 'budgetcategories', component: BudgetCategoriesComponent },
                    ]
                  },
                  {
                    path: 'datasets',
                    component: DatasetsComponent,
                    children: [
                      { path: 'datafields', component: DataFieldsComponent },
                      { path: 'datagroups', component: DataGroupsComponent },
                      { path: 'columngroups', component: ColumnGroupsComponent },
                      { path: 'columnfields', component: ColumnFieldsComponent },
                      { path: 'datasets', component: DataSetsComponent },
                      { path: 'datafieldassociations', component: DataFieldAssociationsComponent }
                    ]
                  },
                  {
                    path: 'security',
                    component: SecurityComponent,
                    children: [
                      { path: 'users', component: UserMaintenanceComponent },
                      { path: 'groups', component: SecurityGroupMaintenanceComponent },
                      { path: 'profiles', component: SecurityProfilesComponent },
                      { path: 'rights', component: AdditionalObjectRightsComponent },
                      { path: 'objectmaintenance', component: ObjectMaintenanceComponent },
                      { path: 'hierarchies', component: HierarchyMaintenanceComponent },
                      { path: 'password-settings', component: PasswordSettingsComponent },

                    ]
                  },
                  {
                    path: 'costaradmin',
                    component: CostarAdminComponent,
                    children: [
                      { path: 'objecttypetypes', component: ObjectTypeTypesComponent },
                      { path: 'objectrelationships', component: ObjectRelationshipsComponent },
                      { path: 'relationshiptypes', component: RelationshipTypesComponent },
                      { path: 'generatexml', component: GenerateXmlComponent },
                      { path: 'uploadxml', component: UploadXmlComponent },
                      { path: 'merchandisecategories', component: MerchandiseCategoriesComponent },
                      { path: 'merchandisedepartments', component: MerchandiseDepartmentsComponent },
                      { path: 'filemanager', component: FileManagerComponent },
                      { path: 'filecleanup', component: FileCleanupComponent },
                      { path: 'documenttemplates', component: DocumentTemplatesComponent },
                      { path: 'documenttemplatetypes', component: DocumentTemplateTypesComponent },
                      { path: 'tablemaintenance', component: TableMaintenanceComponent },
                      { path: 'mapconfiguration', component: MapConfigurationComponent },
                    ]
                  },
                  {
                    path: 'reports',
                    component: AdminReportsComponent,
                    children: [
                      { path: 'cannedreports', component: CannedReportsComponent },
                      { path: 'criteria', component: ReportCriteriaComponent },
                    ]
                  }
                ]
              },
              {
                path: 'portfolio/:portfolio_id',
                component: PortfolioObjectComponent,
                children: [
                  { path: '', redirectTo: 'preferences', pathMatch: 'full' },
                  { path: 'preferences', component: PortfolioPreferencesComponent },
                  { path: 'hierarchy', component: PortfolioHierarchyComponent },
                  { path: 'security', component: PortfolioSecurityComponent },
                  { path: 'templates', component: PortfolioTemplatesComponent },
                  { path: 'currencies', component: PortfolioCurrenciesComponent },
                  {
                    path: 'jeprofiles', component: JournalEntryProfilesComponent, children: [
                      { path: '', redirectTo: 'list', pathMatch: "full" },
                      { path: 'list', component: JournalEntryProfileListComponent },
                      { path: 'new', component: JournalEntryProfileDetailComponent },
                      { path: ':journal_entry_profile_id', component: JournalEntryProfileDetailComponent }
                    ]
                  },
                  {
                    path: 'amzprofiles', component: AmortizationProfilesComponent, children: [
                      { path: '', redirectTo: 'list', pathMatch: "full" },
                      { path: 'list', component: AmortizationProfileListComponent },
                      { path: 'new', component: AmortizationProfileDetailComponent },
                      { path: ':amortization_profile_id', component: AmortizationProfileDetailComponent }
                    ]
                  },
                  {
                    path: 'workflow', component: WorkflowStatusComponent, children: [
                      { path: '', redirectTo: 'settings', pathMatch: "full" },
                      { path: 'settings', component: WorkflowStatusSettingsComponent },
                      { path: ':workflow_status_id', component: WorkflowStatusDetailComponent }
                    ]
                  },
                  { path: 'ledgeraccounts', component: LedgerAccountsComponent },
                  { path: 'allocationcenters', component: AllocationCentersComponent },
                  { path: 'invoiceformat', component: InvoiceFormatsComponent },
                  { path: 'indexes', component: IndexesComponent },
                  { path: 'variances', component: VariancesComponent },
                  { path: 'fourwall', component: FourWallComponent },
                  { path: 'salestax', component: SalesTaxAuthoritiesComponent },
                  { path: 'adamfilter', component: AdamFilterComponent },
                  { path: 'percentrent', component: PercentRentComponent },
                  { path: 'leaseoption', component: LeaseOptionClassificationsComponent },
                  { path: 'straightlinedates', component: StraightlineDatesComponent },
                ]
              },


            ]
          },
          {
            path: 'deals',
            component: DealsComponent,
            children: [
              { path: '', redirectTo: "home", pathMatch: "full" },
              {
                path: 'home',
                component: DealsHomeComponent,
                children: [
                  { path: '', redirectTo: "dashboard", pathMatch: "full" },
                  { path: 'dashboard', component: DealsDashboardComponent },
                  { path: 'list', component: DealsListComponent },
                ]
              },
              {
                path: 'deal/:deal_id',
                component: DealComponent,
                // children: [
                // 	{ path: '', redirectTo: "tasks", pathMatch: "full" },
                // 	{ path: 'tasks', component: ProjectTasksComponent },
                // 	{ path: 'gantt', component: ProjectGanttComponent },
                // 	{ path: 'team', component: ProjectTeamComponent },
                // ]
              }
            ]
          },
          {
            path: 'sandbox',
            component: SandboxComponent,
            children: [
              { path: '', redirectTo: 'crem-home', pathMatch: 'full' },
              { path: 'crem-home', component: CremHomeComponent },
              { path: 'crem-portfolio', component: CremPortfolioComponent },
              { path: 'crem-projects', component: CremProjectsComponent },
              { path: 'misc', component: MiscComponent },
            ]
          },
          {
            path: 'chart-sandbox',
            component: ChartSandboxComponent
          },
          {
            path: 'search-results',
            component: SearchResultsComponent
          },
          {
            path: 'edit-segment/:segment_id',
            component: SegmentBuilderComponent
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
