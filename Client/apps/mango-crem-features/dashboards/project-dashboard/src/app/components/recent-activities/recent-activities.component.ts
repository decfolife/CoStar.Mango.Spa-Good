import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SearchComponent } from '@mango/ui-shared/cosmos';
import { CardsService } from '@project-dashboard/services/cards.service';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { DxDataGridComponent } from 'devextreme-angular';
import * as fileSaver from 'file-saver-es';
import { environment } from '../../../../../../../mango/src/environments/environment.local';
import { ExportDevexDatagridService } from '@mango/core-shared';

@Component({
  selector: 'recent-activities',
  templateUrl: './recent-activities.component.html',
  styleUrls: ['./recent-activities.component.scss'],
})
export class RecentActivitiesComponent implements OnInit {
  @ViewChild('RecentActivitiesGrid') recentActivitiesGrid: DxDataGridComponent;
  @ViewChild('SearchBox') searchBox: SearchComponent;

  searchText: string = '';
  recentActivitiesData: any = [];
  filterBuilderVisible: boolean = false;
  dataRetrieved: boolean = false;
  objectTypeId: number[] = [1];
  public objectType: string = 'Project';

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private exportToExcelService: ExportDevexDatagridService,
    private cardsService: CardsService
  ) {}

  ngOnInit(): void {
    this.getUserPreferences();
    const durationDays = 30;
    this.dashboardService.getRecentActivities(durationDays).subscribe(
      (res: any) => {
        const resultsData = Array.isArray(res.data)
          ? res.data.map((r, index) => ({ ...r, gridIndex: index }))
          : res.data;
        this.recentActivitiesData = resultsData;
        this.dataRetrieved = true;
        this.getObjectType();
      },
      (error: any) =>
        console.log('Error occurred getting Recent Activities: ', error),
      () => {}
    );
  }

  getUserPreferences() {
    this.dashboardService.GetUserPreferences().subscribe((res: any) => {
      if (res.success) {
        this.cardsService.setUserDateFormat(res.data.isDatesEU);
      }
    });
  }

  cellPrepared(e) {
    if (e.rowType === 'data' && e.column.dataField === 'description') {
      if (e.value && e.value.length > 100) {
        e.value = e.value.substring(0, 100) + '...';
      }
    }
  }

  searchDataGrid(data) {
    this.searchText = data;
    this.recentActivitiesGrid.instance.searchByText(data);
  }

  exportDataGrid(): void {
    this.exportToExcelService.exportToExcel(
      this.recentActivitiesGrid.instance,
      'Recent_Activities'
    );
  }

  loadState() {
    return JSON.parse(sessionStorage.getItem('recentActivitiesGridState'));
  }

  saveState(state) {
    state.searchText = '';
    sessionStorage.setItem('recentActivitiesGridState', JSON.stringify(state));
  }

  clearAllFilters() {
    this.recentActivitiesGrid.instance.clearFilter();
    this.recentActivitiesGrid.instance.searchByText(this.searchText);
  }

  getObjectType() {
    this.dashboardService
      .getObjectTypeNames(this.objectTypeId)
      .subscribe((res: any) => {
        this.objectType = res.data.find(
          (t) => t.objectTypeId == 1
        ).objectTypeName;
      });
  }

  getProjectNameLabel() {
    return this.objectType + ' Name';
  }

  getProjectDueLabel() {
    return this.objectType + ' Due';
  }

  activityRowClick(e: any) {
    if (e.rowType === 'group' || e.event.target.localName == 'crem-button') {
      return;
    }

    this.router.navigate(['/v06/Forms/RenderForm.aspx'], {
      queryParams: {
        oid: e.data.transactionID ?? e.data.transactionId,
        otid: e.data.objectTypeId,
        ottid: e.data.objectTypeTypeId,
      },
    });
  }

  isActivityNoteAdded(cell: any) {
    return (
      cell.data.activity && cell.data.activity.toLowerCase() !== 'file upload'
    );
  }

  isActivityFileUpload(cell: any) {
    return (
      cell.data.activity && cell.data.activity.toLowerCase() === 'file upload'
    );
  }

  getDescriptionCellLink(cell: any) {
    const taskIdUrl =
      cell.data.taskId > 0 ? `&ROTID=9&ROID=${cell.data.taskId}` : '';
    const urlLink = `/v06/Common/Notes/NotesList.aspx?OTID=1&OID=${cell.data.transactionId}&OTTID=${cell.data.objectTypeTypeId}${taskIdUrl}`;

    this.router.navigateByUrl(urlLink);
  }

  downloadfile(fileInformation: any): boolean {
    this.dashboardService
      .getActivityFeedFile(fileInformation.data.description)
      .subscribe((response: any) => {
        let blob: any = new Blob([response], {
          type: 'application/octet-stream',
        });
        fileSaver.saveAs(blob, fileInformation.data.activityType);
      }),
      (error: any) => console.log('Error downloading the file', error);
    return false;
  }
}
