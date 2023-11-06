export interface UserAuth {
    authToken?: string
    email: string;
    hasMultipleSites?: boolean;
    clientKey: string;
    isAutoProvisioned: boolean;
    contactId?: number;
    isServiceAccount?: boolean;
}

export interface Token {
    email: string;
    securityLevel: string;
    contactId?: string;
    clientKey?: string;
    isAutoProvisioned: string;
    isServiceAccount?: string;
    token: string;
    exp: number;
}