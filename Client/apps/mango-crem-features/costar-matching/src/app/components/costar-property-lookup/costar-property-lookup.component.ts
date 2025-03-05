import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { DxDataGridModule, DxDataGridComponent } from 'devextreme-angular';
import { CostarMatchingService } from '../../services/costar-matching.service';
import { ListPageService } from '../../../../../list-pages/src/app/components/listpage/core/services/listpage.service';
import { GoogleMapsModule } from '@angular/google-maps';
import {
  CoStarProperty,
  ToastState,
  BuildingInfo,
  Description,
  ObjectType,
  SecurityType,
} from '@mango/data-models/lib-data-models';
import {
  ButtonModule,
  CardModule,
  DescriptionsComponent,
  PageHeaderComponent,
  SearchComponent,
  ToastComponent,
  NoObjectsFoundComponent,
  CremToastService,
  CremPopupComponent,
} from '@mango/ui-shared/lib-ui-elements';
import { map, switchMap } from 'rxjs/operators';
import { CleanseAddress } from '../../../../../../../libs/data-models/lib-data-models/src';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    GoogleMapsModule,
    NoObjectsFoundComponent,
    DxDataGridModule,
    ButtonModule,
    PageHeaderComponent,
    DescriptionsComponent,
    SearchComponent,
    ToastComponent,
    CremPopupComponent,
  ],
  selector: 'app-costar-property-lookup',
  templateUrl: './costar-property-lookup.component.html',
  styleUrls: ['./costar-property-lookup.component.scss'],
  providers: [ListPageService],
})
export class CostarPropertyLookupComponent {
  @ViewChild('PropertiesGrid', { static: false })
  propertiesGrid: DxDataGridComponent;
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
  objectTypeId: any = '';
  objectTypeTypeId: any = '';
  cleanseAddress: CleanseAddress | null;
  cleanseAddress1: string = '';
  elsAddress: String = '';
  googleMapApiKey: string;
  googleMappingChannel: string;
  options: google.maps.MapOptions = {
    mapId: 'DEMO_MAP_ID',
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    zoom: 12,
    maxZoom: 20,
    minZoom: 0,
  };
  marker: any;
  noVerifiedAddressMsg: string = '';
  matchErrMsg: string = '';
  useAddressTooltip =
    'Using this address will override the address entered on the building record';
  verifyAddressTooltip = 'Verify Address';
  showUseAddressConfirmation: boolean = false;
  outsideResearchMarkets: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private costarMatchingService: CostarMatchingService,
    private listPageService: ListPageService,
    private toastService: CremToastService
  ) {}

  ngOnInit(): void {
    this.navPageId = this.route.snapshot.queryParamMap
      .get('navpageid')
      ?.split('?')[0];
    this.objectTypeId = this.route.snapshot.queryParamMap
      .get('otid')
      ?.split('?')[0];
    this.objectTypeTypeId = this.route.snapshot.queryParamMap
      .get('ottid')
      ?.split('?')[0];

    this.configGoogleMap();

    this.subs.push(
      this.costarMatchingService
        .getUserCoStarMatchingPageRight({ navPageId: this.navPageId })
        .pipe(
          switchMap((response: boolean) => {
            if (!response) {
              this.userHasPageAccess = false;
              return of(false);
            }
            return this.costarMatchingService.getUserCoStarMatchingModuleRight({
              objectTypeId: ObjectType.COSTAR_MATCHING,
            });
          }),
          switchMap((securityType: SecurityType) => {
            this.userHasAddRights = securityType > SecurityType.VIEW;
            this.userHasViewRights = securityType >= SecurityType.VIEW;

            if (!this.userHasViewRights) return of(securityType);

            this.subs.push(
              this.route.queryParams.subscribe((queryParam) => {
                this.buildingId = queryParam['oid'];
                this.redirectUrl = `/crem/costar-matching/costar-integration?oid=${this.buildingId}`;
              })
            );

            return this.costarMatchingService.getBuildingInfo(this.buildingId);
          })
        )
        .subscribe((info: BuildingInfo) => {
          if (info.costarID) {
            this.redirectUrl = `/v06/CostarIntegration/CostarIntegration.aspx?OTID=${this.objectTypeId}&OID=${this.buildingId}&OTTID=${this.objectTypeTypeId}&CostarID=${info.costarID}&navpageid=${this.navPageId}`;
            this.router.navigateByUrl(this.redirectUrl.toString());
          }

          this.displayBuildingInfo(info);
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
      this.costarMatchingService
        .getMatchedCostarProperty(this.getMatchCostarPropertyRequest())
        .pipe(
          map((properties: CoStarProperty[]) => {
            this.properties = properties;
          })
        )
        .subscribe()
    );
  }

  saveCostarInfo() {
    const selectedBuilding = this.propertiesGrid.selectedRowKeys[0];
    const request = {
      costarID: selectedBuilding.coStarID,
      buildingID: this.buildingId,
      coStarAddress: selectedBuilding.coStarAddress,
      matchConfidence: selectedBuilding.confidenceScore,
      multiMatch: selectedBuilding.multiMatch,
    };
    this.subs.push(
      this.costarMatchingService
        .updateBuildingRecord(request)
        .subscribe((result) => {
          if (result.success) {
            this.toastService.show(
              'Redirecting to CoStar Data...',
              'Successfully Matched',
              ToastState.SUCCESS,
              {
                position: 'bottom center',
                maxWidth: '360px',
              }
            );
            setTimeout(() => {
              const v06url = `/v06/CostarIntegration/CostarIntegration.aspx?OTID=${this.objectTypeId}&OID=${this.buildingId}&OTTID=${this.objectTypeTypeId}&CostarID=${selectedBuilding.coStarID}&navpageid=${this.navPageId}`;
              //this.router.navigateByUrl(this.redirectUrl.toString());
              this.router.navigateByUrl(v06url);
            }, 3000);
          }
        })
    );
  }

  verifyAddress() {
    const request = {
      streetAddress: this.buildingInfo.buildingAddress_1,
      streetType: '',
      buildingName: this.buildingInfo.buildingName,
      city: this.buildingInfo.buildingCity,
      state: this.buildingInfo.buildingState,
      postcode: this.buildingInfo.buildingZipCode,
      countryCode: this.buildingInfo.countryCode,
      latitude: '',
      longitude: '',
    };
    this.subs.push(
      this.costarMatchingService.verifyAddress(request).subscribe((result) => {
        if (result) {
          this.matchErrMsg = '';
          this.noVerifiedAddressMsg = '';
          this.cleanseAddress = result.data;
          if (!this.cleanseAddress) {
            this.noVerifiedAddressMsg =
              'Unable to verify address. Please verify all parameters have been completed (such as Street Address, City, State, Zip Code, etc.)';
            return;
          }

          this.cleanseAddress1 = [
            this.cleanseAddress?.streetNumber,
            this.cleanseAddress?.streetDirection,
            this.cleanseAddress?.streetName,
            this.cleanseAddress?.streetType,
          ]
            .filter((x) => x)
            .join(' ');
          this.elsAddress = `${this.cleanseAddress1}, ${
            this.cleanseAddress?.city
          }, ${
            this.cleanseAddress?.state
          } ${this.cleanseAddress?.postcode?.slice(0, 5)}, ${
            this.cleanseAddress?.countryCode
          } ${[
            this.cleanseAddress?.postcode?.substring(0, 5),
            this.cleanseAddress?.postcode?.substring(5, 9),
          ]
            .filter((x) => x)
            .join('-')}`;
          if (this.cleanseAddress.latitude && this.cleanseAddress.longitude) {
            this.displayGoogleMap();
          }
        } else {
          this.matchErrMsg = 'Error verifying address. Please try again.';
        }
      })
    );
  }

  confirmSaveAddress() {
    this.showUseAddressConfirmation = true;
  }

  updateBuildingAddress() {
    this.showUseAddressConfirmation = false;
    const request = {
      buildingID: this.buildingId,
      BuildingAddress_1: this.cleanseAddress1,
      BuildingCity: this.cleanseAddress?.city,
      BuildingState: this.cleanseAddress?.state,
      BuildingZipCode: [
        this.cleanseAddress?.postcode?.substring(0, 5),
        this.cleanseAddress?.postcode?.substring(5, 9),
      ]
        .filter((x) => x)
        .join('-'),
    };
    this.subs.push(
      this.costarMatchingService
        .updateBuildingAddress(request)
        .subscribe((result) => {
          if (result.success) {
            this.toastService.show(
              'Property address has been successfully updated',
              'Update Address',
              ToastState.SUCCESS,
              {
                maxWidth: '500px',
                duration: 5000,
                closeOnClick: true,
              }
            );

            setTimeout(() => {
              this.subs.push(
                this.costarMatchingService
                  .getBuildingInfo(this.buildingId)
                  .subscribe((info: BuildingInfo) => {
                    this.displayBuildingInfo(info);
                  })
              );
            }, 3000);
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  onGridCellKeyDown(e) {
    if (e.event.keyCode == 13) {
      //13 enter/return; 9 tab
      const index = e.component.option('focusedRowIndex');
      e.component.selectRowsByIndexes(index);
    }
  }

  closePopup() {
    this.showUseAddressConfirmation = false;
  }

  private displayBuildingInfo(info: BuildingInfo) {
    this.buildingInfo = info;
    this.outsideResearchMarkets =
      info?.unMatchedComments?.toLowerCase() === 'outside of research markets';
    this.properties = info.coStarMatchedProperties;
    this.CompileBuildingInfo();
  }

  private configGoogleMap() {
    this.listPageService.getGoogleMapAPIKey().subscribe((x) => {
      this.googleMapApiKey = x.data.googleMapAPIKey;
      const googleUrl = `https://maps.googleapis.com/maps/api/js?key=${this.googleMapApiKey}&loading=async&callback=initMap&libraries=marker`;
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = googleUrl;
      script.async = true;
      document.head.appendChild(script);
    });
  }

  private displayGoogleMap() {
    const center = {
      lat: Number(this.cleanseAddress?.latitude),
      lng: Number(this.cleanseAddress?.longitude),
    };

    this.options.center = center;
    this.marker = {
      position: center,
    };
  }

  private CompileBuildingInfo() {
    this.propertyDescriptions = [];
    const address = [
      this.buildingInfo?.buildingAddress_1,
      this.buildingInfo?.buildingAddress_2,
    ]
      .filter((x) => x)
      .join(' ');
    const stateZip = `${this.buildingInfo?.buildingState ?? ''} ${
      this.buildingInfo?.buildingZipCode ?? ''
    }`;
    const addressDisplay = [
      address,
      this.buildingInfo?.buildingCity ?? '',
      stateZip,
      this.buildingInfo?.buildingCountry ?? '',
    ].join(', ');

    this.propertyDescriptions.push({
      key: 'Building Name',
      value: this.buildingInfo?.buildingName
        ? this.buildingInfo?.buildingName
        : '',
      hoverText: '',
    });
    this.propertyDescriptions.push({
      key: 'Property Address',
      value: addressDisplay,
      hoverText: '',
    });
    this.propertyDescriptions.push({
      key: 'Status',
      value: this.buildingInfo?.buildingActive ? 'Active' : 'Inactive',
      hoverText: '',
    });

    const comment: string = (
      this.buildingInfo?.unMatchedComments ?? ''
    ).toLowerCase();
    if (comment.length > 0)
      this.propertyDescriptions.push({
        key: 'Unmatched Comments',
        value: this.buildingInfo?.unMatchedComments ?? '',
        hoverText: comment.includes('invalid address')
          ? 'This property could not be matched. Please verify the address is correct via the Verify Address functionality below. Additionally, there could be some discrepancies such as an invalid street number or residential address, or missing parameters (street number, state, city, ZIP, etc.).'
          : comment.includes('outside of research markets')
          ? 'We are currently only able to match properties within the United States, Canada, and the United Kingdom.'
          : comment.includes('pending research')
          ? 'This property has been sent to CoStar Research for further review.'
          : comment.includes('queued for research')
          ? 'This property was unable to be matched and is in queue for further research.'
          : '',
      });
  }

  private getMatchCostarPropertyRequest() {
    return {
      addressStreet: this.buildingInfo.buildingAddress_1 ?? '',
      address2: this.buildingInfo.buildingAddress_2 ?? '',
      city: this.buildingInfo.buildingCity ?? '',
      state: this.buildingInfo.buildingState ?? '',
      zip: this.buildingInfo.buildingZipCode ?? '',
      countryCode: this.buildingInfo.buildingCountry ?? '',
    };
  }
}
