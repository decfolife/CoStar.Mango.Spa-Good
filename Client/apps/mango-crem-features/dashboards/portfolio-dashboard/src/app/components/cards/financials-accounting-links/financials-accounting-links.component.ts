import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CardDetails } from '../../../models';
import { PortfolioDashboardService } from '../../../services/portfolio-dashboard.service';
import { PortfolioDataService } from '../../../services/portfolio-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'financials-accounting-links-card',
  templateUrl: './financials-accounting-links.component.html',
  styleUrls: ['./financials-accounting-links.component.scss'],
})
export class FinancialsAccountingLinksComponent implements OnInit, OnDestroy {
  @Input() card: CardDetails;
  private selectedFilters: string;
  @Output() cardDropEvent = new EventEmitter<any>();
  @Output() rowClickEvent = new EventEmitter<any>();

  public dataRetrieved: boolean = false;
  public isGridExpanded: boolean = false;
  subs: Subscription[] = [];
  constructor(
    private portfolioDataService: PortfolioDataService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.portfolioDataService.filterString$.subscribe((data) => {
        this.selectedFilters = data;
        this.getCardData();
      })
    );
  }

  getCardData() {
    this.dataRetrieved = false;
    this.subs.push(
      this.portfolioDataService
        .getCardDetails(this.card, this.selectedFilters)
        .subscribe((data: any) => {
          this.card.dispCard = true;
        })
    );
  }

  returnFinancialsUrlLink(url: string) {
    if (url.toLocaleLowerCase().startsWith('v06')) {
      return '../../../' + url;
    }

    //Angular sanitizes the DOM from Cross-site Scripting and the if check is to make sure that
    //this url is the only one that contains javascript: so that it can be loaded to the dom
    if (
      url ===
      "javascript:parent.modalBoxObject = parent.modalBox.openmodal('AddExpense', 'iframe', '/v06/Financials/EnterBill.aspx?MasterGroupId=ddlPortfolio', 'Enter A Bill');"
    ) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    return '';
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
