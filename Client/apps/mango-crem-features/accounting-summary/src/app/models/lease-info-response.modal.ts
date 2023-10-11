export interface LeaseInfoResponse {
leaseAbstractID: number,
masterGroupID: number,
objectTypeID: number,
objectTypeTypeID: number,
objectType: string,
name: string,
beginDate: string,
endDate: string,
exchangeRateID: number,
isActive: boolean,
accountingType: string,
originalLeaseCommencementDate: string,
originalLeaseExpirationDate: string,
lockedReason: string
}