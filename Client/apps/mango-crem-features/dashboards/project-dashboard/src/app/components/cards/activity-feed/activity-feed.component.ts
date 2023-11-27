import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CardDetails } from '../../../models';
import { CardsService } from '../../../services/cards.service';
import * as fileSaver from 'file-saver-es';
import { DashboardService } from '../../../services/dashboard.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'activity-feed-card',
  templateUrl: './activity-feed.component.html',
  styleUrls: ['./activity-feed.component.scss']
})
export class ActivityFeedComponent implements OnInit, OnDestroy {

  @Input() card: CardDetails;
  private selectedFilters: string;
  @Output() cardDropEvent = new EventEmitter<any>();
  @Output() rowClickEvent = new EventEmitter<any>();
  @Input() objectType: string;
  @ViewChild("ProjectActivityFeedGrid") dataGrid: DxDataGridComponent;

  subs: Subscription[] = []

  constructor(
    private cardsService: CardsService,
    private dashboardService: DashboardService
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

  exportAllGridData(e: any) {
    this.dataGrid.instance.exportToExcel(false);
  }

  isActivityNoteAdded(cell: any) {
    return cell.data.activity.toLowerCase() !== 'file upload';
  }

  isActivityFileUpload(cell: any) {
    return cell.data.activity.toLowerCase() === 'file upload';
  }

  getDescriptionCellLink(cell: any) {
    const taskIdUrl = cell.data.taskID > 0 ? `&ROTID=9&ROID=${cell.data.taskID}` : "";
    const urlLink = `/v06/Common/Notes/NotesList.aspx?OTID=1&OID=${cell.data.transactionID}${taskIdUrl}`;

    return urlLink;
  }

  downloadfile(fileInformation: any): boolean {
    this.dashboardService.getActivityFeedFile(fileInformation.data.theLink).subscribe((response: any) => {
      let blob: any = new Blob([response], { type: "application/octet-stream" });
      fileSaver.saveAs(blob, fileInformation.data.description);
    }), (error: any) => console.log('Error downloading the file', error);
    return false;
  }

  getCardData() {
    this.subs.push(this.cardsService.getCardDetails(this.card, this.selectedFilters).subscribe(
      (data: any) => {
        this.card.dispCard = true;
      }
    ));
  }

  getProjectName() {
    return this.objectType + ' Name';
  }

  getProjectType() {
    return this.objectType + ' Type';
  }

  public adaAttributes(e) {
    setTimeout(() => {
      const spanElements = e.element.querySelectorAll('.dx-header-filter.dx-header-filter-empty');
      if (spanElements) {
        spanElements.forEach((spanElement, index) => {
          const caption = e.component.columnOption(index, 'caption');
          spanElement.setAttribute('aria-label', 'Show filter options for column ' + caption);
          spanElement.setAttribute('role', 'button');
          spanElement.setAttribute('aria-haspopup', 'dialog');
        });
      }
    });
  };

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

