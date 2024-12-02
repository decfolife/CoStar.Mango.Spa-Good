export interface ReactivationObjectType {
  objectTypeID: number;
  objectType: string;
}

export interface ReactivationUpdateListRequest {
  objectIds: number[];
  objectTypeId: number;
}
export interface ReactivationListRequest {
  ObjectTypeId: number;
  PortfolioId: number;
  IsPremiseHidden: number;
}
