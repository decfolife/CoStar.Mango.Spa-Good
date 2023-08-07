import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';    
import { Service, DropdownField, PortfolioProjectSettings, PortfolioProjectPhase, PortfolioProjectType, PortfolioTaskTemplate } from '../../../../../app.service';

@Component({
	selector: 'projects-settings',
	templateUrl: './projects-settings.component.html',
	styleUrls: ['./projects-settings.component.scss']
})
export class ProjectsSettingsComponent implements OnInit {

	portfolioFilter : DropdownField;
	portfolios : any = [];
	selectedPortfolio : String;

	projectStyleFilter : DropdownField;
	projectStyles : any = [];
	selectedProjectStyle : String;

	settings : PortfolioProjectSettings;
	phases : PortfolioProjectPhase[];
	projectTypes : PortfolioProjectType[];
	templates : PortfolioTaskTemplate[];
	settingsId : number;
	addingNewPhase : boolean = false;
	newPhaseName : string;
	saveNewPhaseButton : any;
	cancelNewPhaseButton : any;

	isEditingPhase : boolean = false;
	editingPhaseId : number = null;
	savePhaseButton : any;
	cancelEditPhaseButton : any;
	oldPhaseName : string;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) {
	}

	ngOnInit() {
		this.portfolios = this.service.getTransactionDistinctClients();		
		this.portfolioFilter = new DropdownField(this.portfolios, "client", "client", "Portfolio", "dropdown", [], true, "single", true, true, false);	
		this.projectStyles = [
			{ "style" : "Kanban" },
			{ "style" : "Waterfall"}
		];
		this.projectStyleFilter = new DropdownField(this.projectStyles, "style", "style", "Transaction Style", "dropdown", [], true, "single", true, false, false);

		this.saveNewPhaseButton = {
			icon: 'check',
			width: 30,	
			height: 30,	
			stylingMode: "text",
			elementAttr: {
				class: "inline-text-input-save"
			},
			onClick: (e) => {
				this.saveNewPhase();
			},
		};

		this.cancelNewPhaseButton = {
			icon: 'close',
			width: 30,
			height: 30,	
			stylingMode: "text",
			elementAttr: {
				class: "inline-text-input-cancel"
			},		
			onClick: (e) => {
				this.cancelAddNewPhase();
			},
		};

		this.savePhaseButton = {
			icon: 'check',
			width: 30,	
			height: 30,	
			stylingMode: "text",
			elementAttr: {
				class: "inline-text-input-save"
			},
			onClick: (e) => {
				this.savePhase(e);
			},
		};

		this.cancelEditPhaseButton = {
			icon: 'close',
			width: 30,
			height: 30,	
			stylingMode: "text",
			elementAttr: {
				class: "inline-text-input-cancel"
			},		
			onClick: (e) => {
				this.cancelEditPhase(e);
			},
		};
	}

	selectedPortfolioChanged(e) {
		// console.log(e);
		this.selectedPortfolio = e[0];		

		// Fetch the settings for the selected client and project style
		this.fetchData();
	}

	selectedProjectStyleChanged(e) {
		// console.log(e);
		this.selectedProjectStyle = e[0];
		
		// Fetch the settings for the selected client and project style
		this.fetchData();
	}

	fetchData() {
		if( this.selectedProjectStyle && this.selectedPortfolio ) {
			this.settings = this.service.getPortfolioProjectSettings(this.selectedPortfolio, this.selectedProjectStyle);
			this.settingsId = this.settings.id;

			this.phases = this.service.getPortfolioProjectPhases(this.settingsId);
			this.projectTypes = this.service.getPortfolioProjectTypes(this.settingsId);
			this.templates = this.service.getPortfolioTaskTemplates(this.settingsId);
		}
	}

	onPhaseReorder(e) {
		const phase = this.phases.splice(e.fromIndex, 1)[0];
		this.phases.splice(e.toIndex, 0, phase);		
	}

	initAddNewPhase() {
		this.addingNewPhase = true;
	}

	saveNewPhase() {
		console.log("saving new phase");
		this.phases.push( new PortfolioProjectPhase(0, this.settingsId, this.newPhaseName, 0, []));
		this.newPhaseName = null;
		this.addingNewPhase = false;
	}

	cancelAddNewPhase() {
		this.addingNewPhase = false;
		this.newPhaseName = null;
	}

	navigateToProjectType(e) {
		this.router.navigate(["projecttype", e.data.id], {relativeTo: this.route } );
	}

	initEditPhase(e) {
		console.log(e);
		this.editingPhaseId = e.id;
		this.oldPhaseName = e.phaseName;
		this.isEditingPhase = true;
	}

	savePhase(e) {
		this.editingPhaseId = null;
		this.isEditingPhase = false;
	}

	cancelEditPhase(e) {
		let phase = this.phases.find(itm => itm.id = this.editingPhaseId);
		phase.phaseName = this.oldPhaseName;
		this.editingPhaseId = null;
		this.isEditingPhase = false;		
	}

}
