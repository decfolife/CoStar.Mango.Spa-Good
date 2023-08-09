export class DropdownField {
    items : any[];
	valueExpr : string;
	displayExpr : string;
	placeholder : string;
	controlType : string;
	selected : any[];
	visible : boolean;
	selectMode : string;
	showColumnHeader : boolean;
	showSearchRow : boolean;
	allowClear : boolean;

	constructor(items,valueExpr,displayExpr,placeholder,controlType,selected,visible,selectMode,showColumnHeader,showSearchRow,allowClear) {		
		this.items = items;
		this.valueExpr = valueExpr;
		this.displayExpr = displayExpr;
		this.placeholder = placeholder;
		this.controlType = controlType;
		this.selected = selected;
		this.visible = visible;
		this.selectMode = selectMode;
		this.showColumnHeader = showColumnHeader;
		this.showSearchRow = showSearchRow;
		this.allowClear = allowClear;
	}
}
