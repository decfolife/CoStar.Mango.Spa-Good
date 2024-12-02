import { Component, ViewChild } from '@angular/core';
import { ObjectReactivationService } from './../../services/object-reactivation.service';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  ReactivationListRequest,
  ReactivationObjectType,
  ReactivationUpdateListRequest,
} from '../../../../../../../libs/data-models/lib-data-models/src/lib/models/object-reactivation/reactivation-object-type';
import { ReactivationClientPreferences } from '../../../../../../../libs/data-models/lib-data-models/src/lib/models/object-reactivation/reactivation-client-preferences';
import { DxDataGridComponent, DxDataGridModule } from 'devextreme-angular';

import { CommonModule } from '@angular/common';
import {
  ButtonModule,
  InputLabelComponent,
  CardModule,
  DescriptionsComponent,
  DropdownModule,
  DropdownComponent,
  PageHeaderComponent,
  SearchComponent,
  ToastComponent,
  NoObjectsFoundComponent,
  CremToastService,
} from '@mango/ui-shared/lib-ui-elements';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { ToastState } from '../../../../../../../libs/data-models/lib-data-models/src';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { Router } from '@angular/router';
import { TooltipModule } from '../../../../../../../libs/ui-shared/lib-ui-elements/src/lib/tooltip';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    InputLabelComponent,
    NoObjectsFoundComponent,
    DropdownModule,
    DxDataGridModule,
    ButtonModule,
    PageHeaderComponent,
    DescriptionsComponent,
    SearchComponent,
    ToastComponent,
    TooltipModule,
  ],
  selector: 'app-object-reactivation',
  templateUrl: './object-reactivation.component.html',
  styleUrls: ['./object-reactivation.component.scss'],
})
export class ObjectReactivationComponent {
  @ViewChild('ReactivationDataGrid', { static: false })
  reactivationDataGrid: DxDataGridComponent;
  @ViewChild(DropdownComponent) cremDropdownComponent: DropdownComponent;
  externalCremLink: string;
  public pageTitle = 'Reactivate Objects';
  objectTypeId: number = 3;
  selectedItemIds: any = [];
  subs: Subscription[] = [];
  reactivationDataList: any[];
  filteredData: ReactivationObjectType[];
  clientPreferences: ReactivationClientPreferences;
  IsPremiseHidden: number = 0;
  public selectedFilter?: ReactivationObjectType;
  toolTipData: any;
  reactivateButtonCaption: string;

  constructor(
    private objectReactivationService: ObjectReactivationService,
    private toastService: CremToastService,
    private facade: MangoAppFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reactivateButtonCaption = ` Reactivate `;
    this.facade.clientKey$.subscribe((clientKey) => {
      this.externalCremLink = `${environment.cremBaseUrl.replace(
        '[CLIENT]',
        clientKey
      )}/v06/Admin/AdminHome2.aspx`;
    });
    this.subs.push(
      this.objectReactivationService
        .getFilterData()
        .pipe(
          switchMap((res: any) => {
            if (res == null) {
              return of(false);
            }
            if (res.success) {
              const filterItems = res.data;
              filterItems.sort((a, b) => {
                const typeNameA = a.objectType.toUpperCase();
                const typeNameB = b.objectType.toUpperCase();
                if (typeNameA < typeNameB) {
                  return -1;
                }
                if (typeNameA > typeNameB) {
                  return 1;
                }
                return 0;
              });

              this.filteredData = filterItems;
              this.selectedFilter = this.filteredData.find(
                (item) => item.objectTypeID === this.objectTypeId
              );
              //console.log(this.filteredData);
              //console.log(this.selectedFilter);
            }
            return this.objectReactivationService.getClientPreferences();
          }),
          switchMap((cp: any) => {
            if (cp == null) {
              return of(false);
            }

            if (cp.success) {
              this.clientPreferences = cp.data as ReactivationClientPreferences;
              this.IsPremiseHidden = this.clientPreferences
                ? this.clientPreferences.clientSetupFieldValue
                : 0;
              this.getToopTipData();
            }

            const req: ReactivationListRequest = {
              IsPremiseHidden: this.IsPremiseHidden,
              PortfolioId: 0,
              ObjectTypeId: this.objectTypeId,
            };

            return this.objectReactivationService.getReactivationList(req);
          })
        )
        .subscribe((cpRes: any) => {
          this.reactivationDataList = cpRes;
          //console.log(this.reactivationDataList);
        })
    );
  }

