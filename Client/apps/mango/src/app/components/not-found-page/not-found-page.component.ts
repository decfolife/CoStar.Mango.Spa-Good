import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MangoAppFacade } from '../../+state/app/app.facade';

@Component({
  selector: 'mango-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent implements OnInit {
  constructor(public routerLocation: Location, private facade: MangoAppFacade) {}

  ngOnInit(): void {
      if (this.routerLocation.path().includes('/v06')) {
        this.facade.setLoading(true)
      }
  }
}
