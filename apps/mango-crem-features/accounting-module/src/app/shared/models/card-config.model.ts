/* eslint-disable @typescript-eslint/no-explicit-any */

export interface CardConfigObject {
    // This is used to standardize the info needed to load an accounting card
    allowDrillDown: boolean;
    apiEndPoint: string;
    cardType: any;
    enableChart: boolean;
    exportFileNameOverride: string;
    fullWidth: boolean;
    id: number;
    pivotDataSource: {
        fields: any;
        store: any;
    }
    showGrandTotal: boolean;
    title: string;
    visible: boolean;
}