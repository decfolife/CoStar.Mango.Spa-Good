import { Component, OnInit, Input } from '@angular/core';

export class ChangeHistory {
	id : number;
    value: string;
    changedBy: string;
    changeDate : string;

    constructor(id,value,changedBy,changeDate) {
		this.id = id;
		this.value = value;
		this.changedBy = changedBy;	
		this.changeDate = changeDate;
	}
}

@Component({
  selector: 'form-field-tooltip',
  templateUrl: './form-field-tooltip.component.html',
  styleUrls: ['./form-field-tooltip.component.scss']
})
export class FormFieldTooltipComponent implements OnInit {

	@Input() helpText : string = "This is the help text for this particular field which will help the user understand how this field is used or how it should be configured.";
	@Input() fieldId : string;
	@Input() changeHistory : ChangeHistory[];
	@Input() title : string = "Field Name";

	id : string;
	target : string;
	defaultVisible : Boolean = false;
	showHelpText : Boolean = true;

	constructor() { }

	ngOnInit() {
		this.id = this.fieldId + "tooltip";
		this.target = "#" + this.id;

		this.changeHistory = [
			new ChangeHistory(1, "This is the help text for this particular field which will help the user understand how this field is used or how it should be configured.", "Jason Trkovsky", "2019-12-01"),
			new ChangeHistory(1, "This is is a much shorter comment.", "Patrick Griffith", "2018-08-01"),
			new ChangeHistory(1, "Shorter.", "Taylor Hampton", "2017-04-01"),
			new ChangeHistory(1, "This is the help text for this particular field which will help the user understand how this field is used or how it should be configured.", "Jason Trkovsky", "2017-03-20"),
			new ChangeHistory(1, "This is the help text for this particular field which will help the user understand how this field is used or how it should be configured.", "Jason Trkovsky", "2019-12-01"),
			new ChangeHistory(1, "This is is a much shorter comment.", "Patrick Griffith", "2018-08-01"),
			new ChangeHistory(1, "Shorter.", "Taylor Hampton", "2017-04-01"),
			new ChangeHistory(1, "This is the help text for this particular field which will help the user understand how this field is used or how it should be configured.", "Jason Trkovsky", "2017-03-20"),
			new ChangeHistory(1, "This is the help text for this particular field which will help the user understand how this field is used or how it should be configured.", "Jason Trkovsky", "2019-12-01"),
			new ChangeHistory(1, "This is is a much shorter comment.", "Patrick Griffith", "2018-08-01"),
			new ChangeHistory(1, "Shorter.", "Taylor Hampton", "2017-04-01"),
			new ChangeHistory(1, "This is the help text for this particular field which will help the user understand how this field is used or how it should be configured.", "Jason Trkovsky", "2017-03-20"),
		];
	}

	toggleDefault() {
        this.defaultVisible = !this.defaultVisible;
    }

    selectTab(e) {
    	if( e.itemData.text == 'Help Text') {
    		this.showHelpText = true;
    	} else {
    		this.showHelpText = false;
    	}
    }

}
