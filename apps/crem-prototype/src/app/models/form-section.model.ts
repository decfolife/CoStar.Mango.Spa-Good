export class FormSection {
    id : Number;
    formId : Number;
	sectionId : Number;	

	constructor(id,formId,sectionId) {
		this.id = id;
		this.formId = formId;
		this.sectionId = sectionId;
	}
}

export let formSections : FormSection[] = [
	new FormSection(1, 1, 1),
	new FormSection(2, 1, 2),
	new FormSection(3, 2, 6),
	new FormSection(4, 2, 7),
	new FormSection(5, 2, 8),
	new FormSection(6, 2, 9),
	new FormSection(7, 2, 10),
];



