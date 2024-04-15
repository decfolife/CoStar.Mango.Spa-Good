import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable()
export class ObjectMaintenanceService extends EndpointService {
  objectMaintenanceUrl: string = UtilitiesService.getBaseApiUrl(Api.header)
  
  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  // Page Data from GET VM
  private _pageData = new BehaviorSubject<any>(null);
  pageData$ = this._pageData.asObservable();

  // Dropdown of the different object types
  private _objectTypeDropdownData = new BehaviorSubject<any>(null);
  objectTypeDropdownData$ = this._objectTypeDropdownData.asObservable();

  // Loading indicator that can be called by the service layer
  private _loading = new BehaviorSubject<boolean>(true);
  isLoading$ = this._loading.asObservable();


  onPageLoad(objectTypeID) {
    // Loading is assumed to be TRUE at this point
    this.getObjectTypeOptions().subscribe(options => {
      this._objectTypeDropdownData.next(options);

      const objectTypeItem = options.data.find((objectType) => {
        return objectType.intValue === objectTypeID
      })

      if (!objectTypeItem) {
        objectTypeID = options.data[0].intValue;
      }
      const objectType = objectTypeID;

      this.getPageData(objectType).subscribe(result => {
        this._pageData.next(result);
        this._loading.next(false);
      });
    });
  }

  onObjectTypeChange(objectTypeId: number) {
    this._loading.next(true);

    this.getPageData(objectTypeId).subscribe(result => {
      this._pageData.next(result);
      this._loading.next(false);
    })
  }

  onStatusFilterChangeChange(objectTypeTypeId: number, statusFilterId: number) {
    this._loading.next(true);

    this.getFilteredPageData(objectTypeTypeId, statusFilterId).subscribe(result => {
      this._pageData.next(result);
      this._loading.next(false);
    })
  }

  private getObjectTypeOptions() {
    const url = `${this.objectMaintenanceUrl}objectmaintenance/objecttype`;
    return this.callHttpGet(url, 'GetObjectTypes')
  }

  private getPageData(objectTypeId: number) : any {
    const url = `${this.objectMaintenanceUrl}objectmaintenance/${objectTypeId}`;
    return this.callHttpGet(url, 'GetFilteredObjectList')
  }

  private getFilteredPageData(objectTypeId: number, statusFilterVal: number) : any {
    const url = `${this.objectMaintenanceUrl}objectmaintenance/${objectTypeId}/${statusFilterVal}`;
    return this.callHttpGet(url, 'GetFilteredObjectList')
  }
}
