export class AlertRuleSeverity {
  alertRuleSeverityID: number;
  ruleSeverityLevel: number;

  ruleSeverityName: string;
  description: string;

  constructor(id: number, level: number, name: string, desc: string) {
    this.alertRuleSeverityID = id;
    this.ruleSeverityLevel = level;
    this.ruleSeverityName = name;
    this.description = desc;
  }
}
