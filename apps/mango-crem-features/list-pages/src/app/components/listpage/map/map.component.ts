import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

import { MapDataRequest } from '../shared/models/map-data-request';
import { Marker } from '../shared/models/marker';
import { ListPageService } from '../core/services/listpage.service';

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
    popupTitle: 'Information'
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

  constructor(public service: ListPageService) { }

  ngOnInit() {
    const request: MapDataRequest = {
      objectTypeId: +this.objectTypeId,
      objectIds: this.oIds
    };

    this.service.getMarkerList(request).subscribe(res => {
      if (!res.success) {
        this.showErrorPopup(res.clientErrorMessage);
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
      .find(x => x.goToUrl.indexOf('Go to') > -1)
      .goToUrl.split('Go to');

    this.objectTypeText = labelList[1].replace('</a>', '').replace(' ', '');

    const bounds = new google.maps.LatLngBounds();

    this.markerList.forEach(marker => {
      if (marker.zoomOnMapUrl) {
        bounds.extend(new google.maps.LatLng(marker.latitude, marker.longitude));

        this.markers.push({
          position: {
            lat: marker.latitude,
            lng: marker.longitude
          },
          title: marker.name,
          info: this.getMarkerContent(marker, true)
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
    this.popupInfo.popupMessage = message;
    this.popupInfo.popupVisible = true;
    this.popupInfo.popupTitle = 'Error';
  }
}
