import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Building, buildings } from './models/building.model';
export { Building } from './models/building.model';

import { PdsProperty, PdsProperties } from './models/costar-pds-property.model';
export { PdsProperty } from './models/costar-pds-property.model';

import { Strategy, strategies, Markers } from './models/strategy.model';
export { Strategy, Markers } from './models/strategy.model';

import { ProspectiveSpace, prospectiveSpaces } from './models/prospective-space.model';
export { ProspectiveSpace } from './models/prospective-space.model';

import { BuildingStrategy, buildingStrategies } from './models/building-strategy.model';
export { BuildingStrategy } from './models/building-strategy.model';

import { StrategyLease, strategyLeases } from './models/strategy-leases.model';
export { StrategyLease } from './models/strategy-leases.model';

import { Sustainability, PropertyCertifications, CostarData, BuildingPerformanceMetrics, GreenLeaseClause, sustainabilities } from './models/sustainability.model';
export { Sustainability, CostarData } from './models/sustainability.model';

import { MarketActivity, marketActivities } from './models/market-activity.model';
export { MarketActivity } from './models/market-activity.model';

import { MarketTransaction, marketTransactions } from './models/market-transaction.model';
export { MarketTransaction } from './models/market-transaction.model';

import { Lease, leases } from './models/lease.model';
export { Lease } from './models/lease.model';

import { TaxHistory, taxHistory } from './models/tax-history.model';
export { TaxHistory } from './models/tax-history.model';

import { AppraisalHistory, appraisalHistory } from './models/appraisal-history.model';
export { AppraisalHistory } from './models/appraisal-history.model';

import { Insurance, insurance } from './models/insurance.model';
export { Insurance } from './models/insurance.model';

import { Comment, comments } from './models/comment.model';
export { Comment } from './models/comment.model';

import { File, files } from './models/file.model';
export { File } from './models/file.model';

import { ChangeHistory, changeHistory } from './models/change-history.model';
export { ChangeHistory } from './models/change-history.model';

import { FormField, formFields } from './models/form-field.model';
export { FormField } from './models/form-field.model';

import { FormFieldUse, formFieldUses } from './models/form-field-use.model';
export { FormFieldUse } from './models/form-field-use.model';

import { GLEvent, glEvents } from './models/gl-event.model';
export { GLEvent } from './models/gl-event.model';

import { GLScheduledTransaction, glScheduledTransactions } from './models/gl-scheduled-transaction.model';
export { GLScheduledTransaction } from './models/gl-scheduled-transaction.model';

import { GLAccount, glAccounts } from './models/gl-account.model';
export { GLAccount } from './models/gl-account.model';

import { Vendor, vendors } from './models/vendor.model';
export { Vendor } from './models/vendor.model';

import { AccountingSchedule, accountingSchedules } from './models/accounting-schedule.model';
export { AccountingSchedule } from './models/accounting-schedule.model';

import { AccountingMeasurement, accountingMeasurements } from './models/accounting-measurement.model';
export { AccountingMeasurement } from './models/accounting-measurement.model';

import { AccountingMonth, accountingMonths } from './models/accounting-month.model';
export { AccountingMonth } from './models/accounting-month.model';

import { AmortizationPeriod, amortizationPeriods } from './models/amortization-period.model';
export { AmortizationPeriod } from './models/amortization-period.model';

import { AmortizationProfile, amortizationProfiles } from './models/amortization-profile.model';
export { AmortizationProfile } from './models/amortization-profile.model';

import { DiscountRateProfile, discountRateProfiles } from './models/discount-rate-profile.model';
export { DiscountRateProfile } from './models/discount-rate-profile.model';

import { JournalEntryProfile, journalEntryProfiles } from './models/journal-entry-profile.model';
export { JournalEntryProfile } from './models/journal-entry-profile.model';

import { Blackline, blackline } from './models/blackline.model';
export { Blackline } from './models/blackline.model';

import { JournalEntry, journalEntries } from './models/journal-entry.model';
export { JournalEntry } from './models/journal-entry.model';

import { JournalEntryAccount, journalEntryAccounts } from './models/journal-entry-account.model';
export { JournalEntryAccount } from './models/journal-entry-account.model';

import { Portfolio, portfolios } from './models/portfolio.model';
export { Portfolio } from './models/portfolio.model';

import { Hierarchy, hierarchies } from './models/hierarchy.model';
export { Hierarchy } from './models/hierarchy.model';

import { FlatNode } from './models/flat-node.model';
export { FlatNode } from './models/flat-node.model';

import { ObjectTemplate, objectTemplates } from './models/object-template.model';
export { ObjectTemplate } from './models/object-template.model';

import { TemplateNav, templateNavs } from './models/template-nav.model';
export { TemplateNav } from './models/template-nav.model';

import { User, users } from './models/user.model';
export { User } from './models/user.model';

import { Group, groups } from './models/group.model';
export { Group } from './models/group.model';

import { Form, forms } from './models/form.model';
export { Form } from './models/form.model';

import { Section, sections } from './models/section.model';
export { Section } from './models/section.model';

import { FormSection, formSections } from './models/form-section.model';
export { FormSection } from './models/form-section.model';

import { SectionField, sectionFields } from './models/section-field.model';
export { SectionField } from './models/section-field.model';

