export class Form {
    id : Number;
    formName : String;
	formType : String;
	objectType : String;
	lastModified : String;

	constructor(id,formName,formType,objectType,lastModified) {
		this.id = id;
		this.formName = formName;
		this.formType = formType;
		this.objectType = objectType;	
		this.lastModified = lastModified;	
	}
}

export let forms : Form[] = [
	new Form(1, 'Building Details', 'Standard Form', 'Building', '2019-12-20 11:15.56'),
	new Form(2, 'Lease Abstract', 'Standard Form', 'Lease', '2019-12-20 11:15.56'),
	new Form(3, 'Building Strategy', 'Standard Form', 'Building', '2019-12-20 11:15.56'),
	new Form(4, 'Insurance History', 'Dialog Form', 'Common Object', '2019-12-20 11:15.56'),
];



