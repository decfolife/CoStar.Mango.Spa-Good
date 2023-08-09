import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Task, DropdownField, User, TransactionActivity } from '../../../../../../app.service';
import { DxTreeListComponent, DxDataGridComponent } from "devextreme-angular";

export class Phase {
    id: number;
    phaseName: string;
	dueDate : string;
	completeDate : string;
	tasks : Task[];	

    constructor(id,phaseName,dueDate,completeDate,tasks) {
		this.id = id;
		this.phaseName = phaseName;
		this.dueDate = dueDate;
		this.completeDate = completeDate;
		this.tasks = tasks;
	}
}  

export class Mention {
    valueExpr: string;
    displayExpr: string;
	searchExpr : string;
	marker : string;
	dataSource : [];

    constructor(valueExpr,displayExpr,searchExpr,marker,dataSource) {
		this.valueExpr = valueExpr;
		this.displayExpr = displayExpr;
		this.searchExpr = searchExpr;
		this.marker = marker;	
		this.dataSource = dataSource;
	}
} 

@Component({
	selector: 'project-tasks',
	templateUrl: './project-tasks.component.html',
	styleUrls: ['./project-tasks.component.scss'],
	providers: [Service]
})
export class ProjectTasksComponent implements OnInit {

	projectId : number;
	tasks : Task[];
	isExpanded : Boolean = false;
	taskTemplates : DropdownField;
	viewToggleValue : string = "table";
	phases : Phase[] = [];

	filesId : string;
	filesTarget : string;
	filesPopoverVisible : Boolean = false;
	activityId : string;
	activityTarget : string;
	activityPopoverVisible : Boolean = false;
	mentions : Mention[] = [];
	activities : TransactionActivity[] = [];
	users : User[] = [];

	@ViewChild("TreeList") treeList: DxTreeListComponent;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) {
	}

	ngOnInit() {
		this.taskTemplates = new DropdownField([{ value : "Acquisitions" }, { value : "AQ" }, { value : "BOV" }, { value : "Disposals" }, { value : "EAQ - Natural Disaster" }, { value : "New Outlease Sublease" }, { value : "Outlease Sublease Renewal" }], "value", "value", "Template", "dropdown", [], true, "single", false, false, false);		

		this.route.parent.params.subscribe(params => { 
			this.projectId = params['project_id']; 
			this.tasks = this.service.getTasksByProject(this.projectId);
	
			this.tasks.forEach(tsk => {
				if( tsk.parentTaskId == 0 ) {
					this.phases.push( new Phase(tsk.id, tsk.taskName, tsk.dueDate, tsk.completeDate, []) );
				} else {
					let parentPhase = this.phases.find(itm => itm.id == tsk.parentTaskId );
					parentPhase.tasks.push(tsk);
				}
			});			
		
			this.users = this.service.getUsers();
			this.tasks = this.service.getTasksByProject(13);
	
			this.mentions = [
				new Mention("id", "fullName", "fullName", "@", this.users),
				new Mention("id", "taskName", "taskName", "#", this.tasks),
			];
	
			this.activities = this.service.getTransactionActivities(13, 0);	
		});
	}

	navigateToTask(e) {
		if( e.event.path[1].className != 'dx-treelist-empty-space dx-treelist-expanded' && e.event.path[1].className != 'dx-treelist-empty-space dx-treelist-collapsed') {
			this.router.navigate(["task", e.data.id], {relativeTo: this.route } );
		}		
	}

	toggleExpanded () {
		this.isExpanded = !this.isExpanded;

		if( this.isExpanded ) {
			this.tasks.forEach( row => {
				this.treeList.instance.expandRow(row.id)
			});
		} else {
			this.tasks.forEach( row => {
				this.treeList.instance.collapseRow(row.id)
			});
		}
	}

	searchTreeList(data) {
		this.treeList.instance.searchByText(data);
	}

	exportTreeList() {
		// this.treeList.instance.exportToExcel(false);
	}

	showColumnChooser() {
		this.treeList.instance.showColumnChooser();
	}

	add() {
		this.treeList.instance.addRow();
	}

	addTask(e) {
		// console.log(parent_id);
		// this.treeList.instance.addRow(parent_id);
	}

	addSubTask(parent_id) {
		// console.log(parent_id);
		this.treeList.instance.addRow(parent_id);
	}

	navigateToSettings() {
		// console.log(e);
		this.router.navigate(["settings"], {relativeTo: this.route } );
	}

	importTemplate() {

	}

	applyTeam() {

	}

	navigateToQuickApproval() {
		// console.log(e);
		this.router.navigate(["quick-approval"], {relativeTo: this.route } );
	}

	onTaskDragStart(e) {
		e.itemData = e.fromData[e.fromIndex];
	}
	
	onTaskDrop(e) {
		e.fromData.splice(e.fromIndex, 1);
		e.toData.splice(e.toIndex, 0, e.itemData);
	}

	launchNewTaskModal(phase) {
		// this.newTask = new PortfolioTaskTemplateTask(0, this.templateId, phase.id, "New Task", null, false, false, null );
		// this.editTaskModalVisible = true;
	}

	close(e) {
		// this.editTaskModalVisible = false;
	}

	taskSaved(e) {
		// console.log(e);
		// let phase = this.phases.find(itm => itm.id == e.portfolioProjectPhaseId )
		// phase.tasks.push(e);
		// this.newTask = new PortfolioTaskTemplateTask(0, null, null, "New Task", null, false, false, null );
		// this.editTaskModalVisible = false;		
	}

	toggleFilePopover(e) {
		e.stopPropagation();	
		this.filesTarget = "#" + e.target.id;
		this.filesPopoverVisible = !this.filesPopoverVisible;
	}

	toggleActivityPopover(e) {
		e.stopPropagation();
		this.activityTarget = "#" + e.target.id;
		this.activityPopoverVisible = !this.activityPopoverVisible;
	}
	
}
