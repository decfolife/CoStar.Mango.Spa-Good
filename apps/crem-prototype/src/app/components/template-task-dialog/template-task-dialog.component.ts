import { Component, OnInit, AfterViewInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service, PortfolioTaskTemplateTask, DropdownField } from '../../app.service';

@Component({
	selector: 'template-task-dialog',
	templateUrl: './template-task-dialog.component.html',
	styleUrls: ['./template-task-dialog.component.scss']
})
export class TemplateTaskDialogComponent implements OnInit {

	@Input() task : PortfolioTaskTemplateTask;
	@Output() saved = new EventEmitter<PortfolioTaskTemplateTask>();
	@Output() closed = new EventEmitter<PortfolioTaskTemplateTask>();
	roles : DropdownField;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 
		
	}

	ngOnInit() {
		this.roles = new DropdownField([ { value : "Transaction Manager" }, { value : "Construction Manager" }, { value: "Lease Analyst" }], "value", "value", "Role", "dropdown", [this.task.role], true, "single", false, false, true);		
	}	

	roleChanged(e) {
		this.task.role = e[0];
	}

	close() {
		this.closed.emit(this.task);
	}

	save() {
		this.saved.emit(this.task);
	}
}
