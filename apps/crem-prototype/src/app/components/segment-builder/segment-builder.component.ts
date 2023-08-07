import { Component, OnInit, ViewChild } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Segment, SegmentCriteriaBlock, SegmentCriterion, SegmentPrivilege } from '../../app.service';
import { DxDataGridComponent } from "devextreme-angular";

@Component({
	selector: 'segment-builder',
	templateUrl: './segment-builder.component.html',
	styleUrls: ['./segment-builder.component.scss']
})
export class SegmentBuilderComponent implements OnInit {

	@ViewChild("privilegeGrid") privilegeDataGrid: DxDataGridComponent;
	isVisible : boolean = true;
	title : string;
	segment : Segment;
	visibilityOptions : string[] = ['Everyone', 'Only Me', 'Shared'];
	segmentCriteriaBlocks : SegmentCriteriaBlock[];
	dataFields : any;
	dataSets : any;
	operators : any;

	segmentPrivileges : SegmentPrivilege[];
	entityTypeOptions : string[] = ["Group", "User"];
	privilegeTypeOptions : string[] = ["Delete", "Edit", "View"];
	entityOptions : string[] = [];

	constructor( private service : Service, private router: Router, private route: ActivatedRoute, private _location: Location ) { 
		this.route.params.subscribe(params => { 
			let segmentId = params['segment_id']; 
			this.segment = this.service.getSegment(segmentId);
			// this.title = "";
			this.segmentCriteriaBlocks = this.service.getSegmentCriteriaBlocks(segmentId);

			if(this.segment.segmentType == 'project') {
				this.dataFields = [
					{value: 'Project Name'},
					{value: 'Project Type'},
					{value: 'Project Manager'},
					{value: 'Project Status'},
					{value: 'Target Completion Date'},
					{value: 'City'},
					{value: 'State'},
					{value: 'Country'},
					{value: 'Client'},
					{value: 'Client Project ID'},
					{value: 'System Project ID'},
					{value: 'Market'},
					{value: 'Submarket'},
				];

				this.dataSets = [
					{value: 'Project Summary Data'},
					{value: 'Transaction Summary Data'}
				]
			}

			this.operators = [
				{value: "="},
				{value: "<>"},
				{value: ">"},
				{value: ">="},
				{value: "<"},
				{value: "<="},
				{value: "Contains"},
				{value: "Does Not Contain"},
				{value: "In"},
				{value: "Not In"},
			];

			this.segmentPrivileges = this.service.getSegmentPrivileges(this.segment.id);
		}); 		
	}

	ngOnInit() {

	}

	close(e) {		
		this._location.back();
		// this.isVisible = false;
	}

	save(e) {		
		this.close(e);
	}

	addCriteriaBlock() {
		this.segmentCriteriaBlocks.push(new SegmentCriteriaBlock(0, this.segment.id, 99, [
			new SegmentCriterion(0, this.segment.id, 0, null, null, null)
		]));
	}

	addCriterionToBlock(block) {
		block.criteria.push(new SegmentCriterion(0, this.segment.id, block.id, null, null, null));
	}

	removeCriterion(criterion, block) {
		// Remove the criterion from the block
		let i = block.criteria.indexOf(criterion);
		block.criteria.splice(i,1);

		// If the criterion was the only item in the block, remove the block as well
		if( block.criteria.length == 0 ) {
			let b = this.segmentCriteriaBlocks.indexOf(block);
			this.segmentCriteriaBlocks.splice(b,1);
		}
	}

	addPrivilege() {
		this.privilegeDataGrid.instance.addRow();
	}

	onToolbarPreparing(e){  
        e.toolbarOptions.visible = false;  
    } 

	entityTypeChanged(e) {
		if( e.value == "Group" ) {
			this.entityOptions = ["Group A", "Company B", "Company C", "Group D"];	
		} else if( e.value == "User" ) {
			this.entityOptions = ["Jason Trkovsky", "Dan Galenkamp", "Anne Martinez", "Patrick Griffith", "Dave Perrins", "Kent Carpenter"];
		}		
	}
}

