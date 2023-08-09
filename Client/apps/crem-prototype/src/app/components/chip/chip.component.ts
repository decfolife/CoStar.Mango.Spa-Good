import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import classnames from 'classnames';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent {

	@Input() text : string;

	@Input() color: String = 'costar';

	@Input() type: String = 'primary';

	get classname() {
		return ['chip', this.color, this.type];
	}

	constructor(private domSanitizer: DomSanitizer) { }

	sanitizedText(): SafeHtml {
		return this.domSanitizer.bypassSecurityTrustHtml(this.text)
	}
}
