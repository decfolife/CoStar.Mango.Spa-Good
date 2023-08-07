import { OnInit, Component, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, DropdownField } from '../../../../../app.service';
import { CdkDropList, CdkDragDrop, CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';
import { DxPopupComponent } from "devextreme-angular";

export class DashboardCard {    
    componentName: string;
    colSpan : number;
    visible : boolean;
    title : string;

    constructor(componentName,colSpan,visible,title) {		
		this.componentName = componentName;	
		this.colSpan = colSpan;
		this.visible = visible;
		this.title = title;
	}
}

export class DashboardHero {    
    title: string;
    hero : string;
    sidekick : string;
    subtitle : string;
    helpText : string;
    visible : boolean;

    constructor(title,hero,sidekick,subtitle,helpText,visible) {		
		this.title = title;	
		this.hero = hero;
		this.sidekick = sidekick;
		this.subtitle = subtitle;
		this.helpText = helpText;
		this.visible = visible;
	}
}

@Component({
	selector: 'projects-dashboard',
	templateUrl: './projects-dashboard.component.html',
	styleUrls: ['./projects-dashboard.component.scss'],
	providers: [Service]
})
export class ProjectsDashboardComponent implements OnInit {

	cards : DashboardCard[];	
	filters : DropdownField[];
	heros : DashboardHero[];
	settingsModalVisible : Boolean = false;
	settingsTabs : Object[];	

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {

		this.filters = [
			new DropdownField([], null, null, "Portfolio", "portfolio", [], null, null, null, null, true),
			new DropdownField([{ value : 'Real Estate' }, { value : 'Equipment' }, { value : 'Analysis' }, { value : 'Construction' }, { value : 'Extend' }, { value : 'Infrastructure' }, { value : 'New Lease' }, { value : 'Operate' }, { value : 'Reconfiguration' }, { value : 'Relocation' }, { value : 'Renewal' }, { value : 'Site Close' }, { value : 'Sublease' }], "value", "value", "Project Type", "dropdown", [], true, "multiple", true, true, true),						
			new DropdownField([{ value : 'Dan Galenkamp' }, { value : 'Kent Carpenter' }, { value : 'Jason Trkovsky' }, { value : 'Patrick Griffith' }, { value : 'David Perrins' }, { value : 'Elyse Jupiter' }, { value : 'Anne Martinez' }, { value : 'Taylor Hampton' }], "value", "value", "Project Manager", "dropdown", [], true, "multiple", true, true, true),						
			new DropdownField([{ value : 'Active' }, { value : 'Completed' } , { value : 'On Hold' }], "value", "value", "Project Status", "dropdown", [], true, "multiple", true, true, true),						
			new DropdownField([{ value : "United States" }], "value", "value", "Country", "dropdown", [], true, "multiple", true, true, true),						
			new DropdownField([{ value : 'Media' }, { value : 'Automotive' }, { value : 'Manufacturing' }, { value : 'Digital' }], "value", "value", "Business Unit", "dropdown", [], true, "multiple", true, true, true),								
		];

		this.heros = [
			new DashboardHero('Active Projects', "61", "+4", null, "There are currently 61 active project in the portfolio. In the last 30 days, 8 new projects started, and 4 were completed.", true),
			new DashboardHero('Overdue Projects', "5", null, "15 days", "There are currently 5 overdue projects, which are overdue by an average of 15 days.", true),
			new DashboardHero('Overdue Tasks', "10", null, "Avg. 4 days / 8 projects", "There are currently 10 overdue tasks, which are overdue by an average of 4 days, spanning 8 projects", true),
			new DashboardHero('Projects Due Soon', "8", null, "Next 30 days", "There are 8 projects scheduled to be completed in the next 30 days.", true),
			new DashboardHero('Tasks Due This Week', "22", null, "10 completed", "There are 22 tasks scheduled to be completed this week.  10 are already completed.", true),
			new DashboardHero('Projects per Manager', "6", null, "3 months", "On average, each project manager manages 6 active projects, and each project averages a 3 month duration.", true),
		];

		this.cards = [
			new DashboardCard("TasksDueSoonCardComponent", 1, true, "Tasks Due Soon (assigned to me)"),
			new DashboardCard("ProjectsByTypeCardComponent", 1, true, "Projects by Type"),
			new DashboardCard("NewTasksAssignedToMeCardComponent", 1, true, "New Tasks (assigned to me"),
			new DashboardCard("NewProjectsCardComponent", 1, true, "New Projects"),
			// new DashboardCard("MyReportsCardComponent", 1, true, "My Reports"),			
			new DashboardCard("TasksDueThisWeekCardComponent", 1, true, "Tasks Due This Week (projects I manage)"),		
			new DashboardCard("OverdueProjectsCardComponent", 1, true, "Overdue Projects"),
			new DashboardCard("OverdueTasksCardComponent", 1, true, "Overdue Tasks"),
			new DashboardCard("ActivityFeedCardComponent", 2, true, "Activity Feed"),
			new DashboardCard("ProjectMilestonesCardComponent", 2, true, "Project Milestones"),
			// new DashboardCard("ProjectTimelinesCardComponent", 2, false, "Project Timelines"),		
		];			
	}

	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
	}	

	launchSettingsModal() {
		this.settingsModalVisible = true;
	}

	settingsModalCancel() {
		this.settingsModalVisible = false;
	}

	add() {
		this.router.navigate(['../add'], {relativeTo: this.route } );	
	}

	handleToggleChange(e, elementType) {
		// console.log(e);
		// console.log(elementType);
		// console.log(this[elementType]);
		let element;
		if( elementType == "filters" ){
			element = this[elementType].find(itm => itm.placeholder == e.source.name);	
		} else {
			element = this[elementType].find(itm => itm.title == e.source.name);
		}
		// console.log(element);
		element.visible = e.checked;

	}

	segementChanged(e) {
		console.log(e);
	}

}
