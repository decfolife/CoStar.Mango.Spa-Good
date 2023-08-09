import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, GLEvent, GLScheduledTransaction } from '../../app.service';
import { FormControl } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { DxDataGridComponent } from "devextreme-angular";

@Component({
  selector: 'expense-revenue',
  templateUrl: './expense-revenue.component.html',
  styleUrls: ['./expense-revenue.component.scss'],
  providers : [Service]
})
export class ExpenseRevenueComponent implements OnInit {

	leaseId : Number;
	glEvents : GLEvent[];
	filteredGLEvents : GLEvent[];
	glScheduledTransactions : GLScheduledTransaction[] = [];
	isExpanded : Boolean = false;
	searchText : string = null;
	chargeTypes : any;
	chargeType : string = "AP";
	portfolio : string = null;
	filterBuilderVisible : Boolean = false;
	appliedFilterCount : Number = 0;
	showClearFilters : Boolean = false;

	@Input() isLease : Boolean = false;
	@ViewChild("expensesContainerDataGrid") dataGrid: DxDataGridComponent;
	@ViewChild('expenseMoreMenuTrigger') expenseMoreMenuTrigger : MatMenuTrigger;
	
	constructor(private service : Service, private router: Router, private route: ActivatedRoute) { 
	}

	ngOnInit() {
		if( this.isLease ) {
			this.route.parent.parent.params.subscribe(params => { this.leaseId = params['lease_id']; }); 
			this.glEvents = this.service.getGLEventsByLease(this.leaseId);			
		} else {
			this.glEvents = this.service.getGLEvents();
		}

		this.glEvents.sort((a,b) => (a.startDate > b.startDate) ? 1 : -1);	

		this.filterGLEvents(this.chargeType);

		this.chargeTypes = [
			{ 	value : 'Charge Type',
				display : 'Charge Type',
				disabled : true
			},
			{ 	value : 'AP',
				display : 'Expenses'
			},
			{	value : 'AR',
				display : 'Revenue'
			}
		]			
	}

	toggleExpanded () {
		this.isExpanded = !this.isExpanded;
	}

	toggleExpenseMoreMenu(e) {		
		e.event.preventDefault();		
	}

	exportDataGrid() {
		this.dataGrid.instance.exportToExcel(false);
	}

	showColumnChooser() {
		this.dataGrid.instance.showColumnChooser();
	}

	searchDataGrid(e) {
		this.dataGrid.instance.searchByText(e);
	}

	showFilterBuilder() {
		this.filterBuilderVisible = true;
	}

	calculateAppliedFilterCount(event) {
		let filters = this.dataGrid.instance.getCombinedFilter(true);
		let filterArrays = [];
		let filterProperties = [];
		if( filters ){	
			if( this.searchText != null && this.searchText != "" ){
				filterArrays = filters[2].filter(itm => typeof itm === 'object' && itm.constructor === Array);
			} else {
				filterArrays = filters.filter(itm => typeof itm === 'object' && itm.constructor === Array);
			}

			if( filterArrays.length == 0 ) {
				filterProperties.push(filters[0]);
			} else {
				filterArrays.forEach(function(itm) {
					if( !filterProperties.includes(itm[0][0])) {
						filterProperties.push(itm[0][0]);
					}
				});		
			}			

			this.appliedFilterCount = filterProperties.length;
		} else {
			this.appliedFilterCount = 0;
		}		
	}

	toggleClearFilters() {
		this.showClearFilters = !this.showClearFilters;
	}

	clearGridFilters(e) {
		e.stopPropagation();
		this.dataGrid.instance.clearFilter();
		this.showClearFilters = false;
		this.searchText = null;
	}

	filterGLEvents(e) {
		if( this.portfolio != null ) {
			this.filteredGLEvents = this.glEvents.filter( gle => gle.accountType == this.chargeType && gle.portfolio == this.portfolio);	
		} else {
			this.filteredGLEvents = this.glEvents.filter( gle => gle.accountType == this.chargeType );	
		}		
	}

	portfolioChanged(e) {
		// console.log(e);
		this.portfolio = e[0];
		this.filterGLEvents(e[0]);
	}

	fetchScheduledTransactions(e) {
		if( e.rowType == "data" ){
			// get the GL Event ID of the clicked row
			let selectedRowKey = e.key;
			let glEventId = e.key.glEventID;
			// get the scheduled transactions for the GL Event
			let glEvent = this.filteredGLEvents.find(gle => gle.glEventID == glEventId)
			glEvent.transactions = this.service.getGLScheduledTransactionsByGLEvent(glEventId);
						
			// expand/collapse the row
			if (this.dataGrid.instance.isRowExpanded(selectedRowKey)) {
	            this.dataGrid.instance.collapseRow(selectedRowKey);
	        } else {
	            this.dataGrid.instance.expandRow(selectedRowKey);
	        }
	    }
	}	
		
}
