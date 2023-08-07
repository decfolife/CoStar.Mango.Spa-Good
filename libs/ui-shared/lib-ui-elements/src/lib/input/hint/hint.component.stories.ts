import { Meta, Story } from '@storybook/angular';
import { InputHintComponent } from './hint.component';

import { hintTypes } from '../definitions';

export default {
  title: 'Components/Atoms/Hint',
  component: InputHintComponent,
  argTypes: {
    text: { control: 'text' },
    type: { control: 'select', options: hintTypes },
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} as Meta<InputHintComponent>;

const Template: Story<InputHintComponent> = (args: InputHintComponent) => ({
  props: args,
});

export const Default = Template.bind({});

Default.args = {
  text: 'Hint text description',
  type: undefined,
};