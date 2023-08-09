import { Component, OnInit, Input, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, PortfolioTaskTemplateTask } from '../../app.service';

@Component({
  selector: 'task-template-card',
  templateUrl: './task-template-card.component.html',
  styleUrls: ['./task-template-card.component.scss']
})
export class TaskTemplateCardComponent implements OnInit {

	@Input() task : PortfolioTaskTemplateTask;
	editTaskModalVisible : boolean = false;

	constructor(private service : Service, private router: Router, private route: ActivatedRoute) { }

	ngOnInit() {
	}

	launchEditTaskModal() {
		this.editTaskModalVisible = true;
	}

	close(e) {
		this.editTaskModalVisible = false;
	}

	taskSaved(e) {
		this.editTaskModalVisible = false;
	}

}
