import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { PortfolioDashboardService } from '../../../../services/portfolio-dashboard.service';
import { PortfolioDataService } from '../../../../services/portfolio-data.service';

@Component({
  selector: 'expiring-leases-options-grid',
  templateUrl: './expiring-leases-options-grid.component.html',
  styleUrls: ['./expiring-leases-options-grid.component.scss']
})
export class ExpiringLeasesOptionsGridComponent implements OnInit {

	@Input() leaseId : number;
	leaseOptions : any[];
	public dataRetrieved: boolean = false;

	@ViewChild("leaseOptionssGrid") dataGrid: DxDataGridComponent;

	constructor(private portfolioDashboardService: PortfolioDashboardService,
		private portfolioDataService: PortfolioDataService) {}	

	ngOnInit() {
		this.dataRetrieved = false;
		this.portfolioDashboardService.getLeaseOptionsByLease(this.leaseId).subscribe(
			(res: any) => {
				const resultsData = Array.isArray(res.data) ? res.data.map((r, index) => ({...r, gridIndex: index})) : res.data;
				this.leaseOptions = resultsData;
				this.dataRetrieved = true;
			}
		);
	}

	detailRowClick(e: any) {
		e.event.stopPropagation();
	}

}
