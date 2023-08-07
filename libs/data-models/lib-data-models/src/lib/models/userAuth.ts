export interface UserAuth {
    authToken: string;
    email: string;
    hasMultipleSites: boolean;
    clientKey: string;
    isAutoProvisioned: boolean;
    contactId?: number;
}
