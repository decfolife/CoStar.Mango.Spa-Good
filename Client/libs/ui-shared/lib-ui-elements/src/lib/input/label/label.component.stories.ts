import { Meta, Story } from '@storybook/angular';
import { InputLabelComponent } from './label.component';

export default {
  title: 'Components/Label *',
  component: InputLabelComponent,
  argTypes: {
    label: { control: 'text',},
    name: { control: 'text',},
    required: { control: 'boolean',},
    showInfo: { control: 'boolean',},
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} as Meta<InputLabelComponent>;

const Template: Story<InputLabelComponent> = (args: InputLabelComponent) => ({
  props: args,
});

export const Default = Template.bind({});

Default.args = {
  label: 'Label Text',
  name: '',
  showInfo: true,
  required: true,
};