import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Clause } from '../../app.service';
import { DxDataGridComponent } from "devextreme-angular";

export class ClauseType {
    clauseType: String;
    display : String;
    
    constructor(clauseType,display) {
		this.clauseType = clauseType;
		this.display = display;
	}
}

@Component({
	selector: 'clause-bank',
	templateUrl: './clause-bank.component.html',
	styleUrls: ['./clause-bank.component.scss'],
	providers : [Service]
})
export class ClauseBankComponent implements OnInit {

	@Input() fieldId : string;
	@ViewChild("clauseGrid") clauseGrid: DxDataGridComponent;
	@Output() pasted = new EventEmitter<Clause>();

	clauses : Clause[];
	clauseType : string;
	popupVisible : Boolean = false;
	popupTitle : string = "Clause Bank";
	clauseTypes : ClauseType[];
	
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { }

	ngOnInit() {
		// console.log(this.fieldId);
		this.clauseType = this.fieldId;

		this.clauseTypes = [
			new ClauseType('insurance', 'Insurance'),
			new ClauseType('opex', 'OpEx'),
			new ClauseType('parking', 'Parking'),
			new ClauseType('retaxes', 'RE Taxes'),
			new ClauseType('utilities', 'Utilities'),
			new ClauseType('assignment', 'Assignment'),
			new ClauseType('estoppel', 'Estoppel'),
			new ClauseType('holdover', 'Holdover'),
			new ClauseType('hoursofoperation', 'Hours of Operation'),
			new ClauseType('latefee', 'Late Fee'),
			new ClauseType('permitteduse', 'Permitted Use'),
			new ClauseType('signage', 'Signage'),
			new ClauseType('surrender', 'Surrender'),	
		];
	}

	openClauseBank() {
		this.clauses = this.service.getClauseBankClauses(this.clauseType);
		this.popupVisible = true;
	}

	close() {
		this.popupVisible = false;
	}

	addClause() {
		this.clauseGrid.instance.addRow();
	}

	clauseTypeChanged(e) {

		let newValues = this.service.getClauseBankClauses(this.clauseType);
		if( newValues.length > 0 ) {
			this.clauses = newValues;
		} else {
			this.clauses = [];
		}
	}

	pasteSelected() {
		// console.log(this.clauseGrid.instance.getSelectedRowsData()[0]);	
		this.pasted.emit(this.clauseGrid.instance.getSelectedRowsData()[0]);
		this.popupVisible = false;	
		this.clauseGrid.instance.clearSelection();	
	}

}
