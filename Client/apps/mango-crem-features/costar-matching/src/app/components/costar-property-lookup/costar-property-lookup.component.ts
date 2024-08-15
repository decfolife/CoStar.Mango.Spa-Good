import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { DxDataGridModule, DxDataGridComponent } from 'devextreme-angular';
import { CostarMatchingService } from '../../services/costar-matching.service';
import { CoStarProperty, ToastState, BuildingInfo, Description, ObjectType, SecurityType } from '@mango/data-models/lib-data-models';
import { ButtonModule, CardModule, DescriptionsComponent, PageHeaderComponent, SearchComponent, ToastComponent, NoObjectsFoundComponent, CremToastService } from '@mango/ui-shared/lib-ui-elements';
import { map, switchMap } from 'rxjs/operators';

@Component({
  standalone: true,
  imports: [CommonModule, CardModule, NoObjectsFoundComponent, DxDataGridModule, ButtonModule, PageHeaderComponent, DescriptionsComponent, SearchComponent, ToastComponent],
  selector: 'app-costar-property-lookup',
  templateUrl: './costar-property-lookup.component.html',
  styleUrls: ['./costar-property-lookup.component.scss']
})
export class CostarPropertyLookupComponent {
  @ViewChild('PropertiesGrid', { static: false }) propertiesGrid: DxDataGridComponent;
  properties: CoStarProperty[] = [];
  buildingId: number;
  buildingInfo: BuildingInfo;
  propertyDescriptions: Description[] = [];
  userHasPageAccess: boolean = true;
  userHasAddRights: boolean = false;
  userHasViewRights: boolean = true;
  redirectUrl: String = '';
  subs: Subscription[] = [];
  customSelection = false;
  navPageId: any = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private costarMatchingService: CostarMatchingService,
    private toastService: CremToastService
  ) {
  }

  ngOnInit(): void {
    this.navPageId = this.route.snapshot.queryParamMap.get('navpageid');
    this.subs.push(
      this.costarMatchingService.getUserCoStarMatchingPageRight({ "navPageId": this.navPageId }).pipe(
        switchMap((response: boolean) => {
          if (!response) {
            this.userHasPageAccess = false;
            return of(false);
          }
          return this.costarMatchingService.getUserCoStarMatchingModuleRight({ "objectTypeId": ObjectType.COSTAR_MATCHING });
        }),
        switchMap((securityType: SecurityType) => {
          this.userHasAddRights = securityType > SecurityType.VIEW;
          this.userHasViewRights = securityType >= SecurityType.VIEW;

          if (!this.userHasViewRights)
            return of(securityType);

          this.subs.push(
            this.route.queryParams.subscribe(queryParam => {
              this.buildingId = queryParam['oid'];
              this.redirectUrl = `/crem/costar-matching/costar-integration?oid=${this.buildingId}`;
            }));

          return this.costarMatchingService.getBuildingInfo(this.buildingId);
        }),
        switchMap((buildingInfo: BuildingInfo) => {
          this.buildingInfo = buildingInfo;

          if (this.buildingInfo.costarID) {
            this.router.navigateByUrl(this.redirectUrl.toString());
          }

          if (!this.userHasViewRights)
            return of(buildingInfo);

          this.CompileBuildingInfo();
          return this.costarMatchingService.getMatchedCostarProperty(this.getMatchCostarPropertyRequest())

        }),
      ).subscribe((properties: CoStarProperty[]) => {
        this.properties = properties;
      })
    );
  }

  onSelectionChanged(e: any) {
    if (this.customSelection) return;

    this.customSelection = true;
    e.component.selectRows(e.currentSelectedRowKeys[0], false);
    this.customSelection = false;
  }

  searchCostarProperties(searchText: string): void {
    this.buildingInfo.buildingAddress_1 = searchText;

    this.subs.push(
      this.costarMatchingService.getMatchedCostarProperty(this.getMatchCostarPropertyRequest()).pipe(
        map((properties: CoStarProperty[]) => { this.properties = properties; })
      ).subscribe()
    );
  }

  saveCostarInfo() {
    const selectedBuilding = this.propertiesGrid.selectedRowKeys[0];
    const request = {
      "costarID": selectedBuilding.coStarID,
      "buildingID": this.buildingId,
      "coStarAddress": selectedBuilding.coStarAddress,
      "matchConfidence": selectedBuilding.confidenceScore,
      "multiMatch": selectedBuilding.multiMatch,
    }
    this.subs.push(
      this.costarMatchingService.updateBuildingRecord(request)
        .subscribe(result => {
          if (result.success) {
            this.toastService.show('Redirecting to CoStar Data...', 'Successfully Matched', ToastState.SUCCESS, {
              position: 'bottom center',
              maxWidth: '360px'
             })
            setTimeout(() => { this.router.navigateByUrl(this.redirectUrl.toString()); }, 3000);
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }

  onGridCellKeyDown(e) {
    if (e.event.keyCode == 13)   //13 enter/return; 9 tab
    {
      const index = e.component.option('focusedRowIndex');
      e.component.selectRowsByIndexes(index);
    }
  }

  private CompileBuildingInfo() {
    const address = `${this.buildingInfo?.buildingAddress_1} ${this.buildingInfo?.buildingAddress_2 ?? ''}${this.buildingInfo?.buildingAddress_2 ? ',' : ''} ${this.buildingInfo?.buildingCity}${this.buildingInfo?.buildingCity ? ',' : ''} 
      ${this.buildingInfo?.buildingState ?? ''}${this.buildingInfo?.buildingState ? ' ' : ''}${this.buildingInfo?.buildingZipCode ?? ''}${this.buildingInfo?.buildingZipCode ? ',' : ''} ${this.buildingInfo?.buildingCountry ?? ''}`;

    this.propertyDescriptions.push({ key: 'Building Name', value: this.buildingInfo?.buildingName ? this.buildingInfo.buildingName : '' });
    this.propertyDescriptions.push({ key: 'Property Address', value: address });
    this.propertyDescriptions.push({ key: 'Status', value: this.buildingInfo?.buildingActive ? 'Active' : 'Inactive' });
  }


  private getMatchCostarPropertyRequest() {
    return {
      "addressStreet": this.buildingInfo.buildingAddress_1 ?? '',
      "address2": this.buildingInfo.buildingAddress_2 ?? '',
      "city": this.buildingInfo.buildingCity ?? '',
      "state": this.buildingInfo.buildingState ?? '',
      "zip": this.buildingInfo.buildingZipCode ?? '',
      "countryCode": this.buildingInfo.buildingCountry ?? '',
    };
  }
}

