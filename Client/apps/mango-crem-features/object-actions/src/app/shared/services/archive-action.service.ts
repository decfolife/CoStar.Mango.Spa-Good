import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { environment } from 'apps/mango/src/environments/environment.local';
import { ApiResponse } from '@mango/data-models/lib-data-models';
import { Observable } from 'rxjs';
import { EndpointService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Injectable()
export class ArchiveActionService extends EndpointService {
  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  public checkSystemUser(contactID: number): Observable<ApiResponse> {
    let url = `${environment.appUrls.objectActions}objectActions/CheckSystemUser`;
    const param = {
      ContactId: contactID,
    };

    return this.callHttpGet(url, 'CheckSystemUser', param);
  }

  public GetCompanyVendorsCustomers(
    companyID: number
  ): Observable<ApiResponse> {
    let url = `${environment.appUrls.objectActions}objectActions/CompanyVendorsCustomers`;
    const param = {
      CompanyID: companyID,
    };
    return this.callHttpGet(url, 'CompanyVendorsCustomers', param);
  }

  public archiveContact(contactID: number): Observable<ApiResponse> {
    let url = `${environment.appUrls.objectActions}objectActions/ArchiveContact?contactID=${contactID}`;
    return this.callHttpPost(url, 'ArchiveContact' + contactID, {});
  }

  public archiveCompany(companyID: number): Observable<ApiResponse> {
    let url = `${environment.appUrls.objectActions}objectActions/ArchiveCompany?companyID=${companyID}`;
    return this.callHttpPost(url, 'ArchiveCopmany' + companyID, {});
  }

  public getContactName(contactID: number): Observable<ApiResponse> {
    let url = `${environment.appUrls.objectActions}objectActions/ContactName`;
    const param = {
      ContactId: contactID,
    };

    return this.callHttpGet(url, 'GetContactName', param);
  }

  public getBuildingsPremiseLeaseAssociations(
    leaseAbstractId,
    listType,
    isPremiseHidden = 0
  ): Observable<ApiResponse> {
    let url = `${environment.appUrls.objectActions}objectActions/GetBuildingsPremiseLeaseAssociations`;
    let param = {
      LeaseAbstractId: leaseAbstractId,
      ListType: listType,
      IsPremiseHidden: isPremiseHidden,
    };

    return this.callHttpGet(url, 'GetBuildingsPremiseLeaseAssociations', param);
  }

  public getBuildingPremiseArchiveData(
    buildingId,
    premiseId,
    listType,
    isPremiseHidden = 0
  ): Observable<ApiResponse> {
    let url = `${environment.appUrls.objectActions}objectActions/GetBuildingPremiseArchiveData`;
    let param = {
      BuildingId: buildingId,
      PremiseId: premiseId,
      ListType: listType,
      IsPremiseHidden: isPremiseHidden,
    };

    return this.callHttpGet(url, 'GetBuildingPremiseArchiveData', param);
  }

  public archiveBuildingPremiseLease(
    buildingId,
    premiseId,
    leaseId,
    isPremiseHidden
  ): Observable<ApiResponse> {
    let url = `${environment.appUrls.objectActions}objectActions/ArchiveBuildingPremiseLease`;
    let param = {
      BuildingId: buildingId,
      PremiseId: premiseId,
      LeaseId: leaseId,
      isPremiseHidden: isPremiseHidden,
    };

    return this.callHttpPost(
      url,
      'GetBuildingsPremiseLeaseAssociations',
      param
    );
  }
}
