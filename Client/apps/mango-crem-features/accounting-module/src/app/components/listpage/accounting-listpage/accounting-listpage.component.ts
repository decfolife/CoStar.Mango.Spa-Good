/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable rxjs-angular/prefer-composition */

import { Component, OnInit } from '@angular/core';
import { ListPageService } from 'apps/mango-crem-features/list-pages/src/app/components/listpage/core/services/listpage.service';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'mango-accounting-listpage',
  templateUrl: './accounting-listpage.component.html',
  styleUrls: ['./accounting-listpage.component.scss'],
})
export class AccountingListpageComponent implements OnInit {
  public googleMapAPIKey: any;
  public googleMappingChannel: any;
  public googleMapAPIKeyLoaded = false;
  public googleMappingChannelLoaded = false;

  constructor(
    private listPageService: ListPageService,
    private renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    this.listPageService.getGoogleMapAPIKey().subscribe((x) => {
      this.googleMapAPIKey = x.data.googleMapAPIKey;
      this.googleMapAPIKeyLoaded = true;
      this.listPageService.getGoogleMappingChannel().subscribe((x) => {
        this.googleMappingChannel = x.data.googleMappingChannel;
        this.googleMappingChannelLoaded = true;
        this.loadGoogleMapsAPIScript();
      });
    });
  }

  private loadGoogleMapsAPIScript() {
    const s = this.renderer2.createElement('script');
    s.type = 'text/javascript';
    s.src = `//maps.googleapis.com/maps/api/js?key=${this.googleMapAPIKey}&channel=${this.googleMappingChannel}`;
    s.text = '';
    this.renderer2.appendChild(document.body, s);
  }
}
