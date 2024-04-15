import { Injectable } from '@angular/core';
import { EndpointService, UtilitiesService } from '@mango/core-shared/lib-core-shared';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { AlertRuleUpdate } from '../models';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable({ providedIn: 'root' })
export class AlertsRulesService extends EndpointService {
  alertsUrl: string = UtilitiesService.getBaseApiUrl(Api.alerts)

  getUserModuleRights() {
    return this.callHttpGet(`${this.alertsUrl}/GetUserModuleRights`, 'getUserModuleRights');
  }

  getAlertTypes() {
    return this.callHttpGet(`${this.alertsUrl}/GetAlertTypes`, 'getAlertTypes');
  }

  getAlertRuleSeverities() {
    return this.callHttpGet(
      `${this.alertsUrl}/GetAlertRuleSeverities`, 'getAlertRuleSeverities'
    );
  }

  getAlertRules(OTID: number) {
      return this.callHttpGet(`${this.alertsUrl}/GetAlertRules/${OTID}`, 'getAlertRules');
  }

  updateAlertRules(rules: AlertRuleUpdate[]) {
      return this.callHttpPost(
        `${this.alertsUrl}/UpdateAlertRules`, 'updateAlertRules', JSON.stringify(rules)
      );
  }

  getIsAlertDismissedReasonRequired(objectTypeId: number) {
      return this.callHttpGet(
        `${this.alertsUrl}/IsAlertDismissedReasonRequired/ObjectType/${objectTypeId}`,
        'isDismissReasonRequired'
      );
  }

  toggleAlertDismissedReasonIsRequired(objectTypeId: number) {
      return this.callHttpGet(
        `${this.alertsUrl}/ToggleAlertDismissedReasonIsRequired/ObjectType/${objectTypeId}`,
        'toggleReasonRequired'
      );
  }
}
