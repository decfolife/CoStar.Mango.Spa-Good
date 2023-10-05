import { Injectable } from '@angular/core';
import { EndpointService } from '@mango/core-shared/lib-core-shared';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { AlertRuleUpdate } from '../models';

@Injectable({ providedIn: 'root' })
export class AlertsRulesService extends EndpointService{

  getUserModuleRights() {
    return this.callHttpGet(`${environment.appUrls.alertsRules}/GetUserModuleRights`, 'getUserModuleRights');
  }

  getAlertTypes() {
    return this.callHttpGet(`${environment.appUrls.alertsRules}/GetAlertTypes`, 'getAlertTypes');
  }

  getAlertRuleSeverities() {
    return this.callHttpGet(
      `${environment.appUrls.alertsRules}/GetAlertRuleSeverities`, 'getAlertRuleSeverities'
    );
  }

  getAlertRules(OTID: number) {
      return this.callHttpGet(`${environment.appUrls.alertsRules}/GetAlertRules/${OTID}`, 'getAlertRules');
  }

  updateAlertRules(rules: AlertRuleUpdate[]) {
      return this.callHttpPost(
        `${environment.appUrls.alertsRules}/UpdateAlertRules`, 'updateAlertRules', JSON.stringify(rules)
      );
  }

  getIsAlertDismissedReasonRequired(objectTypeId: number) {
      return this.callHttpGet(
        `${environment.appUrls.alertsRules}/IsAlertDismissedReasonRequired/ObjectType/${objectTypeId}`,
        'isDismissReasonRequired'
      );
  }

  toggleAlertDismissedReasonIsRequired(objectTypeId: number) {
      return this.callHttpGet(
        `${environment.appUrls.alertsRules}/ToggleAlertDismissedReasonIsRequired/ObjectType/${objectTypeId}`,
        'toggleReasonRequired'
      );
  }
}
