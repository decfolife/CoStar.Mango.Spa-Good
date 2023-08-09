import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service, PortfolioProjectType, PortfolioTaskTemplate } from '../../app.service';
// import { DxPopupComponent, DxDataGridComponent } from "devextreme-angular";

@Component({
  selector: 'project-type-dialog',
  templateUrl: './project-type-dialog.component.html',
  styleUrls: ['./project-type-dialog.component.scss'],
  providers: [Service]
})
export class ProjectTypeDialogComponent implements OnInit {

    @Input() projectType : PortfolioProjectType;
	@Output() saved = new EventEmitter<PortfolioProjectType>();
	@Output() closed = new EventEmitter<PortfolioProjectType>();
	templates : PortfolioTaskTemplate[];

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 
		
	}

	ngOnInit() {
		this.templates = this.service.getPortfolioTaskTemplatesByProjectType(this.projectType.portfolioProjectSettingsId, this.projectType.id);
	}

	close() {
		this.closed.emit(this.projectType);
	}

	save() {
		this.saved.emit(this.projectType);
	}

}
