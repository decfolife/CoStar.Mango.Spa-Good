
/**
 * Represents the conditions for transforming the menu item
 * @interface dataTransformerCondition
 * @property {string | boolean | number} [condition] - Condition for this to be applied.
 * @property {'>' | '<' | '=' | '<=' | '>=' | '!='} [operator] - Operator to use when comparing with condition.
 * @property {string} [name] - If the condition is true, the item name/title is changed to the provided value here.
 * @property {boolean} [disabled] - If the condition is true, this flag can disable the button.
 * @property {string} [title] - Provide an alternative title if the condition is true.
 */
export interface dataTransformerCondition {
  condition?: string | boolean | number,
  operator?: '>' | '<' | '=' | '<=' | '>=' | '!=',
  name?: string,
  disabled?: boolean,
  title?: string,
}

/**
 * Represents a menu item for a more menu.
 *
 * @typedef {Object} moreMenuItem
 * @property {'separator' | 'menu'} type - The type of the menu item. Separators only have a type 'separator' and nothing else
 * @property {string} [name] - The name of the menu item.
 * @property {string} [comparingValue] - The incoming name of the variable to compare with when using the parameters dataTransformerCondition.
 * @property {string} [attribute] - Pass a custom value or name of a variable already existing on the moreMenu data.
 * @property {string} [title] - The title of the menu item. The html title attribute is generated out this.
 * @property {string} [icon] - The icon associated with the menu item.
 * @property {boolean} [separator] - A boolean indicating whether the menu item is a separator.
 * @property {any} [action] - The action to be performed when the menu item is selected. Use a callback function.
 * @property {boolean} [hide] - Hides the option if the conditions on dataTransformerCondition are given. This takes precedence over the disabled flag.
 * @property {boolean} [disabled] - A boolean indicating whether the menu item is disabled.
 * @property {string} [class] - The CSS class associated with the menu item.
 * @property {boolean} [stopPropagation] - A boolean indicating whether event propagation should be stopped. Prevents from side-effects when clicking in the element. Useful to prevent to automatic close of the more menu.
 * @property {dataTransformerCondition[]} [dataTransformer] - Only works if 'comparingValue' is present, then proceeds to work with 'comparingValue' to add extra logic to the menu.
 */
export type moreMenuItem = { // Todo: Move to type definition file
  type: 'separator' | 'menu',
  name?:string,
  comparingValue?: string,
  attribute?: string,
  title?: string,
  icon?: string,
  separator?: boolean,
  action?: any,
  hide?: boolean,
  disabled?: boolean,
  class?: string,
  stopPropagation?: boolean,
  dataTransformer?: dataTransformerCondition[],
}

export type selectBoxMenuItems = moreMenuItem[]
export type byItemMoreMenuOptions = selectBoxMenuItems[];