  onFilterChange(e: any[]): void {
    const filterBy: any = e?.[0]?.value || e?.[0];
    if (this.selectedFilter !== filterBy) {
      this.selectedFilter = filterBy;
      this.reactivationDataGrid.instance.clearFilter();
      //this.reactivationDataList = [];
      const req: ReactivationListRequest = {
        IsPremiseHidden: this.IsPremiseHidden,
        PortfolioId: 0,
        ObjectTypeId: filterBy.objectTypeID,
      };
      this.filterReactivationData(req);
      this.getToopTipData();
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  private filterReactivationData(req: ReactivationListRequest) {
    this.subs.push(
      this.objectReactivationService
        .getReactivationList(req)
        .subscribe((reactivationdata: any) => {
          this.reactivationDataList = reactivationdata;
        })
    );
  }
  private getToopTipData() {
    //this.selectedFilter?.objectTypeID
    this.toolTipData = `Reactivating a Building will only reactivate that Building.</br>`;
    if (this.IsPremiseHidden === 0) {
      this.toolTipData += `Reactivating a Premise will also reactivate any associated Buildings.</br>`;
      this.toolTipData += `Reactivating a Lease will also reactivate any associated Premises and Buildings.</br>`;
    } else {
      this.toolTipData += `Reactivating a Lease will also reactivate any associated Buildings.</br>`;
    }
    if (this.selectedFilter) {
      switch (this.selectedFilter?.objectTypeID) {
        case 2: //"PremiseID"
          const regexPStr = /Premise/gi;
          this.toolTipData = (this.toolTipData as string).replace(
            regexPStr,
            this.selectedFilter?.objectType
          );
          break;
        case 3: //BuildingID
          const regexBStr = /Building/gi;
          this.toolTipData = (this.toolTipData as string).replace(
            regexBStr,
            this.selectedFilter?.objectType
          );
          break;
        case 4: //LeaseAbstractID
          const regexLStr = /Lease/gi;
          this.toolTipData = (this.toolTipData as string).replace(
            regexLStr,
            this.selectedFilter?.objectType
          );
          break;
      }
    }
  }

  overrideOnContentReady(e) {
    if (this.selectedFilter?.objectTypeID === 3) {
      this.reactivationDataGrid.instance.columnOption(
        'BuildingMasterGroupID',
        'visible',
        false
      );
    }
  }

  searchDataGrid(searchText: string): void {
    this.reactivationDataGrid?.instance?.searchByText(searchText);
  }

  reactivateSelectedObjects() {
    const selectedItems = this.selectedItemIds; //this.reactivationDataGrid.selectedRowKeys;
    var result: any = [];
    if (this.selectedFilter) {
      switch (this.selectedFilter?.objectTypeID) {
        case 2: //"PremiseID"
          result = selectedItems.map((a) => a.PremiseID);
          break;
        case 3: //BuildingID
          result = selectedItems.map((a) => a.BuildingID);
          break;
        case 4: //LeaseAbstractID
          result = selectedItems.map((a) => a.LeaseAbstractID);
          break;
        case 5: //ContactID
          result = selectedItems.map((a) => a.ContactID);
          break;
        case 7: //ReportID
          result = selectedItems.map((a) => a.ReportID);
          break;
        case 11: //CompanyID
          result = selectedItems.map((a) => a.CompanyID);
          break;
      }
      this.selectedItemIds = result;
      if (this.selectedItemIds.length > 0) {
        const reqlist: ReactivationUpdateListRequest = {
          objectIds: this.selectedItemIds,
          objectTypeId: this.selectedFilter?.objectTypeID,
        };
        this.subs.push(
          this.objectReactivationService
            .updateReactivationListRecords(reqlist)
            .subscribe((res: any) => {
              if (res.success) {
                //alert('updated successfully');
                const msgString =
                  this.selectedItemIds.length > 1
                    ? 'Objects successfully reactivated.'
                    : 'Object successfully reactivated.';
                const successMessage = `${this.selectedItemIds.length} ${this.selectedFilter?.objectType} ${msgString}`;
                this.toastService.show(
                  successMessage,
                  'Reactivation Objects',
                  ToastState.SUCCESS,
                  {
                    maxWidth: '500px',
                    duration: 5000,
                    closeOnClick: true,
                  }
                );

                const req: ReactivationListRequest = {
                  IsPremiseHidden: this.IsPremiseHidden,
                  PortfolioId: 0,
                  ObjectTypeId: this.selectedFilter?.objectTypeID ?? 0,
                };
                this.filterReactivationData(req);
              } else {
                const errorMessage = `Unable to save selected reactivation ${this.selectedFilter?.objectType} Objects, Please try again.`;
                this.toastService.show(
                  errorMessage,
                  'Reactivation Objects',
                  ToastState.ERROR,
                  {
                    maxWidth: '500px',
                    duration: 5000,
                    closeOnClick: true,
                  }
                );
              }
            })
        );
      }
    }
  }

  resetSelectedObjects() {
    this.reactivationDataGrid.instance.clearSelection();
  }

  onSelectionChanged({
    selectedRowKeys,
  }: DxDataGridTypes.SelectionChangedEvent) {
    this.selectedItemIds = selectedRowKeys;
    const objTxt = this.selectedItemIds?.length <= 1 ? `Object` : `Objects`;
    if (this.selectedItemIds?.length == 0) {
      this.reactivateButtonCaption = ` Reactivate `;
    } else {
      this.reactivateButtonCaption = ` Reactivate ${this.selectedItemIds?.length} ${objTxt} `;
    }
  }
}
