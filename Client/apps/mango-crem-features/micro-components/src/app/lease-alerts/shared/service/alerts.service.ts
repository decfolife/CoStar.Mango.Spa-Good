/* eslint-disable no-prototype-builtins */
import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '../../../../../../../mango/src/environments/environment.local';
import { LeaseAlertFilter, LeaseAlertToggleDTO } from '../models';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { EndpointService } from '@mango/core-shared';

const LEASE_OTID = 4;

@Injectable({ providedIn: 'root' })
export class AlertsService extends EndpointService {
  isEuroDateFormat = false;

  private apiUrl: string;

  private readonly OBJECT_TYPE_ID = 4;

  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
    this.apiUrl = environment.appUrls.alerts;
  }

  getUserModuleRights() {
    return this.callHttpGet(
      `${this.apiUrl}/GetUserModuleRights`,
      'getUserModuleRights'
    );
  }

  getPortfolios() {
    if (environment.isRestful) {
      return this.callHttpGet(
        `${environment.appUrls.listpages}Portfolios`,
        'getPortfolios'
      );
    }

    return this.callHttpPost(
      `${environment.appUrls.listpages}GetPortfolios`,
      'getPortfolios',
      ''
    );
  }

  getRedirectorLinkList() {
    if (environment.isRestful) {
      return this.callHttpGet(
        `${environment.appUrls.listpages}RedirectorLinkList`,
        'redirectorLinkList'
      );
    }

    return this.callHttpPost(
      `${environment.appUrls.listpages}GetRedirectorLinkList`,
      'redirectorLinkList',
      ''
    );
  }

  getAlertTypes() {
    return this.callHttpGet(`${this.apiUrl}/GetAlertTypes`, 'getAlertTypes');
  }

  getAlertRuleSeverities() {
    return this.callHttpGet(
      `${this.apiUrl}/GetAlertRuleSeverities`,
      'getAlertRuleSeverities'
    );
  }

  getAlertRules() {
    if (environment.isRestful) {
      return this.callHttpGet(
        `${this.apiUrl}/GetAlertRules/${this.OBJECT_TYPE_ID}`,
        'getAlertRules'
      );
    }

    return this.callHttpGet(`${this.apiUrl}/GetAlertRules`, 'getAlertRules', {
      objectTypeId: this.OBJECT_TYPE_ID,
    });
  }

  getUndismissedLeaseAlertsStats(leaseAbstractID: number) {
    if (environment.isRestful) {
      return this.callHttpGet(
        `${this.apiUrl}/GetUndismissedLeaseAlertsStats/LeaseAbstractID/${leaseAbstractID}`,
        'getUndismissedLeaseAlertsStatsByLeaseAbstractID'
      );
    }

    return this.callHttpGet(
      `${this.apiUrl}/GetUndismissedLeaseAlertsStatsByLeaseAbstractID`,
      'getUndismissedLeaseAlertsStatsByLeaseAbstractID',
      { leaseAbstractID: leaseAbstractID }
    );
  }

  filterLeaseAlerts(
    leaseAlertFilter: LeaseAlertFilter,
    pageNumber: number = 1
  ) {
    leaseAlertFilter.pageNumber = pageNumber;

    if (environment.isRestful) {
      return this.callHttpPost(
        `${this.apiUrl}/SearchLeaseAlerts`,
        'searchLeaseAlerts',
        JSON.stringify(leaseAlertFilter)
      );
    }

    return this.callHttpPost(
      `${this.apiUrl}/SearchLeaseAlerts`,
      'searchLeaseAlerts',
      JSON.stringify({ leaseAlertFilters: leaseAlertFilter })
    );
  }

  runLeaseAlertRulesByLeaseAbstractID(leaseAbstractID: number) {
    if (environment.isRestful) {
      return this.callHttpGet(
        `${this.apiUrl}/RunLeaseAlertRules/LeaseAbstractID/${leaseAbstractID}`,
        'runLeaseAlertRulesByLeaseAbstractID'
      );
    }

    return this.callHttpGet(
      `${this.apiUrl}/RunLeaseAlertRulesByLeaseAbstractID`,
      'runLeaseAlertRulesByLeaseAbstractID',
      { leaseAbstractID: leaseAbstractID }
    );
  }

  toggleLeaseAlertsIsDismissed(leaseAlerts: LeaseAlertToggleDTO) {
    if (environment.isRestful) {
      return this.callHttpPost(
        `${this.apiUrl}/ToggleLeaseAlertsIsDismissed`,
        'toggleLeaseAlertsIsDismissed',
        JSON.stringify(leaseAlerts)
      );
    }

    return this.callHttpPost(
      `${this.apiUrl}/ToggleLeaseAlertsIsDismissed`,
      'toggleLeaseAlertsIsDismissed',
      JSON.stringify({ leaseAlerts: leaseAlerts })
    );
  }

  getIsAlertDismissedReasonRequired() {
    if (environment.isRestful) {
      return this.callHttpGet(
        `${this.apiUrl}/IsAlertDismissedReasonRequired/ObjectType/${LEASE_OTID}`,
        'isDismissReasonRequired'
      );
    }

    return this.callHttpGet(
      `${this.apiUrl}/IsAlertDismissedReasonRequired`,
      'isDismissReasonRequired',
      { objectTypeId: LEASE_OTID }
    );
  }

  getAlertDismissReasons() {
    if (environment.isRestful) {
      return this.callHttpGet(
        `${this.apiUrl}/GetAlertDismissReasons/ObjectTypeID/${LEASE_OTID}`,
        'getAlertDismissReasons'
      );
    }

    return this.callHttpGet(
      `${this.apiUrl}/GetAlertDismissReasons`,
      'getAlertDismissReasons',
      { objectTypeId: LEASE_OTID }
    );
  }
}
