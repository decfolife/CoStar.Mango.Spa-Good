import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module';

import { NewsComponent } from '../components/shared/news/news.component';
import { MyAssetsComponent } from '../components/shared/my-assets/my-assets.component';
import { MyDealsComponent } from '../components/shared/my-deals/my-deals.component';
import { MyLoansComponent } from '../components/shared/my-loans/my-loans.component';
import { MyFacilitiesComponent } from '../components/shared/my-facilities/my-facilities.component';
import { PropertiesComponent } from '../components/shared/properties/properties.component';
import { LeasingComponent } from '../components/shared/leasing/leasing.component';
import { SalesComponent } from '../components/shared/sales/sales.component';
import { CompaniesComponent } from '../components/shared/companies/companies.component';
import { MarketsComponent } from '../components/shared/markets/markets.component';
import { StrComponent } from '../components/shared/str/str.component';
import { SearchResultsComponent } from '../components/shared/search-results/search-results.component';

// CREM Components
import { ProjectsComponent } from '../components/shared/my-facilities/projects/projects.component';
import { PortfolioComponent } from '../components/shared/my-facilities/portfolio/portfolio.component';
import { StrategyComponent } from '../components/shared/my-facilities/strategy/strategy.component';
import { FinancialsComponent } from '../components/shared/my-facilities/financials/financials.component';
import { AccountingComponent } from '../components/shared/my-facilities/accounting/accounting.component';
import { ContactsComponent } from '../components/shared/my-facilities/contacts/contacts.component';
import { ReportsComponent } from '../components/shared/my-facilities/reports/reports.component';
import { AdminComponent } from '../components/shared/my-facilities/admin/admin.component';
import { DealsComponent } from '../components/shared/my-facilities/deals/deals.component';
import { SandboxComponent } from '../components/shared/my-facilities/sandbox/sandbox.component';

// Strategy Components
import { StrategyOverviewComponent } from '../components/shared/my-facilities/strategy/overview/overview.component';

// Projects Components
import { ProjectsHomeComponent } from '../components/shared/my-facilities/projects/projects-home/projects-home.component';
import { ProjectsDashboardComponent } from '../components/shared/my-facilities/projects/projects-dashboard/projects-dashboard.component';
import { ProjectsListComponent } from '../components/shared/my-facilities/projects/projects-list/projects-list.component';
import { ProjectsTeamsComponent } from '../components/shared/my-facilities/projects/projects-teams/projects-teams.component';
import { ProjectsTemplatesComponent } from '../components/shared/my-facilities/projects/projects-templates/projects-templates.component';
import { ProjectComponent } from '../components/shared/my-facilities/projects/project/project.component';
import { ProjectTasksComponent } from '../components/shared/my-facilities/projects/project/project-tasks/project-tasks.component';
import { ProjectDetailsComponent } from '../components/shared/my-facilities/projects/project/project-details/project-details.component';
import { ProjectGanttComponent } from '../components/shared/my-facilities/projects/project/project-gantt/project-gantt.component';
import { ProjectDealsComponent } from '../components/shared/my-facilities/projects/project/project-deals/project-deals.component';
import { ProjectTeamComponent } from '../components/shared/my-facilities/projects/project/project-team/project-team.component';
import { ProjectBudgetComponent } from '../components/shared/my-facilities/projects/project/project-budget/project-budget.component';
import { ProjectTemplateComponent } from '../components/shared/my-facilities/projects/project-template/project-template.component';
import { TemplateTasksComponent } from '../components/shared/my-facilities/projects/project-template/template-tasks/template-tasks.component';
import { TemplateSettingsComponent } from '../components/shared/my-facilities/projects/project-template/template-settings/template-settings.component';
import { TeamTemplateComponent } from '../components/shared/my-facilities/projects/projects-teams/team-template/team-template.component';
import { TasksListComponent } from '../components/shared/my-facilities/projects/tasks-list/tasks-list.component';
import { DocumentStoreComponent } from '../components/document-store/document-store.component';
import { OfflineComponent } from '../components/shared/my-facilities/projects/offline/offline.component';
import { RequestTypesComponent } from '../components/shared/my-facilities/projects/request-types/request-types.component';
import { RequestTemplatesComponent } from '../components/shared/my-facilities/projects/request-templates/request-templates.component';

// Accounting Components
import { AccountingDashboardComponent } from '../components/shared/my-facilities/accounting/accounting-dashboard/accounting-dashboard.component';
import { AlertRulesComponent } from '../components/shared/my-facilities/accounting/alert-rules/alert-rules.component';
import { AccountingWorkflowStatusComponent } from '../components/shared/my-facilities/accounting/accounting-dashboard/workflow-status/workflow-status.component';
import { JECountByStatusComponent } from '../components/shared/my-facilities/accounting/accounting-dashboard/je-count-by-status/je-count-by-status.component';
import { PeriodEventCountComponent } from '../components/shared/my-facilities/accounting/accounting-dashboard/period-event-count/period-event-count.component';
import { LeaseAlertsCardComponent } from '../components/shared/my-facilities/accounting/accounting-dashboard/lease-alerts/lease-alerts.component';
import { PeriodCloseComponent } from '../components/shared/my-facilities/accounting/period-close/period-close.component';
import { AmortizationProfilesComponent } from '../components/shared/my-facilities/accounting/amortization-profiles/amortization-profiles.component';
import { DiscountRateProfilesComponent } from '../components/shared/my-facilities/accounting/discount-rate-profiles/discount-rate-profiles.component';
import { JournalEntryProfilesComponent } from '../components/shared/my-facilities/accounting/journal-entry-profiles/journal-entry-profiles.component';
import { WorkflowStatusComponent } from '../components/shared/my-facilities/accounting/workflow-status/workflow-status.component';
import { AccountingProfilesHistoryComponent } from '../components/shared/my-facilities/accounting/accounting-profiles-history/accounting-profiles-history.component';
import { BulkWorkflowComponent } from '../components/shared/my-facilities/accounting/bulk-workflow/bulk-workflow.component';
import { JournalEntryApproveComponent } from '../components/shared/my-facilities/accounting/journal-entry-approve/journal-entry-approve.component';
import { JournalEntryExportComponent } from '../components/shared/my-facilities/accounting/journal-entry-export/journal-entry-export.component';
import { AccountingHealthComponent } from '../components/shared/my-facilities/accounting/accounting-health/accounting-health.component';
import { AccountingHealthGridComponent } from '../components/shared/my-facilities/accounting/accounting-health/accounting-health-grid/accounting-health-grid.component';
import { AccountingSchedulesComponent } from '../components/shared/my-facilities/accounting/accounting-schedules/accounting-schedules.component';
import { JournalEntryReverseComponent } from '../components/shared/my-facilities/accounting/journal-entry-reverse/journal-entry-reverse.component';
import { AmortizationProfileDetailComponent } from '../components/shared/my-facilities/accounting/amortization-profiles/amortization-profile-detail/amortization-profile-detail.component';
import { AmortizationProfileListComponent } from '../components/shared/my-facilities/accounting/amortization-profiles/amortization-profile-list/amortization-profile-list.component';
import { DiscountRateProfileDetailComponent } from '../components/shared/my-facilities/accounting/discount-rate-profiles/discount-rate-profile-detail/discount-rate-profile-detail.component';
import { DiscountRateProfileListComponent } from '../components/shared/my-facilities/accounting/discount-rate-profiles/discount-rate-profile-list/discount-rate-profile-list.component';
import { JournalEntryProfileDetailComponent } from '../components/shared/my-facilities/accounting/journal-entry-profiles/journal-entry-profile-detail/journal-entry-profile-detail.component';
import { JournalEntryProfileListComponent } from '../components/shared/my-facilities/accounting/journal-entry-profiles/journal-entry-profile-list/journal-entry-profile-list.component';
import { WorkflowStatusSettingsComponent } from '../components/shared/my-facilities/accounting/workflow-status/workflow-status-settings/workflow-status-settings.component';
import { WorkflowStatusDetailComponent } from '../components/shared/my-facilities/accounting/workflow-status/workflow-status-detail/workflow-status-detail.component';
import { AccountingSettingsComponent } from '../components/shared/my-facilities/accounting/accounting-settings/accounting-settings.component';

// Financials Components
import { FinancialsDashboardComponent } from '../components/shared/my-facilities/financials/financials-dashboard/financials-dashboard.component';
import { EnterBillComponent } from '../components/shared/my-facilities/financials/enter-bill/enter-bill.component';
import { ApApproveComponent } from '../components/shared/my-facilities/financials/ap-approve/ap-approve.component';
import { ApSubmitComponent } from '../components/shared/my-facilities/financials/ap-submit/ap-submit.component';
import { InvoiceApproveComponent } from '../components/shared/my-facilities/financials/invoice-approve/invoice-approve.component';
import { InvoiceGenerateComponent } from '../components/shared/my-facilities/financials/invoice-generate/invoice-generate.component';
import { ReceivePaymentComponent } from '../components/shared/my-facilities/financials/receive-payment/receive-payment.component';
import { EditPaymentComponent } from '../components/shared/my-facilities/financials/edit-payment/edit-payment.component';
import { ApExportComponent } from '../components/shared/my-facilities/financials/ap-export/ap-export.component';
import { InvoiceExportComponent } from '../components/shared/my-facilities/financials/invoice-export/invoice-export.component';
import { ProcessMtmComponent } from '../components/shared/my-facilities/financials/process-mtm/process-mtm.component';
import { ProcessPercentRentComponent } from '../components/shared/my-facilities/financials/process-percent-rent/process-percent-rent.component';
import { ProcessIndexChargeComponent } from '../components/shared/my-facilities/financials/process-index-charge/process-index-charge.component';
import { VendorCustomerMgmtComponent } from '../components/shared/my-facilities/financials/vendor-customer-mgmt/vendor-customer-mgmt.component';
import { ExportHistoryComponent } from '../components/shared/my-facilities/financials/export-history/export-history.component';
import { LedgerAccountsComponent } from '../components/shared/my-facilities/financials/ledger-accounts/ledger-accounts.component';
import { AllocationCentersComponent } from '../components/shared/my-facilities/financials/allocation-centers/allocation-centers.component';
import { InvoiceFormatsComponent } from '../components/shared/my-facilities/financials/invoice-formats/invoice-formats.component';
import { IndexesComponent } from '../components/shared/my-facilities/financials/indexes/indexes.component';
import { VariancesComponent } from '../components/shared/my-facilities/financials/variances/variances.component';
import { SalesTaxAuthoritiesComponent } from '../components/shared/my-facilities/financials/sales-tax-authorities/sales-tax-authorities.component';
import { AdamFilterComponent } from '../components/shared/my-facilities/financials/adam-filter/adam-filter.component';
import { PercentRentComponent } from '../components/shared/my-facilities/financials/percent-rent/percent-rent.component';
import { LeaseOptionClassificationsComponent } from '../components/shared/my-facilities/financials/lease-option-classifications/lease-option-classifications.component';
import { StraightlineDatesComponent } from '../components/shared/my-facilities/financials/straightline-dates/straightline-dates.component';
import { FourWallComponent } from '../components/shared/my-facilities/financials/four-wall/four-wall.component';

