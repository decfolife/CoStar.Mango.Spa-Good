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
      targetElement.setAttribute('aria-label', 'Search Filter For:  ' + event.target.value);
    }
  }


  getProjectName() {
    return this.objectType + ' Name';
  }

  adaAttr(e) {
    if (!e || !e.element) return; // Ensure that e.element exists

    const buttons = e.element.querySelectorAll(".dx-selection");
    buttons.forEach(button => {
      // Ensure button exists, has an aria-label and a class list
      if (!button || !button.hasAttribute('aria-label') || !button.classList) return;

      let SelectedPagingButton = button.getAttribute('aria-label');
      if (!SelectedPagingButton.endsWith(' Selected')) {
        SelectedPagingButton += ' Selected';
        button.setAttribute('aria-label', SelectedPagingButton);
      }

      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (!button.classList.contains('dx-selection')) {
            const currentAriaLabel = button.getAttribute('aria-label');
            if (currentAriaLabel && currentAriaLabel.endsWith(' Selected')) {
              const newAriaLabel = currentAriaLabel.slice(0, -9); // Remove ' Selected' from the end of the string
              button.setAttribute('aria-label', newAriaLabel);
            }
          }
        });
      });
      observer.observe(button, { attributeFilter: ['class'] });
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }
}

