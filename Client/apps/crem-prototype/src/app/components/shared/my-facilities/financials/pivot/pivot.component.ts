import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DxPivotGridComponent, DxPopupComponent } from 'devextreme-angular';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import { Service, GLScheduledTransaction } from '../../../../../app.service';

@Component({
	selector: 'pivot',
	templateUrl: './pivot.component.html',
	styleUrls: ['./pivot.component.scss'],
	providers: [Service]
})
export class PivotComponent implements OnInit {

	@ViewChild("PivotGrid") pivotGrid: DxPivotGridComponent;
	@ViewChild("PivotSettingsPopup") pivotSettingsPopup : DxPopupComponent;
	pivotGridDataSource: any;
	glScheduledTransactions : GLScheduledTransaction[] = [];
	pivotSettingsPopupVisible : Boolean;
	portfolio : string = null;

	pivotSettings : any;

	constructor( public service : Service, private router: Router, private route: ActivatedRoute ) { 
		this.glScheduledTransactions = this.service.getGLScheduledTransactions();

		this.pivotGridDataSource = new PivotGridDataSource(
			{
				fields: [
					{	width: 120,
						dataField: "leaseName",
						area: "row",
						// sortBySummaryField: "Total"
					},
					{	width: 120,
						dataField: "dueByYear",
						area: "row",
						// sortBySummaryField: "Total"
					}, 
					{					
						dataField: "dueByMonth",
						dataType: "string",
						area: "column"
					}, 
					{					
						dataField: "dueByDate",
						dataType: "date",
					}, 					
					{
						caption: "Total",
						dataField: "amount",
						dataType: "number",
						summaryType: "sum",
						format: "currency",
						area: "data"
					}
				],
				store : this.glScheduledTransactions
			}
		);

		this.pivotSettings = {
			showColumnGrandTotals : true,
			showRowGrandTotals : true,
			showRowTotals : false,
			showColumnTotals : false,
			showFieldPanel : true,
			showDataFields : true,
			showRowFields : true,
			showColumnFields : true,
			showFilterFields : true,
		}
	}

	ngOnInit() {
	}

	showFieldChooser() {	
		this.pivotGrid.instance.getFieldChooserPopup().show();
	}

	launchSettingsPopup() {		
		this.pivotSettingsPopupVisible = true;
	}

	closeSettingsPopup() {
		this.pivotSettingsPopupVisible = false;	
	}

	handleToggleChange(e) {
		this.pivotSettings[e.source.name] = e.checked;
	}

	portfolioChanged(e) {
		// console.log(e);
		this.portfolio = e[0];
		this.filterData();
	}

	filterData() {
		if( this.portfolio != null ) {
			this.pivotGridDataSource.filter( ["portfolio", "=", this.portfolio] );
			this.pivotGridDataSource.reload();
		} else {
			this.pivotGridDataSource.filter(null);
			this.pivotGridDataSource.reload();
		}	
	}

}
