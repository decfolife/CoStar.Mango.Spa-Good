export class AlertRule {
  alertRuleID: number;
  alertRuleSeverityID: number;
  alertTypeID: number;
  legacyExceptionID: number;
  objectTypeID: number;

  description: string;
  ruleCode: string;
  ruleName: string;
  ruleSQL: string;

  isActive: boolean;
  isDismissable: boolean;

  lastRunTime: Date | null;

  constructor(id: number, legacyID: number, OTID: number, name: string,
    desc: string, code: string, typeID: number, severityID: number,
    dismissable: boolean, active: boolean, sql: string, lastRun: Date
  ) {
    this.alertRuleID = id;
    this.legacyExceptionID = legacyID;
    this.objectTypeID = OTID;
    this.ruleName = name;
    this.description = desc;
    this.ruleCode = code;
    this.alertTypeID = typeID;
    this.alertRuleSeverityID = severityID;
    this.isDismissable = dismissable;
    this.isActive = active;
    this.ruleSQL = sql;
    this.lastRunTime = lastRun;
  }
}
