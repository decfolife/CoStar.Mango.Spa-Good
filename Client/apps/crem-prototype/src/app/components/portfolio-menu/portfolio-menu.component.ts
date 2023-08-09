import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Service, DropdownField } from '../../app.service';

@Component({
	selector: 'portfolio-menu',
	templateUrl: './portfolio-menu.component.html',
	styleUrls: ['./portfolio-menu.component.scss']
})
export class PortfolioMenuComponent implements OnInit {

	@Output() portfolioChanged = new EventEmitter<any>();
	@Input() portfolioName : String = null;
	@Input() selectMode : string = "single";
	@Input() showColumnHeader : Boolean = true;
	@Input() placeholder : string = "Portfolio";
	@Input() showSearchRow : Boolean = false;
	@Input() userId : number;

	portfolioDropdown : DropdownField;

	constructor() { }

	ngOnInit() { 
		// This should really fetch the list of portfolios the user has access to based on a userID provided as an input to the component.
		this.portfolioDropdown = new DropdownField([{ value : 'RE Portfolio' }, { value : 'EQ Portfolio' }], "value", "value", this.placeholder, "dropdown", this.portfolioName ? [this.portfolioName] : [], true, this.selectMode, this.showColumnHeader, this.showSearchRow, true);
	}

	togglePortfolio(e) {
		this.portfolioChanged.emit(e);	
		this.portfolioName = e[0];
	}

}
