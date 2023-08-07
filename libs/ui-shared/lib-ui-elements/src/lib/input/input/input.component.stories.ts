import { Meta, Story } from '@storybook/angular';
import { InputComponent } from './input.component';

import { inputState, inputTypes, labelPosition } from '../definitions';

export default {
  title: 'Components/Molecules/Input',
  component: InputComponent,
  argTypes: {
    // Global
    state: { control: 'select', options: inputState, },
    inputType: { control: 'select', options: inputTypes, },
    className: { control: 'text' },
    id: { control: 'text' },

    // Label
    labelPosition: { control: 'select', options: labelPosition, },

    // Input
    placeholder: { control: 'text' },

    // Hint
    hintText: { control: 'text' },

    // HTML Attributes
    minLengthField: { control: 'number' },
    maxLengthField: { control: 'number' },
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} as Meta<InputComponent>;

const Template: Story<InputComponent> = (args: InputComponent) => ({
  props: args,
});

export const Default = Template.bind({});

Default.args = {

  // General
  state: undefined,

  // Label
  label: 'Label',
  value: '',
  placeholder: 'Placeholder',
  hintText: 'Hint text description',

  // Component Input Type
  inputType: 'text',

  // Flags
  required: false,
  showLabel: true,
  showInfo: true,
  showHint: true,

  // Secondary Input Attributes
  name: '',
  minLengthField: undefined,
  maxLengthField: undefined,

  // Additional & Styling
  labelPosition: 'top',
  className: undefined,
  id: undefined,

};