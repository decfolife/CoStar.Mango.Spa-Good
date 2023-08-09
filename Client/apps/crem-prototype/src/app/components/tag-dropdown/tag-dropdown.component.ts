import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, DropdownField, Tag } from '../../app.service';

@Component({
  selector: 'tag-dropdown',
  templateUrl: './tag-dropdown.component.html',
  styleUrls: ['./tag-dropdown.component.scss']
})
export class TagDropdownComponent implements OnInit {
	
	tags : Tag[];
	@Output() tagsChanged = new EventEmitter<Tag[]>();
	tagDropdown : DropdownField;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() { 
		this.tags = this.service.getTags();		
		this.tagDropdown = new DropdownField(this.tags, "tagName", "tagName", "Tags", "dropdown", [], true, "multiple", true, true, true);
	}

	toggleTags(e) {
		// console.log(e);
		let values = [];
		e.forEach(element => {
			values.push(this.tags.find(itm => itm.tagName == element));
		});
		this.tagsChanged.emit(values);			
	}
}
