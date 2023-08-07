import { Component, AfterViewInit, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, PortfolioTaskTemplate, PortfolioProjectPhase, PortfolioTaskTemplateTask } from '../../app.service';

@Component({
	selector: 'kanban-tasks-template',
	templateUrl: './kanban-tasks-template.component.html',
	styleUrls: ['./kanban-tasks-template.component.scss']
})
export class KanbanTasksTemplateComponent implements AfterViewInit {

	@Input() templateId : number;
	template : PortfolioTaskTemplate;
	phases : PortfolioProjectPhase[];
	editTaskModalVisible : boolean = false;
	newTask : PortfolioTaskTemplateTask;

	constructor(private service : Service, private router: Router, private route: ActivatedRoute) {
	}

	ngAfterViewInit() {
		// Get the template
		this.template = this.service.getPortfolioTaskTemplate(this.templateId);
		
		// Get the phases based on the portfolioProjectSettingsId from the template
		this.phases = this.service.getPortfolioProjectPhases(this.template.portfolioProjectSettingsId);

		// Iterate through the phases to fetch the tasks for each phase from the service
		this.phases.forEach(phase => {
			phase.tasks = this.service.getPortfolioProjectPhaseTemplateTasks(phase.id);
		});

		this.newTask = new PortfolioTaskTemplateTask(0, null, null, "New Task", null, false, false, null );
	}

	onTaskDragStart(e) {
		e.itemData = e.fromData[e.fromIndex];
	}
	
	onTaskDrop(e) {
		e.fromData.splice(e.fromIndex, 1);
		e.toData.splice(e.toIndex, 0, e.itemData);
	}

	launchNewTaskModal(phase) {
		this.newTask = new PortfolioTaskTemplateTask(0, this.templateId, phase.id, "New Task", null, false, false, null );
		this.editTaskModalVisible = true;
	}

	close(e) {
		this.editTaskModalVisible = false;
	}

	taskSaved(e) {
		console.log(e);
		let phase = this.phases.find(itm => itm.id == e.portfolioProjectPhaseId )
		phase.tasks.push(e);
		this.newTask = new PortfolioTaskTemplateTask(0, null, null, "New Task", null, false, false, null );
		this.editTaskModalVisible = false;		
	}

}