// Admin Components
import { DynamicFormsComponent } from '../components/shared/my-facilities/admin/dynamic-forms/dynamic-forms.component';
import { EtlComponent } from '../components/shared/my-facilities/admin/etl/etl.component';
import { IntegrationsComponent } from '../components/shared/my-facilities/admin/integrations/integrations.component';
import { ClientSetupComponent } from '../components/shared/my-facilities/admin/client-setup/client-setup.component';
import { DatasetsComponent } from '../components/shared/my-facilities/admin/datasets/datasets.component';
import { FormWidgetsComponent } from '../components/shared/my-facilities/admin/dynamic-forms/form-widgets/form-widgets.component';
import { FormMaintenanceComponent } from '../components/shared/my-facilities/admin/dynamic-forms/form-maintenance/form-maintenance.component';
import { FormItemMaintenanceComponent } from '../components/shared/my-facilities/admin/dynamic-forms/form-item-maintenance/form-item-maintenance.component';
import { FormSectionMaintenanceComponent } from '../components/shared/my-facilities/admin/dynamic-forms/form-section-maintenance/form-section-maintenance.component';
import { FormScriptAssociationsComponent } from '../components/shared/my-facilities/admin/dynamic-forms/form-script-associations/form-script-associations.component';
import { FormItemDetailsComponent } from '../components/shared/my-facilities/admin/dynamic-forms/form-item-details/form-item-details.component';
import { FormScriptsComponent } from '../components/shared/my-facilities/admin/dynamic-forms/form-scripts/form-scripts.component';
import { FormActionsComponent } from '../components/shared/my-facilities/admin/dynamic-forms/form-actions/form-actions.component';
import { FormSectionGroupsComponent } from '../components/shared/my-facilities/admin/dynamic-forms/form-section-groups/form-section-groups.component';
import { EtlImportsComponent } from '../components/shared/my-facilities/admin/etl/etl-imports/etl-imports.component';
import { EtlTemplatesComponent } from '../components/shared/my-facilities/admin/etl/etl-templates/etl-templates.component';
import { EtlLogComponent } from '../components/shared/my-facilities/admin/etl/etl-log/etl-log.component';
import { EtlQueueComponent } from '../components/shared/my-facilities/admin/etl/etl-queue/etl-queue.component';
import { DropdownMaintenanceComponent } from '../components/shared/my-facilities/admin/dynamic-forms/dropdown-maintenance/dropdown-maintenance.component';
import { DataFieldsComponent } from '../components/shared/my-facilities/admin/datasets/data-fields/data-fields.component';
import { DataGroupsComponent } from '../components/shared/my-facilities/admin/datasets/data-groups/data-groups.component';
import { ColumnGroupsComponent } from '../components/shared/my-facilities/admin/datasets/column-groups/column-groups.component';
import { ColumnFieldsComponent } from '../components/shared/my-facilities/admin/datasets/column-fields/column-fields.component';
import { DataSetsComponent } from '../components/shared/my-facilities/admin/datasets/data-sets/data-sets.component';
import { DataFieldAssociationsComponent } from '../components/shared/my-facilities/admin/datasets/data-field-associations/data-field-associations.component';
import { DataConnectorIntegrationsComponent } from '../components/shared/my-facilities/admin/integrations/data-connector-integrations/data-connector-integrations.component';
import { DataConnectorLogComponent } from '../components/shared/my-facilities/admin/integrations/data-connector-log/data-connector-log.component';
import { IntegrationListComponent } from '../components/shared/my-facilities/admin/integrations/data-connector-integrations/integration-list/integration-list.component';
import { IntegrationComponent } from '../components/shared/my-facilities/admin/integrations/data-connector-integrations/integration/integration.component';
import { EtlFormItemListComponent } from '../components/shared/my-facilities/admin/etl/etl-form-item-list/etl-form-item-list.component';
import { SecurityComponent } from '../components/shared/my-facilities/admin/security/security.component';
import { CostarAdminComponent } from '../components/shared/my-facilities/admin/costar-admin/costar-admin.component';
import { UserMaintenanceComponent } from '../components/shared/my-facilities/admin/security/user-maintenance/user-maintenance.component';
import { SecurityGroupMaintenanceComponent } from '../components/shared/my-facilities/admin/security/security-group-maintenance/security-group-maintenance.component';
import { SecurityProfilesComponent } from '../components/shared/my-facilities/admin/security/security-profiles/security-profiles.component';
import { AdditionalObjectRightsComponent } from '../components/shared/my-facilities/admin/security/additional-object-rights/additional-object-rights.component';
import { AddPortfolioComponent } from '../components/shared/my-facilities/admin/client-setup/add-portfolio/add-portfolio.component';
import { ReactivateObjectsComponent } from '../components/shared/my-facilities/admin/client-setup/reactivate-objects/reactivate-objects.component';
import { MovePortfolioObjectsComponent } from '../components/shared/my-facilities/admin/client-setup/move-portfolio-objects/move-portfolio-objects.component';
import { PortfolioHierarchyComponent } from '../components/shared/my-facilities/admin/portfolio-object/portfolio-hierarchy/portfolio-hierarchy.component';
import { ObjectMaintenanceComponent } from '../components/shared/my-facilities/admin/client-setup/object-maintenance/object-maintenance.component';
import { LeftNavAdminComponent } from '../components/shared/my-facilities/admin/client-setup/left-nav-admin/left-nav-admin.component';
import { LeftNavListComponent } from '../components/shared/my-facilities/admin/client-setup/left-nav-list/left-nav-list.component';
import { NavPagesComponent } from '../components/shared/my-facilities/admin/client-setup/nav-pages/nav-pages.component';
import { AdminDashboardsComponent } from '../components/shared/my-facilities/admin/client-setup/admin-dashboards/admin-dashboards.component';
import { AdminDashboardComponentsComponent } from '../components/shared/my-facilities/admin/client-setup/admin-dashboard-components/admin-dashboard-components.component';
import { AdminDashboardSectionsComponent } from '../components/shared/my-facilities/admin/client-setup/admin-dashboard-sections/admin-dashboard-sections.component';
import { UserDashboardAdminComponent } from '../components/shared/my-facilities/admin/client-setup/user-dashboard-admin/user-dashboard-admin.component';
import { QuicksearchComponent } from '../components/shared/my-facilities/admin/client-setup/quicksearch/quicksearch.component';
import { CostarLookupComponent } from '../components/shared/my-facilities/admin/client-setup/costar-lookup/costar-lookup.component';
import { ClientSiteSetupComponent } from '../components/shared/my-facilities/admin/client-setup/client-site-setup/client-site-setup.component';
import { ListPagesComponent } from '../components/shared/my-facilities/admin/client-setup/list-pages/list-pages.component';
import { MenuHeadingsComponent } from '../components/shared/my-facilities/admin/client-setup/menu-headings/menu-headings.component';
import { AdminReportsComponent } from '../components/shared/my-facilities/admin/admin-reports/admin-reports.component';
import { ObjectTypeTypesComponent } from '../components/shared/my-facilities/admin/costar-admin/object-type-types/object-type-types.component';
import { ObjectRelationshipsComponent } from '../components/shared/my-facilities/admin/costar-admin/object-relationships/object-relationships.component';
import { RelationshipTypesComponent } from '../components/shared/my-facilities/admin/costar-admin/relationship-types/relationship-types.component';
import { GenerateXmlComponent } from '../components/shared/my-facilities/admin/costar-admin/generate-xml/generate-xml.component';
import { UploadXmlComponent } from '../components/shared/my-facilities/admin/costar-admin/upload-xml/upload-xml.component';
import { MerchandiseCategoriesComponent } from '../components/shared/my-facilities/admin/costar-admin/merchandise-categories/merchandise-categories.component';
import { MerchandiseDepartmentsComponent } from '../components/shared/my-facilities/admin/costar-admin/merchandise-departments/merchandise-departments.component';
import { FileManagerComponent } from '../components/shared/my-facilities/admin/costar-admin/file-manager/file-manager.component';
import { FileCleanupComponent } from '../components/shared/my-facilities/admin/costar-admin/file-cleanup/file-cleanup.component';
import { DocumentTemplatesComponent } from '../components/shared/my-facilities/admin/costar-admin/document-templates/document-templates.component';
import { DocumentTemplateTypesComponent } from '../components/shared/my-facilities/admin/costar-admin/document-template-types/document-template-types.component';
import { TableMaintenanceComponent } from '../components/shared/my-facilities/admin/costar-admin/table-maintenance/table-maintenance.component';
import { MapConfigurationComponent } from '../components/shared/my-facilities/admin/costar-admin/map-configuration/map-configuration.component';
import { ReportCriteriaComponent } from '../components/shared/my-facilities/admin/admin-reports/report-criteria/report-criteria.component';

import { DataExtractComponent } from '../components/shared/my-facilities/admin/integrations/data-extract/data-extract.component';
import { BudgetCategoriesComponent } from '../components/shared/my-facilities/admin/client-setup/budget-categories/budget-categories.component';
import { CannedReportsComponent } from '../components/shared/my-facilities/admin/admin-reports/canned-reports/canned-reports.component';
import { DynamicFormComponent } from '../components/shared/my-facilities/admin/dynamic-forms/dynamic-form/dynamic-form.component';
import { DynamicFormListComponent } from '../components/shared/my-facilities/admin/dynamic-forms/dynamic-form-list/dynamic-form-list.component';

