import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Segment } from '../../app.service';
import { DxDataGridComponent } from "devextreme-angular";

@Component({
	selector: 'segment-chooser',
	templateUrl: './segment-chooser.component.html',
	styleUrls: ['./segment-chooser.component.scss'],
	providers : [Service]
})
export class SegmentChooserComponent implements OnInit {

	@Input() userId : number;
	@Input() segmentType : string;
	@Output() changed : EventEmitter<any> = new EventEmitter();
	@ViewChild("SegmentDataGrid") dataGrid: DxDataGridComponent;

	userSegments : Segment[];
	segment : Segment;
	segmentName : string;
	isOpened : Boolean = false;
	selectedItems : number[] = [];
	everythingSegment : Segment;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { }

	ngOnInit() {
		this.everythingSegment = new Segment(0, "Everything", "project", null, null, null, null, null, null, null);
		this.userSegments = this.service.getUserSegments(this.userId, this.segmentType);
		// console.log("own segments", this.ownSegments);
		this.userSegments.push(this.everythingSegment);
		this.runEverythingSegment();

	}

	runEverythingSegment() {
		this.selectedItems[0] = 0;
		this.selectionChanged();
	}

	selectionChanged() {
		this.segment = this.userSegments.find(itm => itm.id == this.selectedItems[0]);
		this.changed.emit(this.segment);

		this.isOpened = false;
	}

	dropdownChange(e) {
		if (!e.value) {
			this.changed.emit(null);
		}
	}

	launchEditSegment(e, d) {
		e.stopPropagation();
		console.log(d.data);
		// launch the fodal
		this.router.navigate(["/rem-a/facilities/edit-segment", d.data.id] );
	}

	launchCopySegment(e, d) {
		e.stopPropagation();
		console.log(d.data);
		// launch the fodal
		this.router.navigate(["/rem-a/facilities/edit-segment", d.data.id] );
	}

	searchSegments(e) {
		this.dataGrid.instance.searchByText(e);
	}	

}
