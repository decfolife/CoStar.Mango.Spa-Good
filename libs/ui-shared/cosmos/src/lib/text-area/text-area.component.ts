import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'cs-text-area',
	templateUrl: './text-area.component.html',
	styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent{


	@Input() label : string;
	@Input() placeholder : string = null;
	@Input() value : string = null;
	@Input() hint : string = null;
	@Input() showLabel  = false;
	@Input() disabled  = false;
	@Input() required  = false;
	@Input() optional  = false;
	@Output() changed = new EventEmitter<string>();




}
