import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, AllocationSegment, AllocationAlias, Allocation } from '../../../../../../../app.service';
import { DxDataGridComponent } from "devextreme-angular";

@Component({
	selector: 'allocations',
	templateUrl: './allocations.component.html',
	styleUrls: ['./allocations.component.scss'],
	providers : [Service]
})
export class AllocationsComponent implements OnInit {
x
	@Input() isChargeAllocations : boolean = false;
	@ViewChild("AllocationDataGrid") dataGrid: DxDataGridComponent;
	leaseId : number;
	allocations : Allocation[] = [];
	aliases : AllocationAlias[] = [];
	startEditAction : string = "click";
	segmentOnes : AllocationSegment[] = [];
	segmentTwos : AllocationSegment[] = [];
	segmentThrees : AllocationSegment[] = [];
	segmentFours : AllocationSegment[] = [];

	constructor(private service : Service, private router: Router, private route: ActivatedRoute) { }

	ngOnInit() {
		this.aliases = this.service.getAllocationAliases();			

		this.segmentOnes = this.service.getAllocationSegments(1);
		this.segmentTwos = this.service.getAllocationSegments(2);
		this.segmentThrees = this.service.getAllocationSegments(3);
		this.segmentFours = this.service.getAllocationSegments(4);

		this.route.parent.parent.params.subscribe(params => { 
			this.leaseId = params['lease_id']; 
			// this.allocations = this.service.getAllocationsByLease(this.leaseId);
			this.allocations = this.service.getAllocationsByLease(0);
		}); 		
	}

	onToolbarPreparing(e){  
        e.toolbarOptions.visible = false;  
    } 

    addAllocation() {
		this.dataGrid.instance.addRow();
	}	

    saveSettings() {
		console.log(this.dataGrid.instance.hasEditData());
		this.dataGrid.instance.saveEditData();
	}

	revertSettings() {
		this.dataGrid.instance.cancelEditData();
	}

}
