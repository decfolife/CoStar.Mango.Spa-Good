import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Service, Tag } from '../../app.service';

@Component({
	selector: 'tag',
	templateUrl: './tag.component.html',
	styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

	@Input() tag : Tag = new Tag(0, '');
	@Input() newTag : boolean = false;
	@Input() enableRemove : boolean = false;
	@Output() removed = new EventEmitter<Tag>();
	@Output() saved = new EventEmitter<Tag>();
	newTagText : string;
	isEditing : boolean = false;
	oldTagName : string = "";
	saveTagButton : any;
	cancelEditTagButton : any;

	get classname() {
		return ['tag', (this.enableRemove ? 'tag-remove' : ''), (this.newTag ? 'add-new-tag' : '')];
	}

	constructor(private domSanitizer: DomSanitizer) { }

	ngOnInit() {
		this.saveTagButton = {
			icon: 'check',
			width: 30,	
			height: 30,	
			stylingMode: "text",
			elementAttr: {
				class: "inline-text-input-save"
			},
			onClick: (e) => {
				this.saveTag(e);
			},
		};

		this.cancelEditTagButton = {
			icon: 'close',
			width: 30,
			height: 30,	
			stylingMode: "text",
			elementAttr: {
				class: "inline-text-input-cancel"
			},		
			onClick: (e) => {
				this.cancelEditTag(e);
			},
		};
	}

	sanitizedText(): SafeHtml {
		return this.domSanitizer.bypassSecurityTrustHtml(this.tag.tagName);
	}	

	initAddTag() {
		this.isEditing = true;
	}

	initEditTag() {
		this.newTagText = this.tag.tagName;
		this.oldTagName = this.tag.tagName;
		this.isEditing = true;
	}

	deleteTag() {
		this.removed.emit(this.tag);
	}

	saveTag(e) {
		this.tag.tagName = this.newTagText;

		if( !this.newTag ) {			
			this.isEditing = false;
		} else {			
			this.saved.emit(this.tag);
			this.isEditing = false;
			this.newTagText = "";
			
		}
	}

	cancelEditTag(e) {
		this.tag.tagName = this.oldTagName;
		this.newTagText = "";
		this.isEditing = false;
	}



}