// Contacts Components
import { ContactsHomeComponent } from '../components/shared/my-facilities/contacts/contacts-home/contacts-home.component';
import { PeopleListComponent } from '../components/shared/my-facilities/contacts/people-list/people-list.component';
import { CompaniesListComponent } from '../components/shared/my-facilities/contacts/companies-list/companies-list.component';
import { CompanyComponent } from '../components/shared/my-facilities/contacts/company/company.component';
import { ContactComponent } from '../components/shared/my-facilities/contacts/contact/contact.component';
import { ContactDetailsComponent } from '../components/shared/my-facilities/contacts/contact/contact-details/contact-details.component';
import { ContactScheduledReportsComponent } from '../components/shared/my-facilities/contacts/contact/contact-scheduled-reports/contact-scheduled-reports.component';
import { ContactProxiesComponent } from '../components/shared/my-facilities/contacts/contact/contact-proxies/contact-proxies.component';
import { ContactPrivilegesComponent } from '../components/shared/my-facilities/contacts/contact/contact-privileges/contact-privileges.component';
import { CompanyDetailsComponent } from '../components/shared/my-facilities/contacts/company/company-details/company-details.component';

// Real Estate Portfolio Components
import { PropertyComponent } from '../components/shared/my-facilities/portfolio/property/property.component';
import { LeaseComponent } from '../components/shared/my-facilities/portfolio/lease/lease.component';
import { PortfolioHomeComponent } from '../components/shared/my-facilities/portfolio/portfolio-home/portfolio-home.component';
import { PortfolioDashboardComponent } from '../components/shared/my-facilities/portfolio/portfolio-dashboard/portfolio-dashboard.component';
import { PortfolioLeasesComponent } from '../components/shared/my-facilities/portfolio/portfolio-leases/portfolio-leases.component';
import { PortfolioPropertiesComponent } from '../components/shared/my-facilities/portfolio/portfolio-properties/portfolio-properties.component';
import { PortfolioBenchmarkingComponent } from '../components/shared/my-facilities/portfolio/portfolio-benchmarking/portfolio-benchmarking.component';

// Property Components
import { MyPropertyDetailsComponent } from '../components/shared/my-facilities/portfolio/property/my-property-details/my-property-details.component';
import { MyLeaseDetailsComponent } from '../components/shared/my-facilities/portfolio/property/my-lease-details/my-lease-details.component';

// Lease Components
import { LeaseAbstractComponent } from '../components/shared/my-facilities/portfolio/lease/lease-abstract/lease-abstract.component';
import { LeaseFinancialsComponent } from '../components/shared/my-facilities/portfolio/lease/lease-financials/lease-financials.component';
import { LeaseAccountingComponent } from '../components/shared/my-facilities/portfolio/lease/lease-accounting-home/lease-accounting/lease-accounting.component';
import { LeaseVerificationComponent } from '../components/shared/my-facilities/portfolio/lease/lease-verification/lease-verification.component';
import { LeaseOperatingExpensesComponent } from '../components/shared/my-facilities/portfolio/lease/lease-operating-expenses/lease-operating-expenses.component';
import { SubleasesComponent } from '../components/shared/my-facilities/portfolio/lease/subleases/subleases.component';
import { LeaseConstructionAllowancesComponent } from '../components/shared/my-facilities/portfolio/lease/lease-construction-allowances/lease-construction-allowances.component';
import { AdamComponent } from '../components/shared/my-facilities/portfolio/lease/adam/adam.component';
import { MetricsComponent } from '../components/shared/my-facilities/portfolio/lease/metrics/metrics.component';

// Lease Financials Components
import { ExpenseRevenueComponent } from '../components/expense-revenue/expense-revenue.component';
import { AllocationsComponent } from '../components/shared/my-facilities/portfolio/lease/lease-financials/allocations/allocations.component';
import { IndexAdjustmentsComponent } from '../components/shared/my-facilities/portfolio/lease/lease-financials/index-adjustments/index-adjustments.component';
import { MtmComponent } from '../components/shared/my-facilities/portfolio/lease/lease-financials/mtm/mtm.component';
import { LeaseFinancialSettingsComponent } from '../components/shared/my-facilities/portfolio/lease/lease-financials/lease-financial-settings/lease-financial-settings.component';
import { EditExpenseComponent } from '../components/shared/my-facilities/portfolio/lease/lease-financials/edit-expense/edit-expense.component';
import { EditRevenueComponent } from '../components/shared/my-facilities/portfolio/lease/lease-financials/edit-revenue/edit-revenue.component';
import { LeaseAccountingHomeComponent } from '../components/shared/my-facilities/portfolio/lease/lease-accounting-home/lease-accounting-home.component';
import { AccountingScheduleComponent } from '../components/shared/my-facilities/portfolio/lease/lease-accounting-home/lease-accounting/accounting-schedule/accounting-schedule.component';
import { AmortizationComponent } from '../components/shared/my-facilities/portfolio/lease/lease-accounting-home/lease-accounting/accounting-schedule/amortization/amortization.component';
import { EditScheduleComponent } from '../components/shared/my-facilities/portfolio/lease/lease-accounting-home/edit-schedule/edit-schedule.component';
import { AccountingYearComponent } from '../components/shared/my-facilities/accounting/period-close/accounting-year/accounting-year.component';
import { AccountingPeriodComponent } from '../components/shared/my-facilities/accounting/period-close/accounting-year/accounting-period/accounting-period.component';
import { BlacklineComponent } from '../components/shared/my-facilities/accounting/blackline/blackline.component';

import { JournalEntryAccountsCardComponent } from '../components/journal-entry-accounts-card/journal-entry-accounts-card.component';
import { AmortizationProfileAccountsCardComponent } from '../components/amortization-profile-accounts-card/amortization-profile-accounts-card.component';
import { PortfoliosComponent } from '../components/shared/my-facilities/admin/portfolios/portfolios.component';
import { PortfolioObjectComponent } from '../components/shared/my-facilities/admin/portfolio-object/portfolio-object.component';
import { AdminHomeComponent } from '../components/shared/my-facilities/admin/admin-home/admin-home.component';
import { PortfolioPreferencesComponent } from '../components/shared/my-facilities/admin/portfolio-object/portfolio-preferences/portfolio-preferences.component';
import { PortfolioSecurityComponent } from '../components/shared/my-facilities/admin/portfolio-object/portfolio-security/portfolio-security.component';
import { PortfolioTemplatesComponent } from '../components/shared/my-facilities/admin/portfolio-object/portfolio-templates/portfolio-templates.component';
import { PortfolioCurrenciesComponent } from '../components/shared/my-facilities/admin/portfolio-object/portfolio-currencies/portfolio-currencies.component';

// Dialog Components
import { EditTemplateDialogComponent } from '../components/edit-template-dialog/edit-template-dialog.component';
import { EditLeftNavDialogComponent } from '../components/edit-left-nav-dialog/edit-left-nav-dialog.component';
import { EditFormSectionDialogComponent } from '../components/edit-form-section-dialog/edit-form-section-dialog.component';
import { EditFormFieldDialogComponent } from '../components/edit-form-field-dialog/edit-form-field-dialog.component';

import { FormSectionComponent } from '../components/form-section/form-section.component';
import { FormFieldComponent } from '../components/form-field/form-field.component';

// My Assets Components
import { AssetsSummaryComponent } from '../components/shared/my-assets/assets-summary/assets-summary.component';
import { AssetsChartsComponent } from '../components/shared/my-assets/assets-charts/assets-charts.component';
import { AssetsAlertsComponent } from '../components/shared/my-assets/assets-alerts/assets-alerts.component';
import { AssetsMarketingComponent } from '../components/shared/my-assets/assets-marketing/assets-marketing.component';
import { AssetsLeasingComponent } from '../components/shared/my-assets/assets-leasing/assets-leasing.component';
import { AssetsValuationComponent } from '../components/shared/my-assets/assets-valuation/assets-valuation.component';
import { AssetsMarketsComponent } from '../components/shared/my-assets/assets-markets/assets-markets.component';
import { AssetsPropertiesComponent } from '../components/shared/my-assets/assets-properties/assets-properties.component';
import { AssetsSalesComponent } from '../components/shared/my-assets/assets-sales/assets-sales.component';
import { AssetsTenantsComponent } from '../components/shared/my-assets/assets-tenants/assets-tenants.component';
import { AssetsContactsComponent } from '../components/shared/my-assets/assets-contacts/assets-contacts.component';
import { AssetsMapsComponent } from '../components/shared/my-assets/assets-maps/assets-maps.component';
import { AssetsNewsComponent } from '../components/shared/my-assets/assets-news/assets-news.component';

import { AssetsMarketingHomeComponent } from '../components/shared/my-assets/assets-marketing/assets-marketing-home/assets-marketing-home.component';
import { AssetsMarketingCenterComponent } from '../components/shared/my-assets/assets-marketing/assets-marketing-home/assets-marketing-center/assets-marketing-center.component';
import { AssetsMarketingImpressionsComponent } from '../components/shared/my-assets/assets-marketing/assets-marketing-home/assets-marketing-impressions/assets-marketing-impressions.component';
import { AssetsMarketingDetailViewsComponent } from '../components/shared/my-assets/assets-marketing/assets-marketing-home/assets-marketing-detail-views/assets-marketing-detail-views.component';
import { AssetsMarketingDurationComponent } from '../components/shared/my-assets/assets-marketing/assets-marketing-home/assets-marketing-duration/assets-marketing-duration.component';
import { AssetComponent } from '../components/shared/my-assets/asset/asset.component';
import { AssetMarketingPerformanceComponent } from '../components/shared/my-assets/asset-marketing-performance/asset-marketing-performance.component';
import { AssetMarketingListingComponent } from '../components/shared/my-assets/asset-marketing-listing/asset-marketing-listing.component';
import { AssetMarketingCdxComponent } from '../components/shared/my-assets/asset-marketing-cdx/asset-marketing-cdx.component';
import { AssetMarketingLeadsComponent } from '../components/shared/my-assets/asset-marketing-leads/asset-marketing-leads.component';
import { AssetDealsComponent } from '../components/shared/my-assets/asset-deals/asset-deals.component';

