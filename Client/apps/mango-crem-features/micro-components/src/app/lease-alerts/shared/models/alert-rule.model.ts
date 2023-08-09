export interface AlertRule {
  alertRuleID: number;
  alertRuleSeverityID: number;
  alertTypeID: number;
  ruleName: string;
  ruleCode: string;
  description: string;
  isDismissable: boolean;
}
