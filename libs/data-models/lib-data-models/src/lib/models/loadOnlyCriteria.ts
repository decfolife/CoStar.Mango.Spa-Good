// Converted from \VirtualPremise.Domain.Web.UI\1 - Main\v06\VirtualPremise.Domain.Web\BLL

declare interface LoadOnlyCriteria {
    paramType: ParamType;
    tempPasswordGuid: string;
    userID: number;
    userName: string;
    userStatus: number;
}

declare enum ParamType {
    ById = 1,
    ByName = 2,
    ByGUID = 3
}