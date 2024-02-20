import { Meta, Story } from '@storybook/angular';
import { DesignSystemColorToken } from './color.component';

export default {
  title: 'Documentation/Styling/Internal Utilities/Color',
  component: DesignSystemColorToken,
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} as Meta<DesignSystemColorToken>;

const Template: Story<DesignSystemColorToken> = (args: DesignSystemColorToken) => ({
  props: args,
});

export const Default = Template.bind({});

Default.args = {
  // BASE
  color: 'primary',
  // WCAG
  wcagColor: 'light',
  wcagContrast: 'AAA 11.2:1',
  wcagDescription: 'light',
  // BODY
  name: 'Base',
  description: '#1B3A6E',
  examples: `
    @include costar(background-color, primary);
    @include costar(color, light);`,
};