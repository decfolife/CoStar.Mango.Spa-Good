import { Meta, Story } from '@storybook/angular';
import { InputTextComponent } from './input-text.component';
import { inputState } from '../../definitions';

export default {
  title: 'Components/Input Text',
  component: InputTextComponent,
  argTypes: {
    state: {control: 'select', options: inputState },
    value: { control: 'text'},
    name: { control: 'text'},
    placeholder: { control: 'text'},
    id: { control: 'text'},
    required: { control: 'boolean'},
    minLengthField: { control: 'number'},
    maxLengthField: { control: 'number'},
    className: { control: 'text'},
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} as Meta<InputTextComponent>;

const Template: Story<InputTextComponent> = (args: InputTextComponent) => ({
  props: args,
});

export const Default = Template.bind({});

Default.args = {
  // General
  state: undefined,
  value: undefined,
  placeholder: 'Placeholder',
  required: undefined,

  // Details
  name: undefined,
  id: undefined,
  className: undefined,

  // Input specific
  minLengthField: undefined,
  maxLengthField: undefined,
};