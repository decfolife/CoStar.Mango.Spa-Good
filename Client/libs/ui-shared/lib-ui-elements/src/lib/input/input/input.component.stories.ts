import { Meta, Story } from '@storybook/angular';
import { InputComponent } from './input.component';

import { inputState, inputTypes, labelPosition } from '../definitions';

export default {
  title: 'Components/Input',
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
    rows: { control: 'number' },
    cols: { control: 'number' },
    minNumber: {
      cols: { control: 'number' },
      description: 'The minimum value of the input (only when `inputType` is set to number)',
      table: {
        defaultValue: {
          summary: Number.NEGATIVE_INFINITY,
        }
      }
    },
    maxNumber: {
      cols: { control: 'number' },
      description: 'The maximum value of the input (only when `inputType` is set to number)',
      table: {
        defaultValue: {
          summary: `+${Number.POSITIVE_INFINITY}`,
        }
      }
    },
  }
} as Meta<InputComponent>;

const Template: Story<InputComponent> = (args: InputComponent) => ({
  props: args,
});

export const Default = Template.bind({});

Default.args = {
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
  rows: 4,
  cols: 30,  

  // Additional & Styling
  labelPosition: 'top',
};