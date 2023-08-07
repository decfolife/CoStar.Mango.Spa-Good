import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ConfigurationService } from '../../services/configuration.service';
import { PortfolioDropdownService } from '../../services/portfolio-dropdown.service';

@Component({
  selector: 'app-portfolio-dropdown',
  templateUrl: './portfolio-dropdown.component.html',
  styleUrls: ['./portfolio-dropdown.component.scss']
})
export class PortfolioDropdownComponent implements OnInit {

  public routeMasterGroupId: number;
  public portfolioName: string;
  @Output() masterGroupID: EventEmitter<any> = new EventEmitter();

  constructor(private configurations: ConfigurationService, public service: PortfolioDropdownService, public activeRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.routeMasterGroupId = +params.get('masterGroupId');
    });
    this.setPortfolioName();
    this.populatePortfolios();
  }

  masterGroupIDChanged(event): void {
    const result = this.service.portfolios.filter(obj => {
      return obj.masterGroupID === this.service.selectedPortfolioId
    })

    this.service.selectedPortfolio = result[0];

    this.masterGroupID.emit(this.service.selectedPortfolioId);
  }

  populatePortfolios(): void {
    this.service.getPortfolios()
      .subscribe(result => {
        this.service.portfolios = result;
        if (+this.routeMasterGroupId === 0) {
          this.service.selectedPortfolio = this.service.portfolios[0];
          this.service.selectedPortfolioId = this.service.portfolios[0].masterGroupID;
        }
        this.masterGroupID.emit(this.service.selectedPortfolioId);
      });
  }

  setPortfolioName(): void {
    this.portfolioName = (this.portfolioName == null ? 'Please choose' : this.portfolioName);
  }

  togglePortfolio(p: string): void {
    // Update the Selected Portfolio
    this.portfolioName = p;
    this.setPortfolioName();
  }
}