import { Dropdown, dropdowns } from './models/dropdown.model';
export { Dropdown } from './models/dropdown.model';

import { DropdownValue, dropdownValues } from './models/dropdown-value.model';
export { DropdownValue } from './models/dropdown-value.model';

import { Report, reports } from './models/report.model';
export { Report } from './models/report.model';

import { GroupAndUserBlockedAdminLink, groupAndUserBlockedAdminLink } from './models/group-and-user-blocked-admin-links.model';
export { GroupAndUserBlockedAdminLink } from './models/group-and-user-blocked-admin-links.model';

import { GroupAndUserRightsHistory, groupAndUserRightsHistory } from './models/group-and-user-rights-history.model';
export { GroupAndUserRightsHistory } from './models/group-and-user-rights-history.model';

import { Project, projects } from './models/project.model';
export { Project } from './models/project.model';

import { ProjectTemplate, projectTemplates } from './models/project-template.model';
export { ProjectTemplate } from './models/project-template.model';

import { Task, tasks } from './models/task.model';
export { Task } from './models/task.model';

import { Favorite, favorites } from './models/favorite.model';
export { Favorite } from './models/favorite.model';

import { Deal, deals } from './models/deal.model';
export { Deal } from './models/deal.model';

import { ListPageQuery, listPageQueries } from './models/list-page-query.model';
export { ListPageQuery } from './models/list-page-query.model';

import { ListViewPrivilege, listViewPrivileges } from './models/list-view-privilege.model';
export { ListViewPrivilege } from './models/list-view-privilege.model';

import { Gantt, gantts } from './models/gantt.model';
export { Gantt } from './models/gantt.model';

import { ProjectActivity, projectActivities } from './models/project-activity.model';
export { ProjectActivity } from './models/project-activity.model';

import { Milestone, projectMilestones } from './models/milestone.model';
export { Milestone } from './models/milestone.model';

// Gantt Chart Stuff
import { GanttTask, ganttTasks, projectTimelineGantt } from './models/gantt-task.model';
export { GanttTask } from './models/gantt-task.model';

import { Dependency, dependencies, projectTimelineDependencies } from './models/dependency.model';
export { Dependency } from './models/dependency.model';

import { Resource, resources } from './models/resource.model';
export { Resource } from './models/resource.model';

import { ResourceAssignment, resourceAssignments, projectTimelineResourceAssignments } from './models/resource-assignment.model';
export { ResourceAssignment } from './models/resource-assignment.model';

import { Remeasure, remeasures } from './models/remeasure.model';
export { Remeasure } from './models/remeasure.model';

import { MeasureEventSetting, measureEventSettings } from './models/measure-event-setting.model';
export { MeasureEventSetting } from './models/measure-event-setting.model';

import { AccountingSettings, accountingSettings } from './models/accounting-settings.model';
export { AccountingSettings } from './models/accounting-settings.model';

import { LeaseAbstractingDiscrepancy, leaseAbstractingDiscrepancies } from './models/lease-abstracting-discrepancy.model';
export { LeaseAbstractingDiscrepancy } from './models/lease-abstracting-discrepancy.model';

import { LeaseAdditionalClause, leaseAdditionalClauses } from './models/lease-additional-clause.model';
export { LeaseAdditionalClause } from './models/lease-additional-clause.model';

import { LeaseAdmin, leaseAdmins } from './models/lease-admin.model';
export { LeaseAdmin } from './models/lease-admin.model';

import { LeaseAllocation, leaseAllocations } from './models/lease-allocation.model';
export { LeaseAllocation } from './models/lease-allocation.model';

import { LeaseConstructionAllowance, leaseConstructionAllowances } from './models/lease-construction-allowance.model';
export { LeaseConstructionAllowance } from './models/lease-construction-allowance.model';

import { LeaseContact, leaseContacts } from './models/lease-contact.model';
export { LeaseContact } from './models/lease-contact.model';

import { LeaseDocumentIndex, leaseDocumentIndexes } from './models/lease-document-index.model';
export { LeaseDocumentIndex } from './models/lease-document-index.model';

import { LeaseEscalation, leaseEscalations } from './models/lease-escalation.model';
export { LeaseEscalation } from './models/lease-escalation.model';

import { LeaseInsuranceRequirement, leaseInsuranceRequirements } from './models/lease-insurance-requirement.model';
export { LeaseInsuranceRequirement } from './models/lease-insurance-requirement.model';

import { LeaseOption, leaseOptions } from './models/lease-option.model';
export { LeaseOption } from './models/lease-option.model';

import { LeaseRepair, leaseRepairs } from './models/lease-repair.model';
export { LeaseRepair } from './models/lease-repair.model';

import { LeaseSecurityDeposit, leaseSecurityDeposits } from './models/lease-security-deposit.model';
export { LeaseSecurityDeposit } from './models/lease-security-deposit.model';

import { Note, notes } from './models/note.model';
export { Note } from './models/note.model';

import { Supplier, suppliers } from './models/supplier.model';
export { Supplier } from './models/supplier.model';

import { EquipmentLease, equipmentLeases } from './models/equipment-lease.model';
export { EquipmentLease } from './models/equipment-lease.model';

import { Clause, clauses } from './models/clause.model';
export { Clause } from './models/clause.model';

