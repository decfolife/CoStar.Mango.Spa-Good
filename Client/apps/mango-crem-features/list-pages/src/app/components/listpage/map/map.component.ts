import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

import { MapDataRequest } from '../shared/models/map-data-request';
import { Marker } from '../shared/models/marker';
import { ListPageService } from '../core/services/listpage.service';
import { ListPageObjectTypeSession } from '../shared/models/listpage-session';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() objectTypeId: number;
  @Input() oIds: string;

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;

  markerList: Marker[];
  objectTypeText = '';

  markers: any[] = [];
  infoContent = '';

  faCaretLeft = faCaretLeft;
  faCaretRight = faCaretRight;

  popupInfo = {
    popupVisible: false,
    popupMessage: '',
    popupTitle: 'Information',
  };

  zoom = 12;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 0,
  };
  sortColumns: any = [];
  sortFieldName: string = '';
  sortListOrder: string = '';
  sortVisibleColumns: any = [];

  constructor(public service: ListPageService) {}

  ngOnInit() {
    const listPageSessionKey: string = 'ListPageState';
    if (sessionStorage.getItem('ListPageState') !== null) {
      const listPageSessionValue = sessionStorage.getItem(listPageSessionKey);
      if (listPageSessionValue !== null) {
        const listPageObjectTypeSessions = JSON.parse(
          listPageSessionValue
        ) as ListPageObjectTypeSession[];
        const currentViewByObjectTypeId = listPageObjectTypeSessions
          .filter((x) => (x.objectTypeId = this.objectTypeId))
          .slice(-1);
        const currentListView = JSON.parse(
          currentViewByObjectTypeId[0].currentListView
        ).view;
        this.sortColumns = JSON.parse(currentListView).columns;
      }
    }

    const request: MapDataRequest = {
      objectTypeId: +this.objectTypeId,
      objectIds: this.oIds,
    };

    this.service.getMarkerList(request).subscribe((res) => {
      //res.success = true;
      if (res === null || (res.success !== null && !res.success)) {
        this.showErrorPopup('Error Loading Map\n' + res.clientErrorMessage);
        this.markerList = [];

        return;
      }
      this.markerList = res.data.mapMarkers;
      if (res.data?.length === 0) {
        this.showErrorPopup('No map markers found.');

        return;
      }
      this.loadMap();
    });
  }

  loadMap() {
    const labelList = this.markerList
      .find((x) => x.goToUrl.indexOf('Go to') > -1)
      .goToUrl.split('Go to');

    this.objectTypeText = labelList[1].replace('</a>', '').replace(' ', '');

    const bounds = new google.maps.LatLngBounds();

    const visibleSortColumns = this.sortColumns.filter(
      (x) => x.visible === true && x.sortOrder
    );
    //JSON.parse(currentListView).columns.filter(x=>x.visible===true&&x.sortOrder)
    for (let i = 0; i < visibleSortColumns.length; i++) {
      if (visibleSortColumns[i].sortOrder) {
        this.sortFieldName = visibleSortColumns[i].dataField;
        this.sortListOrder = visibleSortColumns[i].sortOrder;
        break;
      }
    }

    this.markerList.sort((a, b) => {
      switch (this.sortFieldName) {
        case 'TransactionName':
        case 'CompanyName':
        case 'BuildingName': {
          if (this.sortListOrder === 'asc') {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return -1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
          } else if (this.sortListOrder === 'desc') {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return 1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return -1;
            }
          }
          break;
        }
        case 'BuildingAddress_1': {
          if (this.sortListOrder === 'asc') {
            if (a.address1.toLowerCase() < b.address1.toLowerCase()) {
              return -1;
            }
            if (a.address1.toLowerCase() > b.address1.toLowerCase()) {
              return 1;
            }
          } else if (this.sortListOrder === 'desc') {
            if (a.address1.toLowerCase() < b.address1.toLowerCase()) {
              return 1;
            }
            if (a.address1.toLowerCase() > b.address1.toLowerCase()) {
              return -1;
            }
          }
          break;
        }
        case 'TransactionLocation1':
        case 'BuildingCountry': {
          if (this.sortListOrder === 'asc') {
            if (a.country.toLowerCase() < b.country.toLowerCase()) return -1;
            if (a.country.toLowerCase() > b.country.toLowerCase()) return 1;
          } else if (this.sortListOrder === 'desc') {
            if (a.country.toLowerCase() < b.country.toLowerCase()) return 1;
            if (a.country.toLowerCase() > b.country.toLowerCase()) return -1;
          }
          break;
        }
        case 'Project_VP_ProjectID':
        case 'NonVPLeaseID':
        case 'LeaseAbstractID':
        case 'BuildingID': {
          if (this.sortListOrder === 'asc') {
            if (a.objectId < b.objectId) return -1;
            if (a.objectId > b.objectId) return 1;
          } else if (this.sortListOrder === 'desc') {
            if (a.objectId < b.objectId) return 1;
            if (a.objectId > b.objectId) return -1;
          }
          break;
        }
        case 'BuildingAddress_2':
        case 'BuildingCity':
        case 'BuildingState':
        case 'BuildingZipCode': {
          if (this.sortListOrder === 'asc') {
            if (a.address2.toLowerCase() < b.address2.toLowerCase()) return -1;
            if (a.address2.toLowerCase() > b.address2.toLowerCase()) return 1;
          } else if (this.sortListOrder === 'desc') {
            if (a.address2.toLowerCase() < b.address2.toLowerCase()) return 1;
            if (a.address2.toLowerCase() > b.address2.toLowerCase()) return -1;
          }
          break;
        }
        default:
          break;
      }
    });

    this.markerList.forEach((marker) => {
      if (marker.zoomOnMapUrl) {
        bounds.extend(
          new google.maps.LatLng(marker.latitude, marker.longitude)
        );

        this.markers.push({
          position: {
            lat: marker.latitude,
            lng: marker.longitude,
          },
          title: marker.name,
          info: this.getMarkerContent(marker, true),
        });
      }
    });

    setTimeout(() => {
      this.map.fitBounds(bounds);
    }, 200);
  }

  getMarkerContent(marker: Marker, isOnMap: boolean): string {
    let content = isOnMap && marker.name ? `<b>${marker.name}</b>` : '';
    content += !isOnMap && marker.address1 ? marker.address1 : '';
    content += isOnMap && marker.address1 ? `<br>${marker.address1}` : '';
    content += marker.address2 ? `<br>${marker.address2}` : '';
    content += marker.country ? `<br>${marker.country}` : '';
    content += marker.redirectorUrl
      ? `<br><a href="${marker.redirectorUrl}">${this.objectTypeText}</a>`
      : '';

    return content;
  }

  zoomOnMap(marker: Marker) {
    this.map.panTo(new google.maps.LatLng(marker.latitude, marker.longitude));
    this.zoom = 15;
  }

  openInfo(marker: MapMarker, content: string) {
    this.infoContent = content;
    this.info.position = marker.position;

    this.info.open(marker);
  }

  getStringFromHtml(text: string) {
    const html = text;
    const div = document.createElement('div');

    div.innerHTML = html;

    return div.textContent || div.innerText || '';
  }

  showErrorPopup(message: string) {
    if (message && message.length > 0) {
      this.popupInfo.popupMessage = message;
      this.popupInfo.popupVisible = true;
      this.popupInfo.popupTitle = 'Error';
    }
  }
}
