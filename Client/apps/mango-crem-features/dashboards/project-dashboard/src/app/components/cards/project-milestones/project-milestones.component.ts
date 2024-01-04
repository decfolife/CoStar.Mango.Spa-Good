import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { Subscription } from 'rxjs';
import { CardDetails } from '../../../models';
import { CardsService } from '../../../services/cards.service';

@Component({
  selector: 'project-milestones-card',
  templateUrl: './project-milestones.component.html',
  styleUrls: ['./project-milestones.component.scss']
})
export class ProjectMilestonesComponent implements OnInit, OnDestroy {

  @Input() card: CardDetails;
  private selectedFilters: string;
  @Output() cardDropEvent = new EventEmitter<any>();
  @Output() rowClickEvent = new EventEmitter<any>();
  @Input() objectType: string;
  @ViewChild('projectMilestones', { static: false }) grid: DxDataGridComponent;

  public checked: boolean = false;

  subs: Subscription[] = []
  constructor(
    private cardsService: CardsService
  ) { }

  ngOnInit(): void {
    this.subs.push(this.cardsService.filterString$.subscribe(data => {
      this.selectedFilters = data;
      this.getCardData();
    }));
  }

  rowClick(e: any) {
    this.rowClickEvent.emit(e);
  }

  toggle() {
    this.checked = !this.checked;
    this.grid.instance.repaint();
  }

  searchFilter(e) {
    this.grid.instance.searchByText(e);
  }

  getCardData() {
    this.subs.push(this.cardsService.getCardDetails(this.card, this.selectedFilters).subscribe(
      (data: any) => {
        this.card.dispCard = true;
      }
    ));
  }

  onKeyUpEvent(event) {
    const targetElement = event.target as HTMLElement;
    if (targetElement.nodeName.toLowerCase() == "input") {
      targetElement.setAttribute('aria-label', 'Search Filter For - ' + event.target.value + ' applied');
    }
  }


  getProjectName() {
    return this.objectType + ' Name';
  }

  adaAttr(e) {
    if (!e || !e.element) return;
    let buttons;
    if (e.element[0])
      buttons = e.element[0].querySelectorAll(".dx-selection");
    else 
      buttons = e.element.querySelectorAll(".dx-selection");
    
    buttons.forEach(button => {
      if (!button || !button.hasAttribute('aria-label') || !button.classList) return;
        button.setAttribute('aria-current', 'page');
    
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (!button.classList.contains('dx-selection')) {
            button.removeAttribute('aria-current');
          }
        });
      });
      observer.observe(button, { attributeFilter: ['class'] });
    });
  }

  adaAttrNoDataGrid(e:any) {
    let noDataEl = e.element.querySelector(".dx-empty");
    let spanChild = null;

    // Check if noDataEl exists
    if (noDataEl) {
        spanChild = noDataEl.querySelector(".dx-datagrid-nodata");
    }

    // If either element is missing, exit the function
    if (!noDataEl || !spanChild) {
        return;
    }

    noDataEl.setAttribute("role", "row");
    spanChild.setAttribute("role", "gridcell");
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }
}

