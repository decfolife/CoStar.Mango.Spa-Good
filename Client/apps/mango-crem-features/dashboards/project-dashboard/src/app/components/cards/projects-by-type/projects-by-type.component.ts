import { Component, ContentChild, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DxChartComponent } from 'devextreme-angular/ui/chart';
import { stringify } from 'querystring';
import { CardDetails } from '../../../models';
import { CardsService } from '../../../services/cards.service';
import { CardContentDirective } from '../cardContent.directive';

@Component({
  selector: 'projects-by-type-card',
  templateUrl: './projects-by-type.component.html',
  styleUrls: ['./projects-by-type.component.scss'],
  providers: [ CardContentDirective ],
})
export class ProjectsByTypeComponent implements OnInit {
  @Input() card: CardDetails;
  private selectedFilters : string;
  @Input() objectType: string;
  @ViewChild('ProjectsByTypeChart', { static: false }) chart: DxChartComponent;
  
  @ContentChild(CardContentDirective, { read: TemplateRef })
  cardContent: TemplateRef<any>;
  displayChart: boolean = false;
  
  constructor(
    private cardsService: CardsService,
  ) { }

  ngOnInit(): void {
    this.cardsService.filterString$.subscribe(data => {
      this.selectedFilters = data;
      this.getCardData();
    });
  }

  renderChart() {
    if(this.chart !== undefined) {
      this.chart.instance.render();
    }
  }

  exportAllGridData(e: any) {
    this.chart.instance.exportTo('ProjectsByTypeChart', 'png');
  }

  // public getFilteredData(selectedFilters: string){
  //   console.log("AR$$$ received filters from parent component: ", selectedFilters);
  //   this.selectedFilters = selectedFilters;
  //   this.getCardData();
  // }

  getCardData() {
    this.displayChart = false;
    this.cardsService.getCardDetails(this.card, this.selectedFilters).subscribe(
      (data: any) => {;
        this.card.dispCard = true;
        setTimeout(()=>{ this.displayChart = true; }, 0);
        this.renderChart();
      }
    );
  }  
}
