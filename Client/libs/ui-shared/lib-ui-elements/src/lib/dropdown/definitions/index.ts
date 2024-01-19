interface _dataTransformerCondition {
  condition?: string | boolean | number, // Condition for this to be applied
  name?: string, // If the condition is true, the item name/title is changed to the provided here
  disabled?: boolean, // If the condition is true, this flags can disable the button
}

export type moreMenuItem = { // Todo: Move to type definition file
  type: 'separator' | 'menu',
  name?:string, icon?: string,
  separator?: boolean,
  action?: any,
  disabled?: boolean,
  class?: string,
  stopPropagation?: boolean,
  dataTransformer?: _dataTransformerCondition[], // Changes the 'disabled' parameter to true
}

export type selectBoxMenuItems = moreMenuItem[]
export type byItemMoreMenuOptions = selectBoxMenuItems[];