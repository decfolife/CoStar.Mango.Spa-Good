import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MangoAppFacade } from '../../+state/app/app.facade';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'mango-not-found-page',
  templateUrl: './not-found-page.component.html',
  standalone: true,
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent implements OnInit {
  constructor(private facade: MangoAppFacade, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (this.router.url.includes('.asp')) {
      this.facade.setLoading(true)
    }
  }
}
