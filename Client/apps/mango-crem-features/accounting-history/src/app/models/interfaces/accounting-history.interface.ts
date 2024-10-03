export interface AccountingHistory {
    groupBy?: string;
    action?: string;
    displayName?: string;
    beforeChange?: string;
    afterChange?: string;
    description?: string;
    lastModified?: Date | null;
    lastModifiedBy?: string;
  }