// My Deals Components
import { MyDealsListComponent } from '../components/shared/my-deals/my-deals-list/my-deals-list.component';
import { MyDealsDashboardComponent } from '../components/shared/my-deals/my-deals-dashboard/my-deals-dashboard.component';
import { MyDealsBoardComponent } from '../components/shared/my-deals/my-deals-board/my-deals-board.component';
import { MyDealsDealComponent } from '../components/shared/my-deals/my-deals-deal/my-deals-deal.component';

// Properties Components
import { PropertiesMapComponent } from '../components/shared/properties/properties-map/properties-map.component';
import { PropertiesListComponent } from '../components/shared/properties/properties-list/properties-list.component';
import { PropertiesSpacesComponent } from '../components/shared/properties/properties-spaces/properties-spaces.component';
import { PropertiesLeaseCompsComponent } from '../components/shared/properties/properties-lease-comps/properties-lease-comps.component';
import { PropertiesSaleCompsComponent } from '../components/shared/properties/properties-sale-comps/properties-sale-comps.component';
import { PropertiesOwnersComponent } from '../components/shared/properties/properties-owners/properties-owners.component';
import { PropertiesDemographicsComponent } from '../components/shared/properties/properties-demographics/properties-demographics.component';
import { PropertiesChangesComponent } from '../components/shared/properties/properties-changes/properties-changes.component';
import { PropertiesAnalyticsComponent } from '../components/shared/properties/properties-analytics/properties-analytics.component';
import { PropertiesNewsComponent } from '../components/shared/properties/properties-news/properties-news.component';
import { PropertiesDataComponent } from '../components/shared/properties/properties-data/properties-data.component';
import { PropertiesSurveysComponent } from '../components/shared/properties/properties-surveys/properties-surveys.component';

// Reports Components
import { ReportsHomeComponent } from '../components/shared/my-facilities/reports/reports-home/reports-home.component';
import { PortfolioReportsComponent } from '../components/shared/my-facilities/reports/portfolio-reports/portfolio-reports.component';
import { FinancialsReportsComponent } from '../components/shared/my-facilities/reports/financials-reports/financials-reports.component';
import { AccountingReportsComponent } from '../components/shared/my-facilities/reports/accounting-reports/accounting-reports.component';
import { ProjectReportsComponent } from '../components/shared/my-facilities/reports/project-reports/project-reports.component';
import { ContactReportsComponent } from '../components/shared/my-facilities/reports/contact-reports/contact-reports.component';
import { SystemReportsComponent } from '../components/shared/my-facilities/reports/system-reports/system-reports.component';
import { AdHocReportComponent } from '../components/shared/my-facilities/reports/ad-hoc-report/ad-hoc-report.component';

import { ObjectCommentsComponent } from '../components/object-comments/object-comments.component';
import { ObjectFilesComponent } from '../components/object-files/object-files.component';
import { ObjectHistoryComponent } from '../components/object-history/object-history.component';
import { ObjectRemindersComponent } from '../components/object-reminders/object-reminders.component';
import { ObjectTypeTemplatesComponent } from '../components/object-type-templates/object-type-templates.component';

import { PortfolioMenuComponent } from '../components/portfolio-menu/portfolio-menu.component';
import { DashboardHeroCardComponent } from '../components/dashboard-hero-card/dashboard-hero-card.component';

import { CostarSummaryComponent } from '../components/costar-summary/costar-summary.component';
import { CostarLeaseComponent } from '../components/costar-lease/costar-lease.component';
import { CostarTenantComponent } from '../components/costar-tenant/costar-tenant.component';
import { CostarDemographicsComponent } from '../components/costar-demographics/costar-demographics.component';
import { CostarImagesComponent } from '../components/costar-images/costar-images.component';
import { CostarPeersComponent } from '../components/costar-peers/costar-peers.component';
import { CostarAnalyticsComponent } from '../components/costar-analytics/costar-analytics.component';
import { CostarContactsComponent } from '../components/costar-contacts/costar-contacts.component';

import { DealsHomeComponent } from '../components/shared/my-facilities/deals/deals-home/deals-home.component';
import { DealsDashboardComponent } from '../components/shared/my-facilities/deals/deals-dashboard/deals-dashboard.component';
import { DealsListComponent } from '../components/shared/my-facilities/deals/deals-list/deals-list.component';
import { DealComponent } from '../components/shared/my-facilities/deals/deal/deal.component';

import { MyImagesComponent } from '../components/shared/my-facilities/portfolio/property/my-images/my-images.component';
import { MyFloorplanComponent } from '../components/shared/my-facilities/portfolio/property/my-floorplan/my-floorplan.component';
import { PortfolioStrategyComponent } from '../components/shared/my-facilities/portfolio/portfolio-strategy/portfolio-strategy.component';

import { ListPageComponent } from '../components/list-page/list-page.component';
import { ListPageQueryChooserComponent } from '../components/list-page-query-chooser/list-page-query-chooser.component';
import { ListViewSharingDialogComponent } from '../components/list-view-sharing-dialog/list-view-sharing-dialog.component';

import { ActivityFeedComponent } from '../components/activity-feed/activity-feed.component';
import { MilestoneChartComponent } from '../components/milestone-chart/milestone-chart.component';
import { RemeasurementsComponent } from '../components/shared/my-facilities/accounting/remeasurements/remeasurements.component';
import { BulkRemeasureListComponent } from '../components/shared/my-facilities/accounting/remeasurements/bulk-remeasure-list/bulk-remeasure-list.component';
import { RemeasureComponent } from '../components/shared/my-facilities/accounting/remeasurements/remeasure/remeasure.component';
import { MeasureEventSettingsComponent } from '../components/measure-event-settings/measure-event-settings.component';
import { BadgeComponent } from '../components/badge/badge.component';
import { ChipComponent } from '../components/chip/chip.component';

import { ClassificationTestDialogComponent } from '../components/classification-test-dialog/classification-test-dialog.component';
import { FormScheduleComponent } from '../components/form-schedule/form-schedule.component';
import { ViewHistoryDialogComponent } from '../components/view-history-dialog/view-history-dialog.component';
import { FormFieldTooltipComponent } from '../components/form-field-tooltip/form-field-tooltip.component';
import { DocSecPageComponent } from '../components/doc-sec-page/doc-sec-page.component';
import { TasksDueSoonCardComponent } from '../components/tasks-due-soon-card/tasks-due-soon-card.component';
import { NewProjectsCardComponent } from '../components/new-projects-card/new-projects-card.component';
import { NewTasksCardComponent } from '../components/new-tasks-card/new-tasks-card.component';
import { OverdueProjectsCardComponent } from '../components/overdue-projects-card/overdue-projects-card.component';
import { MyReportsCardComponent } from '../components/my-reports-card/my-reports-card.component';
import { OverdueTasksCardComponent } from '../components/overdue-tasks-card/overdue-tasks-card.component';
import { ProjectMilestonesCardComponent } from '../components/project-milestones-card/project-milestones-card.component';
import { ProjectTimelinesCardComponent } from '../components/project-timelines-card/project-timelines-card.component';
import { ActivityFeedCardComponent } from '../components/activity-feed-card/activity-feed-card.component';
import { TasksDueThisWeekCardComponent } from '../components/tasks-due-this-week-card/tasks-due-this-week-card.component';
import { ProjectsByTypeCardComponent } from '../components/projects-by-type-card/projects-by-type-card.component';
import { UpcomingExpirationsCardComponent } from '../components/upcoming-expirations-card/upcoming-expirations-card.component';
import { QuarterlyExpirationsCardComponent } from '../components/quarterly-expirations-card/quarterly-expirations-card.component';
import { AnnualExpirationRentCardComponent } from '../components/annual-expiration-rent-card/annual-expiration-rent-card.component';
import { UtilizationCardComponent } from '../components/utilization-card/utilization-card.component';
import { RentPsfCardComponent } from '../components/rent-psf-card/rent-psf-card.component';
import { SfPerSeatCardComponent } from '../components/sf-per-seat-card/sf-per-seat-card.component';

import { CostarAlertComponent } from '../components/costar-alert/costar-alert.component';
import { PortfolioSuppliersComponent } from '../components/shared/my-facilities/portfolio/portfolio-suppliers/portfolio-suppliers.component';
import { PortfolioEquipmentComponent } from '../components/shared/my-facilities/portfolio/portfolio-equipment/portfolio-equipment.component';
import { EquipmentLeaseComponent } from '../components/shared/my-facilities/portfolio/equipment-lease/equipment-lease.component';
import { SupplierComponent } from '../components/shared/my-facilities/portfolio/supplier/supplier.component';

import { ClauseBankComponent } from '../components/clause-bank/clause-bank.component';
import { IntegrationFilterComponent } from '../components/integration-filter/integration-filter.component';
import { ObjectDrawerDialogComponent } from '../components/object-drawer-dialog/object-drawer-dialog.component';
import { CriticalDatesCardComponent } from '../components/critical-dates-card/critical-dates-card.component';
import { PivotComponent } from '../components/shared/my-facilities/financials/pivot/pivot.component';
import { LeaseChargesComponent } from '../components/shared/my-facilities/portfolio/lease/lease-financials/lease-charges/lease-charges.component';
import { FinancialChargesComponent } from '../components/shared/my-facilities/financials/financial-charges/financial-charges.component';
import { NewLeasesCardComponent } from '../components/new-leases-card/new-leases-card.component';
import { TaskDialogComponent } from '../components/task-dialog/task-dialog.component';