import { ClassificationType, classificationTypes } from './models/classification-type.model';
export { ClassificationType } from './models/classification-type.model';

import { Country, countries } from './models/country.model';
export { Country } from './models/country.model';

import { Currency, currencies } from './models/currency.model';
export { Currency } from './models/currency.model';

import { AmortizationPeriodApproval, amortizationPeriodApprovals } from './models/amortization-period-approval.model';
export { AmortizationPeriodApproval } from './models/amortization-period-approval.model';

import { PortfolioActivity, portfolioActivities } from './models/portfolio-activity.model';
export { PortfolioActivity } from './models/portfolio-activity.model';

import { TaskApprover, taskApprovers } from './models/task-approver.model';
export { TaskApprover } from './models/task-approver.model';

import { DropdownField } from './models/dropdown-field.model';
export { DropdownField } from './models/dropdown-field.model';

import { AllocationSegment, allocationSegments } from './models/allocation-segment.model';
export { AllocationSegment } from './models/allocation-segment.model';

import { AllocationAlias, allocationAliases } from './models/allocation-alias.model';
export { AllocationAlias } from './models/allocation-alias.model';

import { Allocation, allocations } from './models/allocation.model';
export { Allocation } from './models/allocation.model';

import { DashboardHero } from './models/dashboard-hero.model';
export { DashboardHero } from './models/dashboard-hero.model';

import { DashboardCard } from './models/dashboard-card.model';
export { DashboardCard } from './models/dashboard-card.model';

import { exchangeRate, ExchangeRate } from './models/exchange-rate-model';
export { ExchangeRate } from './models/exchange-rate-model';

import { GroupModuleRights, groupModuleRights, userModuleRights, UserModuleRights } from './models/group-and-user-module-rights.model';
import { GroupAndUserNavigationRights, groupAndUserNavigationRights } from './models/group-and-user-navigation-rights.model';

import { LeaseVerification, leaseVerifications } from './models/lease-verification.model';
export { LeaseVerification } from './models/lease-verification.model';

import { SecurityGroup, securityGroups } from './models/security-group.model';
export { SecurityGroup } from './models/security-group.model';

import { ProjectTaskSetting, projectTaskSettings } from './models/project-task-setting.model';
export { ProjectTaskSetting } from './models/project-task-setting.model';

import { TransactionActivity, transactionActivities } from './models/transaction-activity.model';
export { TransactionActivity } from './models/transaction-activity.model';

import { Transaction, transactions } from './models/transaction.model';
export { Transaction } from './models/transaction.model';

import { PortfolioProjectPhase, portfolioProjectPhases } from './models/portfolio-project-phase.model';
export { PortfolioProjectPhase } from './models/portfolio-project-phase.model';

import { PortfolioProjectSettings, portfolioProjectSettings } from './models/portfolio-project-settings.model';
export { PortfolioProjectSettings } from './models/portfolio-project-settings.model';

import { PortfolioProjectType, portfolioProjectTypes } from './models/portfolio-project-type.model';
export { PortfolioProjectType } from './models/portfolio-project-type.model';

import { PortfolioTaskTemplate, portfolioTaskTemplates } from './models/portfolio-task-template.model';
export { PortfolioTaskTemplate } from './models/portfolio-task-template.model';

import { PortfolioTaskTemplateTask, portfolioTaskTemplateTasks } from './models/portfolio-task-template-task.model';
export { PortfolioTaskTemplateTask } from './models/portfolio-task-template-task.model';

import { Segment, segments } from './models/segment.model';
export { Segment } from './models/segment.model';

import { SegmentRight, segmentRights } from './models/segment-right.model';
export { SegmentRight } from './models/segment-right.model';

import { SegmentCriteriaBlock, segmentCriteriaBlocks } from './models/segment-criteria-block.model';
export { SegmentCriteriaBlock } from './models/segment-criteria-block.model';

import { SegmentCriterion, segmentCriteria } from './models/segment-criterion.model';
export { SegmentCriterion } from './models/segment-criterion.model';

import { SegmentPrivilege, segmentPrivileges } from './models/segment-privilege.model';
export { SegmentPrivilege } from './models/segment-privilege.model';

import { Tag, tags } from './models/tag.model';
export { Tag } from './models/tag.model';

class ExportFile {
    filename: string;
    data: JournalEntry[];
}

@Injectable()
export class Service {

    apiUrl : string;

    constructor( private http: HttpClient ) {       
        this.apiUrl = "http://127.0.0.1:8000/api/";
    }

	isProductionEnvironment : Boolean = true;

    getBuildings(): Building[] {
        return buildings;
    }

    getBuilding( id ) : Building {
    	return buildings.find(itm => itm.systemBuildingID == id);
    }

    getPdsProperties(): PdsProperty[] {
      return PdsProperties;
    }

    getPdsProperty( id ) : PdsProperty {
      return PdsProperties.find( e => e.propertyId === id );
    }

    getStrategies(): Strategy [] {
      return strategies;
    }

    getStrategy( id ) : Strategy {
      return strategies.find( e => e.strategyId === id );
    }

    getProspectiveSpaces(): ProspectiveSpace [] {
      return prospectiveSpaces;
    }

    getBuildingStrategies(): BuildingStrategy [] {
      return buildingStrategies;
    }

