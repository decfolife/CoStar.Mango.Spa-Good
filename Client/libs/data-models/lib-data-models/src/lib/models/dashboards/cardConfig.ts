import { Dropdown } from "@mango/data-models/lib-data-models"

export interface FormatObject {
  type: string,
  precision: number,
}

// Type guard: Checks if the given object is a Format Type
export function isFormatObject(obj: any): obj is FormatObject {
  return 'type' in obj;
}

// Sorting Object used to defined order of rows in a table
export interface SortingOrder {
  [key: string]: number,
}

/**
 * Pivot Data Type
 *
 * @typedef {Object} CardDataItem
 * @property {number|string} [AddedCount] - The count of items added.
 * @property {number|string} [closingCount] - The count of items being closed.
 * @property {string|'Total'} [DisclosureClassification] - When 'Total' is passed the data transformation will be handled differently.
 * @property {number|string} [EndedCount] - The count of items that have ended.
 * @property {string} [LeaseTemplate] - The template used for leasing.
 * @property {number|string} [OpeningCount] - The count of items being opened.
 * @property {string} Display - The display text for the card item.
 * @property {number|string} [PeriodYear] - The year or period associated with the data.
 * @property {number|string} [dataType] - The type of data (number or string).
 * @property {any} data - The actual data associated with the card item.
 * @export
 * @interface FieldConfig
 */
export type CardDataItem = {
  AddedCount?: number | string,
  closingCount?: number | string,
  DisclosureClassification?: string | 'Total',
  EndedCount?: number | string,
  LeaseTemplate?: string,
  OpeningCount?: number | string,
  Display?: string,
  PeriodYear?: number | string,
  dataType?: number | string,
  data: any,
}

/**
 * Represents the configuration for a field in a data set.
 * The key corresponds to the local parameter
 * The value corresponds to the API respond to pair with
 * @example fieldTransform: [
 *   {
 *      DisclosureClassification: 'DisclosureClassification',
 *      ...
 *   }
 * ]'
 * Where 'DisclosureClassification' is the PivotTable parameter
 * and 'DisclosureClassification' corresponds to the variable to
 * be used from the API response
 * @typedef {Object} CardDataTransformer
 */
export type CardDataTransformer = CardDataItem & object;

/**
 * Represents the configuration for a field in a data set.
 * @typedef {Object} CardConfig
 * @property {string} id - .
 * @property {string} name - .
 * @property {number} index - The index or position of the Card.
 * @property {string | FormatObject} [format] - Optional formatting information for the field.
 * @property {SortingOrder} [sortingOrder] - Optional sorting order for the field.
 * @property {Function} [sortingMethod] - Optional sorting method function for the field.
 * @property {Function} [calculateSummaryValue] - "Specifies a custom post-processing function for summary values."
 * @property {Function} [calculateCustomSummary] - Optional function for custom summary calculation.
 * @property {CardDataItem} [fieldTransform] - Optional add how the data coming from the API is going to be used on the grid
 */
export type CardConfig = {
  id: string,
  name: string,
  index: number,
  format?: FormatObject,
  sortingOrder?: SortingOrder,
  sortingMethod?: Function,
  calculateSummaryValue?: Function,
  calculateCustomSummary?: Function,
  fieldTransform?: Partial<CardDataTransformer[]> | undefined,

  // Dropdown Options for 'crem-card'
  filterData?: Dropdown[],
  customDropdownMenu?: boolean,
  filterInitialValue?: Dropdown,
  showFilterClearButton?: boolean,
  dropdownPlaceholder?: string,
  dropDisplay?: string,
  dropValue?: string,

  // Card Options for 'crem-card'
  title?: string,
  pendoTitleId?: string,
  subtitle?: string,
  // Search
  searchLabel?: string,
  searchPlaceholder?: string,
}