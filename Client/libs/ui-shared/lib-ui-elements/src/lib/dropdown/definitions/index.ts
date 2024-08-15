/**
 * dataTransformerCondition
 * 
 * @description Represents the conditions for transforming the menu item
 * @interface dataTransformerCondition
 */
export interface dataTransformerCondition {
  comparingKey?: string,
  comparingValue?: string | boolean | number,
  /**
   * @property {Operator} [operator] - Operator to use when comparing with condition.
   */
  operator?: Operator,
  /**
   * @property {string} [name] - If the condition is true, the item name/title is changed to the provided value here.
   */
  name?: string,
  /**
   * @property {string} [title] - Provide an alternative title if the condition is true.
   */
  title?: string,
  /**
   * @property {boolean} [disabled] - If the condition is true, this flag can disable the button.
   */
  disabled?: boolean,
  /**
   * @property {boolean} [hide] - Hides the option if the conditions on dataTransformerCondition are given. This takes precedence over the disabled flag.
   */
  hide?: boolean,
  /**
   * @deprecated use comparingKey and comparingValue instead
   * @property {string | boolean | number} [condition] - Condition for this to be applied.
   */
  condition?: string | boolean | number,
}

export type Operator = '>' | '<' | '=' | '<=' | '>=' | '!=';

/**
 * Represents a menu item for a more menu.
 *
 * @typedef {Object} moreMenuItem
 */
export type moreMenuItem = {
  /**
   * @property {'separator' | 'menu'} type - The type of the menu item. Separators only have a type 'separator' and nothing else
   */
  type: 'separator' | 'menu',
  /**
   * @property {string} [name] - The name of the menu item.
   */
  name?:string,
  /**
   * @property {string} [attribute] - Pass a custom value or name of a variable already existing on the moreMenu data.
   */
  attribute?: string,
  /**
   * @property {string} [title] - The title of the menu item. The html title attribute is generated out this.
   */
  title?: string,
  /**
   * @deprecated TODO: Remove, type should be used instead
   * @property {string} [icon] - The icon associated with the menu item.
   */
  icon?: string,
  /**
   * @property {boolean} [separator] - A boolean indicating whether the menu item is a separator.
   */
  separator?: boolean,
  /**
   * @property {any} [action] - The action to be performed when the menu item is selected. Use a callback function.
   */
  action?: any,
  /**
   * @property {boolean} [disabled] - A boolean indicating whether the menu item is disabled.
   */
  disabled?: boolean,
  /**
   * @property {string} [class] - The CSS class associated with the menu item.
   */
  class?: string,
  /**
   * @property {boolean} [stopPropagation] - A boolean indicating whether event propagation should be stopped. Prevents from side-effects when clicking in the element. Useful to prevent to automatic close of the more menu.
   */
  stopPropagation?: boolean,
  /**
   *  @property {dataTransformerCondition[]} [transform] - Transform the moreMenu given the conditions presented
   */
  transform?: dataTransformerCondition[],
  /**
   * @deprecated
   * @property {string} [comparingValue] - The incoming name of the variable to compare with when using the parameters dataTransformerCondition.
   */
  comparingValue?: string,
  /**
   * @deprecated
   * @property {dataTransformerCondition[]} [dataTransformer] - (old method, use transform instead) Only works if 'comparingValue' is present, then proceeds to work with 'comparingValue' to add extra logic to the menu.
   */
  dataTransformer?: dataTransformerCondition[],
}

export type selectBoxMenuItems = moreMenuItem[]
export type byItemMoreMenuOptions = selectBoxMenuItems[];