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
 * If your are
 * @export
 * @interface FieldConfig
 */
export type CardDataItem = {
  AddedCount?: number | string,
  closingCount?: number | string,
  DisclosureClassification?: string,
  EndedCount?: number | string,
  LeaseType?: string,
  OpeningCount?: number | string,
  Display: string,
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
 * @property {Function} [calculateCustomSummary] - Optional function for custom summary calculation.
 * @property {CardDataItem} [fieldTransform] - Optional add how the data coming from the API is going to be used on the grid
 */
export type CardConfig = {
  id: string,
  name: string,
  index: number,
  format?: string | FormatObject,
  sortingOrder?: SortingOrder,
  sortingMethod?: Function, // todo: fix
  calculateCustomSummary?: Function, // todo: fix
  fieldTransform?: Partial<CardDataTransformer[]> | undefined,
}