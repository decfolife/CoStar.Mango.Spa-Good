export abstract class Environment {
  abstract readonly production: boolean;
  abstract readonly name: string;
  abstract readonly appUrls: {
    readonly accounting: string;
    readonly listpages: string;   
    readonly dashboards: string;
    readonly authenticate: string;
    readonly authentication: string;
    readonly authorization: string;
    readonly taskApproval: string;
    readonly userMaintenance: string;
    readonly formWizard: string;
    readonly quickSearch: string;
    readonly dataSetDictionary: string;
    readonly userService: string;
    readonly header: string;
  };
  abstract readonly isRestful: boolean;
  abstract readonly CAUrl?: string;
  abstract readonly mangoSpaUrl?: string;
}
