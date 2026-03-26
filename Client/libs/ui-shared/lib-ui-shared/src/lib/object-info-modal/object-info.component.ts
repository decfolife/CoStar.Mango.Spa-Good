import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AccordionModule,
  CardModule,
  CremPopupComponent,
} from '@mango/ui-shared/lib-ui-elements';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Subscription } from 'rxjs';
import { ObjectActionsService } from 'apps/mango-crem-features/object-actions/src/app/components/object-actions/object-actions.service';

@Component({
  selector: 'crem-object-info',
  standalone: true,
  imports: [CommonModule, CardModule, CremPopupComponent, AccordionModule],
  templateUrl: './object-info.component.html',
  styleUrls: ['./object-info.component.scss'],
  providers: [ObjectActionsService],
})
export class ObjectInfoComponent implements OnInit, OnDestroy {
  // Internal state derived from breadcrumbs
  OTID: number = 0;
  OID: number = 0;
  NavPageId: number = 0;
  subs: Subscription[] = [];
  modalTitle = 'Object Info';
  isLoading = true;
  isError = false;
  data = {};

  constructor(
    private mangoAppFacade: MangoAppFacade,
    private objectService: ObjectActionsService
  ) {}
  ngOnInit(): void {
    this.subs.push(
      this.mangoAppFacade.breadcrumbs$.subscribe((breadcrumbs) => {
        if (breadcrumbs && breadcrumbs.length > 0) {
          const lastCrumb = breadcrumbs[breadcrumbs.length - 1];
          this.OTID = lastCrumb.params.otid;
          this.OID = lastCrumb.params.oid;
          this.NavPageId = lastCrumb.params.navpageid;
          this.subs.push(
            this.objectService
              .getObjectInfo(this.OID, this.OTID, this.NavPageId)
              .subscribe((res) => {
                if (res && res.success && res.data) {
                  this.data = res.data;
                  this.isLoading = false;
                } else {
                  console.error('Failed to fetch object info:', res);
                  this.isError = true;
                  this.isLoading = false;
                }
              })
          );
        } else {
          this.isError = true;
          this.isLoading = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  listFormat(text: string): string[] {
    if (!text) return [];
    const parts = text.split('|');

    return parts;
  }
}
