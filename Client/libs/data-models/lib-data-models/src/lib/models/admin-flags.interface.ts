export interface AdminFlags {
    databaseName : string;
    databaseServer : string;
    lastCurrencyUpdate: string;
    useBatchReporting: boolean;
    useAutoLoadReminders: boolean;
    isEnlist: boolean;
    useNRTDataSets: boolean;
    active: boolean;
    useCentralAuthentication: boolean;
    useSegmentsFeature: boolean;
    useInAppDisclosuresFeature: boolean;
    isRedirectorActive: boolean;  
    useLeasePaymentsFeature: boolean;
    isCachedClient: boolean;   
}