    getStrategyLeases(): StrategyLease [] {
      return strategyLeases;
    }

    getSustainabilities (): Sustainability [] {
      return sustainabilities;
    }

    getSustainability( id ) : Sustainability {
      return sustainabilities.find( e => e.propertyId === id );
    }

    getMarketActivities(): MarketActivity [] {
      return marketActivities;
    }

    getMarketTransactions(): MarketTransaction [] {
      return marketTransactions;
    }

    getStrategyLocations() : Markers[] {
      return strategies.map( e => ({ location: e.location, id: e.strategyId }) );
    }

    getLeases() : Lease[] {
    	return leases;
    }

    getLeasesByBuilding( building_id ) : Lease[] {
    	return leases.filter(itm => itm.SystemBuildingID == building_id);
    }

    getLease( id ) : Lease {
		return leases.find(itm => itm.SystemLeaseID == id);
    }

    getUnverifiedLeases() : Lease[] {
        return leases.filter(itm => !itm.isVerified);
    }   

    getLeasesVerificationHistory( lease_id ) : LeaseVerification[] {
        return leaseVerifications.filter(itm => itm.leaseId == lease_id);
    } 

    getTaxHistory() : Observable<TaxHistory[]> {
    	// return taxHistory;        
        const tx = of(taxHistory);
        return tx;
        // return this.http.get<TaxHistory[]>(this.apiUrl + 'tax-history')
    }

    getAppraisalHistory() : AppraisalHistory[] {
    	return appraisalHistory;
    }

    getInsurance() : Insurance[] {
    	return insurance;
    }

    getComments() : Comment[] {
    	return comments;
    }

    getFiles() : File[] {
    	return files;
    }

    getChangeHistory() : ChangeHistory[] {
    	return changeHistory;
    }

    getGLEvents() : GLEvent[] {
    	return glEvents;
    }

    getGLEventsByLease(lease_id) : GLEvent[] {
    	return glEvents.filter(itm => itm.leaseID == lease_id);
    }

    getGLScheduledTransactions() : GLScheduledTransaction[] {
    	return glScheduledTransactions;
    }

    getGLScheduledTransactionsByGLEvent(gl_event_id) : GLScheduledTransaction[] {
    	return glScheduledTransactions.filter(itm => itm.glEventID == gl_event_id);
    }

    getGLAccounts() : GLAccount[] {
    	return glAccounts;
    }

    getVendors() : Vendor[] {
    	return vendors;
    }

    getAccountingSchedules() : AccountingSchedule[] {
    	return accountingSchedules;
    }

    getAccountingSchedulesByLease(lease_id) : AccountingSchedule[] {
    	return accountingSchedules.filter(itm => itm.leaseID == lease_id);
    }

    getAccountingSchedule( id ) : AccountingSchedule {
    	return accountingSchedules.find(itm => itm.id == id);
    }

    getMeasurement( id ) : AccountingMeasurement {
    	return accountingMeasurements.find(itm => itm.id == id);
    }

    getMeasurementsBySchedule( id ) : AccountingMeasurement[] {
    	return accountingMeasurements;
    }

    getAccountingMonths( portfolio, year ) : AccountingMonth[] {
    	return accountingMonths.filter(itm => ( itm.portfolio == portfolio && itm.year == year ));
    }

    getAllAccountingMonths() : AccountingMonth[] {
    	return accountingMonths;
    }

    getAccountingMonth( id ) : AccountingMonth {
    	return accountingMonths.find(itm => itm.id == id);
    }

    getAmortizationPeriodsBySchedule( measurement_id ) : AmortizationPeriod[] {
    	return amortizationPeriods.filter(itm => itm.accountingMeasurementId == measurement_id);
    }

    getAmortizationProfiles() : AmortizationProfile[] {
    	return amortizationProfiles;
    }

    getAmortizationProfile( id ) : AmortizationProfile {
    	return amortizationProfiles.find(itm => itm.id == id);
    }

    getDiscountRateProfiles() : DiscountRateProfile[] {
    	return discountRateProfiles;
    }

    getDiscountRateProfile( id ) : DiscountRateProfile {
    	return discountRateProfiles.find(itm => itm.id == id);
    }

    getJournalEntryProfiles() : JournalEntryProfile[] {
    	return journalEntryProfiles;
    }

    getJournalEntryProfile( id ) : JournalEntryProfile {
    	return journalEntryProfiles.find(itm => itm.id == id);
    }

    getBlacklineData( period, portfolio ) : Blackline[] {
        return blackline;
    	// return blackline.filter(itm => ( itm.period == period && itm.portfolio == portfolio));
    }

    getJournalEntries( portfolio, period ) : ExportFile[] {
    	let results = [];
    	let filenamesFound = [];

    	for( let i = 0; i < journalEntries.length; i++ ) {
			let idx = filenamesFound.indexOf(journalEntries[i].filename);
			if( idx == -1 ) {
				results.push({
    				"filename" : journalEntries[i].filename, 
    				"data" : [journalEntries[i]]
    			});
    			filenamesFound.push(journalEntries[i].filename);
			} else {
				results[idx].data.push(journalEntries[i]);
			}
    	}

    	return results;
    }

    getJournalEntryAccounts() : JournalEntryAccount[] {
    	return journalEntryAccounts;
    }

