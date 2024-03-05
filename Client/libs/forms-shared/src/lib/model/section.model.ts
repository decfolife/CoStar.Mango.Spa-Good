export class Section {
    id : number;
    sectionName : string;
	columnCount : number;
	objectType : string;
	colSpan : number;
	isTableData : boolean;
	allowEditing: boolean;
	allowAdding: boolean;	
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
