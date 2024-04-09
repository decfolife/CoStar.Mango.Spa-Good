export interface UserAuth {
    userId: number;
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
    userId: string;
    email: string;
    securityLevel: string;
    contactId?: string;
    clientKey?: string;
    isAutoProvisioned: string;
    hasMultipleSites?: string;
    isServiceAccount?: string;
    token: string;
    exp: number;
}