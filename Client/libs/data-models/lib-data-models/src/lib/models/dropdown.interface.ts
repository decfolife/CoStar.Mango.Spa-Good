/**
 * For crem-dropdown mostly, used as a type for 'dataSource'
 * @interface Dropdown
 */
export interface Dropdown {
  /**
   * The key used to display items in the dropdown.
   * @type {string}
   */
  displayKey: string;

  /**
   * The key used to represent the value of selected items.
   * @type {string | number}
   */
  valueKey: string | number;

  /**
   * Optional unique identifier for the dropdown.
   * @type {number}
   */
  id?: number;

  /**
   * Optional expression used to display items.
   * @type {string | number}
   */
  displayExpr?: string | number;

  /**
   * Optional CSS class applied to the corresponding dropdown item
   * @type {string}
   */
  itemClass?: string;

  /**
   * Optional array of items to populate the dropdown.
   * @todo It looks like the original crem-dropdown's 'dataSource' is being mutated internally by dropdownOnValueChanged()
   * @type {any[]}
   */
  items?: any[];

  /**
   * Optional name associated with the dropdown.
   * @todo It seems preferable to remove this property and standardize the usage of 'displayKey' instead. Components using this property should be updated accordingly.
   * @type {string | number}
   */
  name?: string | number;

  /**
   * Optional value associated with the dropdown.
   * @todo It seems preferable to remove this property and standardize the usage of 'displayKey' instead. Components using this property should be updated accordingly.
   * @type {string | number}
   */
  value?: string | number;
}
