import { Dropdown } from '@mango/data-models/lib-data-models';

/**
 * Defines all the configuration needed for a Disclosure Dashboard
 *
 * @export
 * @interface DashboardConfig
 */
export interface DashboardConfig {
  dashboardId: number;
  pendoId: string;
  localCardConfig: CardConfig[];
}

export interface CardRequest {
  viewConfiguration: DashboardConfig;
  selectedSegment: number;
  reportingYear: number;
  selectedCurrency?: string;
}

export interface FormatObject {
  type: string;
  precision: number;
}

// Type guard: Checks if the given object is a Format Type
export function isFormatObject(obj: any): obj is FormatObject {
  return 'type' in obj;
}

// Sorting Object used to defined order of rows in a table
export interface SortingOrder {
  [key: string]: number;
}
export interface ColumnSortingOrder {
  [key: string]: number;
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
 * @property {number|string} [PeriodQuarter] - The year or period associated with the data.
 * @property {number|string} [dataType] - The type of data (number or string).
 * @property {any} data - The actual data associated with the card item.
 * @export
 * @interface FieldConfig
 */
export type CardDataItem = {
  AddedCount?: number | string;
  closingCount?: number | string;
  DisclosureClassification?: string | 'Total';
  EndedCount?: number | string;
  LeaseTemplate?: string;
  OpeningCount?: number | string;
  Display?: string;
  PeriodYear?: number | string;
  PeriodQuarter?: number | string;
  dataType?: number | string;
  data: any;
  modify?: CardDataItemModify;
};

export type CardDataItemModify = {
  replace: string;
  indexes: 'first' | 'last' | number;
  compareWith: string;
  compareWithX?: string;
  offset: number;
  caption?: string;
  newData?: string | number;
};

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
 *
 * @see https://js.devexpress.com/Angular/Documentation/ApiReference/Data_Layer/PivotGridDataSource/Configuration/fields/
 *
 * @typedef {Object} CardDataTransformer
 */
export type CardDataTransformer = CardDataItem & object;

/**
 * Represents the configuration for a field in a data set.
 * @typedef {Object} CardConfig
 */
export type CardConfig = {
  /**
   * HTML element ID
   *
   * @type {string}
   */
  id: string;

  /**
   * Card Name
   *
   * @type {string}
   */
  name: string;

  /**
   * The position of the Card.
   *
   * @type {number}
   */
  index: number;

  /**
   * Optional formatting information for the field.
   *
   * @type {FormatObject}
   */
  format?: FormatObject;

  /**
   * Width of the first column displaying the rows
   *
   * @type {number}
   */
  width?: number;

  /**
   * When needed to combine with another IADCardData, the selected index will be removed
   * and not be used as a separated dashboard card. Please check the `inAppDisclosureService.getIADCardData`
   * to review the response's indexes.
   *
   * @type {number}
   */
  combineWithIndex?: number;

  /**
   * Optional sorting order for the field.
   *
   * @type {SortingOrder}
   */
  sortingOrder?: SortingOrder;
  columnSortingOrder?: ColumnSortingOrder;

  /**
   * Name of the Column Field to be sorted.
   *
   * @type {string}
   */
  sortedColumnFieldName?: string;

  showFieldChooser?: boolean;

  /**
   * Optional sorting method function for the field.
   *
   * @type {Function}
   */
  sortingMethod?: Function;

  /**
   * Specifies a custom post-processing function for summary values.
   * When using please set `summaryType` to `custom`
   * @see https://js.devexpress.com/Angular/Demos/WidgetsGallery/Demo/DataGrid/CustomSummaries/MaterialBlueLight/
   * @type {Function}
   */
  calculateSummaryValue?: Function;

  /**
   * Specifies how to aggregate data for the total summary item.
   * Default Value: 'count' when the parameter is not provided.
   *
   * @see https://js.devexpress.com/Angular/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/summary/totalItems/#summaryType
   * @type {('sum' | 'min' | 'max' | 'avg' | 'count' | 'custom' | null)}
   */
  summaryType?: 'sum' | 'min' | 'max' | 'avg' | 'count' | 'custom' | null;

  /**
   * Optional function for custom summary calculation.
   *
   * @type {Function}
   */
  calculateCustomSummary?: Function;

  /**
   * How the incoming API data is going to be used on the grid
   *
   * @type {(Partial<CardDataTransformer[]> | undefined)}
   */
  fieldTransform?: Partial<CardDataTransformer[]> | undefined;

  allowSortingBySummary?: boolean;
  allowFiltering?: boolean;
  showBorders?: boolean;
  showRowGrandTotals?: boolean;
  showColumnGrandTotals?: boolean;
  showRowTotals?: boolean;
  showColumnTotals?: boolean;

  mergeBy?: string;

  /**
   * Strings that can be changed or localized in the PivotGrid UI component.
   *
   * @see https://js.devexpress.com/Angular/Documentation/ApiReference/UI_Components/dxPivotGrid/Configuration/texts/
   * @type {object}
   */
  texts?: PivotGridTexts;

  // Dropdown Options for 'crem-card'
  filterData?: Dropdown[];

  /**
   * filterBy is used with filterData, where filterBy is the key to use
   * from localCardConfig to compare against.
   *
   * @type {number}
   */
  filterBy?: string;

  customDropdownMenu?: boolean;
  filterInitialValue?: Dropdown;
  showFilterClearButton?: boolean;
  dropdownPlaceholder?: string;
  dropDisplay?: string;
  dropValue?: string;

  // Card Options for 'crem-card'
  title?: string;
  pendoTitleId?: string;
  subtitle?: string;
  // Search
  searchLabel?: string;
  searchPlaceholder?: string;
};

/**
 * Strings that can be changed or localized in the PivotGrid UI component.
 *
 * @see https://js.devexpress.com/Angular/Documentation/ApiReference/UI_Components/dxPivotGrid/Configuration/texts/
 * @interface pivotGridTexts
 */
interface PivotGridTexts {
  collapseAll?: string;
  dataNotAvailable?: string;
  expandAll?: string;
  exportToExcel?: string;
  grandTotal?: string;
  noData?: string;
  removeAllSorting?: string;
  showFieldChooser?: string;
  sortColumnBySummary?: string;
  sortRowBySummary?: string;
  total?: string;
}
