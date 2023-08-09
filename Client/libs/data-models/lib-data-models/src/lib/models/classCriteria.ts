// Converted from \VirtualPremise.Domain.Web.UI\1 - Main\v06\VirtualPremise.Domain.VPObjects\BLL\Company

declare interface ClassCriteria {
    criteriaType: CriteriaTypes;
    likeCompanyName: string;
    sQL: string;
    userID: number;
}

declare enum CriteriaTypes {
    ByLike,
    ByOther
}
