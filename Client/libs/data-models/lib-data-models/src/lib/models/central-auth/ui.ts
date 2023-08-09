import { ContactRecord } from "./contact-record";

export interface ContactRecordSelection {
    contactRecord: ContactRecord,
    defaultSelection: ContactRecord,
    isDefaultChanged: boolean
}

export interface MultiContactRecordQueryParams {
    clientKey: string;
    showMultiContactPopup: boolean;
}