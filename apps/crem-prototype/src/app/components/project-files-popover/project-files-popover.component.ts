import { Component, OnInit, Input, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DxDataGridComponent } from "devextreme-angular";
import { Service, Task, TransactionActivity, User } from '../../app.service';

export class File {
    fileName: string;
    folderName: string;
	uploadBy : string;
	uploadDate : string;

    constructor(fileName,folderName,uploadBy,uploadDate) {
		this.fileName = fileName;
		this.folderName = folderName;
		this.uploadBy = uploadBy;
		this.uploadDate = uploadDate;	
	}
}
@Component({
	selector: 'project-files-popover',
	templateUrl: './project-files-popover.component.html',
	styleUrls: ['./project-files-popover.component.scss']
})
export class ProjectFilesPopoverComponent implements OnInit {

	files : File[];
	@ViewChild("ProjectFilesDataGrid") dataGrid: DxDataGridComponent;

	constructor(private service : Service, private router: Router, private route: ActivatedRoute) { }

	ngOnInit() {
		this.files = [
			new File("5ED4536D-084E-492A-9483-2C306D8EFA97.jpeg", null, "Hancock, TEST", "8/1/18"),
			new File("Active Account Report.xlsx", "Photos", "Trkovsky, Jason", "1/30/13"),
			new File("AFBuilding93020200930041748PM_(1).xlsx", "Financial", "Trkovsky, Jason", "12/8/20"),
			new File("Atlanta Buckhead Submarket.jpg", "Photos", "Hancock, TEST", "6/9/13"),
			new File("BProdMCBuildings20201022111805AM.xlsx", null, "Trkovsky, Jason", "12/8/20"),
			new File("Broker_Solicitation_for_IL_and_NC.docx", "! Reference Library", "Hancock, TEST", "5/7/12"),
			new File("BuildingPerformance.pdf", null, "Hancock, TEST", "2/21/14"),
			new File("Chase_Custom_Bundle.pdf", null, "Hancock, TEST", "9/4/18"),
			new File("CoreLogi.jpg", "Test Folder", "Trkovsky, Jason", "12/29/14"),
			new File("CustomerTransition_SalestoDelivery.pptx", "Photos", "Trkovsky, Jason", "6/16/16"),
			new File("CustomerTransition_SalestoDelivery.pptx", "IV  Bid Packages", "Trkovsky, Jason", "6/16/16"),
			new File("CustomerTransition_SalestoDelivery.pptx", null, "Trkovsky, Jason", "11/17/15"),
			new File("DataGrid (22).xlsx", "II  PreBid", "Trkovsky, Jason", "1/21/21"),
			new File("Google", null, "Trkovsky, Jason", "11/17/15"),
			new File("Lenox Center.jpg", "Photos", "Hancock, TEST", "8/7/12"),
			new File("Lenox Towers - Aerial.jpg", "Photos", "Hancock, TEST", "8/7/12"),
			new File("Lenox Towers.jpg", "Photos", "Hancock, TEST", "8/7/12"),
			new File("Map Screenshot.pdf", null, "Morrow, Kevin", "7/25/13"),
			new File("mcCust20200911010413PM_(2).xlsx", "Financial", "Trkovsky, Jason", "12/8/20"),
			new File("phippsImageWithDollarSign$.jpg", "II  PreBid", "Trkovsky, Jason", "1/21/21"),
			new File("phippsImageWithPoundSign#.jpg", "II  PreBid", "Trkovsky, Jason", "1/21/21"),
			new File("phipps-tower-atlanta.jpg", "Photos", "Hancock, TEST", "8/7/12"),
			new File("PIF - Project Initiation Form.xls", "! Reference Library", "Hancock, TEST", "4/2/12"),
			new File("Query1.xlsx", null, "Revere, Paul", "11/17/15"),
			new File("SAMPLE LOI.doc", "! Reference Library", "Hancock, TEST", "4/2/12"),
			new File("SAMPLE LOI_v002.doc", "! Reference Library", "Hancock, TEST", "4/2/12"),
			new File("Sample Templates - Project Management.xls", "! Reference Library", "Hancock, TEST", "4/2/12"),
			new File("Summary of Terms and Conditions.doc", "! Reference Library", "Hancock, TEST", "4/2/12"),
			new File("Template - Site Acquisition Process Chart.xls", "! Reference Library", "Hancock, TEST", "4/2/12"),
			new File("Terminus 100.jpg", "Photos", "Hancock, TEST", "8/7/12"),
			new File("Transition Checklist.docx", null, "Trkovsky, Jason", "11/17/15"),
			new File("USBMultiProjectFinancialStatus.pdf", "Financial", "Trkovsky, Jason", "1/11/13"),
			new File("Virtual Premise", null, "Trkovsky, Jason", "6/21/13"),
			new File("visualization_-_aerial.dwg", "Floor Plans", "Trkovsky, Jason", "1/11/13"),
		];
	}

	searchFiles(data) {
		this.dataGrid.instance.searchByText(data);
	}

	launchUploadFile() {

	}

}
