import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { ObjectSecurityRightsService } from '../../services/object-security-rights.service';
import {
  Condition,
  getObjectSecurityRightsColumns,
  getFilter,
} from '../utilities/object-security-rights-columns-utility';
import { ObjectSecurityRights } from '../../models/interfaces/object-security-rights.interface';
import {
  ButtonModule,
  CremPopupComponent,
  CremToastService,
  PageHeaderComponent,
  SimpleGridComponent,
  SimpleGridModule,
} from '@mango/ui-shared/lib-ui-elements';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { ContactPreferences } from 'libs/data-models/lib-data-models/src/lib/models/contact.interface';
import { Subscription } from 'rxjs';
import { ToastState } from '@mango/data-models/lib-data-models';
import {
  DevExtremeModule,
  DxFilterBuilderModule,
  DxLoadPanelModule,
} from 'devextreme-angular';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SearchComponent } from '@mango/ui-shared/lib-ui-elements';

@Component({
  selector: 'object-security-rights',
  templateUrl: './object-security-rights.component.html',
  styleUrls: ['./object-security-rights.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DevExtremeModule,
    DxLoadPanelModule,
    ButtonModule,
    DxFilterBuilderModule,
    CremPopupComponent,
    SearchComponent,
    PageHeaderComponent,
    SimpleGridModule,
  ],
})
export class ObjectSecurityRightsComponent implements OnInit, OnDestroy {
  @ViewChild('ObjectSecurityRightsGrid')
  objectSecurityRightsGrid: SimpleGridComponent;
  objectSecurityRights: ObjectSecurityRights[] = [];
  objectSecurityRigthsColumns: any[] = [];
  dateFormat = 'MM/dd/yyyy';
  contactPrefs: ContactPreferences;
  filter: Condition;
  subs: Subscription = new Subscription();
  showLoading: boolean = true;
  sendToExcelClicked = false;
  tabTitle: string;
  pageTitle: string;
  gridFilterValue: Condition;
  showFilterBuilderPopUp: boolean;
  searchText: string = '';
  objectId: number;
  objectTypeId: number;

  constructor(
    public objectSecurityRightsService: ObjectSecurityRightsService,
    private toastService: CremToastService,
    private facade: MangoAppFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUserprefs();
    this.subs.add(
      this.route.params.subscribe((params) => {
        const queryParams = this.toLowerParams(this.route.snapshot.queryParams);
        this.objectId = Number(queryParams['oid']);
        this.objectTypeId = Number(queryParams['otid']);
        this.getTitle(this.objectId, this.objectTypeId);
      })
    );
    this.getobjectSecurityRight(this.objectId, this.objectTypeId);
    this.objectSecurityRigthsColumns = getObjectSecurityRightsColumns();
    this.filter = getFilter();
    this.gridFilterValue = this.filter;
    this.showFilterBuilderPopUp = false;
  }

  private toLowerParams(params: Params): Params {
    const lowerParams: Params = {};
    for (const key in params) {
      lowerParams[key.toLowerCase()] = params[key];
    }
    return lowerParams;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getTitle(objectID, objectTypeID) {
    this.objectSecurityRightsService
      .getObjectName(objectID, objectTypeID)
      .subscribe((objNameresponse) => {
        if (objNameresponse.success) {
          this.tabTitle = objNameresponse.data[0].objectType;
          this.pageTitle = objNameresponse.data[0].objectName;
        }
      });
  }

  getobjectSecurityRight(objectID, objectTypeID) {
    this.subs.add(
      this.objectSecurityRightsService
        .getobjectsecurityrights(objectID, objectTypeID)
        .subscribe((response) => {
          if (response.success) {
            this.objectSecurityRights = response.data;
            this.objectSecurityRights.forEach(
              (d) =>
                (d.assignedDate = formatDate(
                  d.assignedDate,
                  this.dateFormat,
                  'en-US'
                ))
            );
            this.showLoading = false;
          } else {
            this.toastService.show(
              `An error occurred, please try again.`,
              'Error',
              ToastState.ERROR,
              {
                maxWidth: '360px',
                duration: 180000,
              }
            );
          }
        })
    );
  }

  getUserprefs() {
    this.subs.add(
      this.facade.contactRecord$.subscribe(
        (contactRecord) => (this.contactPrefs = contactRecord.preferences)
      )
    );
    this.dateFormat = this.contactPrefs.contactDatesEU
      ? 'dd.MM.yyyy hh:mm:ss a'
      : 'MM/dd/yyyy hh:mm:ss a';
  }

  sendToExcelFileName(): string {
    const dateTimeStamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const fileName =
      'Security Rights_' +
      `${this.tabTitle}_${this.pageTitle}_${dateTimeStamp}`;
    return fileName;
  }

  sendToExcel(event: any): void {
    this.sendToExcelClicked = true;
    this.objectSecurityRightsGrid.exportFileName = this.sendToExcelFileName();
    this.objectSecurityRightsGrid.exportGrid();
    setTimeout(() => {
      this.sendToExcelClicked = false;
    }, 100);
  }

  apply(e) {
    this.gridFilterValue = this.filter;
    this.close(e);
  }

  onShowClick(e) {
    this.showFilterBuilderPopUp = true;
  }

  close(e) {
    this.showFilterBuilderPopUp = false;
  }

  clearFilters() {
    this.filter = [];
    this.gridFilterValue = [];
  }

  changed(data) {
    this.searchText = data;
    this.objectSecurityRightsGrid.searchDataGrid(this.searchText);
  }
}
