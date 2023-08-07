/*
 * Definitions
 */
// Input
export type InputState =
  'active'    |
  'read-only' |
  'disabled'  |
  'warning'   |
  'error'     |
  'success';
export type InputType =
  'text'      |
  'textarea'  |
  'date'      |
  'number'    |
  'password'  |
  'checkbox'  |
  'select-box';
export type LabelPosition = 'top' | 'inline';

// Hint
export type HintType =
  'active' |
  'read-only' |
  'disabled' |
  'description' |
  'warning' |
  'error' |
  'success';

/*
 * Storybook Options
 */
export const inputState: InputState[] = [
  'active',
  'read-only',
  'disabled',
  'warning',
  'error',
  'success',
];
export const labelPosition: LabelPosition[] = [
  'top',
  'inline',
];
export const inputTypes: InputType[] = [
  'text',
  'textarea',
  'date',
  'number',
  'password',
  'checkbox',
  'select-box',
];
export const hintTypes: HintType[] = [
  'active',
  'read-only',
  'disabled',
  'description',
  'warning',
  'error',
  'success',
];