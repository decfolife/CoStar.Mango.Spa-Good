export interface UserAuth {
    email: string;
    hasMultipleSites?: boolean;
    clientKey: string;
    isAutoProvisioned: boolean;
    contactId?: number;
    isServiceAccount?: boolean;
    isRemUser?: boolean;
}

export interface LoginResponse {
    user: UserAuth;
    authToken: string;
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