import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Api, DistributionList } from '@mango/data-models/lib-data-models';
import notify from 'devextreme/ui/notify';

@Injectable({
  providedIn: 'root',
})
export class DistributionListsService extends EndpointService {
  reportsUrl: string = UtilitiesService.getBaseApiUrl(Api.reports);
  public dateFormat: string;

  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  getPeriodList(masterGroupId: number): Observable<any> {
    const url = `${this.reportsUrl}Reports/GetPeriodList/${masterGroupId}`;
    return this.callHttpGet(url, 'getPeriodList');
  }

  getDistributionListWithMembers(): Observable<any> {
    const url = `${this.reportsUrl}Reports/GetGroupListWithMembers`;
    return this.callHttpGet(url, 'getGroupListWithMembers');
  }

  deleteMembers(memberIds: number[]): Observable<any> {
    const url = `${this.reportsUrl}Reports/DeleteGroupListMembers`;
    return this.callHttpPost(url, 'deleteMembers', memberIds);
  }

  deleteDistributionLists(distributionListIds: number[]) {
    const url = `${this.reportsUrl}Reports/deleteGroupLists`;
    return this.callHttpPost(
      url,
      'deleteDistributionLists',
      distributionListIds
    );
  }

  saveDistributionList(distributionList: DistributionList): Observable<any> {
    const url = `${this.reportsUrl}Reports/SaveGroupList`;
    return this.callHttpPost(url, 'saveDistributionList', distributionList);
  }

  getModuleRights(objectType: number, securityType: number) {
    const url = `${this.reportsUrl}Reports/GetModuleRights`;
    return this.callHttpPost(url, 'getModuleRights', {
      objectType,
      securityType,
    });
  }

  getMembersList(
    search: string,
    all: boolean,
    pageSize: number,
    pageNumber: number
  ): Observable<any> {
    const url = `${this.reportsUrl}Reports/GetMembersList`;
    return this.callHttpPost(url, 'getMembersList', {
      search,
      all,
      pageSize,
      pageNumber,
    });
  }

  displayContactSystemAdminMessage() {
    this.errorNotify(
      'An error occurred please contact the system administrator.'
    );
  }

  public setUserDateFormat(isDatesEU: boolean) {
    this.dateFormat = isDatesEU ? 'dd.MM.yyyy' : 'MM/dd/yyyy';
  }

  errorNotify(message: string) {
    this.notifyPopup(message, 'error');
  }

  successNotify(message: string) {
    this.notifyPopup(message, 'success');
  }

  private notifyPopup(message: string, messageType: string) {
    notify({
      message: message,
      type: messageType,
      displayTime: 5000,
      position: { at: 'right bottom', my: 'right bottom', offset: '-16 -16' },
      maxWidth: '400px',
      closeOnClick: true,
    });
  }
}