    getJournalEntryAccount( id ) : JournalEntryAccount {
    	return journalEntryAccounts.find(itm => itm.id == id);
    }

    getPortfolios() : Portfolio[] {
    	return portfolios;
    }

    getPortfolio( id ) : Portfolio {
    	return portfolios.find(itm => itm.id == id);
    }

    getPortfolioHierarchy( id ) : Hierarchy[] {
    	return hierarchies.filter(itm => itm.portfolioId == id);
    }

    getPortfolioHierarchies() : Hierarchy[] {
    	return hierarchies;
    }

    getObjectTemplates( objectType ) : ObjectTemplate[] {
    	return objectTemplates.filter(itm => ( itm.objectType == objectType));
    }

    getTemplateNav( objectTemplateId ) : TemplateNav[] {
    	return templateNavs.filter(itm => ( itm.objectTemplateId == objectTemplateId));
    }

    getUsers() : User[] {
    	return users;
    }

    getUser( id ) : User {
    	return users.find(itm => itm.id == id);
    }

    getGroups() : Group[] {
    	return groups;
    }

    getGroup( id ) : Group {
    	return groups.find(itm => itm.id == id);
    }

    getForms() : Form[] {
    	return forms;
    }

    getForm( id ) : Form {
    	return forms.find(itm => itm.id === id);
    }

    postForm( form ) {
    	forms.push(form);
    }

    getSections() : Section[] {
    	return sections;
    }

    getSection( id ) : Section {
    	return sections.find(itm => itm.id == id);
    }

    postSection( section ) {
    	sections.push(section);
    }

    getFormSections( fid : Number ): Section[] {   	

    	let sectionIds = formSections.filter(itm => itm.formId === fid).map(item => item.sectionId).filter((value, index, self) => self.indexOf(value) === index );
    	// console.log(sectionIds);

    	return sections.filter(itm => sectionIds.includes(itm.id));    	
    }

    getSectionFields( section_id ): FormField[] {

    	let fieldIds = sectionFields.filter(itm => itm.sectionId == section_id).map(item => item.formFieldId).filter((value, index, self) => self.indexOf(value) === index );

    	return formFields.filter(itm => fieldIds.includes(itm.id));
    }

    getFormFieldUse( form_field_id ) : FormFieldUse[] {
        return formFieldUses.filter(itm => ( itm.formFieldId == form_field_id ));
    }

	getAvailableFormFields( form_id ) : FormField[] {
			
		let objectType = forms.find(itm => itm.id == form_id).objectType;
		// console.log(objectType);

		// Get a list of all the section ids on the form
		let sectionIds = formSections.filter(itm => itm.formId == form_id).map(section => section.sectionId);
		// console.log(sectionIds);

		// Get a list of all the fields on the form across all the sections
		let inUseFieldIds = sectionFields.filter(itm => sectionIds.includes(itm.sectionId)).map(field => field.formFieldId);
		// console.log(inUseFieldIds);

		// From all the fields of this object type, filter out the fields on the form already
		let availableFields = formFields.filter(itm => itm.objectType == objectType).filter(itm => !inUseFieldIds.includes(itm.id));
		// console.log(availableFields);

		return availableFields;
	}

	getAvailableFormSections( form_id ) : Section[] {
		let objectType = forms.find(itm => itm.id == form_id).objectType;
		// console.log(objectType);

		// Get a list of all the section ids on the form
		let inUseSectionIds = formSections.filter(itm => itm.formId == form_id).map(section => section.sectionId);
		// console.log(inUseSectionIds);

		// From all the sections of this object type, filter out the sections on the form already
		let availableSections = sections.filter(itm => itm.objectType == objectType).filter(itm => !inUseSectionIds.includes(itm.id));
		// console.log(availableSections);

		return availableSections;
	}

	postSectionsToForm( newSections, form_id ) {

		const maxId = (maxValue, currentValue) => Math.max(maxValue, currentValue);

		let startingId = formSections.map(itm => itm.id).reduce(maxId, 0);
		console.log(startingId);

		newSections.forEach((section, index) => formSections.push(new FormSection(startingId + index + 1, form_id, section.id)));
   	}

   	deleteSectionFromForm( section_id, form_id ) {
   		let s = formSections.find(itm => itm.sectionId == section_id && itm.formId == form_id);

   		formSections.splice(formSections.indexOf(s), 1);
   	}

	getDropdowns() : Dropdown[] {
    	return dropdowns;
    }

    postDropdown( dropdownName ) : Dropdown {
        const maxId = (maxValue, currentValue) => Math.max(maxValue, currentValue);

        let startingId = dropdowns.map(itm => itm.id).reduce(maxId, 0);
        
        let newDropdown = new Dropdown(startingId + 1, dropdownName, true, false, true, 'value', 'ASC', null, null, null, true);
        
        dropdowns.push(newDropdown);

        return newDropdown;
    }

    getDropdownValues( dropdown_id ) : DropdownValue[] {
    	return dropdownValues.filter(itm => ( itm.dropdownId == dropdown_id ));
    }

