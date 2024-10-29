export interface EventDateOptions {
  optionID: number;
  formItemID?: number;
  optionName?: string;
  optionDate?: Date;
  isFormItem?: boolean;
  isInitialExempt?: boolean;
  isBeginDateOption?: boolean;
  isEndDateOption?: boolean;
  sortOrder: number;
}
