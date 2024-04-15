import { Injectable } from '@angular/core';
import { EndpointService, UtilitiesService } from '@mango/core-shared/lib-core-shared';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { AlertRuleUpdate } from '../models';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable({ providedIn: 'root' })
export class AlertsRulesService extends EndpointService {
  alertsUrl: string = UtilitiesService.getBaseApiUrl(Api.alerts)

  getUserModuleRights() {
    return this.callHttpGet(`${this.alertsUrl}alerts/GetUserModuleRights`, 'getUserModuleRights');
  }

  getAlertTypes() {
    return this.callHttpGet(`${this.alertsUrl}alerts/GetAlertTypes`, 'getAlertTypes');
  }

  getAlertRuleSeverities() {
    return this.callHttpGet(
      `${this.alertsUrl}alerts/GetAlertRuleSeverities`, 'getAlertRuleSeverities'
    );
  }

  getAlertRules(OTID: number) {
      return this.callHttpGet(`${this.alertsUrl}alerts/GetAlertRules/${OTID}`, 'getAlertRules');
  }

  updateAlertRules(rules: AlertRuleUpdate[]) {
      return this.callHttpPost(
        `${this.alertsUrl}alerts/UpdateAlertRules`, 'updateAlertRules', JSON.stringify(rules)
      );
  }

  getIsAlertDismissedReasonRequired(objectTypeId: number) {
      return this.callHttpGet(
        `${this.alertsUrl}alerts/IsAlertDismissedReasonRequired/ObjectType/${objectTypeId}`,
        'isDismissReasonRequired'
      );
  }

  toggleAlertDismissedReasonIsRequired(objectTypeId: number) {
      return this.callHttpGet(
        `${this.alertsUrl}alerts/ToggleAlertDismissedReasonIsRequired/ObjectType/${objectTypeId}`,
        'toggleReasonRequired'
      );
  }
}
