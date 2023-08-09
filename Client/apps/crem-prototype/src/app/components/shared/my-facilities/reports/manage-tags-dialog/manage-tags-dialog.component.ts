import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service, Tag } from '../../../../../app.service';

@Component({
	selector: 'manage-tags-dialog',
	templateUrl: './manage-tags-dialog.component.html',
	styleUrls: ['./manage-tags-dialog.component.scss']
})
export class ManageTagsDialogComponent implements OnInit {
	
	isVisible : Boolean = true;
	title : string = "Manage Tags";
	tags : Tag[];
	newTag : Tag;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() {
		this.tags = this.service.getTags();
	}

	close() {
		// this.isVisible = false;
		this.router.navigate(['../'], {relativeTo: this.route } );
	}

	save() {
		// this.isVisible = false;
		this.router.navigate(['../'], {relativeTo: this.route } );
	}

	removeTag(t) {
		this.tags.splice(this.tags.indexOf(t), 1);
	}

	saveNewTag(t) {
		this.newTag = new Tag(0, t.tagName);
		this.tags.push(this.newTag);
	}

}
