// Converted from \VirtualPremise.Domain.Web.UI\1 - Main\v06\VirtualPremise.Domain.VPObjects\BLL\Contact

declare interface Contact {
    clientPreferences: any[];
    companyID: number;
    companyTypeID: number;
    contactActive: boolean;
    contactConsolidatedEmails: boolean;
    contactCurrency: number;
    contactDatesEU: boolean;
    contactEmailAddress: string;
    contactFirstName: string;
    contactFound: boolean;
    contactGroup: string;
    contactGroups: ContactGroup[];
    contactID: number;
    contactLastName: string;
    contactMiddleName: string;
    contactPublic: boolean;
    contactSuffix: string;
    createdBy: number;
    dateCreated: string;
    isTemporaryContact: boolean;
    lastModified: string;
    lastModifiedBy: number;
    objectSubTypeTypeID: number;
    securityLevelID: number;
}