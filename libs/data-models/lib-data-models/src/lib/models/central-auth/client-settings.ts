export interface ClientSettings {
    ClientKey: string;
    ActionAt: string;
    IsActive: boolean;
    Action: string;
    ActionBy: string;
    PasswordMinLength: number;
    PasswordExpiresInDays: number;
    ForceSSO: boolean;
    SSOProdUri: string;
    SSOStageUri: string;
    SSOUri: string;
    SSOProdLogoutUri: string;
    SSOStageLogoutUri: string;
    IsSSOEnabled: boolean;
}