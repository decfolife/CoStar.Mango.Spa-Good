import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { CardDetails } from '../../../models';
import { PortfolioDataService } from '../../../services/portfolio-data.service';
import { PortfolioDashboardService } from '../../../services/portfolio-dashboard.service';
import * as fileSaver from 'file-saver-es';
import { Router } from '@angular/router';
import { environment } from '../../../../../../../../mango/src/environments/environment.local';
import { Subscription } from 'rxjs';
import { ExportDevexDatagridService } from '@mango/core-shared';

@Component({
  selector: 'portfolio-activity-feed-card',
  templateUrl: './portfolio-activity-feed.component.html',
  styleUrls: ['./portfolio-activity-feed.component.scss'],
})
export class PortfolioActivityFeedComponent implements OnInit, OnDestroy {
  @Input() card: CardDetails;
  private selectedFilters: string;
  @Output() cardDropEvent = new EventEmitter<any>();
  @Output() rowClickEvent = new EventEmitter<any>();

  public isGridExpanded: boolean = false;
  @ViewChild('ActivityFeedGrid') dataGrid: DxDataGridComponent;

  subs: Subscription[] = [];
  constructor(
    private router: Router,
    private exportToExcelService: ExportDevexDatagridService,
    private portfolioDashboardService: PortfolioDashboardService,
    private portfolioDataService: PortfolioDataService
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.portfolioDataService.filterString$.subscribe((data) => {
        this.selectedFilters = data;
        this.getCardData();
      })
    );
  }

  rowClick(e: any) {
    this.router.navigate(['/v06/Forms/RenderForm.aspx'], {
      queryParams: {
        oid: e.data.objectId,
        otid: e.data.objectTypeID,
        ottid: e.data.objectTypeTypeID,
      },
    });
  }

  filter(e, cardId) {
    this.card.filterInitialValue = e[0];
    this.getCardData();
  }

  getCardData() {
    this.subs.push(
      this.portfolioDataService
        .getCardDetails(this.card, this.selectedFilters)
        .subscribe((data: any) => {
          this.card.dispCard = true;
        })
    );
  }

  expandAllGridData(e: any) {
    this.card.moreOptions.isExpanded = e;
  }

  exportAllGridData() {
    this.exportToExcelService.exportToExcel(
      this.dataGrid.instance,
      'Portfolio_Activity_Feed'
    );
  }

  isActivityNoteAdded(cell: any) {
    return cell.data.activity.toLowerCase() !== 'file upload';
  }

  isActivityFileUpload(cell: any) {
    return cell.data.activity.toLowerCase() === 'file upload';
  }

  getDescriptionCellLink(cell: any) {
    const urlLink = `/v06/Common/Notes/NotesList.aspx?OTID=${cell.data.objectTypeID}&OID=${cell.data.objectId}&OTTID=${cell.data.objectTypeTypeID}`;
    this.router.navigateByUrl(urlLink);
  }

  downloadfile(fileInformation: any): boolean {
    this.subs.push(
      this.portfolioDashboardService
        .getActivityFeedFile(fileInformation.data.theLink)
        .subscribe(
          (response: any) => {
            let blob: any = new Blob([response], {
              type: 'application/octet-stream',
            });
            fileSaver.saveAs(blob, fileInformation.data.description);
          },
          (error: any) => console.log('Error downloading the file', error)
        )
    );
    return false;
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