import { CostarDropdownComponent } from '../components/costar-dropdown/costar-dropdown.component';
import { CostarSearchComponent } from '../components/costar-search/costar-search.component';
import { HierarchyDropdownComponent } from '../components/hierarchy-dropdown/hierarchy-dropdown.component';
import { TaskApprovalComponent } from '../components/task-approval/task-approval.component';
import { CostarPopupComponent } from '../components/costar-popup/costar-popup.component';
import { PopupContentComponent } from '../components/costar-popup/popup-content/popup-content.component';
import { PopupFooterComponent } from '../components/costar-popup/popup-footer/popup-footer.component';
import { PopupFooterLeftComponent } from '../components/costar-popup/popup-footer/popup-footer-left/popup-footer-left.component';
import { PopupFooterRightComponent } from '../components/costar-popup/popup-footer/popup-footer-right/popup-footer-right.component';
import { LastNoteDialogComponent } from '../components/last-note-dialog/last-note-dialog.component';
import { PopupControlsComponent } from '../components/costar-popup/popup-controls/popup-controls.component';
import { PopupControlsRightComponent } from '../components/costar-popup/popup-controls/popup-controls-right/popup-controls-right.component';
import { PopupControlsLeftComponent } from '../components/costar-popup/popup-controls/popup-controls-left/popup-controls-left.component';
import { ChartSandboxComponent } from '../components/shared/my-facilities/chart-sandbox/chart-sandbox.component';
import { CostarToolbarComponent } from '../components/costar-toolbar/costar-toolbar.component';
import { ListViewDeleteDialogComponent } from '../components/list-view-delete-dialog/list-view-delete-dialog.component';

import { InsightsComponent } from '../components/shared/my-facilities/admin/insights/insights.component';
import { RealEstateCountsInsightsComponent } from '../components/shared/my-facilities/admin/insights/real-estate-counts-insights/real-estate-counts-insights.component';
import { NonRealEstateCountsInsightsComponent } from '../components/shared/my-facilities/admin/insights/non-real-estate-counts-insights/non-real-estate-counts-insights.component';
import { RealEstateFinanceApCardComponent } from '../components/shared/my-facilities/admin/insights/real-estate-finance-ap-card/real-estate-finance-ap-card.component';
import { RealEstateFinanceArCardComponent } from '../components/shared/my-facilities/admin/insights/real-estate-finance-ar-card/real-estate-finance-ar-card.component';
import { NonRealEstateFinanceApCardComponent } from '../components/shared/my-facilities/admin/insights/non-real-estate-finance-ap-card/non-real-estate-finance-ap-card.component';
import { NonRealEstateFinanceArCardComponent } from '../components/shared/my-facilities/admin/insights/non-real-estate-finance-ar-card/non-real-estate-finance-ar-card.component';
import { RealEstateFinanceApChartCardComponent } from '../components/shared/my-facilities/admin/insights/real-estate-finance-ap-chart-card/real-estate-finance-ap-chart-card.component';
import { RealEstateFinanceArChartCardComponent } from '../components/shared/my-facilities/admin/insights/real-estate-finance-ar-chart-card/real-estate-finance-ar-chart-card.component';
import { NonRealEstateFinanceApChartCardComponent } from '../components/shared/my-facilities/admin/insights/non-real-estate-finance-ap-chart-card/non-real-estate-finance-ap-chart-card.component';
import { NonRealEstateFinanceArChartCardComponent } from '../components/shared/my-facilities/admin/insights/non-real-estate-finance-ar-chart-card/non-real-estate-finance-ar-chart-card.component';
import { RealEstateAccountingCardComponent } from '../components/shared/my-facilities/admin/insights/real-estate-accounting-card/real-estate-accounting-card.component';
import { NonRealEstateAccountingCardComponent } from '../components/shared/my-facilities/admin/insights/non-real-estate-accounting-card/non-real-estate-accounting-card.component';
import { AccountingBalanceChartCardComponent } from '../components/shared/my-facilities/admin/insights/accounting-balance-chart-card/accounting-balance-chart-card.component';
import { AccountingEventChartCardComponent } from '../components/shared/my-facilities/admin/insights/accounting-event-chart-card/accounting-event-chart-card.component';
import { ActiveUsersCardComponent } from '../components/shared/my-facilities/admin/insights/active-users-card/active-users-card.component';
import { CustomerSupportCardComponent } from '../components/shared/my-facilities/admin/insights/customer-support-card/customer-support-card.component';

import { FileUsageChartCardComponent } from '../components/shared/my-facilities/admin/insights/file-usage-chart-card/file-usage-chart-card.component';
import { GroupAndUserBlockedAdminLinksComponent } from '../components/shared/my-facilities/reports/system-reports/group-and-user-blocked-admin-links/group-and-user-blocked-admin-links.component';
import { GroupAndUserRightsHistoryComponent } from '../components/shared/my-facilities/reports/system-reports/group-and-user-rights-history/group-and-user-rights-history.component';
import { GroupAndUserModuleRightsComponent } from '../components/shared/my-facilities/reports/system-reports/group-and-user-module-rights/group-and-user-module-rights.component';
import { ExchangeRateSetsComponent } from '../components/shared/my-facilities/reports/system-reports/exchange-rate-sets/exchange-rate-sets.component';
import { GroupAndUserNavigationRightsComponent } from '../components/shared/my-facilities/reports/system-reports/group-and-user-navigation-rights/group-and-user-navigation-rights.component';

import { RecentDealActivityCardComponent } from '../components/recent-deal-activity-card/recent-deal-activity-card.component';
import { DealActionRequiredCardComponent } from '../components/deal-action-required-card/deal-action-required-card.component';
import { ClosedDealsCardComponent } from '../components/closed-deals-card/closed-deals-card.component';
import { DealCountByMarketCardComponent } from '../components/deal-count-by-market-card/deal-count-by-market-card.component';
import { DealCountByBrokerCardComponent } from '../components/deal-count-by-broker-card/deal-count-by-broker-card.component';
import { DealCountChartCardComponent } from '../components/deal-count-chart-card/deal-count-chart-card.component';
import { AddDealDialogComponent } from '../components/add-deal-dialog/add-deal-dialog.component';
import { UnverifiedLeasesCardComponent } from '../components/unverified-leases-card/unverified-leases-card.component';
import { LeaseVerificationDetailGridComponent } from '../components/unverified-leases-card/lease-verification-detail-grid/lease-verification-detail-grid.component';
import { OwnershipTypeCardComponent } from '../components/ownership-type-card/ownership-type-card.component';
import { BuildingTypeCardComponent } from '../components/building-type-card/building-type-card.component';
import { StoreFormatCardComponent } from '../components/store-format-card/store-format-card.component';
import { LeaseCountByHierarchyCardComponent } from '../components/lease-count-by-hierarchy-card/lease-count-by-hierarchy-card.component';
import { ProjectTaskPopoverComponent } from '../components/project-task-popover/project-task-popover.component';
import { ProjectPopoverComponent } from '../components/project-popover/project-popover.component';
import { HierarchyMaintenanceComponent } from '../components/shared/my-facilities/admin/security/hierarchy-maintenance/hierarchy-maintenance.component';
import { TaskComponent } from '../components/shared/my-facilities/projects/project/project-tasks/task/task.component';
import { QuickApprovalComponent } from '../components/shared/my-facilities/projects/project/project-tasks/quick-approval/quick-approval.component';
import { TasksSettingsComponent } from '../components/shared/my-facilities/projects/project/project-tasks/tasks-settings/tasks-settings.component';
import { ExpiringLeasesOptionsGridComponent } from '../components/upcoming-expirations-card/expiring-leases-options-grid/expiring-leases-options-grid.component';
import { ArchivedLeasesCardComponent } from '../components/archived-leases-card/archived-leases-card.component';
import { CremHomeComponent } from '../components/shared/my-facilities/sandbox/crem-home/crem-home.component';
import { CremPortfolioComponent } from '../components/shared/my-facilities/sandbox/crem-portfolio/crem-portfolio.component';
import { CremProjectsComponent } from '../components/shared/my-facilities/sandbox/crem-projects/crem-projects.component';
import { MiscComponent } from '../components/shared/my-facilities/sandbox/misc/misc.component';
import { PasswordSettingsComponent } from '../components/shared/my-facilities/admin/security/password-settings/password-settings.component';
import { FinancialsLinksCardComponent } from '../components/financials-links-card/financials-links-card.component';
import { BuildingStateCardComponent } from '../components/building-state-card/building-state-card.component';
import { ProjectActivityComponent } from '../components/shared/my-facilities/projects/project/project-activity/project-activity.component';
import { ActivityItemComponent } from '../components/activity-item/activity-item.component';
import { ProjectsBoardComponent } from '../components/shared/my-facilities/projects/projects-board/projects-board.component';
import { ProjectKanbanCardComponent } from '../components/project-kanban-card/project-kanban-card.component';
import { ActivityChannelComponent } from '../components/activity-channel/activity-channel.component';
import { ProjectsSettingsComponent } from '../components/shared/my-facilities/projects/projects-settings/projects-settings.component';
import { ProjectTypeDialogComponent } from '../components/project-type-dialog/project-type-dialog.component';
import { ProjectTypeComponent } from '../components/shared/my-facilities/projects/projects-settings/project-type/project-type.component';
import { KanbanTasksTemplateComponent } from '../components/kanban-tasks-template/kanban-tasks-template.component';
import { TaskKanbanCardComponent } from '../components/task-kanban-card/task-kanban-card.component';
import { TemplateTaskDialogComponent } from '../components/template-task-dialog/template-task-dialog.component';
import { TaskTemplateCardComponent } from '../components/task-template-card/task-template-card.component';
import { ProjectFilesPopoverComponent } from '../components/project-files-popover/project-files-popover.component';
import { SegmentChooserComponent } from '../components/segment-chooser/segment-chooser.component';
import { SegmentBuilderComponent } from '../components/segment-builder/segment-builder.component';
import { SegmentAdminComponent } from '../components/segment-admin/segment-admin.component';
import { ListViewChooserComponent } from '../components/list-view-chooser/list-view-chooser.component';
import { ProjectAddComponent } from '../components/shared/my-facilities/projects/project-add/project-add.component';
import { ReportsListComponent } from '../components/shared/my-facilities/reports/reports-list/reports-list.component';
import { DistributionListsComponent } from '../components/shared/my-facilities/reports/distribution-lists/distribution-lists.component';
import { ReportSchedulesComponent } from '../components/shared/my-facilities/reports/report-schedules/report-schedules.component';
import { TagComponent } from '../components/tag/tag.component';
import { TagDropdownComponent } from '../components/tag-dropdown/tag-dropdown.component';
import { ManageTagsDialogComponent } from '../components/shared/my-facilities/reports/manage-tags-dialog/manage-tags-dialog.component';
import { UploadOfflineDialogComponent } from '../components/shared/my-facilities/reports/upload-offline-dialog/upload-offline-dialog.component';
import { AssignTagsDialogComponent } from '../components/shared/my-facilities/reports/assign-tags-dialog/assign-tags-dialog.component';
import { ShareReportDialogComponent } from '../components/shared/my-facilities/reports/share-report-dialog/share-report-dialog.component';
import { DeleteReportDialogComponent } from '../components/shared/my-facilities/reports/delete-report-dialog/delete-report-dialog.component';
import { ProfessionalsComponent } from '../components/shared/professionals/professionals.component';
import { PublicRecordComponent } from '../components/shared/public-record/public-record.component';
import { MarketingCenterComponent } from '../components/shared/marketing-center/marketing-center.component';
import { EnterpriseComponent } from '../components/shared/enterprise/enterprise.component';
import { PropertyStrategyThreeComponent } from '../components/shared/my-facilities/portfolio/property/property-strategy-three/property-strategy-three.component';

