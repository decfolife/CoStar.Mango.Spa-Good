import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Report, Service } from '../../../../../app.service';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'delete-report-dialog',
  templateUrl: './delete-report-dialog.component.html',
  styleUrls: ['./delete-report-dialog.component.scss']
})
export class DeleteReportDialogComponent implements OnInit {

	isVisible : Boolean = true;
	title : string = "Delete Report";
	reportId : number;
	report : Report;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
		this.route.params.subscribe(params => {
			this.reportId = params['report_id']; 			
			console.log("reportID:",this.reportId);
			this.report = this.service.getReport(this.reportId);

		});
	}

	ngOnInit() {

	}

	close() {
		// this.isVisible = false;
		this.router.navigate(['../../'], {relativeTo: this.route } );
	}

	delete() {
		// this.isVisible = false;
		notify({
			message : "Report deleted successfully.", 
			type : "success", 
			displayTime : 2000,
			position : { at: 'bottom right', my: 'bottom right', offset: '-16 -16'},
			maxWidth : "400px",
			closeOnClick : true,
		});
		this.router.navigate(['../../'], {relativeTo: this.route } );
	}

}