    postDropdownValue( display, value, is_active, dropdown_id ) : DropdownValue {
        const maxId = (maxValue, currentValue) => Math.max(maxValue, currentValue);

        let startingId = dropdownValues.map(itm => itm.id).reduce(maxId, 0);
        
        let newDropdownValue = new DropdownValue(startingId + 1, dropdown_id, value, display, 0, is_active, null);
        
        dropdownValues.push(newDropdownValue);

        return newDropdownValue;
    }

    getEnvironment() {
    	return this.isProductionEnvironment;
    }
    
    toggleEnvironment() {
    	this.isProductionEnvironment = !this.isProductionEnvironment;
    }

    getReportsByType(reportType) : Report[] {
    	return reports.filter(itm => ( itm.type == reportType ));
    }

    getReports() : Report[] {
    	return reports;
    }

    getReport(report_id) : Report {
    	return reports.find(itm => itm.id == report_id);
    }


    getAmortizationPeriodsByMeasurment(measurement_id) : AmortizationPeriod[] {
    	return amortizationPeriods.filter(itm => ( itm.accountingMeasurementId == measurement_id ));
    }

    getProjects() : Project[] {
    	return projects;
    }

    getProject( id ) : Project {
		return projects.find(itm => itm.id == id);
    }

    getNewProjects() : Project[] {
    	return projects.filter(itm => ( itm.isNew == true ));
    }

    getOverdueProjects() : Project[] {
    	return projects.filter(itm => ( itm.isOverdue == true ));
    }

    getAtRiskProjects() : Project[] {
    	return projects.filter(itm => ( itm.isAtRisk == true ));
    }

    getProjectTemplates() : ProjectTemplate[] {
    	return projectTemplates;
    }

    getProjectTemplate( id ) : ProjectTemplate {
		return projectTemplates.find(itm => itm.id == id);
    }

    getTasks() : Task[] {
    	return tasks;
    }

    getNewTasks() : Task[] {
    	return tasks.filter(itm => ( itm.isNew == true ));
    }

    getTasksDueSoon() : Task[] {
    	return tasks.filter(itm => ( itm.isDueSoon == true || ( itm.isOverdue == true && itm.assignee == 'Jason Trkovsky')) );
    }

    getOverdueTasks() : Task[] {
    	return tasks.filter(itm => ( itm.isOverdue == true ));
    }

    getTasksByProject(project_id) : Task[] {
    	return tasks.filter(itm=> ( itm.projectId == project_id ));
    }

    getTask( id ) : Task {
		return tasks.find(itm => itm.id == id);
    }

    getTaskApprovers( task_id ) : TaskApprover[] {
        return taskApprovers.filter(itm => itm.taskId == task_id);
    }

    getRecent( object_type ) : Favorite[] {
    	return favorites.filter(itm => ( itm.isRecent == true && itm.objectType == object_type ));
    }

    getFavorite( object_type ) : Favorite[] {
    	return favorites.filter(itm => ( itm.isFavorite == true && itm.objectType == object_type ));
    }

    getDeals() : Deal[] {
    	return deals;
    }

    getDeal(id) : Deal {
        return deals.find(itm => itm.id == id);
    }

    getListPageQueriesByObjectType( object_type ) : ListPageQuery[] {
    	return listPageQueries.filter(itm => ( itm.objectType == object_type ));
    }

    getListViewPrivileges ( list_page_query_id ) : ListViewPrivilege[] {
        return listViewPrivileges.filter(itm => ( itm.listPageQueryId == list_page_query_id ));   
    }

    getProjectsGanttChart() : Gantt[] {
    	return gantts;
    }

    getProjectActivities( project_id = 0 ) : ProjectActivity[] {
    	if( project_id !== 0 ) {
    		return projectActivities.filter(itm => ( itm.projectId == project_id ));
    	} else {
    		return projectActivities;
    	}
    }

    getProjectMilestones( project_id ) : Milestone[] {
    	return projectMilestones.filter(itm => (itm.projectId == project_id));
    }

    getGanttTasks() : GanttTask[] {
    	return ganttTasks;
    }

    getDependencies() : Dependency[] {
    	return dependencies;
    }

    getResources() : Resource[] {
    	return resources;
    }

    getResourceAssignments() : ResourceAssignment[] {
    	return resourceAssignments;
    }

    getProjectTimelineGanttTasks() : GanttTask[] {
    	return projectTimelineGantt;
    }

    getProjectTimelineDependencies() : Dependency[] {
    	return projectTimelineDependencies;
    }

    getProjectTimelineResourceAssignments() : ResourceAssignment[] {
    	return projectTimelineResourceAssignments;
    }

    getBatchRemeasures() : Remeasure[] {
    	return remeasures;
    }

    getMeasureEventSettings( classification_type ) : MeasureEventSetting[] {
    	return measureEventSettings.filter(itm => (itm.classificationType == classification_type));
    }

    getMeasurementSettingsByMeasureEvent( measure_event_type ) : MeasureEventSetting[] {
        return measureEventSettings.filter(itm => (itm.measureEvent == measure_event_type));
    }

    getAccountingSettings( portfolio ) : AccountingSettings {
        return accountingSettings.find(itm => (itm.portfolio == portfolio));
    }

    getMyReports( type ) : Report[] {
        return reports.filter(itm => ( itm.type == type ));
    }

    getNotes() : Note[] {
        return notes;
    }
    