// Strategy
import { StrategyDashboardComponent } from '../components/shared/my-facilities/strategy/dashboard/dashboard.component';
import { StrategyGlobalCardComponent } from '../components/strategy/global-card/global-card.component';
import { StrategyUpcomingCardComponent } from '../components/strategy/upcoming-card/upcoming-card.component';
import { StrategyMarketVarianceCardComponent } from '../components/strategy/market-variance-card/market-variance-card.component';
import { StrategyOlderThanCardComponent } from '../components/strategy/older-than-card/older-than-card.component';

// Sustainability
import { PropertySustainabilityComponent } from '../components/shared/my-facilities/portfolio/property/sustainability/sustainability.component';

@NgModule({
    declarations: [
        CostarDropdownComponent,
        NewsComponent,
        MyAssetsComponent,
        MyDealsComponent,
        MyLoansComponent,
        MyFacilitiesComponent,
        PropertiesComponent,
        LeasingComponent,
        SalesComponent,
        CompaniesComponent,
        MarketsComponent,
        ProjectsComponent,
        FinancialsComponent,
        AccountingComponent,
        ContactsComponent,
        ReportsComponent,
        AdminComponent,
        AccountingDashboardComponent,
        AlertRulesComponent,
        AccountingWorkflowStatusComponent,
        JECountByStatusComponent,
        PeriodEventCountComponent,
        LeaseAlertsCardComponent,
        PeriodCloseComponent,
        AmortizationProfilesComponent,
        DiscountRateProfilesComponent,
        JournalEntryProfilesComponent,
        WorkflowStatusComponent,
        AccountingProfilesHistoryComponent,
        BulkWorkflowComponent,
        JournalEntryApproveComponent,
        JournalEntryExportComponent,
        AccountingHealthComponent,
        AccountingHealthGridComponent,
        AccountingSchedulesComponent,
        JournalEntryReverseComponent,
        AmortizationProfileDetailComponent,
        AmortizationProfileListComponent,
        DiscountRateProfileDetailComponent,
        DiscountRateProfileListComponent,
        JournalEntryProfileDetailComponent,
        JournalEntryProfileListComponent,
        WorkflowStatusSettingsComponent,
        WorkflowStatusDetailComponent,
        FinancialsDashboardComponent,
        EnterBillComponent,
        ApApproveComponent,
        ApSubmitComponent,
        InvoiceApproveComponent,
        InvoiceGenerateComponent,
        ReceivePaymentComponent,
        EditPaymentComponent,
        ApExportComponent,
        InvoiceExportComponent,
        ProcessMtmComponent,
        ProcessPercentRentComponent,
        ProcessIndexChargeComponent,
        VendorCustomerMgmtComponent,
        ExportHistoryComponent,
        LedgerAccountsComponent,
        AllocationCentersComponent,
        InvoiceFormatsComponent,
        IndexesComponent,
        VariancesComponent,
        SalesTaxAuthoritiesComponent,
        AdamFilterComponent,
        PercentRentComponent,
        LeaseOptionClassificationsComponent,
        StraightlineDatesComponent,
        FourWallComponent,
        DynamicFormsComponent,
        EtlComponent,
        IntegrationsComponent,
        ClientSetupComponent,
        DatasetsComponent,
        FormWidgetsComponent,
        FormMaintenanceComponent,
        FormItemMaintenanceComponent,
        FormSectionMaintenanceComponent,
        FormScriptAssociationsComponent,
        FormItemDetailsComponent,
        FormScriptsComponent,
        FormActionsComponent,
        FormSectionGroupsComponent,
        EtlImportsComponent,
        EtlTemplatesComponent,
        EtlLogComponent,
        EtlQueueComponent,
        DropdownMaintenanceComponent,
        DataFieldsComponent,
        DataGroupsComponent,
        ColumnGroupsComponent,
        ColumnFieldsComponent,
        DataSetsComponent,
        DataFieldAssociationsComponent,
        DataConnectorIntegrationsComponent,
        DataConnectorLogComponent,
        IntegrationListComponent,
        IntegrationComponent,
        EtlFormItemListComponent,
        SecurityComponent,
        CostarAdminComponent,
        UserMaintenanceComponent,
        SecurityGroupMaintenanceComponent,
        SecurityProfilesComponent,
        AdditionalObjectRightsComponent,
        AddPortfolioComponent,
        ReactivateObjectsComponent,
        MovePortfolioObjectsComponent,
        PortfolioHierarchyComponent,
        ObjectMaintenanceComponent,
        LeftNavAdminComponent,
        LeftNavListComponent,
        NavPagesComponent,
        AdminDashboardsComponent,
        AdminDashboardComponentsComponent,
        AdminDashboardSectionsComponent,
        UserDashboardAdminComponent,
        QuicksearchComponent,
        CostarLookupComponent,
        ClientSiteSetupComponent,
        ListPagesComponent,
        MenuHeadingsComponent,
        AdminReportsComponent,
        ObjectTypeTypesComponent,
        ObjectRelationshipsComponent,
        RelationshipTypesComponent,
        GenerateXmlComponent,
        UploadXmlComponent,
        MerchandiseCategoriesComponent,
        MerchandiseDepartmentsComponent,
        FileManagerComponent,
        FileCleanupComponent,
        DocumentTemplatesComponent,
        DocumentTemplateTypesComponent,
        TableMaintenanceComponent,
        MapConfigurationComponent,
        CannedReportsComponent,
        ReportCriteriaComponent,
        ReportSchedulesComponent,
        DataExtractComponent,
        BudgetCategoriesComponent,
        PropertyComponent,
        LeaseComponent,
        MyPropertyDetailsComponent,
        MyLeaseDetailsComponent,
        CostarSummaryComponent,
        CostarLeaseComponent,
        CostarTenantComponent,
        CostarDemographicsComponent,
        CostarImagesComponent,
        LeaseAbstractComponent,
        LeaseFinancialsComponent,
        LeaseAccountingComponent,
        LeaseVerificationComponent,
        LeaseOperatingExpensesComponent,
        SubleasesComponent,
        LeaseConstructionAllowancesComponent,
        AdamComponent,
        MetricsComponent,
        ExpenseRevenueComponent,
        AllocationsComponent,
        IndexAdjustmentsComponent,
        MtmComponent,
        LeaseFinancialSettingsComponent,
        EditExpenseComponent,
        EditRevenueComponent,
        AccountingScheduleComponent,
        EditScheduleComponent,
        AccountingPeriodComponent,
        AccountingYearComponent,
        BlacklineComponent,
        JournalEntryAccountsCardComponent,
        AmortizationProfileAccountsCardComponent,
        PortfoliosComponent,
        PortfolioObjectComponent,
        AdminHomeComponent,
        PortfolioPreferencesComponent,
        PortfolioPropertiesComponent,
        PortfolioLeasesComponent,
        PortfolioSecurityComponent,
        PortfolioTemplatesComponent,
        PortfolioCurrenciesComponent,
        EditTemplateDialogComponent,
        EditLeftNavDialogComponent,
        DynamicFormComponent,
        DynamicFormListComponent,
        EditFormSectionDialogComponent,
        EditFormFieldDialogComponent,
        FormSectionComponent,
        FormFieldComponent,
        AccountingSettingsComponent,
        AssetsSummaryComponent,
        AssetsChartsComponent,
        AssetsAlertsComponent,
        AssetsMarketingComponent,
        AssetsLeasingComponent,
        AssetsValuationComponent,
        AssetsMarketsComponent,
        AssetsPropertiesComponent,
        AssetsSalesComponent,
        AssetsTenantsComponent,
        AssetsContactsComponent,
        AssetsMapsComponent,
        AssetsNewsComponent,
        AssetsMarketingHomeComponent,
        AssetsMarketingCenterComponent,
        AssetsMarketingImpressionsComponent,
        AssetsMarketingDetailViewsComponent,
        AssetsMarketingDurationComponent,
        AssetComponent,
        AssetMarketingPerformanceComponent,
        AssetMarketingListingComponent,
        AssetMarketingCdxComponent,
        AssetMarketingLeadsComponent,
        AssetDealsComponent,
        PropertiesMapComponent,
        PropertiesListComponent,
        PropertiesSpacesComponent,
        PropertiesLeaseCompsComponent,
        PropertiesSaleCompsComponent,
        PropertiesOwnersComponent,
        PropertiesDemographicsComponent,
        PropertiesChangesComponent,
        PropertiesAnalyticsComponent,
        PropertiesNewsComponent,
        PropertiesDataComponent,
        PropertiesSurveysComponent,
        PortfolioComponent,
        PortfolioHomeComponent,
        PortfolioDashboardComponent,
        PortfolioLeasesComponent,
        PortfolioPropertiesComponent,
        StrategyComponent,
        StrategyOverviewComponent,
        ProjectsHomeComponent,
        ProjectsDashboardComponent,
        ProjectsListComponent,
        ProjectsTeamsComponent,
        ProjectsTemplatesComponent,
        ProjectComponent,
        ContactsHomeComponent,
        PeopleListComponent,
        CompaniesListComponent,
        CompanyComponent,
        ContactComponent,
        ContactDetailsComponent,
        ContactScheduledReportsComponent,
        ContactProxiesComponent,
        ContactPrivilegesComponent,
        CompanyDetailsComponent,
        ObjectFilesComponent,
        ObjectCommentsComponent,
        ObjectHistoryComponent,
        ObjectRemindersComponent,
        ObjectTypeTemplatesComponent,
        AmortizationComponent,
        ReportsHomeComponent,
        PortfolioReportsComponent,
        FinancialsReportsComponent,
        AccountingReportsComponent,
        ProjectReportsComponent,
        ContactReportsComponent,
        SystemReportsComponent,
        AdHocReportComponent,
        GroupAndUserBlockedAdminLinksComponent,
        GroupAndUserRightsHistoryComponent,
        GroupAndUserModuleRightsComponent,
        GroupAndUserNavigationRightsComponent,
        ExchangeRateSetsComponent,
        ProjectTasksComponent,
        ProjectDetailsComponent,
        ProjectGanttComponent,
        ProjectDealsComponent,
        ProjectTeamComponent,
        ProjectBudgetComponent,
        ProjectTemplateComponent,
        TemplateTasksComponent,
        TemplateSettingsComponent,
        TeamTemplateComponent,
        StrComponent,
        PortfolioMenuComponent,
        DashboardHeroCardComponent,
        CostarPeersComponent,
        CostarAnalyticsComponent,
        CostarContactsComponent,
        DealsComponent,
        DealsHomeComponent,
        DealsDashboardComponent,
        DealsListComponent,
        DealComponent,
        MyImagesComponent,
        MyFloorplanComponent,
        PortfolioBenchmarkingComponent,
        PortfolioStrategyComponent,
        ListPageComponent, ListPageQueryChooserComponent,
        ActivityFeedComponent,
        MilestoneChartComponent,
        BulkRemeasureListComponent,
        RemeasureComponent,
        RemeasurementsComponent,
        MeasureEventSettingsComponent,
        BadgeComponent,
        ChipComponent,
        LeaseAccountingHomeComponent,
        ClassificationTestDialogComponent,
        FormScheduleComponent,
        ViewHistoryDialogComponent,
        FormFieldTooltipComponent,
        TasksListComponent,
        DocumentStoreComponent,
        OfflineComponent,
        RequestTypesComponent,
        RequestTemplatesComponent,
        DocSecPageComponent,
        TasksDueSoonCardComponent,
        NewProjectsCardComponent,
        NewTasksCardComponent,
        OverdueProjectsCardComponent,
        MyReportsCardComponent,
        OverdueTasksCardComponent,
        ProjectMilestonesCardComponent,
        ProjectTimelinesCardComponent,
        ActivityFeedCardComponent,
        TasksDueThisWeekCardComponent,
        ProjectsByTypeCardComponent,
        UpcomingExpirationsCardComponent,
        QuarterlyExpirationsCardComponent,
        AnnualExpirationRentCardComponent,
        UtilizationCardComponent,
        RentPsfCardComponent,
        SfPerSeatCardComponent,
        SandboxComponent,
        CostarAlertComponent,
        PortfolioSuppliersComponent,
        PortfolioEquipmentComponent,
        EquipmentLeaseComponent,
        SupplierComponent,
        ListViewSharingDialogComponent,
        ClauseBankComponent,
        IntegrationFilterComponent,
        ObjectDrawerDialogComponent,
        CriticalDatesCardComponent,
        PivotComponent,
        LeaseChargesComponent,
        FinancialChargesComponent,
        NewLeasesCardComponent,
        TaskDialogComponent,
        CostarSearchComponent,
        HierarchyDropdownComponent,
        TaskApprovalComponent,
        CostarPopupComponent,
        PopupContentComponent,
        PopupFooterComponent,
        PopupFooterLeftComponent,
        PopupFooterRightComponent,
        LastNoteDialogComponent,
        PopupControlsComponent,
        PopupControlsRightComponent,
        PopupControlsLeftComponent,
        ChartSandboxComponent,
        CostarToolbarComponent,
        ListViewDeleteDialogComponent,
        InsightsComponent,
        RealEstateCountsInsightsComponent,
        NonRealEstateCountsInsightsComponent,
        RealEstateFinanceApCardComponent,
        RealEstateFinanceArCardComponent,
        NonRealEstateFinanceApCardComponent,
        NonRealEstateFinanceArCardComponent,
        RealEstateFinanceApChartCardComponent,
        RealEstateFinanceArChartCardComponent,
        NonRealEstateFinanceApChartCardComponent,
        NonRealEstateFinanceArChartCardComponent,
        RealEstateAccountingCardComponent,
        NonRealEstateAccountingCardComponent,
        AccountingBalanceChartCardComponent,
        AccountingEventChartCardComponent,
        ActiveUsersCardComponent,
        CustomerSupportCardComponent,
        FileUsageChartCardComponent,
        MyDealsListComponent,
        MyDealsDashboardComponent,
        MyDealsBoardComponent,
        MyDealsDealComponent,
        RecentDealActivityCardComponent,
        DealActionRequiredCardComponent,
        ClosedDealsCardComponent,
        DealCountByMarketCardComponent,
        DealCountByBrokerCardComponent,
        DealCountChartCardComponent,
        AddDealDialogComponent,
        // GlobalSearchComponent,
        SearchResultsComponent,
        UnverifiedLeasesCardComponent,
        LeaseVerificationDetailGridComponent,
        OwnershipTypeCardComponent,
        BuildingTypeCardComponent,
        StoreFormatCardComponent,
        LeaseCountByHierarchyCardComponent,
        ProjectTaskPopoverComponent,
        ProjectPopoverComponent,
        HierarchyMaintenanceComponent,
        TaskComponent,
        QuickApprovalComponent,
        TasksSettingsComponent,
        ExpiringLeasesOptionsGridComponent,
        ArchivedLeasesCardComponent,
        CremHomeComponent,
        CremPortfolioComponent,
        CremProjectsComponent,
        MiscComponent,
        PasswordSettingsComponent,
        FinancialsLinksCardComponent,
        BuildingStateCardComponent,
        ProjectActivityComponent,
        ActivityItemComponent,
        ProjectsBoardComponent,
        ProjectKanbanCardComponent,
        ActivityChannelComponent,
        ProjectsSettingsComponent,
        ProjectTypeDialogComponent,
        ProjectTypeComponent,
        KanbanTasksTemplateComponent,
        TaskKanbanCardComponent,
        TemplateTaskDialogComponent,
        TaskTemplateCardComponent,
        ProjectFilesPopoverComponent,
        SegmentChooserComponent,
        SegmentBuilderComponent,
        SegmentAdminComponent,
        ListViewChooserComponent,
        ProjectAddComponent,
        ReportsListComponent,
        DistributionListsComponent,
        TagComponent,
        TagDropdownComponent,
        ManageTagsDialogComponent,
        UploadOfflineDialogComponent,
        AssignTagsDialogComponent,
        ShareReportDialogComponent,
        DeleteReportDialogComponent,
        ProfessionalsComponent,
        PublicRecordComponent,
        MarketingCenterComponent,
        EnterpriseComponent,
        PropertyStrategyThreeComponent,
        // Strategy
        StrategyDashboardComponent,
        StrategyGlobalCardComponent,
        StrategyUpcomingCardComponent,
        StrategyMarketVarianceCardComponent,
        StrategyOlderThanCardComponent,
        // Sustainability
        PropertySustainabilityComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        CostarDropdownComponent,
        NewsComponent,
        MyAssetsComponent,
        MyDealsComponent,
        MyLoansComponent,
        MyFacilitiesComponent,
        PropertiesComponent,
        LeasingComponent,
        SalesComponent,
        CompaniesComponent,
        MarketsComponent,
        ProjectsComponent,
        FinancialsComponent,
        AccountingComponent,
        ContactsComponent,
        ReportsComponent,
        AdminComponent,
        AccountingDashboardComponent,
        AlertRulesComponent,
        AccountingWorkflowStatusComponent,
        JECountByStatusComponent,
        PeriodEventCountComponent,
        LeaseAlertsCardComponent,
        PeriodCloseComponent,
        AmortizationProfilesComponent,
        DiscountRateProfilesComponent,
        JournalEntryProfilesComponent,
        WorkflowStatusComponent,
        AccountingProfilesHistoryComponent,
        BulkWorkflowComponent,
        JournalEntryApproveComponent,
        JournalEntryExportComponent,
        AccountingHealthComponent,
        AccountingHealthGridComponent,
        AccountingSchedulesComponent,
        JournalEntryReverseComponent,
        AmortizationProfileDetailComponent,
        AmortizationProfileListComponent,
        DiscountRateProfileDetailComponent,
        DiscountRateProfileListComponent,
        JournalEntryProfileDetailComponent,
        JournalEntryProfileListComponent,
        WorkflowStatusSettingsComponent,
        WorkflowStatusDetailComponent,
        FinancialsDashboardComponent,
        EnterBillComponent,
        ApApproveComponent,
        ApSubmitComponent,
        InvoiceApproveComponent,
        InvoiceGenerateComponent,
        ReceivePaymentComponent,
        EditPaymentComponent,
        ApExportComponent,
        InvoiceExportComponent,
        ProcessMtmComponent,
        ProcessPercentRentComponent,
        ProcessIndexChargeComponent,
        VendorCustomerMgmtComponent,
        ExportHistoryComponent,
        LedgerAccountsComponent,
        AllocationCentersComponent,
        InvoiceFormatsComponent,
        IndexesComponent,
        VariancesComponent,
        SalesTaxAuthoritiesComponent,
        AdamFilterComponent,
        PercentRentComponent,
        LeaseOptionClassificationsComponent,
        StraightlineDatesComponent,
        FourWallComponent,
        DynamicFormsComponent,
        EtlComponent,
        IntegrationsComponent,
        ClientSetupComponent,
        DatasetsComponent,
        FormWidgetsComponent,
        FormMaintenanceComponent,
        FormItemMaintenanceComponent,
        FormSectionMaintenanceComponent,
        FormScriptAssociationsComponent,
        FormItemDetailsComponent,
        FormScriptsComponent,
        FormActionsComponent,
        FormSectionGroupsComponent,
        EtlImportsComponent,
        EtlTemplatesComponent,
        EtlLogComponent,
        EtlQueueComponent,
        DropdownMaintenanceComponent,
        DataFieldsComponent,
        DataGroupsComponent,
        ColumnGroupsComponent,
        ColumnFieldsComponent,
        DataSetsComponent,
        DataFieldAssociationsComponent,
        DataConnectorIntegrationsComponent,
        DataConnectorLogComponent,
        IntegrationListComponent,
        IntegrationComponent,
        EtlFormItemListComponent,
        SecurityComponent,
        CostarAdminComponent,
        UserMaintenanceComponent,
        SecurityGroupMaintenanceComponent,
        SecurityProfilesComponent,
        AdditionalObjectRightsComponent,
        AddPortfolioComponent,
        ReactivateObjectsComponent,
        MovePortfolioObjectsComponent,
        PortfolioHierarchyComponent,
        ObjectMaintenanceComponent,
        LeftNavAdminComponent,
        LeftNavListComponent,
        NavPagesComponent,
        AdminDashboardsComponent,
        AdminDashboardComponentsComponent,
        AdminDashboardSectionsComponent,
        UserDashboardAdminComponent,
        QuicksearchComponent,
        CostarLookupComponent,
        ClientSiteSetupComponent,
        ListPagesComponent,
        MenuHeadingsComponent,
        AdminReportsComponent,
        ObjectTypeTypesComponent,
        ObjectRelationshipsComponent,
        RelationshipTypesComponent,
        GenerateXmlComponent,
        UploadXmlComponent,
        MerchandiseCategoriesComponent,
        MerchandiseDepartmentsComponent,
        FileManagerComponent,
        FileCleanupComponent,
        DocumentTemplatesComponent,
        DocumentTemplateTypesComponent,
        TableMaintenanceComponent,
        MapConfigurationComponent,
        CannedReportsComponent,
        ReportCriteriaComponent,
        ReportSchedulesComponent,
        DataExtractComponent,
        BudgetCategoriesComponent,
        PropertyComponent,
        LeaseComponent,
        MyPropertyDetailsComponent,
        MyLeaseDetailsComponent,
        CostarSummaryComponent,
        CostarLeaseComponent,
        CostarTenantComponent,
        CostarDemographicsComponent,
        CostarImagesComponent,
        LeaseAbstractComponent,
        LeaseFinancialsComponent,
        LeaseAccountingComponent,
        LeaseVerificationComponent,
        LeaseOperatingExpensesComponent,
        SubleasesComponent,
        LeaseConstructionAllowancesComponent,
        AdamComponent,
        MetricsComponent,
        ExpenseRevenueComponent,
        AllocationsComponent,
        IndexAdjustmentsComponent,
        MtmComponent,
        LeaseFinancialSettingsComponent,
        EditExpenseComponent,
        EditRevenueComponent,
        AccountingScheduleComponent,
        EditScheduleComponent,
        AccountingPeriodComponent,
        AccountingYearComponent,
        BlacklineComponent,
        JournalEntryAccountsCardComponent,
        AmortizationProfileAccountsCardComponent,
        PortfoliosComponent,
        PortfolioObjectComponent,
        AdminHomeComponent,
        PortfolioPreferencesComponent,
        PortfolioPropertiesComponent,
        PortfolioLeasesComponent,
        PortfolioSecurityComponent,
        PortfolioTemplatesComponent,
        PortfolioCurrenciesComponent,
        EditTemplateDialogComponent,
        EditLeftNavDialogComponent,
        DynamicFormComponent,
        DynamicFormListComponent,
        EditFormSectionDialogComponent,
        EditFormFieldDialogComponent,
        FormSectionComponent,
        FormFieldComponent,
        AccountingSettingsComponent,
        AssetsSummaryComponent,
        AssetsChartsComponent,
        AssetsAlertsComponent,
        AssetsMarketingComponent,
        AssetsLeasingComponent,
        AssetsValuationComponent,
        AssetsMarketsComponent,
        AssetsPropertiesComponent,
        AssetsSalesComponent,
        AssetsTenantsComponent,
        AssetsContactsComponent,
        AssetsMapsComponent,
        AssetsNewsComponent,
        AssetsMarketingHomeComponent,
        AssetsMarketingCenterComponent,
        AssetsMarketingImpressionsComponent,
        AssetsMarketingDetailViewsComponent,
        AssetsMarketingDurationComponent,
        AssetComponent,
        AssetMarketingPerformanceComponent,
        AssetMarketingListingComponent,
        AssetMarketingCdxComponent,
        AssetMarketingLeadsComponent,
        AssetDealsComponent,
        PropertiesMapComponent,
        PropertiesListComponent,
        PropertiesSpacesComponent,
        PropertiesLeaseCompsComponent,
        PropertiesSaleCompsComponent,
        PropertiesOwnersComponent,
        PropertiesDemographicsComponent,
        PropertiesChangesComponent,
        PropertiesAnalyticsComponent,
        PropertiesNewsComponent,
        PropertiesDataComponent,
        PropertiesSurveysComponent,
        PortfolioComponent,
        PortfolioHomeComponent,
        PortfolioDashboardComponent,
        PortfolioLeasesComponent,
        PortfolioPropertiesComponent,
        ProjectsHomeComponent,
        ProjectsDashboardComponent,
        ProjectsListComponent,
        ProjectsTeamsComponent,
        ProjectsTemplatesComponent,
        ProjectComponent,
        ContactsHomeComponent,
        PeopleListComponent,
        CompaniesListComponent,
        CompanyComponent,
        ContactComponent,
        ContactDetailsComponent,
        ContactScheduledReportsComponent,
        ContactProxiesComponent,
        ContactPrivilegesComponent,
        CompanyDetailsComponent,
        ObjectFilesComponent,
        ObjectCommentsComponent,
        ObjectHistoryComponent,
        ObjectRemindersComponent,
        ObjectTypeTemplatesComponent,
        AmortizationComponent,
        ReportsHomeComponent,
        PortfolioReportsComponent,
        FinancialsReportsComponent,
        AccountingReportsComponent,
        ProjectReportsComponent,
        ContactReportsComponent,
        SystemReportsComponent,
        AdHocReportComponent,
        ProjectTasksComponent,
        ProjectDetailsComponent,
        ProjectGanttComponent,
        ProjectDealsComponent,
        ProjectTeamComponent,
        ProjectBudgetComponent,
        ProjectTemplateComponent,
        TemplateTasksComponent,
        TemplateSettingsComponent,
        TeamTemplateComponent,
        StrComponent,
        PortfolioMenuComponent,
        DashboardHeroCardComponent,
        CostarPeersComponent,
        CostarAnalyticsComponent,
        CostarContactsComponent,
        DealsComponent,
        DealsHomeComponent,
        DealsDashboardComponent,
        DealsListComponent,
        DealComponent,
        MyImagesComponent,
        MyFloorplanComponent,
        PortfolioBenchmarkingComponent,
        PortfolioStrategyComponent,
        ListPageComponent,
        ListPageQueryChooserComponent,
        ActivityFeedComponent,
        MilestoneChartComponent,
        BulkRemeasureListComponent,
        RemeasureComponent,
        RemeasurementsComponent,
        MeasureEventSettingsComponent,
        BadgeComponent,
        ChipComponent,
        LeaseAccountingHomeComponent,
        ClassificationTestDialogComponent,
        FormScheduleComponent,
        ViewHistoryDialogComponent,
        FormFieldTooltipComponent,
        TasksListComponent,
        DocumentStoreComponent,
        OfflineComponent,
        RequestTypesComponent,
        RequestTemplatesComponent,
        DocSecPageComponent,
        TasksDueSoonCardComponent,
        NewProjectsCardComponent,
        NewTasksCardComponent,
        OverdueProjectsCardComponent,
        MyReportsCardComponent,
        OverdueTasksCardComponent,
        ProjectMilestonesCardComponent,
        ProjectTimelinesCardComponent,
        ActivityFeedCardComponent,
        TasksDueThisWeekCardComponent,
        ProjectsByTypeCardComponent,
        UpcomingExpirationsCardComponent,
        QuarterlyExpirationsCardComponent,
        AnnualExpirationRentCardComponent,
        UtilizationCardComponent,
        RentPsfCardComponent,
        SfPerSeatCardComponent,
        SandboxComponent,
        CostarAlertComponent,
        PortfolioSuppliersComponent,
        PortfolioEquipmentComponent,
        EquipmentLeaseComponent,
        SupplierComponent,
        ListViewSharingDialogComponent,
        ClauseBankComponent,
        IntegrationFilterComponent,
        ObjectDrawerDialogComponent,
        CriticalDatesCardComponent,
        PivotComponent,
        LeaseChargesComponent,
        FinancialChargesComponent,
        NewLeasesCardComponent,
        TaskDialogComponent,
        CostarSearchComponent,
        HierarchyDropdownComponent,
        TaskApprovalComponent,
        CostarPopupComponent,
        PopupContentComponent,
        PopupFooterComponent,
        PopupFooterLeftComponent,
        PopupFooterRightComponent,
        LastNoteDialogComponent,
        PopupControlsComponent,
        PopupControlsRightComponent,
        PopupControlsLeftComponent,
        ChartSandboxComponent,
        ListViewDeleteDialogComponent,
        InsightsComponent,
        RealEstateCountsInsightsComponent,
        NonRealEstateCountsInsightsComponent,
        RealEstateFinanceApCardComponent,
        RealEstateFinanceArCardComponent,
        NonRealEstateFinanceApCardComponent,
        NonRealEstateFinanceArCardComponent,
        RealEstateFinanceApChartCardComponent,
        RealEstateFinanceArChartCardComponent,
        NonRealEstateFinanceApChartCardComponent,
        NonRealEstateFinanceArChartCardComponent,
        RealEstateAccountingCardComponent,
        NonRealEstateAccountingCardComponent,
        AccountingBalanceChartCardComponent,
        AccountingEventChartCardComponent,
        ActiveUsersCardComponent,
        CustomerSupportCardComponent,
        FileUsageChartCardComponent,
        MyDealsListComponent,
        MyDealsDashboardComponent,
        MyDealsBoardComponent,
        MyDealsDealComponent,
        // GlobalSearchComponent,
        SearchResultsComponent,
        HierarchyMaintenanceComponent,
    ]
})
export class SharedComponentsModule { }
