import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MangoAppFacade } from '../+state/app/app.facade';
import { filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CurrentProjectIdMonitorService implements OnDestroy {
  private queryParamsSubscription: Subscription;
  constructor(private route: ActivatedRoute, private facade: MangoAppFacade) {
    this.queryParamsSubscription = this.route.queryParams
      .pipe(
        filter((params) => !!params && !!params.oid),
        tap((params) => {
          const projectId = parseInt(params.oid);
          this.setProjectId(projectId);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  setProjectId(projectId: number) {
    this.facade.setCurrentProjectId(projectId);
  }
}
