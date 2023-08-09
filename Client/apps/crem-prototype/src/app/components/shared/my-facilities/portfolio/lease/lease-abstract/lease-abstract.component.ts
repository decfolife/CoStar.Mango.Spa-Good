import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Lease, FormField, Building, Clause } from '../../../../../../app.service';
import { DxFormComponent } from 'devextreme-angular';

@Component({
  selector: 'app-lease-abstract',
  templateUrl: './lease-abstract.component.html',
  styleUrls: ['./lease-abstract.component.scss'],
  providers : [Service]
})
export class LeaseAbstractComponent implements OnInit {

	formFields : Object[];
	leaseId : Number;
	lease : Lease;

	isLabelOnTop: Boolean = false;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) {
	}

	ngOnInit() {
		this.route.parent.params.subscribe(params => {
			this.leaseId = params['lease_id'];

			this.lease = this.service.getLease(this.leaseId);

			this.formFields = [
				{ 	sectionName : "Lease Information",
					class : {
						"col-md-6" : true
					},
					fields : [
						new FormField(1, 'System Lease ID', "SystemLeaseID", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(2, 'Building Rentable Area', "BuildingRentableArea", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(4, 'Client Lease ID', "ClientLeaseID", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(20, 'Building Type', "BuildingType", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(5, 'Building Name', "PropertyName", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(20, 'Project Allocation', "ProjectAllocation", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(7, 'Address 1', "Address1", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(20, 'CoStar Location', "CoStarLocation", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(8, 'Address 2', "Address2", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(20, 'Verification Status', "AbstractStatus", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(9, 'City', "City", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(21, 'Abstract Prepared By', "AbstractPreparedBy", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(10, 'State', "State", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(22, 'Abstract Reviewed By', "AbstractReviewedBy", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(11, 'Zip Code', "ZipCode", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(23, 'Lease Email Address', "EmailAddress", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
						new FormField(19, 'Country', "Country", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null),
					]
				},
				{	sectionName : "Term Information",
					class : {
						"col-md-6" : true
					},
					fields : [
						new FormField(25, 'Lease Agreement Date', "LeaseAgreementDate", 'dxDateBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'dateBoxTemplate', [], false, null, null),
						new FormField(35, 'Lease Status', "LeaseStatus", 'dxSelectBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value:"Active", display: "Active"}, {value:"Terminated", display: "Terminated"} ], false, null, null),
						new FormField(26, 'Possession Date', "PossessionDate", 'dxDateBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'dateBoxTemplate', [], false, null, null),
						new FormField(36, 'Lease Type', "LeaseType", 'dxSelectBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value:"Lessee", display: "Lessee"}, {value:"Lessor", display: "Lessor"}, {value:"Sublessee", display: "Sublessee"}, {value:"Sublessor", display: "Sublessor"}], false, null, null),
						new FormField(27, 'Rent Commencement Date', "RentCommencementDate", 'dxDateBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'dateBoxTemplate', [], false, null, null),
						new FormField(37, 'Lease Recovery Type', "LeaseRecoveryType", 'dxSelectBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value:"NNN", display: "NNN"}, {value:"Modified Gross", display: "Modified Gross"}, {value:"Full Service Gross", display: "Full Service Gross"}], false, null, null),
						new FormField(28, 'Original Lease Commencement', "OriginalLeaseCommencementDate", 'dxDateBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'dateBoxTemplate', [], false, null, null),
						new FormField(38, 'Base Rental Abatement', "BaseRentalAbatement", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(29, 'Original Lease Expiration Date', "OriginalLeaseExpirationDate", 'dxDateBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'dateBoxTemplate', [], false, null, null),
						new FormField(38, 'PSF', "PSF", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(30, 'Original Term', "OriginalTerm", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(31, 'Current Lease Commencement', "LeaseCommencement", 'dxDateBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'dateBoxTemplate', [], false, null, null),
						new FormField(32, 'Current Lease Expiration Date', "LeaseExpiration", 'dxDateBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'dateBoxTemplate', [], false, null, null),
						new FormField(41, 'Move In Date', "MoveInDate", 'dxDateBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'dateBoxTemplate', [], false, null, null),
						// new FormField(133, 'Commencement Date Confirmed', "CommencementDateConfirmed", 'dxDateBox', '', '', '', '', '', '', '', '', '', '', '', '', '', 'dateBoxTemplate', [], false, null, null),
						new FormField(42, 'Move Out Date', "MoveOutDate", 'dxDateBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'dateBoxTemplate', [], false, null, null),
						new FormField(33, 'Current Term', "CurrentTerm", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
					]
				},
				{	sectionName : "Tenant Space Information",
					class : {
						"col-md-6" : true
					},
					fields : [
						new FormField(50, 'Rentable Area', "RentableArea", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(18, 'Suite', "Suite", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(51, 'Measure Units', "MeasureUnits", 'dxSelectBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value:"SF", display: "SF"}, {value:"SM", display: "SM"}], false, null, null),
						new FormField(55, 'Account Type', "AccountType", 'dxSelectBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value:"AP", display: "AP"}, {value:"AR", display: "AR"}], false, null, null),
						new FormField(17, 'Floor', "Floor", 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null),
						new FormField(56, 'Currency', "Currency", 'dxSelectBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value:"USD", display: "USD"}], false, null, null),
					]
				},
				{ 	sectionName : "Allocations",
					class : {
						"col-md-12" : true
					},
					isTableData : true,
					allowEditing: false,
					allowAdding: false,
					data : this.service.getLeaseAllocations(),
					columns : [
						{	dataField : "id", alignment : "left", visible : false, allowEditing : false, dataType : "number", precision : 0 },
						{	dataField : "segment1", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{	dataField : "segment2", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{	dataField : "segment3", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{	dataField : "segment4", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{	dataField : "costPercent", alignment : "right", visible : true, allowEditing : true, dataType : "number", precision : 0 },
						{	dataField : "spacePercent", alignment : "right", visible : true, allowEditing : true, dataType : "number", precision : 0 },
						{	dataField : "headCount", alignment : "right", visible : true, allowEditing : true, dataType : "number", precision : 0 },
						{	dataField : "useType", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
					]
				},
				{ 	sectionName : "GL Recurring Events",
					class : {
						"col-md-12" : true
					},
					isTableData : true,
					allowEditing: false,
					allowAdding : false,
					data : this.service.getGLEventsByLease(this.leaseId),
					columns : [
						{ 	dataField : "id", alignment : "left", visible : false, allowEditing : false, dataType : "number", precision : 0 },
						{ 	dataField : "account", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "name", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "startDate", alignment : "center", visible : true, allowEditing : true, dataType : "date", precision : 0 },
						{ 	dataField : "endDate", alignment : "center", visible : true, allowEditing : true, dataType : "date", precision : 0 },
						{ 	dataField : "amount", alignment : "right", visible : true, allowEditing : true, dataType : "number", precision : 2 },
						{ 	dataField : "currency", alignment : "center", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "frequency", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "vendor", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
					]
				},
				{ 	sectionName : "Escalations",
					class : {
						"col-md-12" : true
					},
					isTableData : true,
					allowEditing: true,
					allowAdding: true,
					data : this.service.getLeaseEscalations(),
					columns : [
						{ 	dataField : "id", alignment : "left", visible : false, allowEditing : false, dataType : "number", precision : 0 },
						{ 	dataField : "escalationDate", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "escalationNote", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
					]
				},
				{ 	sectionName : "Lease Options",
					class : {
						"col-md-12" : true
					},
					isTableData : true,
					allowEditing: true,
					allowAdding: true,
					data : this.service.getLeaseOptions(),
					columns : [
						{ 	dataField : "id", alignment : "left", visible : false, allowEditing : false, dataType : "number", precision : 0 },
						{ 	dataField : "optionType", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "optionTypeNumber", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "optionBeginDate", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "optionEndDate", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "optionTermDuration", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "optionStatus", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
					]
				},
				{ 	sectionName : "Other Reimbursable Charges",
					class : {
						"col-md-12" : true
					},
					fields : [
						new FormField(50, 'Insurance', "insurance", 'dxTextArea', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'clauseTemplate', [], false, null, null),
						new FormField(18, 'Op Ex', "opex", 'dxTextArea', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'clauseTemplate', [], false, null, null),
						new FormField(51, 'Parking', "parking", 'dxTextArea', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'clauseTemplate', [], false, null, null),
						new FormField(55, 'RE Taxes', "retaxes", 'dxTextArea', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'clauseTemplate', [], false, null, null),
						new FormField(17, 'Utilities', "utilities", 'dxTextArea', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'clauseTemplate', [], false, null, null),
					]
				},
				{ 	sectionName : "Lease Clauses",
					class : {
						"col-md-12" : true
					},
					fields : [
						new FormField(50, 'Alterations', "alterations", 'dxTextArea', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'clauseTemplate', [], false, null, null),
						new FormField(18, 'Assignment/Sublease', "assignment", 'dxTextArea', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'clauseTemplate', [], false, null, null),
						new FormField(51, 'Estoppel/SNDA', "estoppel", 'dxTextArea', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'clauseTemplate', [], false, null, null),
						new FormField(55, 'Holdover', "holdover", 'dxTextArea', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'clauseTemplate', [], false, null, null),
						new FormField(17, 'Hours of Operation', "hoursofoperation", 'dxTextArea', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'clauseTemplate', [], false, null, null),
						new FormField(55, 'Late Fee', "latefee", 'dxTextArea', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'clauseTemplate', [], false, null, null),
						new FormField(55, 'Permitted Use', "permitteduse", 'dxTextArea', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'clauseTemplate', [], false, null, null),
						new FormField(55, 'Signage', "signage", 'dxTextArea', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'clauseTemplate', [], false, null, null),
						new FormField(55, 'Surrender/Condition of Return', "surrender", 'dxTextArea', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'clauseTemplate', [], false, null, null),
					]
				},
				{ 	sectionName : "Security Deposits",
					class : {
						"col-md-12" : true
					},
					isTableData : true,
					allowEditing: true,
					allowAdding: true,
					data : this.service.getLeaseSecurityDeposits(),
					columns : [
						{ 	dataField : "id", alignment : "left", visible : false, allowEditing : false, dataType : "number", precision : 0 },
						{ 	dataField : "depositType", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "dateDeposited", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "amount", alignment : "right", visible : true, allowEditing : true, dataType : "number", precision : 0 },
						{ 	dataField : "depositHolder", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "returnDate", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "dateDepositReturned", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "comments", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
					]
				},
				{ 	sectionName : "Insurance Requirements",
					class : {
						"col-md-12" : true
					},
					isTableData : true,
					allowEditing: true,
					allowAdding: true,
					data : this.service.getLeaseInsuranceRequirements(),
					columns : [
						{ 	dataField : "id", alignment : "left", visible : false, allowEditing : false, dataType : "number", precision : 0 },
						{ 	dataField : "number", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "insuranceType", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "coverageRequired", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "coverageLimits", alignment : "right", visible : true, allowEditing : true, dataType : "number", precision : 0 },
						{ 	dataField : "perOccurence", alignment : "right", visible : true, allowEditing : true, dataType : "number", precision : 0 },
						{ 	dataField : "aggregate", alignment : "right", visible : true, allowEditing : true, dataType : "number", precision : 0 },
						{ 	dataField : "sourceOfData", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "policyExpirationDate", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
					]
				},
				{ 	sectionName : "Lease Repairs Schedule",
					class : {
						"col-md-12" : true
					},
					isTableData : true,
					allowEditing: true,
					allowAdding: true,
					data : this.service.getLeaseRepairs(),
					columns : [
						{ 	dataField : "id", alignment : "left", visible : false, allowEditing : false, dataType : "number", precision : 0 },
						{ 	dataField : "item", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "responsibleParty", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "reimbursableBy", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "comments", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
					]
				},
				{ 	sectionName : "Construction Allowance Tracking",
					class : {
						"col-md-12" : true
					},
					isTableData : true,
					allowEditing: true,
					allowAdding: true,
					data : this.service.getLeaseConstructionAllowances(),
					columns : [
						{ 	dataField : "id", alignment : "left", visible : false, allowEditing : false, dataType : "number", precision : 0 },
						{ 	dataField : "description", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "status", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "reimbursementDeadline", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "totalAmountOwed", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "totalPaidToDate", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "remainingBalance", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
					]
				},
				{ 	sectionName : "Lease Contacts by Company",
					class : {
						"col-md-12" : true
					},
					isTableData : true,
					allowEditing: true,
					allowAdding: true,
					data : this.service.getLeaseContacts(),
					columns : [
						{ 	dataField : "id", alignment : "left", visible : false, allowEditing : false, dataType : "number", precision : 0 },
						{ 	dataField : "role", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "companyName", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "attentionTo", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "email", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "relatedParty", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "phone1", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "phone2", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "address", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
					]
				},
				{ 	sectionName : "Document Index",
					class : {
						"col-md-12" : true
					},
					isTableData : true,
					allowEditing: true,
					allowAdding: true,
					data : this.service.getLeaseDocumentIndexes(),
					columns : [
						{ 	dataField : "id", alignment : "left", visible : false, allowEditing : false, dataType : "number", precision : 0 },
						{ 	dataField : "type", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "description", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "executionDate", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "effectiveDate", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "comments", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
					]
				},
				{ 	sectionName : "Abstracting Discrepancies",
					class : {
						"col-md-12" : true
					},
					isTableData : true,
					allowEditing: true,
					allowAdding: true,
					data : this.service.getLeaseAbstractingDiscrepancies(),
					columns : [
						{ 	dataField : "id", alignment : "left", visible : false, allowEditing : false, dataType : "number", precision : 0 },
						{ 	dataField : "discrepancyType", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "discrepancyComment", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "discrepancyStatus", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "resolution", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
					]
				},
				{ 	sectionName : "Additional Lease Clauses",
					class : {
						"col-md-12" : true
					},
					isTableData : true,
					allowEditing: true,
					allowAdding: true,
					data : this.service.getLeaseAdditionalClauses(),
					columns : [
						{ 	dataField : "id", alignment : "left", visible : false, allowEditing : false, dataType : "number", precision : 0 },
						{ 	dataField : "clauseType", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "clause", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "doc", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "section", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "page", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
					]
				},
				{ 	sectionName : "Lease Admin",
					class : {
						"col-md-12" : true
					},
					isTableData : true,
					allowEditing: true,
					allowAdding: true,
					data : this.service.getLeaseAdmins(),
					columns : [
						{ 	dataField : "id", alignment : "left", visible : false, allowEditing : false, dataType : "number", precision : 0 },
						{ 	dataField : "category", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "status", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "dueDate", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "receivedDate", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "completeDate", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "amount", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
						{ 	dataField : "notes", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
					]
				},

			];
		});
	}

	pasteClause(clause: Clause) {
		this.lease[clause.clauseType] = clause.clause;
	}

}
