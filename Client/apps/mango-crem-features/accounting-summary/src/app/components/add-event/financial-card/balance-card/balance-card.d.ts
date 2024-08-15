import { InputType } from '@mango/ui-shared/lib-ui-elements/src/lib/input/definitions';

/**
 * @typedef {Object} DataElement
 * @property {string} label - The label for the data element.
 * @property {string} [name] - The optional name of the data element when the element is an input field
 * @property {number|string} [value] - The optional value of the data element, which can be a number or a string.
 * @property {InputType} [inputType] - The optional input type of the data element.
 * @property {string} [className] - The optional class name for the data element. Useful for styling the wrapper of the label and input/text.
 */
type DataElement = {
  label: string,
  name?: string,
  value?: number | string,
  inputType?: InputType,
  disabled?: boolean,
  formControlName?: string,
  className?: string,
  initialSelectedValue?: {
    displayKey: string | number;
    valueKey: string | number;
  } | string | number,
  dataSource?: Array<{
    displayKey: string | number;
    valueKey: string | number;
  }>,
  initialSelectedValue?: '',
}

type DataElements = DataElement[];

/**
 * @typedef {Object} BalanceCardType
 * @property {string} cardTitle - The title of the card.
 * @property {string} [cardSubtitle] - The optional subtitle of the card.
 * @property {string} [description] - The optional description of the card.
 * @property {number|string} value - The main value displayed on the card, which can be a number or a string.
 * @property {string} [valueSuffix] - The optional suffix for the value (e.g., currency symbol).
 * @property {string} [valueLink] - The optional link URL associated with the value.
 * @property {'self' | 'blank'} [valueTarget] - The optional target for the value link, specifying how the link should be opened.
 * @property {string} [className] - The optional class name for styling the card.
 * @property {string} [id] - The optional unique identifier for the card.
 * @property {DataElement[]} [elements] - The optional array of data elements associated with the card.
 */
export type BalanceCardType = {
  cardTitle: string,
  cardSubtitle?: string,
  description?: string,
  value: number | string,
  valueSuffix?: string,
  valueLink?: string,
  valueTarget?: 'self' | 'blank',
  className?: string,
  id?: string,
  elements?: DataElements,
}

/**
 * @typedef {Object} CardsConfiguration
 * @property {number} [gap] - Optional. The gap between the cards.
 * @property {'column' | 'row'} [direction] - Optional. The direction in which the cards should be arranged. Can be 'column' or 'row'.
 * @property {'auto-fit' | 'auto-fill'} [repeat] - Optional. The repeat strategy for the cards. Can be 'auto-fit' or 'auto-fill'.
 * @property {number} [maxWidth] - Optional. The maximum width of the cards. Example: 'repeat(auto-fit, minmax(200px, 1fr))'.
 */
export type CardsConfiguration = {
  gap?: number,
  direction?: 'column' | 'row',
  repeat?: 'auto-fit' | 'auto-fill',
  maxWidth?: number,
}