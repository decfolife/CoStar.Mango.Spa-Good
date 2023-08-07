import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService } from '../../shared/services/endpoint.service';

@Injectable()
export class ObjectMaintenanceService extends EndpointService {
  constructor(protected http: HttpClient) {
    super(http);
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
    if (environment.isRestful) {
      const url = `${environment.appUrls.objectMaintenance}objectmaintenance/objecttype`;
      return this.callHttpGet(url, 'GetObjectTypes')
    }
    const url = `${environment.appUrls.objectMaintenance}ObjectType`;
    return this.callHttpGet(url, 'GetObjectTypes')
  }

  private getPageData(objectTypeId: number) : any {
    if (environment.isRestful) {
      const url = `${environment.appUrls.objectMaintenance}objectmaintenance/${objectTypeId}`;
      return this.callHttpGet(url, 'GetFilteredObjectList')
    }
    const url = `${environment.appUrls.objectMaintenance}GetObjectList`;
    return this.callHttpGet(url, 'GetObjectList', { objectTypeId: objectTypeId })
  }

  private getFilteredPageData(objectTypeId: number, statusFilterVal: number) : any {
    if (environment.isRestful) {
      const url = `${environment.appUrls.objectMaintenance}objectmaintenance/${objectTypeId}/${statusFilterVal}`;
      return this.callHttpGet(url, 'GetFilteredObjectList')
    }
    const url = `${environment.appUrls.objectMaintenance}GetFilteredObjectList`;
    return this.callHttpGet(url, 'GetFilteredObjectList', { objectTypeId: objectTypeId, statusFilterVal: statusFilterVal })
  }
}
