export class Section {
    id : Number;
    sectionName : String;
	columnCount : Number;
	objectType : String;
	colSpan : Number;
	isTableData : Boolean;
	allowEditing: Boolean;
	allowAdding: Boolean;	
	columns : [];
	fields : [];
	data : [];

	constructor(id,sectionName,columnCount,objectType,colSpan,isTableData,allowEditing,allowAdding,columns,fields,data) {
		this.id = id;
		this.sectionName = sectionName;
		this.columnCount = columnCount;
		this.objectType = objectType;	
		this.colSpan = colSpan;
		this.isTableData = isTableData;
		this.allowEditing = allowEditing;
		this.allowAdding = allowAdding;
		this.columns = columns;	
		this.fields = fields;
		this.data = data;
	}
}

export let sections : Section[] = [
	new Section(1, 'Property Information', 2, 'Building', 2, false, false, false, null, [], []),
	new Section(2, 'Property Details', 2, 'Building', 2, false, false, false, null, [], []),
	new Section(3, 'Tax History', 1, 'Building', 2, true, true, true, [
		{ dataField : "id", alignment : "left", visible : false, allowEditing : false, dataType : "number", precision : 0 },
		{ dataField : "taxYear", alignment : "right", visible : true, allowEditing : true, dataType : "string", precision : 0 },
		{ dataField : "assessedValue", alignment : "right", visible : true, allowEditing : true, dataType : "number", precision : 0 },
		{ dataField : "taxAmount", alignment : "right", visible : true, allowEditing : true, dataType : "number", precision : 0 }
	], [], []),
	new Section(4, 'Appraisal History', 1, 'Building', 2, true, true, true, [
		{ dataField : "id", alignment : "left", visible : false, allowEditing : false, dataType : "number", precision : 0 },
		{ dataField : "appraisalDate", alignment : "center", visible : true, allowEditing : true, dataType : "string", precision : 0 },
		{ dataField : "appraisalValue", alignment : "right", visible : true, allowEditing : true, dataType : "number", precision : 0 },
		{ dataField : "appraisalFee", alignment : "right", visible : true, allowEditing : true, dataType : "number", precision : 0 },
		{ dataField : "appraisalCompany", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
		{ dataField : "appraisalCurrency", alignment : "center", visible : true, allowEditing : true, dataType : "string", precision : 0 },
		{ dataField : "notes", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },		
	], [], []),
	new Section(5, 'Insurance', 1, 'Building', 2, true, true, true, [
		{ dataField : "id", alignment : "left", visible : false, allowEditing : false, dataType : "number", precision : 0 },
		{ dataField : "date", alignment : "center", visible : true, allowEditing : true, dataType : "string", precision : 0 },
		{ dataField : "premiumClassification", alignment : "right", visible : true, allowEditing : true, dataType : "number", precision : 0 },
		{ dataField : "buildingInsurableValue", alignment : "right", visible : true, allowEditing : true, dataType : "number", precision : 0 },
		{ dataField : "contentsInsurableValue", alignment : "right", visible : true, allowEditing : true, dataType : "number", precision : 0 },
		{ dataField : "inventoryInsurableValue", alignment : "right", visible : true, allowEditing : true, dataType : "number", precision : 0 },
		{ dataField : "businessInterruptionValue", alignment : "right", visible : true, allowEditing : true, dataType : "number", precision : 0 },	
		{ dataField : "totalInsurableValue", alignment : "right", visible : true, allowEditing : true, dataType : "number", precision : 0 },
		{ dataField : "additionalReinsurance", alignment : "right", visible : true, allowEditing : true, dataType : "number", precision : 0 },
		{ dataField : "policyNumber", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
		{ dataField : "policyExpirationDate", alignment : "center", visible : true, allowEditing : true, dataType : "string", precision : 0 },
		{ dataField : "insuranceCompany", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },
		{ dataField : "insuranceOccupancy", alignment : "left", visible : true, allowEditing : true, dataType : "string", precision : 0 },	
	], [], []),
	new Section(6, 'Lease Information', 2, 'Lease', 2, false, false, false, null, [], []),
	new Section(7, 'Term Information', 2, 'Lease', 2, false, false, false, null, [], []),
	new Section(8, 'Tenant Space Information', 2, 'Lease', 2, false, false, false, null, [], []),
	new Section(9, 'Lease Options', 1, 'Lease', 2, true, true, true, [], [], []),
	new Section(10, 'Clauses', 1, 'Lease', 2, false, false, false, null, [], []),
];



