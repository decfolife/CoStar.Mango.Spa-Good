/* eslint-disable no-prototype-builtins */
import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '../../../../../../../mango/src/environments/environment.local';
import { LeaseAlertFilter, LeaseAlertToggleDTO } from '../models';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { Api } from '@mango/data-models/lib-data-models';

const LEASE_OTID = 4;

@Injectable({ providedIn: 'root' })
export class AlertsService extends EndpointService {
  listpagesUrl: string = UtilitiesService.getBaseApiUrl(Api.listpages);
  isEuroDateFormat = false;
  private apiUrl: string;
  private readonly OBJECT_TYPE_ID = 4;

  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
    this.apiUrl = UtilitiesService.getBaseApiUrl(Api.alerts);
  }

  getUserModuleRights() {
    return this.callHttpGet(
      `${this.apiUrl}alerts/GetUserModuleRights`,
      'getUserModuleRights'
    );
  }

  getPortfolios() {
    return this.callHttpGet(
      `${this.listpagesUrl}listpage/portfolios`,
      'getPortfolios'
    );
  }

  getRedirectorLinkList() {
    return this.callHttpGet(
      `${this.listpagesUrl}listpage/RedirectorLinkList`,
      'redirectorLinkList'
    );
  }

  getAlertTypes() {
    return this.callHttpGet(
      `${this.apiUrl}alerts/GetAlertTypes`,
      'getAlertTypes'
    );
  }

  getAlertRuleSeverities() {
    return this.callHttpGet(
      `${this.apiUrl}alerts/GetAlertRuleSeverities`,
      'getAlertRuleSeverities'
    );
  }

  getAlertRules() {
    return this.callHttpGet(
      `${this.apiUrl}alerts/GetAlertRules/${this.OBJECT_TYPE_ID}`,
      'getAlertRules'
    );
  }

  getUndismissedLeaseAlertsStats(leaseAbstractID: number) {
    return this.callHttpGet(
      `${this.apiUrl}alerts/GetUndismissedLeaseAlertsStats/LeaseAbstractID/${leaseAbstractID}`,
      'getUndismissedLeaseAlertsStatsByLeaseAbstractID'
    );
  }

  filterLeaseAlerts(
    leaseAlertFilter: LeaseAlertFilter,
    pageNumber: number = 1
  ) {
    leaseAlertFilter.pageNumber = pageNumber;

    return this.callHttpPost(
      `${this.apiUrl}alerts/SearchLeaseAlerts`,
      'searchLeaseAlerts',
      JSON.stringify(leaseAlertFilter)
    );
  }

  runLeaseAlertRulesByLeaseAbstractID(leaseAbstractID: number) {
    return this.callHttpGet(
      `${this.apiUrl}alerts/RunLeaseAlertRules/LeaseAbstractID/${leaseAbstractID}`,
      'runLeaseAlertRulesByLeaseAbstractID'
    );
  }

  toggleLeaseAlertsIsDismissed(leaseAlerts: LeaseAlertToggleDTO) {
    return this.callHttpPost(
      `${this.apiUrl}alerts/ToggleLeaseAlertsIsDismissed`,
      'toggleLeaseAlertsIsDismissed',
      JSON.stringify(leaseAlerts)
    );
  }

  getIsAlertDismissedReasonRequired() {
    return this.callHttpGet(
      `${this.apiUrl}alerts/IsAlertDismissedReasonRequired/ObjectType/${LEASE_OTID}`,
      'isDismissReasonRequired'
    );
  }

  getAlertDismissReasons() {
    return this.callHttpGet(
      `${this.apiUrl}alerts/GetAlertDismissReasons/ObjectTypeID/${LEASE_OTID}`,
      'getAlertDismissReasons'
    );
  }
}