    getLeaseAbstractingDiscrepancies() : LeaseAbstractingDiscrepancy[] {
        return leaseAbstractingDiscrepancies;
    }

    getLeaseAdditionalClauses() : LeaseAdditionalClause[] {
        return leaseAdditionalClauses;
    }

    getLeaseAdmins() : LeaseAdmin[] {
        return leaseAdmins;
    }

    getLeaseAllocations() : LeaseAllocation[] {
        return leaseAllocations;
    }

    getLeaseConstructionAllowances() : LeaseConstructionAllowance[] {
        return leaseConstructionAllowances;
    }

    getLeaseContacts() : LeaseContact[] {
        return leaseContacts;
    }

    getLeaseDocumentIndexes() : LeaseDocumentIndex[] {
        return leaseDocumentIndexes;
    }

    getLeaseEscalations() : LeaseEscalation[] {
        return leaseEscalations;
    }

    getLeaseInsuranceRequirements() : LeaseInsuranceRequirement[] {
        return leaseInsuranceRequirements;
    }

    getLeaseOptions() : LeaseOption[] {
        return leaseOptions;
    }

    getLeaseOptionsByLease( lease_id ) : LeaseOption[] {
        return leaseOptions.filter(itm => itm.leaseId == lease_id);
    }

    getLeaseRepairs() : LeaseRepair[] {
        return leaseRepairs;
    }

    getLeaseSecurityDeposits() : LeaseSecurityDeposit[] {
        return leaseSecurityDeposits;
    }

    getSuppliers() : Supplier[] {
        return suppliers;
    }

    getSupplier( id ) : Supplier {
        return suppliers.find(itm => itm.id == id);
    }

    getEquipmentLeases() : EquipmentLease[] {
        return equipmentLeases;
    }

    getEquipmentLease( id ) : EquipmentLease {
        return equipmentLeases.find(itm => itm.SystemLeaseID == id);
    }

    getClauseBankClauses( clause_type ) : Clause[] {
        return clauses.filter(itm => itm.clauseType == clause_type);
    }

    getClassificationTypes() : ClassificationType[] {
        return classificationTypes;
    }

    getCountries() : Country[] {
        return countries;
    }

    getCurrencies() : Currency[] {
        return currencies;
    }

    getAmortizationPeriodApprovals() : AmortizationPeriodApproval[] {
        return amortizationPeriodApprovals;
    }

     getNewLeases() : Lease[] {
        return leases.filter(itm => ( itm.isNew == true ));
    }

    getRecentlyArchivedLeases() : Lease[] {
        return leases.filter(itm => ( itm.isArchived == true ));
    }

    getPortfolioActivities( object_id = 0, object_type = null ) : PortfolioActivity[] {
        if( object_id !== 0 ) {
            return portfolioActivities.filter(itm => ( itm.objectID == object_id && itm.objectType == object_type ));
        } else {
            return portfolioActivities;
        }
    }

    getAllocationAliases() : AllocationAlias[] {
        return allocationAliases;
    }

    getAllocationSegments( allocation_segment_type_id ) : AllocationSegment[] {
        return allocationSegments.filter(itm => itm.segmentType == allocation_segment_type_id);
    }

    getAllocationsByLease( lease_id ) : Allocation[] {
        return allocations.filter(itm => itm.leaseId == lease_id);
    }

    getUserBlockedAdminLinks(): GroupAndUserBlockedAdminLink[] {
        return groupAndUserBlockedAdminLink;
    }

    getGroupAndUserRightsHistory(): GroupAndUserRightsHistory[] {
        return groupAndUserRightsHistory;
    }

    getPortfolioExchangeRate(): ExchangeRate[] {
        return exchangeRate;
    }

    getGroupModuleRights(): GroupModuleRights[] {
        return groupModuleRights;
    }

    getGroupAndUserNavigationRights(): GroupAndUserNavigationRights {
        return groupAndUserNavigationRights;
    }

    getUserModuleRights(): UserModuleRights[] {
        return userModuleRights;
    }

    getSecurityGroups(): SecurityGroup[] {
        return securityGroups;
    }

    getTaskSettingsByProject(project_id) : ProjectTaskSetting {
    	return projectTaskSettings.find(itm=> ( itm.projectId == project_id ));
    }

    getTransactionActivities(project_id, parent_activity_id) : TransactionActivity[] {
        return transactionActivities.filter(itm => itm.projectId == project_id && itm.parentActivityId == parent_activity_id);
    }

    getTransactionDistinctClients() : any {
        let clients = [...new Set(transactions.map(itm => itm.client ))];
        let clientsObj = [];
        // console.log(clients);
        clients.forEach((itm, i) => { clientsObj[i] = { client : itm } });

        return clientsObj;
    }

    getTransactionDistinctProjectTypesByClient(client_name) : any {
        let types = [...new Set(transactions.filter(itm => itm.client == client_name).map(itm => itm.type))];
        let typesObj = [];
        types.forEach((itm, i) => { typesObj[i] = { type : itm } });

        return typesObj;
    }

    getTransactions() : Transaction[] {
        return transactions;
    }

    getTransactionDistinctProjectManagersByClient(client_name) : String[] {
        let pms = [...new Set(transactions.filter(itm => itm.client == client_name).map(itm => itm.manager))];
        let pmsObj = [];
        // console.log(clients);
        pms.forEach((itm, i) => { pmsObj[i] = { manager : itm } });

        return pmsObj;        
    }

