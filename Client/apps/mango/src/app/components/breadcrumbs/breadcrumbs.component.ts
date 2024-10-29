import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { filter, tap } from 'rxjs/operators';
import { BreadCrumb } from '@mango/data-models/lib-data-models';

@Component({
  selector: 'mango-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public delineator = '»';
  public breadcrumbs: BreadCrumb[];
  public tempCrumbs: BreadCrumb[];
  subs: Subscription = new Subscription();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.subs.add(
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          tap((_) => {
            this.breadcrumbs = [];
            let currentRoute = this.activatedRoute.snapshot;
            let url = '';
            while (currentRoute) {
              const breadcrumb = currentRoute.data.breadCrumb;
              url +=
                '/' + currentRoute.url.map((segment) => segment.path).join('/');
              if (breadcrumb && breadcrumb.label) {
                const breadCrumb: BreadCrumb = {
                  label: breadcrumb.label,
                  url: url,
                  params: currentRoute.queryParams,
                };
                if (breadcrumb && breadcrumb.label && currentRoute.component) {
                  if (breadcrumb.append) {
                    if (this.tempCrumbs && this.tempCrumbs.length) {
                      if (this.tempCrumbs.length == 5) {
                        this.tempCrumbs.shift();
                      }
                      this.breadcrumbs = [...this.tempCrumbs];
                      this.tempCrumbs = [];
                    }
                  }
                  this.breadcrumbs.push(breadCrumb);
                }
              }
              currentRoute = currentRoute.firstChild;
            }
            this.tempCrumbs = this.breadcrumbs;
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
