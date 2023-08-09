import { Component, OnInit, Input } from '@angular/core';
import { DxPopupComponent } from "devextreme-angular";

@Component({
  selector: 'costar-alert',
  templateUrl: './costar-alert.component.html',
  styleUrls: ['./costar-alert.component.scss']
})
export class CostarAlertComponent implements OnInit {

	@Input() visible : Boolean = false;
	@Input() title : String;
	@Input() width : Number;
	@Input() height : Number;
	@Input() cancelButton : Boolean = true;
	@Input() cancelButtonText : String = "Cancel";
	@Input() okButton : Boolean = true;
	@Input() okButtonText : String = "OK";
	@Input() message : String;	

	constructor() { }

	ngOnInit() {
	}

	open(data) {
		this.visible = data.visible;
		this.title = data.title;
		this.message = data.message;
		this.cancelButtonText = data.cancelButtonText || this.cancelButtonText;
		this.okButtonText = data.okButtonText || this.okButtonText;		
	}

	alertOk() {
		this.visible = false;
	}

	alertCancel() {
		this.visible = false;
	}
}