    getTransactionsForBoard( client_name, project_type, project_managers ) : any {
        // let phases = [];
        // let trx = transactions.filter(itm => itm.client == client_name && itm.type == project_type);
        // let phaseList = [...new Set(trx.map(itm => itm.phase ))];

        // phaseList.forEach( phase => {
        //     phases.push(trx.filter(itm => itm.phase == phase));
        // });

        // return { 'phases' : phaseList, 'transactions' : phases };

        let data = [], phases = [];
        if( client_name == "ADT" ) {
            phases = ['N/A', 'Phase 1: Project Definition', 'Phase 2: Implementation', 'Phase 3: Approval', 'Phase 4: Execution', 'Phase 5: Close - Out'];
        } else if( client_name == "Amazon" ) {
            phases = ['N/A', 'Phase 1: Project Definition', 'Phase 2: Implementation', 'Phase 3: Execution & Approval', 'Phase 4: Close Out'];
        }

        phases.forEach( phase => {
            data.push({ 'phase' : phase, 'projects' : transactions.filter(trx => trx.client == client_name && trx.type == project_type && trx.phase == phase && (project_managers.length ? project_managers.includes(trx.manager) : true ) ) });
        })

        return data;
    }

    getPortfolioProjectSettings( portfolio_name, project_style ) : PortfolioProjectSettings {
        return portfolioProjectSettings.find(itm => itm.portfolio == portfolio_name && itm.projectStyle == project_style);
    }

    getPortfolioProjectPhases( portfolio_project_settings_id ) : PortfolioProjectPhase[] {
        return portfolioProjectPhases.filter(itm => itm.portfolioProjectSettingsId == portfolio_project_settings_id);
    }

    getPortfolioProjectTypes( portfolio_project_settings_id ) : PortfolioProjectType[] {
        return portfolioProjectTypes.filter(itm => itm.portfolioProjectSettingsId == portfolio_project_settings_id);
    }

    getPortfolioTaskTemplates( portfolio_project_settings_id ) : PortfolioTaskTemplate[] {  
        return portfolioTaskTemplates.filter(itm => itm.portfolioProjectSettingsId == portfolio_project_settings_id);
    }

    getPortfolioTaskTemplatesByProjectType( portfolio_project_settings_id, project_type_id ) : PortfolioTaskTemplate[] {  
        return portfolioTaskTemplates.filter(itm => itm.portfolioProjectSettingsId == portfolio_project_settings_id && itm.projectTypeId == project_type_id);
    }

    getPortfolioTaskTemplate( portfolio_task_template_id ) : PortfolioTaskTemplate {  
        return portfolioTaskTemplates.find(itm => itm.id == portfolio_task_template_id);
    }

    getProjectType( project_type_id ) : PortfolioProjectType {
        return portfolioProjectTypes.find(itm => itm.id == project_type_id);
    }

    getPortfolioProjectPhaseTemplateTasks( portfolio_project_phase_id ) : PortfolioTaskTemplateTask[] {
        return portfolioTaskTemplateTasks.filter(itm => itm.portfolioProjectPhaseId == portfolio_project_phase_id);
    }

    getSegment( segment_id ): Segment {
        return segments.find(itm => itm.id == segment_id);
    }

    getSegments(): Segment[] {
        return segments;
    }

    getUserSegments( user_id, segment_type ): Segment[] {
        // get the SegmentRights for the user which are NOT shared
        let userSegmentRights = segmentRights.filter(itm => itm.userId == user_id);
        // grab just the segment ids
        let segmentIds = [...new Set(userSegmentRights.map(itm => itm.segmentId))];
        // filter the segments array for the segment ids
        return segments.filter(itm => segmentIds.includes(itm.id) && itm.segmentType == segment_type);
    }

    getUserOwnSegments( user_id, segment_type ): Segment[] {
        // get the SegmentRights for the user which are NOT shared
        let userSegmentRights = segmentRights.filter(itm => itm.userId == user_id && !itm.isShared);
        // grab just the segment ids
        let segmentIds = [...new Set(userSegmentRights.map(itm => itm.segmentId))];
        // filter the segments array for the segment ids
        return segments.filter(itm => segmentIds.includes(itm.id) && itm.segmentType == segment_type);
    }

    getUserSharedSegments( user_id, segment_type ): Segment[] {
        // get the SegmentRights for the user which ARE shared
        let userSegmentRights = segmentRights.filter(itm => itm.userId == user_id && itm.isShared);
        // grab just the segment ids
        let segmentIds = [...new Set(userSegmentRights.map(itm => itm.segmentId))];
        // filter the segments array for the segment ids
        return segments.filter(itm => segmentIds.includes(itm.id) && itm.segmentType == segment_type);
    }

    getSegmentCriteriaBlocks( segment_id ) : SegmentCriteriaBlock[] {
        return segmentCriteriaBlocks.filter(itm => itm.segmentId == segment_id);
    }

    getSegmentPrivileges ( segment_id ) : SegmentPrivilege[] {
        return segmentPrivileges.filter(itm => ( itm.segmentId == segment_id ));   
    }

    getTags(): Tag[] {
        return tags;
    }
}
