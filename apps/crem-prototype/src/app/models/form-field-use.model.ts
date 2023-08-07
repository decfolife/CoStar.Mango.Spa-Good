export class FormFieldUse {
    id : number;
	formFieldId : number;
	formId : number;	
	formName : string;
	formSectionId : number;
	formSectionName : string;
	objectTypeTypeId : number;
	objectTypeTypeName : string;	
	leftNavName : string;
	formFieldLabel : string;
	form : string;
	section : string;
	objectTypeType : string;


	constructor( id, formFieldId, formId, formName, formSectionId, formSectionName, objectTypeTypeId, objectTypeTypeName, leftNavName, formFieldLabel ) {
		this.id = id;
		this.formFieldId = formFieldId;
		this.formId = formId;	
		this.formName = formName;		
		this.formSectionId = formSectionId;
		this.formSectionName = formSectionName;
		this.objectTypeTypeId = objectTypeTypeId;
		this.objectTypeTypeName = objectTypeTypeName;		
		this.leftNavName = leftNavName;
		this.formFieldLabel = formFieldLabel;		
		this.form = formName + " (" + formId.toString() + ")";
		this.section = formSectionName + " (" + formSectionId.toString() + ")";
		this.objectTypeType = objectTypeTypeName + " (" + objectTypeTypeId.toString() + ")";
	}
}

export let formFieldUses : FormFieldUse[] = [
	new FormFieldUse(1, 3, 1, "Building Details", 1, "Property Information", 300, "Building", "Details", "Building Name"),
	new FormFieldUse(1, 3, 101, "Building Details 2", 1, "Property Information", 302, "Property", "Details", "Building Name"),
	new FormFieldUse(1, 3, 102, "Supplier Details", 31, "Supplier Information", 301, "Supplier", "Summary", "Supplier Name"),
	
];