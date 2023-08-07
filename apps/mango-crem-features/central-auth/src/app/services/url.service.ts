import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MultiContactRecordQueryParams } from "@mango/data-models/lib-data-models";

@Injectable({
  providedIn: 'root',
})
export class CentralAuthURLService {
  constructor(private activatedRoute: ActivatedRoute) {
  }

  readMutliContactQueryParams(): MultiContactRecordQueryParams {
    return {
      clientKey: this.activatedRoute.snapshot.queryParamMap.get('clientKey'),
      showMultiContactPopup: this.activatedRoute.snapshot.queryParamMap.get('showMutliContactPopup') === "true"
    }
  }

  readClientSiteRouteParam(): string {
    return this.activatedRoute.snapshot.paramMap.get('clientKey')
  }
}
